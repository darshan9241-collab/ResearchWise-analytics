import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  eyebrow?: string
  title: string
  subtitle?: ReactNode
  crumbs?: { label: string; to?: string }[]
  actions?: ReactNode
  aside?: ReactNode
}

/** Header band for inner pages. */
export function PageHero({ eyebrow, title, subtitle, crumbs, actions, aside }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-cream">
      <div aria-hidden className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className={`container-rw relative grid gap-12 py-12 sm:py-16 lg:py-20 ${aside ? 'items-center lg:grid-cols-[1fr_1fr]' : ''}`}>
        <div className="animate-fade-up">
          {crumbs && (
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-1 text-sm text-muted">
                {crumbs.map((c, i) => (
                  <li key={c.label} className="flex items-center gap-1">
                    {i > 0 && <ChevronRight aria-hidden className="size-3.5" />}
                    {c.to ? (
                      <Link to={c.to} className="hover:text-navy hover:underline">
                        {c.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-navy">
                        {c.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h1 className="max-w-3xl font-serif text-[2.25rem] leading-[1.1] font-medium tracking-[-0.015em] text-navy sm:text-[3rem]">{title}</h1>
          {subtitle && <p className="mt-5 max-w-2xl text-lg text-charcoal/85">{subtitle}</p>}
          {actions && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{actions}</div>}
        </div>
        {aside && <div className="animate-fade-up min-w-0 [animation-delay:150ms]">{aside}</div>}
      </div>
    </section>
  )
}
