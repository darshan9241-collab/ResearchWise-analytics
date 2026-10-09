import { ArrowRight, Pause, Play } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { services } from '../../data/services'

const DURATION = 2000 // ms each service stays in focus
const ROW = 44 // px height of one wheel row
const TOTAL = services.length
const mod = (n: number) => ((n % TOTAL) + TOTAL) % TOTAL

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Hero "service wheel": the 10 services roll upward one at a time, each in focus
 * for 2 seconds, with a circular countdown ring around the active service's icon.
 * Pauses on hover/focus, has a pause/play control, starts paused for reduced motion.
 */
export function ServiceRotator() {
  // `step` counts up forever; the active service is step mod 10, so the wheel loops seamlessly.
  const [step, setStep] = useState(0)
  const [paused, setPaused] = useState(prefersReducedMotion)
  const [hovering, setHovering] = useState(false)
  const running = !paused && !hovering
  const active = services[mod(step)]
  const Icon = active.icon

  useEffect(() => {
    if (!running) return
    const t = window.setTimeout(() => setStep((s) => s + 1), DURATION)
    return () => window.clearTimeout(t)
  }, [step, running])

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Our 10 services"
      className="mt-9 w-full max-w-xl"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setHovering(false)}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold tracking-[0.12em] whitespace-nowrap text-muted uppercase">Our 10 services</p>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[0.75rem] whitespace-nowrap text-muted tabular-nums" aria-hidden>
            <span className="text-navy">{String(mod(step) + 1).padStart(2, '0')}</span> / {TOTAL}
          </span>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="grid size-8 place-items-center rounded-full border border-navy/15 bg-white/70 text-navy hover:border-navy hover:bg-white"
          >
            {paused ? <Play aria-hidden className="size-3.5" /> : <Pause aria-hidden className="size-3.5" />}
            <span className="sr-only">{paused ? 'Play service rotation' : 'Pause service rotation'}</span>
          </button>
          <Link to="/services" className="inline-flex min-h-8 items-center gap-1 text-[0.8125rem] font-semibold whitespace-nowrap text-navy hover:underline max-[359px]:hidden">
            View all <ArrowRight aria-hidden className="size-3.5" />
          </Link>
        </div>
      </div>

      <div className="relative mt-3 overflow-hidden rounded-[14px] border border-navy/12 bg-white/90 p-4 shadow max-[359px]:px-3-[0_22px_50px_-30px_rgb(22_37_61/0.55)] sm:p-5">
        {/* subtle data-grid texture */}
        <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_left,black,transparent_60%)]" />

        <div className="relative flex items-center gap-4 max-[359px]:gap-3 sm:gap-6">
          <CountdownRing key={step} running={running}>
            <span key={`icon-${step}`} className="rw-pop grid place-items-center">
              <Icon aria-hidden className="size-5 text-navy sm:size-6" strokeWidth={1.6} />
            </span>
          </CountdownRing>

          {/* Rolling wheel of service names */}
          <div
            className="relative h-[132px] min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_28%,black_72%,transparent)]"
            aria-live={running ? 'off' : 'polite'}
          >
            {[-2, -1, 0, 1, 2].map((offset) => {
              const k = step + offset
              const s = services[mod(k)]
              const isActive = offset === 0
              return (
                <button
                  key={k}
                  type="button"
                  tabIndex={Math.abs(offset) === 1 ? 0 : -1}
                  aria-hidden={Math.abs(offset) > 1 || undefined}
                  onClick={() => setStep(k)}
                  aria-label={isActive ? `${s.title} (current)` : `Show ${s.title}`}
                  className="absolute right-0 left-0 flex items-center text-left transition-[top] duration-[650ms] ease-[cubic-bezier(0.22,0.8,0.25,1)]"
                  style={{ top: (offset + 1) * ROW, height: ROW }}
                >
                  <span
                    className={`block origin-left truncate font-serif leading-tight transition-all duration-[650ms] ease-[cubic-bezier(0.22,0.8,0.25,1)] ${
                      isActive
                        ? 'scale-100 text-[1rem] min-[360px]:text-[1.1875rem] font-medium text-navy sm:text-[1.5rem]'
                        : 'scale-[0.8] text-[1rem] min-[360px]:text-[1.1875rem] text-navy/30 hover:text-navy/55 sm:text-[1.5rem]'
                    }`}
                  >
                    <span className="sm:hidden">{s.shortTitle}</span>
                    <span className="hidden sm:inline">{s.title}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Description of the active service */}
        <div className="relative mt-3 flex flex-col gap-2 border-t border-navy/10 pt-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <p key={`d-${step}`} className="rw-fade line-clamp-2 min-h-[2.6em] text-[0.875rem] leading-snug text-muted sm:max-w-[70%]">
            {active.summary}
          </p>
          <Link
            to={`/services/${active.slug}`}
            className="inline-flex shrink-0 items-center gap-1.5 text-[0.875rem] font-semibold text-navy hover:underline"
          >
            Explore <span className="sr-only">{active.title}</span>
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {paused ? `Paused on ${active.title}.` : ''}
      </p>
    </section>
  )
}

/** Circular 2-second countdown around the active service's icon. */
function CountdownRing({ running, children }: { running: boolean; children: ReactNode }) {
  const r = 30
  const c = 2 * Math.PI * r
  return (
    <div className="relative grid size-[58px] shrink-0 place-items-center max-[359px]:size-[46px] sm:size-[76px]">
      <svg viewBox="0 0 72 72" className="absolute inset-0 size-full -rotate-90" aria-hidden>
        <circle cx="36" cy="36" r={r} fill="var(--color-sage-100)" stroke="rgb(22 37 61 / 0.08)" strokeWidth="3" />
        <circle
          cx="36"
          cy="36"
          r={r}
          fill="none"
          stroke="var(--color-navy)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={c}
          className="rw-ring"
          style={{ ['--rw-c' as string]: `${c}`, animationDuration: `${DURATION}ms`, animationPlayState: running ? 'running' : 'paused' }}
        />
      </svg>
      {children}
    </div>
  )
}
