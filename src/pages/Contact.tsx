import { CheckCircle2, Instagram, Mail, MessageCircle, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Seo } from '../components/layout/Seo'
import { PageHero } from '../components/sections/PageHero'
import { Button } from '../components/ui/Button'
import { SelectField, TextArea, TextField } from '../components/ui/FormField'
import { CONTACT_EMAIL, FORM_ENDPOINT, INSTAGRAM_URL } from '../config/site'
import { services } from '../data/services'
import { mailtoUrl, whatsappUrl } from '../lib/contact'

type Fields = { name: string; email: string; phone: string; area: string; service: string; message: string }
type Errors = Partial<Record<keyof Fields, string>>
type Status = 'idle' | 'sending' | 'sent' | 'error' | 'handoff'

const serviceOptions = services.map((s) => s.title)
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(f: Fields): Errors {
  const e: Errors = {}
  if (f.name.trim().length < 2) e.name = 'Please enter your name.'
  if (!emailRe.test(f.email.trim())) e.email = 'Please enter a valid email address.'
  if (f.phone && !/^[+\d][\d\s()-]{6,}$/.test(f.phone.trim())) e.phone = 'Please enter a valid phone number, including country code.'
  if (!f.service) e.service = 'Please choose the service you need.'
  if (f.message.trim().length < 20) e.message = 'Please describe your requirement in a little more detail (at least 20 characters).'
  return e
}

function summary(f: Fields) {
  return [
    'Hello ResearchWise Analytics, I would like to discuss a research requirement.',
    '',
    `Name: ${f.name}`,
    `Email: ${f.email}`,
    f.phone ? `Phone/WhatsApp: ${f.phone}` : null,
    f.area ? `Research area: ${f.area}` : null,
    `Service: ${f.service}`,
    '',
    f.message,
  ]
    .filter((l) => l !== null)
    .join('\n')
}

export default function Contact() {
  const [params] = useSearchParams()
  const preset = params.get('service') ?? ''
  const [f, setF] = useState<Fields>({
    name: '',
    email: '',
    phone: '',
    area: '',
    service: serviceOptions.includes(preset) ? preset : '',
    message: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [honeypot, setHoneypot] = useState('')

  const set = (k: keyof Fields) => (v: string) => {
    setF((p) => ({ ...p, [k]: v }))
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }))
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const errs = validate(f)
    setErrors(errs)
    const first = Object.keys(errs)[0]
    if (first) {
      document.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    if (honeypot) return // bot

    if (!FORM_ENDPOINT) {
      setStatus('handoff')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(f),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const mail = mailtoUrl()

  return (
    <>
      <Seo
        title="Contact | Get Research Support | ResearchWise Analytics"
        description="Contact ResearchWise Analytics for research methodology, sample size calculation, data cleaning, SPSS and R data analysis, systematic and scoping reviews, manuscript and publication support."
      />
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
        eyebrow="Contact"
        title="Let’s Strengthen Your Research."
        subtitle="Have a research, data analysis or publication requirement? Tell us what you are working on and we will guide you through the appropriate next step."
      />

      <section className="py-14 sm:py-20">
        <div className="container-rw grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          {/* Direct contact */}
          <aside className="space-y-4">
            <div className="rounded-[var(--radius-card)] border border-navy bg-navy p-6 text-white">
              <h2 className="font-serif text-2xl font-medium">Chat with ResearchWise</h2>
              <p className="mt-2 text-white/75">The quickest way to discuss your dataset or research question.</p>
              <Button href={whatsappUrl()} variant="light" size="lg" className="mt-5 w-full">
                <MessageCircle aria-hidden className="size-5" /> Chat on WhatsApp
              </Button>
            </div>
            {mail && (
              <a href={mail} className="flex min-h-16 items-center gap-4 rounded-[var(--radius-card)] border border-line p-5 hover:border-navy/40">
                <Mail aria-hidden className="size-5 shrink-0 text-sage-700" />
                <span>
                  <span className="block text-sm text-muted">Email</span>
                  <span className="font-semibold break-all text-navy">{CONTACT_EMAIL}</span>
                </span>
              </a>
            )}
            {INSTAGRAM_URL && (
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-16 items-center gap-4 rounded-[var(--radius-card)] border border-line p-5 hover:border-navy/40"
              >
                <Instagram aria-hidden className="size-5 shrink-0 text-sage-700" />
                <span>
                  <span className="block text-sm text-muted">Instagram</span>
                  <span className="font-semibold text-navy">Follow ResearchWise Analytics</span>
                </span>
              </a>
            )}
            <div className="rounded-[var(--radius-card)] bg-cream p-5 text-[0.9375rem]">
              <h2 className="font-semibold text-navy">Helpful to include</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-muted marker:text-sage-700">
                <li>Your study design and objectives</li>
                <li>Sample size and type of data</li>
                <li>Software preference (SPSS or R)</li>
                <li>Your timeline</li>
              </ul>
              <p className="mt-3 text-sm text-muted">Please do not send identifiable participant data in your first message.</p>
            </div>
          </aside>

          {/* Form */}
          <div className="rounded-[var(--radius-card)] border border-line bg-white p-6 sm:p-8">
            {status === 'sent' ? (
              <div role="status" className="py-10 text-center">
                <CheckCircle2 aria-hidden className="mx-auto size-10 text-sage-700" />
                <h2 className="mt-4 font-serif text-2xl text-navy">Thank you — your enquiry has been received.</h2>
                <p className="mt-2 text-muted">We will reply to {f.email} with the next step.</p>
              </div>
            ) : (
              <form noValidate onSubmit={onSubmit} className="space-y-5">
                <h2 className="font-serif text-2xl font-medium text-navy">Send an enquiry</h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  <TextField label="Name" name="name" required value={f.name} onChange={set('name')} error={errors.name} autoComplete="name" />
                  <TextField label="Email" name="email" type="email" required value={f.email} onChange={set('email')} error={errors.email} autoComplete="email" />
                  <TextField
                    label="Phone / WhatsApp"
                    name="phone"
                    type="tel"
                    value={f.phone}
                    onChange={set('phone')}
                    error={errors.phone}
                    autoComplete="tel"
                    hint="Include country code, e.g. +91"
                  />
                  <TextField label="Research area" name="area" value={f.area} onChange={set('area')} placeholder="e.g. Public health, nursing" />
                </div>
                <SelectField label="Service required" name="service" required value={f.service} onChange={set('service')} options={serviceOptions} error={errors.service} />
                <TextArea
                  label="Message"
                  name="message"
                  required
                  rows={6}
                  value={f.message}
                  onChange={set('message')}
                  error={errors.message}
                  placeholder="Briefly describe your study, your data and what you need help with."
                />
                {/* Spam trap: hidden from people and assistive tech */}
                <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label>
                    Leave empty
                    <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                  </label>
                </div>

                {status === 'error' && (
                  <p role="alert" className="rounded-[4px] border border-[#9b2c2c]/30 bg-[#fbeeee] p-4 text-[0.9375rem] text-[#7a2222]">
                    Your enquiry could not be sent. Please try again, or contact us on WhatsApp.
                  </p>
                )}

                {status === 'handoff' ? (
                  <div role="status" className="rounded-[4px] border border-sage-300 bg-sage-100 p-5">
                    <p className="font-semibold text-navy">Online form submission is not yet connected.</p>
                    <p className="mt-1 text-[0.9375rem] text-charcoal">Your enquiry has not been sent. Send it with your details already filled in:</p>
                    <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                      <Button href={whatsappUrl(summary(f))}>
                        <MessageCircle aria-hidden className="size-4" /> Send via WhatsApp
                      </Button>
                      {mailtoUrl(`Research enquiry: ${f.service}`, summary(f)) && (
                        <Button href={mailtoUrl(`Research enquiry: ${f.service}`, summary(f))!} variant="secondary">
                          <Mail aria-hidden className="size-4" /> Send via email
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <Button type="submit" size="lg" disabled={status === 'sending'} className="w-full sm:w-auto">
                    <Send aria-hidden className="size-4" /> {status === 'sending' ? 'Sending…' : 'Send Enquiry'}
                  </Button>
                )}
                <p className="text-sm text-muted">Fields marked * are required. Your details are used only to respond to your enquiry.</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
