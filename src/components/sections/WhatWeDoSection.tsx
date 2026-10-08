import { ArrowRight, Check, MessageCircle, Plus } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getService } from '../../data/services'
import { stages, type GlyphKind, type Stage } from '../../data/whatWeDo'
import { whatsappUrl } from '../../lib/contact'
import { Button } from '../ui/Button'
import { Modal } from '../ui/Modal'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

/** "What ResearchWise Analytics does" — six stage tiles, each opening a detail popup. */
export function WhatWeDoSection() {
  const [active, setActive] = useState<Stage | null>(null)

  return (
    <section className="relative overflow-hidden py-20 sm:py-24" id="what-we-do">
      <div aria-hidden className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="container-rw relative">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="What we do"
            title="What ResearchWise Analytics Does"
            lead="We support every stage of the research process — from planning a study to publishing its findings."
          />
          <p className="flex items-center gap-2 text-sm font-medium text-sage-700">
            <span aria-hidden className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-sage opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2.5 rounded-full bg-sage-700" />
            </span>
            Select a stage to see how we help
          </p>
        </div>

        <ol className="relative mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Journey line behind the tiles (desktop) */}
          <JourneyLine />
          {stages.map((s, i) => (
            <li key={s.n} className="relative">
              <Reveal delay={i * 70} className="h-full">
                <button
                  type="button"
                  onClick={() => setActive(s)}
                  aria-haspopup="dialog"
                  className="group flex h-full w-full flex-col rounded-[var(--radius-card)] border border-line bg-white p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-navy hover:shadow-[0_24px_48px_-28px_rgb(22_37_61/0.5)] focus-visible:border-navy"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-serif text-[2.75rem] leading-none text-sage transition-colors group-hover:text-navy">{s.n}</span>
                    <Glyph kind={s.glyph} />
                  </div>
                  <p className="mt-5 text-[0.75rem] font-semibold tracking-[0.12em] text-olive uppercase">{s.tagline}</p>
                  <h3 className="mt-1 font-serif text-[1.5rem] leading-tight font-medium text-navy">{s.title}</h3>
                  <p className="mt-2 text-[0.9375rem] text-muted">{s.summary}</p>
                  <span className="mt-auto flex items-center justify-between pt-6 text-[0.9375rem] font-semibold text-navy">
                    See how we help
                    <span className="grid size-9 place-items-center rounded-full border border-line transition-all duration-300 group-hover:rotate-90 group-hover:border-navy group-hover:bg-navy group-hover:text-white">
                      <Plus aria-hidden className="size-4" />
                    </span>
                  </span>
                </button>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      <Modal open={active !== null} onClose={() => setActive(null)} labelledBy="stage-title">
        {active && <StageDetail stage={active} />}
      </Modal>
    </section>
  )
}

function StageDetail({ stage }: { stage: Stage }) {
  return (
    <div>
      <div className="relative overflow-hidden bg-navy px-6 pt-7 pb-6 text-white sm:px-8">
        <div aria-hidden className="bg-grid-dark absolute inset-0" />
        <div className="relative flex items-end justify-between gap-4 pr-10">
          <div>
            <p className="font-mono text-sm text-sage-300">
              Stage {stage.n} of {String(stages.length).padStart(2, '0')} · {stage.tagline}
            </p>
            <h2 id="stage-title" className="mt-2 font-serif text-[1.875rem] leading-tight font-medium">
              {stage.title}
            </h2>
          </div>
          <Glyph kind={stage.glyph} inverted />
        </div>
      </div>
      <div className="px-6 py-6 sm:px-8">
        <p className="text-[1.0625rem]">{stage.summary}</p>
        <div className="mt-6 grid gap-6 sm:grid-cols-[1.3fr_1fr]">
          <div>
            <h3 className="text-sm font-semibold tracking-[0.1em] text-navy uppercase">What we do</h3>
            <ul className="mt-3 space-y-2">
              {stage.whatWeDo.map((w) => (
                <li key={w} className="flex gap-2.5 text-[0.9375rem]">
                  <Check aria-hidden className="mt-1 size-4 shrink-0 text-sage-700" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-[0.1em] text-navy uppercase">You receive</h3>
            <ul className="mt-3 space-y-2">
              {stage.youReceive.map((r) => (
                <li key={r} className="rounded-[4px] bg-cream px-3 py-2 text-[0.9375rem] text-navy">
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <h3 className="mt-7 text-sm font-semibold tracking-[0.1em] text-navy uppercase">Related services</h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {stage.services.map((slug) => {
            const s = getService(slug)!
            return (
              <li key={slug}>
                <Link
                  to={`/services/${slug}`}
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-[4px] border border-line px-3 text-[0.9375rem] font-semibold text-navy hover:border-navy hover:bg-cream/60"
                >
                  {s.title} <ArrowRight aria-hidden className="size-3.5" />
                </Link>
              </li>
            )
          })}
        </ul>
        <div className="mt-7 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row">
          <Button to="/contact">
            Discuss My Research <ArrowRight aria-hidden className="size-4" />
          </Button>
          <Button href={whatsappUrl(`Hello ResearchWise Analytics, I would like help with: ${stage.title}.`)} variant="whatsapp">
            <MessageCircle aria-hidden className="size-4" /> Chat on WhatsApp
          </Button>
        </div>
      </div>
    </div>
  )
}

/** Decorative dashed path linking the six tiles on desktop. */
function JourneyLine() {
  return (
    <svg aria-hidden className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block" preserveAspectRatio="none" viewBox="0 0 300 200">
      <path
        d="M50 50 H250 C 290 50, 290 150, 250 150 H50"
        fill="none"
        stroke="var(--color-sage)"
        strokeWidth="1.2"
        strokeDasharray="3 4"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

/** Small line illustrations, one per stage. */
function Glyph({ kind, inverted = false }: { kind: GlyphKind; inverted?: boolean }) {
  const ink = inverted ? '#b9c7b1' : 'var(--color-navy)'
  const accent = inverted ? '#ffffff' : 'var(--color-sage-700)'
  const soft = inverted ? 'rgb(255 255 255 / 0.15)' : 'var(--color-sage-100)'
  const common = { width: 72, height: 48, viewBox: '0 0 72 48', fill: 'none', 'aria-hidden': true as const, className: 'shrink-0 transition-transform duration-300 group-hover:scale-105' }
  switch (kind) {
    case 'plan':
      return (
        <svg {...common}>
          <rect x="16" y="4" width="40" height="42" rx="3" fill={soft} stroke={ink} strokeWidth="1.5" />
          <rect x="28" y="1" width="16" height="7" rx="2" fill="white" stroke={ink} strokeWidth="1.5" />
          {[17, 26, 35].map((y, i) => (
            <g key={y}>
              <path d={`M22 ${y} l2.5 2.5 l4.5 -5`} stroke={accent} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="33" x2={i === 2 ? 44 : 50} y1={y} y2={y} stroke={ink} strokeWidth="1.5" strokeLinecap="round" />
            </g>
          ))}
        </svg>
      )
    case 'data':
      return (
        <svg {...common}>
          <rect x="8" y="6" width="56" height="36" rx="2" fill={soft} stroke={ink} strokeWidth="1.5" />
          {[18, 30].map((y) => (
            <line key={y} x1="8" x2="64" y1={y} y2={y} stroke={ink} strokeWidth="1" />
          ))}
          {[22, 36, 50].map((x) => (
            <line key={x} x1={x} x2={x} y1="6" y2="42" stroke={ink} strokeWidth="1" />
          ))}
          <rect x="36" y="18" width="14" height="12" fill={accent} opacity="0.85" />
        </svg>
      )
    case 'analyse':
      return (
        <svg {...common}>
          <line x1="6" x2="66" y1="42" y2="42" stroke={ink} strokeWidth="1.5" />
          {[
            [12, 36],
            [20, 28],
            [28, 16],
            [36, 10],
            [44, 16],
            [52, 28],
            [60, 36],
          ].map(([x, y]) => (
            <rect key={x} x={x - 3} y={y} width="6" height={42 - y} rx="1" fill={soft} stroke={ink} strokeWidth="1" />
          ))}
          <path d="M6 40 C 22 38, 26 6, 36 6 S 50 38, 66 40" stroke={accent} strokeWidth="2" />
        </svg>
      )
    case 'interpret':
      return (
        <svg {...common}>
          <line x1="8" x2="8" y1="4" y2="44" stroke={ink} strokeWidth="1.5" />
          <line x1="40" x2="40" y1="6" y2="42" stroke={ink} strokeWidth="1" strokeDasharray="2 3" />
          {[
            [12, 30, 52],
            [24, 36, 60],
            [36, 18, 38],
          ].map(([y, a, b]) => (
            <g key={y}>
              <line x1={a} x2={b} y1={y} y2={y} stroke={ink} strokeWidth="1.5" />
              <rect x={(a + b) / 2 - 3} y={y - 3} width="6" height="6" fill={accent} />
            </g>
          ))}
        </svg>
      )
    case 'review':
      return (
        <svg {...common}>
          <rect x="14" y="3" width="44" height="9" rx="1.5" fill={soft} stroke={ink} strokeWidth="1.3" />
          <rect x="20" y="19" width="32" height="9" rx="1.5" fill={soft} stroke={ink} strokeWidth="1.3" />
          <rect x="26" y="35" width="20" height="9" rx="1.5" fill={accent} stroke={accent} strokeWidth="1.3" />
          <path d="M36 12 v7 M36 28 v7" stroke={ink} strokeWidth="1.3" />
        </svg>
      )
    case 'publish':
      return (
        <svg {...common}>
          <rect x="10" y="4" width="32" height="40" rx="2" fill={soft} stroke={ink} strokeWidth="1.5" />
          {[12, 18, 24, 30].map((y, i) => (
            <line key={y} x1="16" x2={i === 3 ? 28 : 36} y1={y} y2={y} stroke={ink} strokeWidth="1.3" strokeLinecap="round" />
          ))}
          <path d="M48 30 L66 22 L58 40 L55 32 Z" fill={accent} stroke={accent} strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      )
  }
}
