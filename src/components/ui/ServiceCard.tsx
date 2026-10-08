import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Service } from '../../data/services'

/** One card style for every service — all services are presented with equal weight. */
export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon
  const n = String(index + 1).padStart(2, '0')
  return (
    <article className="group relative flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-navy hover:shadow-[0_24px_48px_-28px_rgb(22_37_61/0.45)] sm:p-7">
      <div className="flex items-center justify-between">
        <span className="grid size-12 place-items-center rounded-[6px] bg-sage-100 text-sage-700 transition-colors duration-300 group-hover:bg-navy group-hover:text-sage-300">
          <Icon aria-hidden className="size-5" strokeWidth={1.6} />
        </span>
        <span className="font-mono text-sm text-muted">{n}</span>
      </div>
      <h3 className="mt-5 font-serif text-[1.5rem] leading-tight font-medium text-navy">{service.title}</h3>
      <p className="mt-2 text-[0.9375rem] text-muted">{service.summary}</p>
      <ul className="mt-5 grid gap-x-5 gap-y-2 text-[0.9375rem] text-charcoal sm:grid-cols-2">
        {service.highlights.map((h) => (
          <li key={h} className="flex gap-2.5">
            <Check aria-hidden className="mt-1 size-4 shrink-0 text-sage-700" />
            {h}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-6">
        <Link to={`/services/${service.slug}`} className="inline-flex min-h-11 items-center gap-2 font-semibold text-navy after:absolute after:inset-0">
          Learn more<span className="sr-only"> about {service.title}</span>
          <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}
