import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Called by the front end when a parent clicks "Continue to payment".
// Builds a Stripe Checkout Session from the basket and hands back the URL
// to redirect the browser to. No product setup needed in the Stripe
// dashboard — prices are sent inline via price_data.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { items, email, name } = req.body || {};

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Your basket is empty." });
    }

    const line_items = items.map((item) => ({
      price_data: {
        currency: "gbp",
        product_data: { name: item.title },
        unit_amount: Math.round(Number(item.price) * 100),
      },
      quantity: Math.max(1, Number(item.qty) || 1),
    }));

    const siteUrl = process.env.SITE_URL || `https://${req.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      customer_email: email || undefined,
      metadata: {
        name: name || "",
        // Compact "id:qty,id:qty" record of what was bought, read back by
        // api/webhook.js to work out which download links to send.
        cart: items
          .map((item) => `${item.id}:${Math.max(1, Number(item.qty) || 1)}`)
          .join(",")
          .slice(0, 500),
      },
      success_url: `${siteUrl}/?success=true`,
      cancel_url: `${siteUrl}/?canceled=true`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout session error:", err);
    return res.status(500).json({ error: "Could not start checkout. Please try again." });
  }
}
