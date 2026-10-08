import { ArrowRight, Check } from 'lucide-react'
import { coreAreas, methodCategories, rList, spssList } from '../../data/analysis'
import { BarChartViz, BoxPlotViz, C, EpiCurveViz, ForestViz, HistogramViz, KaplanMeierViz, Legend, RocViz, ScatterViz } from '../charts/Charts'
import { ChartFigure } from '../charts/ChartFigure'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { Workflow } from '../visuals/Workflow'
import { OutputTable } from '../visuals/Windows'

export function CheckList({ items, columns = 2, inverted = false }: { items: string[]; columns?: 1 | 2 | 3; inverted?: boolean }) {
  const cols = columns === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : columns === 2 ? 'sm:grid-cols-2' : ''
  return (
    <ul className={`grid gap-x-6 gap-y-2.5 ${cols}`}>
      {items.map((i) => (
        <li key={i} className={`flex gap-2.5 ${inverted ? 'text-white/90' : 'text-charcoal'}`}>
          <Check aria-hidden className={`mt-1 size-4 shrink-0 ${inverted ? 'text-sage-300' : 'text-sage-700'}`} />
          {i}
        </li>
      ))}
    </ul>
  )
}

// ─── Core value: four analysis areas ────────────────────────────────────────
export function CoreValueSection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-rw">
        <SectionHeading
          eyebrow="Data analysis"
          title="Professional Data Analysis, From Dataset to Results"
          lead="We help researchers transform raw datasets into accurate, interpretable and publication-ready statistical results."
        />
        <ol className="mt-12 grid border-t border-navy sm:grid-cols-2 lg:grid-cols-4">
          {coreAreas.map((a, i) => (
            <li key={a.n} className={`border-b border-line py-7 sm:px-6 lg:border-b-0 ${i > 0 ? 'lg:border-l' : ''} ${i % 2 ? 'sm:border-l' : ''} sm:first:pl-0 lg:px-6 lg:first:pl-0`}>
              <Reveal delay={i * 80}>
                <p className="font-serif text-[2.75rem] leading-none text-sage">{a.n}</p>
                <h3 className="mt-4 text-[0.9375rem] font-bold tracking-[0.08em] text-navy uppercase">{a.title}</h3>
                <p className="mt-2 text-muted">{a.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

// ─── SPSS & R ───────────────────────────────────────────────────────────────
export function SpssRSection() {
  return (
    <section className="bg-cream py-20 sm:py-24" id="spss-r">
      <div className="container-rw">
        <SectionHeading eyebrow="Software" title="Statistical Analysis Using SPSS & R" lead="The same statistical standards, delivered in the software that suits your project." />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <article className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-white">
              <div className="border-b border-line p-6 sm:p-8">
                <p className="font-mono text-sm text-olive">IBM SPSS Statistics</p>
                <h3 className="mt-2 font-serif text-[1.875rem] font-medium text-navy">SPSS Data Analysis</h3>
                <p className="mt-2 text-muted">Practical and reliable statistical analysis using IBM SPSS Statistics.</p>
              </div>
              <div className="border-b border-line bg-cream/40 px-6 py-5 sm:px-8">
                <OutputTable
                  title="Independent Samples Test"
                  head={['', 't', 'df', 'Sig.', 'Mean diff.', '95% CI']}
                  rows={[['SBP (mmHg)', '3.42', '410', '<.001', '6.8', '2.9–10.7']]}
                />
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <CheckList items={spssList} />
                <div className="mt-auto pt-8">
                  <Button to="/services/spss-data-analysis">
                    Explore SPSS Analysis <ArrowRight aria-hidden className="size-4" />
                  </Button>
                </div>
              </div>
            </article>
          </Reveal>
          <Reveal delay={100}>
            <article className="flex h-full flex-col rounded-[var(--radius-card)] border border-navy bg-navy text-white">
              <div className="border-b border-white/10 p-6 sm:p-8">
                <p className="font-mono text-sm text-sage-300">R &amp; RStudio</p>
                <h3 className="mt-2 font-serif text-[1.875rem] font-medium">R Data Analysis</h3>
                <p className="mt-2 text-white/70">Flexible, reproducible and publication-quality statistical analysis using R and RStudio.</p>
              </div>
              <div className="border-b border-white/10 bg-[#111c2e] px-6 py-5 sm:px-8">
                <pre className="overflow-x-auto font-mono text-[0.75rem] leading-relaxed text-white/80">
                  <code>
                    <span className="text-sage-300">{'>'} </span>
                    {'t.test(sbp ~ group, data = df)\n'}
                    <span className="text-white/50">{'t = 3.42, df = 410, p-value < 0.001\n95 percent CI:  2.9  10.7'}</span>
                  </code>
                </pre>
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <CheckList items={rList} inverted />
                <div className="mt-auto pt-8">
                  <Button to="/services/r-data-analysis" variant="light">
                    Explore R Analysis <ArrowRight aria-hidden className="size-4" />
                  </Button>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ─── Workflow ───────────────────────────────────────────────────────────────
export function WorkflowSection({ title = 'From Raw Data to Meaningful Evidence' }: { title?: string }) {
  return (
    <section className="relative overflow-hidden bg-navy py-20 text-white sm:py-28" id="workflow">
      <div aria-hidden className="bg-grid-dark absolute inset-0" />
      <div className="container-rw relative">
        <SectionHeading
          inverted
          eyebrow="Our data analysis workflow"
          title={title}
          lead="Every project follows the same disciplined sequence, so that the statistical method always fits the research question and the data."
        />
        <div className="mt-14">
          <Workflow />
        </div>
      </div>
    </section>
  )
}

// ─── Statistical methods ────────────────────────────────────────────────────
export function MethodsSection() {
  return (
    <section className="py-20 sm:py-24" id="methods">
      <div className="container-rw">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <SectionHeading
            eyebrow="Methods"
            title="Statistical Methods We Support"
            lead="Methods are selected for your study design, variable types and assumptions — never applied by default."
          />
          <div className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2">
            {methodCategories.map((c, i) => (
              <Reveal key={c.title} delay={i * 60} className="bg-white p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-lg font-semibold text-navy">{c.title}</h3>
                  <span className="font-mono text-[0.6875rem] text-olive">{c.code}</span>
                </div>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {c.methods.map((m) => (
                    <li key={m} className="rounded-[3px] border border-line bg-cream/50 px-2.5 py-1 text-[0.875rem] text-charcoal">
                      {m}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Data visualization ─────────────────────────────────────────────────────
export function VizSection({ full = true }: { full?: boolean }) {
  return (
    <section className="bg-cream py-20 sm:py-24" id="visualization">
      <div className="container-rw">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Data visualization"
            title="Make Your Data Easy to Understand"
            lead="Clear visualization helps communicate complex findings with precision."
          />
          <p className="max-w-sm text-sm text-muted">All figures on this page are illustrative examples built from synthetic data.</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ChartFigure title="Bar chart · prevalence by age group" caption="Percentages with direct labels.">
            <BarChartViz />
          </ChartFigure>
          <ChartFigure title="Histogram · distribution check" caption="Assessing shape before choosing a test.">
            <HistogramViz />
          </ChartFigure>
          <ChartFigure title="Box plot · group comparison" caption="Median, IQR and outliers." legend={<Legend items={[{ label: 'Control', color: C.a }, { label: 'Intervention', color: C.b }]} />}>
            <BoxPlotViz />
          </ChartFigure>
          <ChartFigure title="Scatter plot · linear regression" caption="Fitted line with 95% confidence band.">
            <ScatterViz />
          </ChartFigure>
          <ChartFigure title="Forest plot · adjusted odds ratios" caption="Log scale; dashed line marks OR = 1.">
            <ForestViz />
          </ChartFigure>
          <ChartFigure title="ROC curve · diagnostic accuracy" caption="Area under the curve for model discrimination.">
            <RocViz />
          </ChartFigure>
          {full && (
            <>
              <ChartFigure title="Kaplan-Meier · time to event" caption="Where survival analysis is appropriate." legend={<Legend items={[{ label: 'Treatment', color: C.a }, { label: 'Standard care', color: C.b }]} />}>
                <KaplanMeierViz />
              </ChartFigure>
              <ChartFigure title="Epidemic curve · cases by week" caption="Epidemiological visualization.">
                <EpiCurveViz />
              </ChartFigure>
              <Reveal>
                <div className="flex h-full flex-col justify-between rounded-[var(--radius-card)] border border-navy bg-navy p-6 text-white">
                  <div>
                    <h3 className="font-serif text-2xl font-medium">Publication-quality figures</h3>
                    <p className="mt-3 text-white/75">
                      Exported at the size, resolution and file format your journal requires — labelled axes, stated units and visible uncertainty.
                    </p>
                  </div>
                  <ul className="mt-6 flex flex-wrap gap-2 font-mono text-xs text-sage-300">
                    {['PNG', 'TIFF', 'PDF', 'EPS', '300+ dpi'].map((f) => (
                      <li key={f} className="rounded-[3px] border border-white/20 px-2 py-1">
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
