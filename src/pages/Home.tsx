import { ArrowRight, MessageCircle } from 'lucide-react'
import { Seo } from '../components/layout/Seo'
import { CoreValueSection, MethodsSection, SpssRSection, VizSection, WorkflowSection } from '../components/sections/AnalysisSections'
import {
  CleaningSection,
  EvidenceSection,
  InsightsSection,
  MethodologySection,
  PublicationSection,
  SampleSizeSection,
  ServicesSection,
  WhySection,
} from '../components/sections/ServiceSections'
import { Button } from '../components/ui/Button'
import { CTA } from '../components/ui/CTA'
import { HeroVisual } from '../components/visuals/HeroVisual'
import { whatsappUrl } from '../lib/contact'

export default function Home() {
  return (
    <>
      <Seo
        title="ResearchWise Analytics | Research Data Analysis & Biostatistics"
        description="ResearchWise Analytics provides professional SPSS, R, biostatistics, research data analysis, sample size calculation, research methodology, systematic review, scoping review and publication support."
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-cream">
        <div aria-hidden className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="container-rw relative grid items-center gap-12 pt-12 pb-16 sm:pt-16 lg:grid-cols-[1fr_1.05fr] lg:gap-10 lg:pt-20 lg:pb-24">
          <div className="animate-fade-up">
            <p className="eyebrow">Research data analysis &amp; biostatistics</p>
            <h1 className="mt-4 font-serif text-[2.5rem] leading-[1.08] font-medium tracking-[-0.015em] text-navy sm:text-[3.25rem] lg:text-[3.6rem]">
              Turn Your Research Data Into Meaningful Evidence.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-charcoal/85 sm:text-[1.1875rem]">
              Professional statistical analysis, biostatistics and research data support using SPSS and R — from data cleaning and analysis to
              publication-ready results.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/contact" size="lg">
                Get Data Analysis Support <ArrowRight aria-hidden className="size-4" />
              </Button>
              <Button href={whatsappUrl()} variant="whatsapp" size="lg">
                <MessageCircle aria-hidden className="size-4" /> Chat on WhatsApp
              </Button>
            </div>
          </div>
          <div className="animate-fade-up [animation-delay:150ms]">
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section aria-label="Core capabilities" className="border-y border-navy-700 bg-navy text-white">
        <div className="container-rw flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-5 text-center sm:justify-between">
          {['SPSS', 'R', 'Biostatistics', 'Data Visualization'].map((t, i) => (
            <span key={t} className="flex items-center gap-6 text-[0.9375rem] font-semibold tracking-[0.16em] uppercase sm:text-base">
              {i > 0 && <span aria-hidden className="hidden text-sage-300 sm:inline">•</span>}
              {t}
            </span>
          ))}
          <span className="hidden font-mono text-sm text-sage-300 lg:inline">Statistical testing · Modelling · Interpretation</span>
        </div>
      </section>

      <CoreValueSection />
      <SpssRSection />
      <WorkflowSection />
      <MethodsSection />
      <CTA
        tone="cream"
        title="Not Sure Which Statistical Test to Use?"
        text="Tell us about your research question and dataset. We can help identify an appropriate analysis approach."
        primary={{ label: 'Discuss My Dataset', to: '/contact' }}
      />
      <VizSection />
      <CleaningSection />
      <SampleSizeSection />
      <MethodologySection />
      <ServicesSection />
      <EvidenceSection />
      <PublicationSection />
      <WhySection />
      <InsightsSection />
      <CTA
        title="Have a Dataset or Research Question?"
        text="Let’s identify the right analytical approach and turn your research data into meaningful evidence."
      />
    </>
  )
}
