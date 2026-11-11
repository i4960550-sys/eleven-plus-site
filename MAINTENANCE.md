# Maintenance mode: how to resume

The live site is replaced by a maintenance page. `src/main.jsx` renders
`<Maintenance />` instead of `<App />`. `src/App.jsx` is untouched.
The `/api` routes (checkout, webhook, downloads) stay live.

Last full-site commit: 629c66e ("Add business name beside header logo").

## Resume the full site (Command Prompt, project folder)

    git checkout 629c66e -- src/main.jsx
    git commit -m "Restore full site"
    git push

Then load the site in a private window to confirm it is back.

## Do not use Instant Rollback on the Hobby plan

Hobby can only roll back to the immediately previous deployment. After the
wording-update push, that is the old maintenance page, not the full site.

## Check after any pause or resume

Stripe Payments list: confirm every paid session has a delivery email.

## Vercel environment variables (names only, values live in Vercel)

STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, RESEND_API_KEY, FROM_EMAIL, SITE_URL
