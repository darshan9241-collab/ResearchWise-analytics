import { ArrowRight } from 'lucide-react'
import { Seo } from '../components/layout/Seo'
import { PageHero } from '../components/sections/PageHero'
import { WhySection } from '../components/sections/ServiceSections'
import { Button } from '../components/ui/Button'
import { CTA } from '../components/ui/CTA'
import { SectionHeading } from '../components/ui/SectionHeading'
import { audiences } from '../data/analysis'

const focus = [
  { title: 'Data', text: 'Careful preparation, coding and documentation of research datasets.' },
  { title: 'Statistics', text: 'Appropriate descriptive, inferential and regression methods using SPSS and R.' },
  { title: 'Research methodology', text: 'Study design, sampling, variables and statistical analysis plans.' },
  { title: 'Evidence synthesis', text: 'Systematic and scoping reviews, including meta-analysis where appropriate.' },
  { title: 'Scientific communication', text: 'Clear results, tables and figures that communicate findings accurately.' },
  { title: 'Research integrity', text: 'Honest reporting of what the data show — no fabrication, manipulation or guarantees.' },
]

const chain = ['Research question', 'Study design', 'Data', 'Data cleaning', 'Statistical analysis', 'Interpretation', 'Evidence', 'Manuscript', 'Publication']

export default function About() {
  return (
    <>
      <Seo
        title="About | ResearchWise Analytics"
        description="ResearchWise Analytics is a research and biostatistics support platform helping researchers strengthen the quality, clarity and credibility of their work."
      />
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
        eyebrow="About ResearchWise Analytics"
        title="Research Built on Better Data."
        subtitle="ResearchWise Analytics is a research and biostatistics support platform focused on helping researchers strengthen the quality, clarity and credibility of their work."
      />

      <section className="py-16 sm:py-20">
        <div className="container-rw grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <SectionHeading eyebrow="What we do" title="Helping Researchers Make Better Use of Their Data" />
          <div className="space-y-4 text-[1.0625rem]">
            <p>
              Good research depends on a chain of decisions: a clear question, a suitable design, well-prepared data, appropriate statistical methods
              and accurate interpretation. A weak link anywhere affects the evidence that comes out at the end.
            </p>
            <p>
              Our work is centred on the data-analysis part of that chain — biostatistics, SPSS and R analysis, data cleaning and interpretation —
              supported by methodology, evidence-synthesis and publication services.
            </p>
            <div className="pt-2">
              <Button to="/data-analysis" variant="secondary">
                Our data analysis approach <ArrowRight aria-hidden className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy py-14 text-white">
        <div className="container-rw">
          <p className="eyebrow text-sage-300">The research chain we support</p>
          <ol className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-3 text-[0.9375rem]">
            {chain.map((c, i) => (
              <li key={c} className="flex items-center gap-2">
                <span className={`rounded-[3px] border px-3 py-1.5 ${i >= 3 && i <= 5 ? 'border-sage-300 bg-sage-300 font-semibold text-navy' : 'border-white/25'}`}>{c}</span>
                {i < chain.length - 1 && (
                  <span aria-hidden className="text-sage-300">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-rw">
          <SectionHeading eyebrow="Focus areas" title="Where We Work" />
          <div className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {focus.map((f) => (
              <div key={f.title} className="bg-white p-6">
                <h3 className="font-serif text-xl font-medium text-navy">{f.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-muted">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhySection title="Why ResearchWise?" />

      <section className="py-16 sm:py-20">
        <div className="container-rw grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading eyebrow="Who we support" title="Researchers Across Health and Life Sciences" />
          <ul className="flex flex-wrap content-start gap-2">
            {audiences.map((a) => (
              <li key={a} className="rounded-[3px] border border-line bg-cream/50 px-3 py-1.5 text-[0.9375rem]">
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTA title="Let’s Strengthen Your Research." text="Tell us what you are working on and we will guide you through the appropriate next step." />
    </>
  )
}
