# Studio Abreu

A Next.js marketing site for Studio Abreu – a boutique studio building trust-first websites for restaurants and hospitality teams.

## Getting Started

```bash
npm install
npm run dev
```

## Content Overview

- **Homepage** – `pages/index.js`
- **Approach** – `pages/about.js`
- **Work / Case studies** – `pages/work.js`
- **Pricing** – `pages/pricing.js`
- **Contact form** – `pages/contact.js` and `pages/api/contact.js`
- **Shared layout** – `components/Layout.js`, `components/Header.js`, `components/Footer.js`
- **Styling** – modular CSS files inside `styles/`

## Deployment

Deploy with Vercel for the best Next.js experience:

```bash
npm run build
npm run start
```

Environment variables for email delivery are configured in `lib/email.js`.
