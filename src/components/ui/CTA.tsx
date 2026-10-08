import { ArrowRight, MessageCircle } from 'lucide-react'
import type { ReactNode } from 'react'
import { whatsappUrl } from '../../lib/contact'
import { Button } from './Button'

interface Props {
  title: ReactNode
  text: ReactNode
  primary?: { label: string; to: string }
  /** Show the WhatsApp button (default true). */
  whatsapp?: boolean | string
  tone?: 'navy' | 'cream'
}

/** Full-width call-to-action band. */
export function CTA({
  title,
  text,
  primary = { label: 'Get Research Support', to: '/contact' },
  whatsapp = true,
  tone = 'navy',
}: Props) {
  const dark = tone === 'navy'
  return (
    <section className={`relative overflow-hidden ${dark ? 'bg-navy text-white' : 'bg-cream text-charcoal'}`}>
      <div className={`absolute inset-0 ${dark ? 'bg-grid-dark' : 'bg-grid'}`} aria-hidden />
      <CurveArt dark={dark} />
      <div className="container-rw relative py-16 sm:py-20">
        <div className="max-w-2xl">
          <h2 className={`font-serif text-[2rem] leading-tight font-medium sm:text-[2.5rem] ${dark ? 'text-white' : 'text-navy'}`}>{title}</h2>
          <p className={`mt-4 text-lg ${dark ? 'text-white/75' : 'text-muted'}`}>{text}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to={primary.to} variant={dark ? 'light' : 'primary'} size="lg">
              {primary.label} <ArrowRight aria-hidden className="size-4" />
            </Button>
            {whatsapp && (
              <Button href={whatsappUrl()} variant={dark ? 'outline-light' : 'whatsapp'} size="lg">
                <MessageCircle aria-hidden className="size-4" /> {typeof whatsapp === 'string' ? whatsapp : 'Chat on WhatsApp'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function CurveArt({ dark }: { dark: boolean }) {
  const c = dark ? 'rgb(185 199 177 / 0.35)' : 'rgb(93 116 89 / 0.3)'
  return (
    <svg aria-hidden viewBox="0 0 400 240" className="absolute right-0 bottom-0 hidden h-full w-[44%] md:block" preserveAspectRatio="xMaxYMax meet">
      <path d="M0 220 C 80 220, 110 40, 200 40 S 320 220, 400 220" fill="none" stroke={c} strokeWidth="1.5" />
      <path d="M200 40 V220" stroke={c} strokeDasharray="3 5" />
      {[30, 70, 110, 150, 190, 230, 270, 310, 350].map((x, i) => (
        <circle key={x} cx={x} cy={200 - [6, 30, 90, 150, 172, 140, 80, 34, 8][i]} r="3" fill={c} />
      ))}
    </svg>
  )
}
