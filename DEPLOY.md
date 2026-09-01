# Deploying to Coolify

The site is static except for one PHP endpoint (the contact form), so it ships as a
single container: Node builds the bundle, `php:8.3-apache` serves it and executes
`/api/contact.php`.

## Coolify setup

1. **New Resource → Application → Public/Private Repository**, pointed at this repo.
2. **Build Pack: `Dockerfile`.** Not Nixpacks and not Static — the site needs PHP for
   the contact form, and the Dockerfile is what provides it.
3. **Port:** `80`.
4. **Domain:** `https://bizchemists.com`. Let Coolify terminate TLS; the container
   only ever speaks HTTP on its own network.

## Environment variables

Set these in Coolify. The SMTP values are secrets — mark them as such so they are not
printed in build logs.

| Variable | Required | Purpose |
| --- | --- | --- |
| `SITE_URL` | build arg | Baked into canonicals, `og:url`, `sitemap.xml`, `robots.txt` and the JSON-LD graph. Defaults to `https://bizchemists.com`. **A staging deploy must override this** or it will advertise production URLs to Google. |
| `SMTP_HOST` | yes, to send mail | Hostinger's outgoing server, e.g. `smtp.hostinger.com`. |
| `SMTP_PORT` | no | Defaults to `587` (STARTTLS). |
| `SMTP_USER` | yes | The full mailbox address. |
| `SMTP_PASS` | yes | That mailbox's password. Secret. |
| `SMTP_FROM` | no | Envelope sender. Defaults to `no-reply@bizchemists.com`. |
| `CONTACT_TO` | no | Where enquiries land. Defaults to the founder address in the code. |
| `CONTACT_FROM_DOMAIN` | no | Domain in the `From:` header. Defaults to `bizchemists.com`. |

Without `SMTP_HOST` the site still serves perfectly — only the form degrades, and the
front end already falls back to a prefilled mailto when the endpoint fails.

## Mail deliverability

Mail sent from a fresh server is spam until the DNS says otherwise. In Hostinger's DNS
for `bizchemists.com`:

- **SPF** — include Hostinger's sender, e.g. `v=spf1 include:_spf.hostinger.com ~all`
- **DKIM** — enable it on the mailbox and publish the key Hostinger gives you
- **DMARC** — start at `v=DMARC1; p=none; rua=mailto:you@bizchemists.com`, tighten later

Send one test enquiry through the live form and confirm it lands in the inbox rather
than in spam. This is the single most likely thing to be quietly broken after launch.

## What the container does for you

- **PHP is linted at build time** (`php -l`), so a syntax error fails the deploy
  instead of surfacing as a dead contact form.
- **Only `contact.php` is executable.** Every other `.php` path is denied.
- **Security headers** on every response: CSP, HSTS, `X-Frame-Options: DENY`,
  `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`.
- **Rate limiting** in the endpoint: 5 submissions per IP per 10 minutes, read from the
  proxy's `X-Forwarded-For` rather than a spoofable client header.
- **No SPA catch-all.** Every route is a real file on disk (`/`, `/work/<slug>/`).
  Do not add a `/(.*) → /index.html` rewrite: it would shadow all six case study pages
  with the homepage and turn typos into soft 404s.

## After the first deploy

- [ ] Submit the contact form and confirm the email arrives
- [ ] `curl -sI https://bizchemists.com | grep -i content-security-policy`
- [ ] Open `https://bizchemists.com/work/pizza-gallery` directly — it must render that
      page, not the homepage
- [ ] Check `https://bizchemists.com/sitemap.xml` and `/robots.txt` show the real domain
- [ ] Submit the sitemap in Google Search Console
- [ ] Add analytics — the site currently has none, so there is no baseline
