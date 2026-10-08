import { ArrowRight, Info, MessageCircle } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Seo } from '../components/layout/Seo'
import { BarChartViz, BoxPlotViz, C, ForestViz, HistogramViz, KaplanMeierViz, Legend, ScatterViz } from '../components/charts/Charts'
import { ChartFigure } from '../components/charts/ChartFigure'
import { CheckList, MethodsSection } from '../components/sections/AnalysisSections'
import { PageHero } from '../components/sections/PageHero'
import { Button } from '../components/ui/Button'
import { CTA } from '../components/ui/CTA'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Pipeline } from '../components/visuals/Workflow'
import { DatasetGrid, RStudioWindow, SpssWindow } from '../components/visuals/Windows'
import { getService, groupLabels, services, type Service } from '../data/services'
import { whatsappForService } from '../lib/contact'
import NotFound from './NotFound'

export default function ServicePage() {
  const { slug = '' } = useParams()
  const service = getService(slug)
  if (!service) return <NotFound />

  const extras = EXTRAS[service.slug]

  return (
    <>
      <Seo title={service.seoTitle} description={service.seoDescription} />
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Services', to: '/services' }, { label: service.title }]}
        eyebrow={groupLabels[service.group]}
        title={service.headline}
        subtitle={service.subtitle}
        actions={
          <>
            <Button to={`/contact?service=${encodeURIComponent(service.title)}`} size="lg">
              {service.ctaLabel} <ArrowRight aria-hidden className="size-4" />
            </Button>
            <Button href={whatsappForService(service.title)} variant="whatsapp" size="lg">
              <MessageCircle aria-hidden className="size-4" /> Chat on WhatsApp
            </Button>
          </>
        }
        aside={extras?.hero}
      />

      {/* Overview */}
      <section className="py-16 sm:py-20">
        <div className="container-rw grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="font-serif text-[1.75rem] font-medium text-navy sm:text-[2rem]">Overview</h2>
            <div className="mt-4 space-y-4 text-[1.0625rem]">
              {service.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {service.note && (
              <p className="mt-6 flex gap-3 rounded-[4px] border border-olive/30 bg-olive-100 p-4 text-[0.9375rem] text-charcoal">
                <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-olive" />
                {service.note}
              </p>
            )}
          </div>
          <aside className="rounded-[var(--radius-card)] border border-line bg-cream/60 p-6">
            <h2 className="text-sm font-semibold tracking-[0.12em] text-navy uppercase">What’s included</h2>
            <div className="mt-4">
              <CheckList items={service.capabilities} columns={1} />
            </div>
          </aside>
        </div>
      </section>

      {extras?.afterOverview}

      {/* Approach grid */}
      <section className="border-t border-line bg-white py-16 sm:py-20">
        <div className="container-rw">
          <SectionHeading eyebrow="Methodology" title="How We Approach It" />
          <div className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {service.approach.map((a, i) => (
              <Reveal key={a.title} delay={(i % 4) * 60} className="bg-white p-6">
                <p className="font-mono text-xs text-olive">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-2 text-lg font-semibold text-navy">{a.title}</h3>
                <p className="mt-1.5 text-[0.9375rem] text-muted">{a.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {extras?.afterApproach}

      {/* Deliverables */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="container-rw grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <SectionHeading eyebrow="Outputs" title="What You Receive" lead="Deliverables are agreed at the start of each project, based on your requirements." />
          <ul className="grid gap-3 sm:grid-cols-2">
            {service.deliverables.map((d) => (
              <li key={d} className="rounded-[4px] border border-line bg-white px-5 py-4 font-medium text-navy">
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <RelatedServices current={service} />

      <CTA
        title="Discuss Your Research"
        text="Tell us what you are working on and we will guide you through the appropriate next step."
        primary={{ label: service.ctaLabel, to: `/contact?service=${encodeURIComponent(service.title)}` }}
      />
    </>
  )
}

function RelatedServices({ current }: { current: Service }) {
  const others = services.filter((s) => s.slug !== current.slug)
  const related = [...others.filter((s) => s.group === current.group), ...others.filter((s) => s.group !== current.group)].slice(0, 4)
  return (
    <section className="py-16 sm:py-20">
      <div className="container-rw">
        <h2 className="font-serif text-[1.75rem] font-medium text-navy">Related services</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((s) => {
            const Icon = s.icon
            return (
              <li key={s.slug}>
                <Link
                  to={`/services/${s.slug}`}
                  className="flex min-h-14 items-center gap-3 rounded-[4px] border border-line px-4 py-3 font-semibold text-navy hover:border-navy/40 hover:bg-cream/50"
                >
                  <Icon aria-hidden className="size-5 shrink-0 text-sage-700" strokeWidth={1.6} />
                  {s.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

// ─── Page-specific extras for the four core analysis pages ───────────────────

const EXTRAS: Partial<Record<Service['slug'], { hero?: ReactNode; afterOverview?: ReactNode; afterApproach?: ReactNode }>> = {
  'spss-data-analysis': {
    hero: <SpssWindow className="shadow-[0_30px_60px_-30px_rgb(22_37_61/0.45)]" />,
    afterApproach: (
      <>
        <MethodsSection />
        <section className="bg-white pb-16 sm:pb-20">
          <div className="container-rw grid gap-5 md:grid-cols-3">
            <ChartFigure title="Bar chart · prevalence by age group">
              <BarChartViz />
            </ChartFigure>
            <ChartFigure title="Histogram · distribution check">
              <HistogramViz />
            </ChartFigure>
            <ChartFigure title="Box plot · group comparison" legend={<Legend items={[{ label: 'Control', color: C.a }, { label: 'Intervention', color: C.b }]} />}>
              <BoxPlotViz />
            </ChartFigure>
          </div>
        </section>
      </>
    ),
  },
  'r-data-analysis': {
    hero: <RStudioWindow className="shadow-[0_30px_60px_-30px_rgb(22_37_61/0.45)]" />,
    afterApproach: (
      <section className="bg-white pb-16 sm:pb-20">
        <div className="container-rw">
          <h2 className="font-serif text-[1.75rem] font-medium text-navy">Figures built in R</h2>
          <p className="mt-2 text-muted">Illustrative ggplot2-style figures, exported to journal specifications.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <ChartFigure title="Regression with 95% CI">
              <ScatterViz />
            </ChartFigure>
            <ChartFigure title="Forest plot · adjusted ORs">
              <ForestViz />
            </ChartFigure>
            <ChartFigure title="Kaplan-Meier curves" legend={<Legend items={[{ label: 'Treatment', color: C.a }, { label: 'Standard care', color: C.b }]} />}>
              <KaplanMeierViz />
            </ChartFigure>
          </div>
        </div>
      </section>
    ),
  },
  'data-cleaning': {
    afterOverview: (
      <section className="bg-cream py-16 sm:py-20">
        <div className="container-rw">
          <SectionHeading eyebrow="The process" title="From Raw Dataset to Analysis-Ready Data" />
          <div className="mt-10">
            <Pipeline steps={['Raw Dataset', 'Cleaning', 'Coding', 'Validation', 'Analysis-Ready Dataset']} />
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-semibold text-navy">Before — raw entries</p>
              <DatasetGrid messy />
              <p className="mt-2 text-sm text-muted">Mixed text codes, a duplicated record, an implausible age, a missing value and a 99 code entered as data.</p>
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold text-navy">After — coded and validated</p>
              <DatasetGrid />
              <p className="mt-2 text-sm text-muted">Consistent numeric codes with value labels, duplicates resolved, and each change recorded in the log.</p>
            </div>
          </div>
          <p className="mt-4 text-[0.75rem] text-muted">Illustrative example data.</p>
        </div>
      </section>
    ),
  },
  'sample-size': {
    afterOverview: (
      <section className="bg-cream py-16 sm:py-20">
        <div className="container-rw grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Why it depends" title="One Number Does Not Fit Every Study" />
            <p className="mt-5 text-muted">
              A prevalence study estimates a proportion with a stated precision. A comparative study needs enough power to detect a meaningful
              difference. A case-control study depends on the expected exposure in controls and the odds ratio you want to detect. Each needs its own
              calculation.
            </p>
            <p className="mt-4 text-muted">
              We do not provide a generic online calculator, because the inputs — and the justification for them — matter more than the arithmetic.
            </p>
          </div>
          <div className="space-y-4">
            {[
              ['Estimating a prevalence', 'n = Z² · p(1 − p) / d²', 'Z for the confidence level, expected prevalence p, absolute precision d.'],
              ['Comparing two means', 'n per group = 2σ²(Z₁₋α/₂ + Z₁₋β)² / Δ²', 'Standard deviation σ, minimum important difference Δ, chosen α and power.'],
              ['Adjustments', 'n_final = n × DEFF / (1 − non-response)', 'Design effect for cluster sampling; inflation for expected non-response.'],
            ].map(([t, f, d]) => (
              <div key={t} className="rounded-[4px] border border-line bg-white p-5">
                <p className="text-sm font-semibold text-navy">{t}</p>
                <p className="mt-2 overflow-x-auto font-serif text-lg whitespace-nowrap text-navy">{f}</p>
                <p className="mt-1.5 text-sm text-muted">{d}</p>
              </div>
            ))}
            <p className="text-[0.8125rem] text-muted">Standard textbook formulae shown for illustration. The appropriate formula is selected for your design.</p>
          </div>
        </div>
      </section>
    ),
  },
}
