import Stripe from "stripe";
import { Resend } from "resend";
import { DOWNLOAD_LINKS } from "./downloads.js";

// Stripe needs the raw request body to verify the webhook signature, so we
// turn off Vercel's default JSON body parsing for this route only.
export const config = {
  api: { bodyParser: false },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

// Until you've verified your own sending domain in Resend, mail can only go
// out "from" this Resend test address. Swap it for something like
// "ElevenPlus Scholars <papers@elevenplusscholars.co.uk>" once you have.
const FROM_EMAIL = process.env.FROM_EMAIL || "ElevenPlus Scholars <onboarding@resend.dev>";

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

// Reconstructs which products were bought from the compact "id:qty,id:qty"
// string set in api/create-checkout-session.js, then pairs each one with the
// human-readable line item Stripe stored for the session (same order) and
// the download link configured in api/downloads.js.
async function buildOrderLines(session) {
  const cartRaw = session.metadata?.cart || "";
  const cartEntries = cartRaw
    .split(",")
    .filter(Boolean)
    .map((pair) => {
      const [id, qty] = pair.split(":");
      return { id, qty: Number(qty) || 1 };
    });

  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 });

  return cartEntries.map((entry, i) => ({
    id: entry.id,
    qty: entry.qty,
    title: lineItems.data[i]?.description || entry.id,
    link: DOWNLOAD_LINKS[entry.id] || "",
  }));
}

function renderEmailHtml(orderLines) {
  const rows = orderLines
    .map((line) => {
      const label = line.qty > 1 ? `${line.title} × ${line.qty}` : line.title;
      const linkHtml = line.link
        ? `<a href="${line.link}">Download</a>`
        : `<span style="color:#a23b3b;">Link missing — contact us and we'll sort it.</span>`;
      return `<tr><td style="padding:8px 0;">${label}</td><td style="padding:8px 0; text-align:right;">${linkHtml}</td></tr>`;
    })
    .join("");

  return `
    <div style="font-family: Arial, sans-serif; color: #182338; max-width: 480px; margin: 0 auto;">
      <h2 style="margin-bottom: 4px;">Thanks for your order</h2>
      <p style="color: #5B6472;">Here are your download links:</p>
      <table style="width: 100%; border-collapse: collapse;">${rows}</table>
      <p style="color: #5B6472; font-size: 13px; margin-top: 24px;">
        Questions or a missing link? Reply to this email or contact
        elevenpluscholars@gmail.com.
      </p>
    </div>
  `;
}

// Stripe calls this URL directly (not the browser) the moment a payment
// succeeds. This is the reliable place to actually deliver the product —
// never rely on the browser reaching your success page, since the parent
// could close the tab before the redirect completes.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const sig = req.headers["stripe-signature"];
  const buf = await buffer(req);

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const email = session.customer_details?.email;

    if (!email) {
      console.error("No customer email on session", session.id);
      return res.status(200).json({ received: true });
    }

    try {
      const orderLines = await buildOrderLines(session);
      const missingLinks = orderLines.filter((line) => !line.link).map((line) => line.id);
      if (missingLinks.length > 0) {
        // Doesn't block the email — buyer still gets what does have a link,
        // plus the "contact us" fallback text — but flag it so you notice
        // and fill in api/downloads.js.
        console.warn(`Missing download link(s) for: ${missingLinks.join(", ")}`);
      }

      const { data, error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        replyTo: "elevenpluscholars@gmail.com",
        subject: "Your Eleven+ practice papers",
        html: renderEmailHtml(orderLines),
      });

      if (error) {
        // The Resend SDK resolves (doesn't throw) on a failed send — it
        // returns an `error` field instead. Treat that as a failure so it's
        // not silently swallowed: log it and return non-2xx so Stripe retries.
        console.error("Resend rejected the delivery email:", error);
        return res.status(500).json({ error: "Failed to send delivery email" });
      }

      console.log(`Delivery email sent to ${email} for session ${session.id} (id: ${data?.id})`);
    } catch (err) {
      // Stripe retries the webhook on non-2xx, so a real failure here should
      // surface as an error rather than being swallowed.
      console.error("Failed to send delivery email:", err);
      return res.status(500).json({ error: "Failed to send delivery email" });
    }
  }

  return res.status(200).json({ received: true });
}
