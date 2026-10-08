import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cleaningList, methodologyList, principles, sampleSizeList } from '../../data/analysis'
import { articles } from '../../data/articles'
import { getService, primaryServices, secondaryServices } from '../../data/services'
import { ArticleCard } from '../ui/ArticleCard'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { ServiceCard } from '../ui/ServiceCard'
import { DatasetGrid } from '../visuals/Windows'
import { CheckList } from './AnalysisSections'

// ─── Data cleaning ──────────────────────────────────────────────────────────
export function CleaningSection() {
  return (
    <section className="py-20 sm:py-24" id="data-cleaning">
      <div className="container-rw grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Data preparation" title="Before Analysis Comes Clean Data" lead="Reliable statistical results begin with a well-prepared dataset." />
          <div className="mt-8">
            <CheckList items={cleaningList} />
          </div>
          <div className="mt-8">
            <Button to="/services/data-cleaning">
              Prepare My Dataset <ArrowRight aria-hidden className="size-4" />
            </Button>
          </div>
        </div>
        <Reveal>
          <div className="space-y-3">
            <div>
              <p className="mb-1.5 flex items-center justify-between text-sm font-semibold text-navy">
                Raw data <span className="font-normal text-muted">inconsistent codes, duplicates, impossible values</span>
              </p>
              <DatasetGrid messy />
            </div>
            <p aria-hidden className="text-center font-mono text-sm text-sage-700">
              ↓ clean · code · validate
            </p>
            <div>
              <p className="mb-1.5 flex items-center justify-between text-sm font-semibold text-navy">
                Analysis-ready <span className="font-normal text-muted">coded, labelled, documented</span>
              </p>
              <DatasetGrid />
            </div>
            <p className="text-[0.75rem] text-muted">Illustrative example.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── Sample size ────────────────────────────────────────────────────────────
export function SampleSizeSection() {
  return (
    <section className="border-t border-line bg-white py-20 sm:py-24" id="sample-size">
      <div className="container-rw grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        <Reveal className="order-2 lg:order-1">
          <div className="rounded-[var(--radius-card)] border border-line bg-cream/60 p-6 sm:p-8">
            <p className="eyebrow">Example · prevalence study</p>
            <p className="mt-4 overflow-x-auto font-serif text-[1.5rem] text-navy sm:text-[1.75rem]">
              n = Z<sup>2</sup> · p(1 − p) / d<sup>2</sup>
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-[0.9375rem]">
              {[
                ['Confidence level', '95% (Z = 1.96)'],
                ['Expected prevalence', 'p — from literature'],
                ['Absolute precision', 'd — justified'],
                ['Design effect', 'if cluster sampling'],
                ['Non-response', 'inflate final n'],
                ['Power', 'for comparative designs'],
              ].map(([k, v]) => (
                <div key={k} className="border-t border-line pt-2">
                  <dt className="text-sm text-muted">{k}</dt>
                  <dd className="font-medium text-navy">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-sm text-muted">Every assumption is documented and referenced — the formula depends on your design and objective.</p>
          </div>
        </Reveal>
        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="Study planning"
            title="Start With the Right Sample Size"
            lead="Study-specific sample size calculations based on research objectives, study design and statistical assumptions."
          />
          <div className="mt-8">
            <CheckList items={sampleSizeList} />
          </div>
          <div className="mt-8">
            <Button to="/services/sample-size">
              Calculate My Sample Size <ArrowRight aria-hidden className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Research methodology ───────────────────────────────────────────────────
export function MethodologySection() {
  return (
    <section className="bg-sage-100/60 py-20 sm:py-24" id="methodology">
      <div className="container-rw">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-end">
          <SectionHeading
            eyebrow="Research methodology"
            title="Strong Research Starts With Strong Methods"
            lead="Many analysis problems are design problems that surface late. We help you get the design right first."
          />
          <div className="lg:justify-self-end">
            <Button to="/services/research-methodology" variant="secondary">
              Discuss My Study <ArrowRight aria-hidden className="size-4" />
            </Button>
          </div>
        </div>
        <ol className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-sage-300 bg-sage-300 sm:grid-cols-2 lg:grid-cols-5">
          {methodologyList.map((m, i) => (
            <li key={m} className="bg-white p-5">
              <span className="font-mono text-xs text-olive">{String(i + 1).padStart(2, '0')}</span>
              <p className="mt-1 font-semibold text-navy">{m}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

// ─── All services (hierarchy: SPSS & R featured → other primary → secondary) ─
export function ServicesSection({ headingAs = 'h2' }: { headingAs?: 'h1' | 'h2' }) {
  const [spss, r, ...restPrimary] = primaryServices
  return (
    <section className="py-20 sm:py-24" id="services">
      <div className="container-rw">
        <SectionHeading
          as={headingAs}
          eyebrow="Services"
          title="Data Analysis & Research Support Services"
          lead="Data analysis and biostatistics at the core, supported by study design, evidence synthesis and publication services."
        />

        <h3 className="mt-14 mb-5 flex items-center gap-3 text-sm font-semibold tracking-[0.12em] text-navy uppercase">
          <span className="h-px w-8 bg-navy" aria-hidden /> Data analysis &amp; biostatistics
        </h3>
        <div className="grid gap-5 lg:grid-cols-2">
          <ServiceCard service={spss} index={0} variant="feature" />
          <ServiceCard service={r} index={1} variant="feature" />
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {restPrimary.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i + 2} />
          ))}
        </div>

        <h3 className="mt-16 mb-2 flex items-center gap-3 text-sm font-semibold tracking-[0.12em] text-muted uppercase">
          <span className="h-px w-8 bg-line" aria-hidden /> Evidence &amp; academic services
        </h3>
        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {secondaryServices.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i + 5} variant="compact" />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Secondary service band (reviews / publication) ─────────────────────────
function SupportBand({ id, eyebrow, title, lead, slugs }: { id: string; eyebrow: string; title: string; lead: string; slugs: string[] }) {
  return (
    <section className="border-t border-line py-16 sm:py-20" id={id}>
      <div className="container-rw grid gap-10 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h2 className="font-serif text-[1.75rem] leading-tight font-medium text-navy sm:text-[2rem]">{title}</h2>
          <p className="mt-3 text-muted">{lead}</p>
        </div>
        <div className={`grid gap-5 ${slugs.length === 3 ? 'md:grid-cols-3' : 'sm:grid-cols-2'}`}>
          {slugs.map((slug) => {
            const s = getService(slug)!
            const Icon = s.icon
            return (
              <Reveal key={slug}>
                <article className="group relative h-full rounded-[var(--radius-card)] border border-line bg-white p-6 hover:border-navy/40">
                  <Icon aria-hidden className="size-5 text-sage-700" strokeWidth={1.6} />
                  <h3 className="mt-3 text-lg font-semibold text-navy">
                    <Link to={`/services/${s.slug}`} className="after:absolute after:inset-0 group-hover:underline">
                      {s.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-[0.9375rem] text-muted">{s.summary}</p>
                  <ul className="mt-3 space-y-1 text-[0.875rem] text-charcoal">
                    {s.highlights.slice(0, 3).map((h) => (
                      <li key={h}>— {h}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function EvidenceSection() {
  return (
    <SupportBand
      id="reviews"
      eyebrow="Evidence synthesis"
      title="Systematic & Scoping Reviews"
      lead="Structured, guideline-aligned support for reviews — including meta-analysis where the evidence allows."
      slugs={['systematic-review', 'scoping-review']}
    />
  )
}

export function PublicationSection() {
  return (
    <SupportBand
      id="publication"
      eyebrow="Manuscript & publication"
      title="From Results to Publication"
      lead="Support to present your own findings clearly and navigate submission and peer review — without guarantees no one can honestly make."
      slugs={['manuscript-thesis', 'manuscript-publication', 'turnitin']}
    />
  )
}

// ─── Principles ─────────────────────────────────────────────────────────────
export function WhySection({ title = 'Built Around Research Quality' }: { title?: string }) {
  return (
    <section className="bg-cream py-20 sm:py-24" id="why">
      <div className="container-rw">
        <SectionHeading eyebrow="Why ResearchWise" title={title} />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => (
            <Reveal key={p.n} delay={i * 80}>
              <div className="border-t-2 border-navy pt-5">
                <p className="font-mono text-sm text-olive">{p.n}</p>
                <h3 className="mt-2 font-serif text-xl font-medium text-navy">{p.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-muted">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Insights preview ───────────────────────────────────────────────────────
export function InsightsSection() {
  return (
    <section className="py-20 sm:py-24" id="insights">
      <div className="container-rw">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Insights" title="Practical Guides to Statistical Analysis" />
          <Link to="/insights" className="inline-flex min-h-11 shrink-0 items-center gap-2 font-semibold text-navy hover:underline">
            All insights <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {articles.slice(0, 3).map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </div>
    </section>
  )
}

