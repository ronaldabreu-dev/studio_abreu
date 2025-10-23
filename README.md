
# Eric Finbarr Carey • Tenor – Next.js Site

Minimal React/Next.js codebase that mirrors the layout of ericfinbarrcarey.com.  
Simply edit the data files in `/data`, swap images in `/public`, and redeploy.

## Getting Started

```bash
npm install
npm run dev
```

## Update Content

- **Hero, quote, event list** – `pages/index.js`
- **About** – `pages/about.js`
- **Press quotes** – `data/press.js`
- **Gallery images** – place files in `/public/gallery`
- **Recordings** – drop MP3/MP4 files in `/public/audio` & edit `pages/listen.js`
- **Events** – edit `data/events.js`
- **Contact Form** – replace Formspree ID in `pages/contact.js`

## Deployment

Works out‑of‑the‑box on Vercel, Netlify (via `next-on-netlify`), or any Node host.
