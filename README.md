# ResearchWise Analytics — website

React + TypeScript + Vite + Tailwind CSS v4.

## Run

```bash
npm install
npm run dev       # local development
npm run build     # type-check + production build to dist/
npm run preview   # serve the production build
```

## Configuration

All contact details live in **`src/config/site.ts`**. Each can be overridden in `.env.local` (see `.env.example`):

| Variable | Purpose |
| --- | --- |
| `VITE_SITE_URL` | Public domain, e.g. `https://example.com`. Enables canonical URLs, `og:url` and `sitemap.xml`. |
| `VITE_WHATSAPP_NUMBER` | WhatsApp number with country code, digits only. |
| `VITE_CONTACT_EMAIL` | Public email. Email links are hidden until this is set. |
| `VITE_INSTAGRAM_URL` | Instagram profile URL. |
| `VITE_FORM_ENDPOINT` | URL that accepts a JSON POST from the contact form (e.g. Formspree). Until set, the form validates and then offers to send the enquiry via WhatsApp/email — it never claims to have sent anything. |

## Content

- Services: `src/data/services.ts`
- Methods, workflow, principles, FAQ: `src/data/analysis.ts`
- Insights articles: `src/data/articles.ts` (add the slug to `src/config/routes.ts` too)
- Logo: the original file is `brand/researchwise-logo-original.jpeg` (not deployed). `public/images/researchwise-logo.png` is the same artwork with only the white margin trimmed; `researchwise-logo-web.png` is its display-size copy.

## Deploying

It is a single-page app: the host must serve `index.html` for all routes. `public/_redirects` (Netlify) and `vercel.json` (Vercel) are included.
