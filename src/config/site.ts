// ─────────────────────────────────────────────────────────────────────────────
// Site-wide contact configuration.
// Every component reads contact details from here — never hard-code them elsewhere.
// Set the values in .env.local (see .env.example) or edit the fallbacks below.
// ─────────────────────────────────────────────────────────────────────────────

/** Defaults used when no environment variable overrides them. */
export const CONTACT_DEFAULTS = {
  whatsapp: '916362620859',
  email: 'researchwiseanalytics@gmail.com',
  instagram: 'https://www.instagram.com/researchwise_analytics/',
}

// import.meta.env exists in the browser bundle; it is undefined when vite.config.ts loads this file.
const env = (import.meta.env ?? {}) as Record<string, string | undefined>

/** Public site URL, no trailing slash. Empty = canonical/og:url tags are omitted. */
export const SITE_URL: string = (env.VITE_SITE_URL ?? '').replace(/\/$/, '')

/** WhatsApp number, international format, digits only (e.g. "919XXXXXXXXX"). */
export const WHATSAPP_NUMBER: string = (env.VITE_WHATSAPP_NUMBER || CONTACT_DEFAULTS.whatsapp).replace(/\D/g, '')

/** Public contact email. */
export const CONTACT_EMAIL: string = env.VITE_CONTACT_EMAIL || CONTACT_DEFAULTS.email

/** Full Instagram profile URL. */
export const INSTAGRAM_URL: string = env.VITE_INSTAGRAM_URL || CONTACT_DEFAULTS.instagram

/** JSON POST endpoint for the contact form. Empty = form falls back to WhatsApp / email hand-off. */
export const FORM_ENDPOINT: string = env.VITE_FORM_ENDPOINT ?? ''

export const WHATSAPP_DEFAULT_MESSAGE = 'Hello ResearchWise Analytics, I would like to discuss a research requirement.'

export const BRAND = {
  name: 'ResearchWise Analytics',
  tagline: 'Research • Data • Evidence',
  statement: 'From Research Data to Meaningful Evidence.',
  /** Official logo (white margin trimmed only). Full-resolution master: /images/researchwise-logo.png */
  logo: '/images/researchwise-logo-web.png',
  logoFull: '/images/researchwise-logo.png',
  description:
    'Professional research, data analysis and biostatistics support for researchers across health and life sciences.',
} as const
