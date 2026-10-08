import { ArrowRight, MessageCircle, Plus } from 'lucide-react'
import { Seo } from '../components/layout/Seo'
import { CheckList, MethodsSection, SpssRSection, VizSection } from '../components/sections/AnalysisSections'
import { PageHero } from '../components/sections/PageHero'
import { Button } from '../components/ui/Button'
import { CTA } from '../components/ui/CTA'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Pipeline, Workflow } from '../components/visuals/Workflow'
import { OutputTable, SpssWindow } from '../components/visuals/Windows'
import { audiences, dataAnalysisFaq } from '../data/analysis'
import { whatsappUrl } from '../lib/contact'

const whyItMatters = [
  { title: 'The wrong test gives the wrong answer', text: 'A test that does not match the design or variable type can produce misleading p-values and estimates — even when the software runs without error.' },
  { title: 'Reviewers check the statistics', text: 'Methods and results sections are where examiners and journal reviewers most often raise concerns.' },
  { title: 'Numbers need interpretation', text: 'Output tables are not findings. Effect sizes, confidence intervals and their meaning for your question are.' },
]

export default function DataAnalysis() {
  return (
    <>
      <Seo
        title="Research Data Analysis Services | SPSS, R & Biostatistics | ResearchWise Analytics"
        description="Professional research data analysis and biostatistics services: data cleaning, descriptive and inferential statistics, regression modelling, visualization and publication-ready results using SPSS and R."
      />
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Data Analysis' }]}
        eyebrow="Data analysis & biostatistics"
        title="Professional Research Data Analysis"
        subtitle="From raw datasets to accurate statistical results, clear interpretation and publication-ready outputs."
        actions={
          <>
            <Button to="/contact" size="lg">
              Get Data Analysis Support <ArrowRight aria-hidden className="size-4" />
            </Button>
            <Button href={whatsappUrl()} variant="whatsapp" size="lg">
              <MessageCircle aria-hidden className="size-4" /> Chat on WhatsApp
            </Button>
          </>
        }
        aside={<SpssWindow className="shadow-[0_30px_60px_-30px_rgb(22_37_61/0.45)]" />}
      />

      <section className="py-16 sm:py-20">
        <div className="container-rw">
          <Pipeline steps={['Data Cleaning', 'Descriptive Analysis', 'Inferential Analysis', 'Regression / Modelling', 'Visualization', 'Interpretation', 'Final Tables & Results']} />
        </div>
      </section>

      {/* 1. Why it matters */}
      <section className="border-t border-line py-16 sm:py-20">
        <div className="container-rw grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading eyebrow="01 · Why data analysis matters" title="Your Conclusions Are Only as Strong as Your Analysis" />
          <div className="grid gap-5 sm:grid-cols-3">
            {whyItMatters.map((w, i) => (
              <Reveal key={w.title} delay={i * 70}>
                <div className="h-full border-t-2 border-navy pt-4">
                  <h3 className="text-lg font-semibold text-navy">{w.title}</h3>
                  <p className="mt-2 text-[0.9375rem] text-muted">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Who we support */}
      <section className="bg-sage-100/60 py-14">
        <div className="container-rw">
          <h2 className="text-sm font-semibold tracking-[0.12em] text-navy uppercase">Who we support</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {audiences.map((a) => (
              <li key={a} className="rounded-[3px] border border-sage-300 bg-white px-3 py-1.5 text-[0.9375rem] text-charcoal">
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2. Workflow */}
      <section className="py-16 sm:py-20">
        <div className="container-rw">
          <SectionHeading eyebrow="02 · Our analysis workflow" title="From Research Question to Publication-Ready Results" />
          <div className="mt-12">
            <Workflow inverted={false} />
          </div>
        </div>
      </section>

      {/* 3–4. SPSS & R */}
      <SpssRSection />

      {/* 5. Methods */}
      <MethodsSection />

      {/* 6. Visualization */}
      <VizSection full={false} />

      {/* 7–8. Interpretation & outputs */}
      <section className="py-16 sm:py-20">
        <div className="container-rw grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="07 · Results interpretation" title="From Output to Findings" />
            <p className="mt-5 text-muted">Statistical output becomes a finding only when it is explained in the context of the research question. For every result, we explain:</p>
            <div className="mt-6">
              <CheckList
                columns={1}
                items={[
                  'What the test or model estimated',
                  'The size and direction of the effect',
                  'The precision of the estimate (confidence interval)',
                  'Whether it is statistically significant — and what that does and does not mean',
                  'How to report it in your results section',
                ]}
              />
            </div>
            <blockquote className="mt-8 border-l-2 border-sage pl-5 font-serif text-lg text-navy">
              “After adjusting for age, BMI and physical activity, current smokers had higher odds of hypertension than non-smokers (adjusted OR 2.10,
              95% CI 1.32–3.35; p = 0.002).”
              <footer className="mt-2 font-sans text-sm text-muted">Example of a results statement — illustrative data.</footer>
            </blockquote>
          </div>
          <div>
            <SectionHeading eyebrow="08 · Publication-ready outputs" title="Tables and Figures You Can Use" />
            <div className="mt-6 rounded-[var(--radius-card)] border border-line bg-white p-5">
              <p className="mb-2 text-sm font-semibold text-navy">Table 2. Factors associated with hypertension (n = 412)</p>
              <OutputTable
                title=""
                head={['Variable', 'Adjusted OR', '95% CI', 'p']}
                rows={[
                  ['Age ≥ 40 years', '1.96', '1.24–3.10', '0.004'],
                  ['Current smoker', '2.10', '1.32–3.35', '0.002'],
                  ['BMI ≥ 25 kg/m²', '1.54', '0.99–2.40', '0.056'],
                  ['Physically active', '0.62', '0.41–0.94', '0.024'],
                ]}
                note="Illustrative. Reference categories: age < 40, non-smoker, BMI < 25, inactive. Adjusted for all variables shown."
              />
            </div>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {['Formatted results tables (Word/Excel)', 'Publication-quality figures', 'Written interpretation', 'Analysis files (SPSS output or R scripts)'].map((d) => (
                <li key={d} className="rounded-[4px] border border-line bg-cream/50 px-4 py-3 text-[0.9375rem] font-medium text-navy">
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="border-t border-line bg-cream py-16 sm:py-20" id="faq">
        <div className="container-rw grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading eyebrow="09 · FAQ" title="Common Questions" />
          <div className="divide-y divide-line border-y border-line">
            {dataAnalysisFaq.map((f) => (
              <details key={f.q} className="group py-1">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-lg font-semibold text-navy [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <Plus aria-hidden className="size-5 shrink-0 text-sage-700 transition-transform group-open:rotate-45" />
                </summary>
                <p className="pb-5 text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CTA */}
      <CTA title="Have a Dataset?" text="Let us help you turn your dataset into meaningful statistical evidence." />
    </>
  )
}
