import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Service } from '../../data/services'

interface Props {
  service: Service
  index: number
  /** "feature" = large card for SPSS and R; "primary" = standard; "compact" = secondary services. */
  variant?: 'feature' | 'primary' | 'compact'
}

export function ServiceCard({ service, index, variant = 'primary' }: Props) {
  const Icon = service.icon
  const n = String(index + 1).padStart(2, '0')
  const href = `/services/${service.slug}`

  if (variant === 'compact') {
    return (
      <article className="group relative flex h-full flex-col border-t border-line bg-transparent pt-5">
        <div className="flex items-start gap-3">
          <Icon aria-hidden className="mt-1 size-5 shrink-0 text-sage-700" strokeWidth={1.6} />
          <div>
            <p className="font-mono text-xs text-muted">{n}</p>
            <h3 className="text-lg font-semibold text-navy">
              <Link to={href} className="after:absolute after:inset-0 hover:underline">
                {service.title}
              </Link>
            </h3>
            <p className="mt-1 text-[0.9375rem] text-muted">{service.summary}</p>
          </div>
        </div>
      </article>
    )
  }

  const feature = variant === 'feature'
  return (
    <article
      className={`group relative flex h-full flex-col rounded-[var(--radius-card)] border transition-colors duration-200 ${
        feature ? 'border-navy bg-navy p-7 text-white sm:p-8' : 'border-line bg-white p-6 hover:border-navy/40'
      }`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`grid size-11 place-items-center rounded-[4px] ${feature ? 'bg-white/10 text-sage-300' : 'bg-sage-100 text-sage-700'}`}
        >
          <Icon aria-hidden className="size-5" strokeWidth={1.6} />
        </span>
        <span className={`font-mono text-sm ${feature ? 'text-white/50' : 'text-muted'}`}>{n}</span>
      </div>
      <h3 className={`mt-5 font-serif font-medium ${feature ? 'text-[1.75rem] text-white' : 'text-[1.375rem] text-navy'}`}>
        {service.title}
      </h3>
      <p className={`mt-2 ${feature ? 'text-white/75' : 'text-[0.9375rem] text-muted'}`}>{service.summary}</p>
      <ul className={`mt-5 space-y-2 text-[0.9375rem] ${feature ? 'text-white/90' : 'text-charcoal'}`}>
        {service.highlights.map((h) => (
          <li key={h} className="flex gap-2.5">
            <Check aria-hidden className={`mt-1 size-4 shrink-0 ${feature ? 'text-sage-300' : 'text-sage-700'}`} />
            {h}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-6">
        <Link
          to={href}
          className={`inline-flex min-h-11 items-center gap-2 font-semibold after:absolute after:inset-0 ${feature ? 'text-sage-300' : 'text-navy'}`}
        >
          Learn more<span className="sr-only"> about {service.title}</span>
          <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}
