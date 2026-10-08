// ─────────────────────────────────────────────────────────────────────────────
// Site-wide contact configuration.
// Every component reads contact details from here — never hard-code them elsewhere.
// Set the values in .env.local (see .env.example) or edit the fallbacks below.
// ─────────────────────────────────────────────────────────────────────────────

const env = import.meta.env

/** Public site URL, no trailing slash. Empty = canonical/og:url tags are omitted. */
export const SITE_URL: string = (env.VITE_SITE_URL ?? '').replace(/\/$/, '')

/** WhatsApp number, international format, digits only (e.g. "919XXXXXXXXX"). */
export const WHATSAPP_NUMBER: string = (env.VITE_WHATSAPP_NUMBER || '916362620859').replace(/\D/g, '')

/** Public contact email. */
export const CONTACT_EMAIL: string = env.VITE_CONTACT_EMAIL || 'researchwiseanalytics@gmail.com'

/** Full Instagram profile URL. */
export const INSTAGRAM_URL: string = env.VITE_INSTAGRAM_URL || 'https://www.instagram.com/researchwise_analytics/'

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
