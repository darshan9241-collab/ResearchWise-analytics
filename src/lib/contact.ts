import { CONTACT_EMAIL, WHATSAPP_DEFAULT_MESSAGE, WHATSAPP_NUMBER } from '../config/site'

/**
 * wa.me link with a pre-filled message. If no number is configured, wa.me still opens
 * WhatsApp with the message and lets the visitor pick a chat — the link never breaks.
 */
export function whatsappUrl(message: string = WHATSAPP_DEFAULT_MESSAGE): string {
  const text = encodeURIComponent(message)
  return WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}?text=${text}` : `https://wa.me/?text=${text}`
}

/** WhatsApp message tailored to a service. */
export function whatsappForService(serviceTitle: string): string {
  return whatsappUrl(`Hello ResearchWise Analytics, I would like to discuss ${serviceTitle} for my research.`)
}

export function mailtoUrl(subject?: string, body?: string): string | null {
  if (!CONTACT_EMAIL) return null
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  const q = params.toString().replace(/\+/g, '%20')
  return `mailto:${CONTACT_EMAIL}${q ? `?${q}` : ''}`
}
