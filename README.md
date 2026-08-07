# Eleven+ site

A Vite + React storefront with real Stripe Checkout. Everything's built —
what's left is a handful of steps only you can do (creating accounts,
entering payment details, buying a domain). This file walks through those
in order.

## 1. Run it locally

You'll need [Node.js](https://nodejs.org) installed (v18 or later).

```bash
npm install
npm run dev
```

This opens the site at `http://localhost:5173`. The basket and browsing
all work immediately. Checkout won't work yet — that needs Stripe (next
step).

## 2. Create a Stripe account

1. Go to [stripe.com](https://stripe.com) and sign up (free).
2. Once in the dashboard, make sure you're in **Test mode** (toggle top
   right) — you'll use this to try the whole flow safely before real money
   is involved.
3. Go to **Developers > API keys** and copy the **Secret key**.
4. Copy `.env.example` to `.env` in this project, and paste the key in as
   `STRIPE_SECRET_KEY`.
5. Restart `npm run dev`. Add something to the basket and go through
   checkout — you'll land on Stripe's real hosted payment page. Use the
   test card `4242 4242 4242 4242`, any future expiry, any CVC.

## 3. Set up order delivery (the webhook)

`api/webhook.js` is built and sends a real email via [Resend](https://resend.com)
the moment a payment succeeds. Three things left, all yours to do:

1. **Host the PDFs somewhere with a shareable link** — a private Google
   Drive folder set to "Anyone with the link can view" is the fastest way to
   start; a storage bucket (e.g. Cloudflare R2) works too if you want
   something more permanent.
2. **Paste those links into `api/downloads.js`** — it's a plain object
   mapping each product (the 10 individual sets, the 4-set core package,
   the full premium bundle) to its download link. Fill in the blanks.
3. **Create a free Resend account**, verify a sender (or use their test
   address to begin with), grab an API key from **API Keys** in their
   dashboard, and add it as `RESEND_API_KEY` in your environment variables
   (same place as the Stripe key). Optionally set `FROM_EMAIL` once you've
   verified your own domain in Resend — see the comment in `.env.example`.

Until a Resend domain is verified, email sends from a Resend test address,
which is fine for trying the flow but looks less trustworthy to buyers —
swap in `FROM_EMAIL` before taking real orders.

## 4. Deploy the site

1. In this project folder, run:
   ```bash
   git init
   git add -A
   git commit -m "Initial commit"
   ```
   A `.gitignore` is already in place, so `node_modules` and `.env` won't
   get committed.
2. Create a free account at [github.com](https://github.com) if you don't
   have one, create a new (empty) repository, then push:
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git branch -M main
   git push -u origin main
   ```
3. Create a free account at [vercel.com](https://vercel.com) and sign in
   with GitHub.
4. Click **Add New > Project**, pick your repository, and click **Deploy**.
   Vercel auto-detects Vite and the `/api` functions — no config needed.
5. Go to **Settings > Environment Variables** on the Vercel project and add:
   - `STRIPE_SECRET_KEY`
   - `SITE_URL` — your Vercel URL for now, e.g. `https://your-project.vercel.app`
     (you'll update this again in step 6 once you have a real domain)
   - `RESEND_API_KEY`
   - `FROM_EMAIL` — optional, see §3
6. Also go to **Settings > Deployment Protection** and make sure it's
   **off** for production — Stripe needs to be able to load the page
   without a login wall, and it can't review a password-protected site.
7. Redeploy (Vercel does this automatically after you save env vars, or
   trigger it manually from the dashboard).

## 5. Connect the Stripe webhook

1. In the Stripe dashboard, go to **Developers > Webhooks > Add endpoint**.
2. Endpoint URL: `https://your-deployed-url/api/webhook`
3. Select the event `checkout.session.completed`.
4. After creating it, copy the **Signing secret** and add it to Vercel's
   environment variables as `STRIPE_WEBHOOK_SECRET`. Redeploy.

## 6. Buy a domain (optional but recommended)

1. Register something like `elevenplus-slough.co.uk` through a registrar —
   Namecheap, Cloudflare Registrar, or Vercel's own domain search under
   **Settings > Domains** on your project are all straightforward.
2. Follow Vercel's on-screen instructions to point the domain at your
   project (it's usually just adding one or two DNS records).
3. Update the `SITE_URL` environment variable to your real domain and
   redeploy.

## 7. Go live

Once you've bought something yourself in test mode and confirmed the
email/download works end to end:

1. Flip the Stripe dashboard from **Test mode** to **Live mode**.
2. Grab your **live** secret key (starts `sk_live_...`) and swap it into
   `STRIPE_SECRET_KEY` on Vercel.
3. Recreate the webhook under live mode too (step 5 again, live dashboard
   this time) and update `STRIPE_WEBHOOK_SECRET` with the new live secret.
4. Redeploy. You're live.

---

**Where things stand right now:** the site, basket, Stripe Checkout
redirect, and delivery email (Resend) are all fully built and working in
code. What's still open is entirely accounts and credentials only you can
create — Stripe keys (§2), PDF hosting links and a Resend API key (§3),
GitHub + Vercel (§4), the Stripe webhook (§5), and optionally a domain
(§6) — then flipping to live mode (§7).
