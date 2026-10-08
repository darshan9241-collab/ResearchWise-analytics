import type { ReactNode } from 'react'
import { Reveal } from '../ui/Reveal'

interface Props {
  title: string
  caption?: string
  legend?: ReactNode
  children: ReactNode
  className?: string
}

/** Framed figure with title and "illustrative" caption. */
export function ChartFigure({ title, caption, legend, children, className = '' }: Props) {
  return (
    <Reveal className={className}>
      <figure className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-white p-4 sm:p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="text-[0.9375rem] leading-snug font-semibold text-navy">{title}</h3>
          <span className="shrink-0 rounded-[3px] bg-cream px-1.5 py-0.5 text-[0.6875rem] font-semibold tracking-wide text-muted uppercase">
            Example
          </span>
        </div>
        {legend && <div className="mb-2">{legend}</div>}
        <div className="mt-auto">{children}</div>
        {caption && <figcaption className="mt-2 text-[0.8125rem] text-muted">{caption}</figcaption>}
      </figure>
    </Reveal>
  )
}
