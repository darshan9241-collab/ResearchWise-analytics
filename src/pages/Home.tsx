import { ArrowRight, BarChart3, BookOpenCheck, Compass, MessageCircle, Send } from 'lucide-react'
import { Link } from 'react-router-dom'
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
import { WhatWeDoSection } from '../components/sections/WhatWeDoSection'
import { ServiceRotator } from '../components/ui/ServiceRotator'
import { StartPrompt } from '../components/ui/StartPrompt'
import { whatsappUrl } from '../lib/contact'

const PILLARS = [
  { title: 'Study Design', tools: 'Methods · Sample size', icon: Compass, to: '/services/research-methodology' },
  { title: 'Data Analysis', tools: 'Cleaning · SPSS · R', icon: BarChart3, to: '/data-analysis' },
  { title: 'Evidence Synthesis', tools: 'Systematic · Scoping', icon: BookOpenCheck, to: '/services/systematic-review' },
  { title: 'Publication', tools: 'Journals · Turnitin', icon: Send, to: '/services/manuscript-publication' },
]

export default function Home() {
  return (
    <>
      <Seo
        title="ResearchWise Analytics | Research Support, Data Analysis & Publication"
        description="ResearchWise Analytics supports researchers at every stage — research methodology, sample size calculation, data cleaning, SPSS and R data analysis, systematic and scoping reviews, manuscript and publication support, and Turnitin similarity checking."
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-cream">
        <div aria-hidden className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="container-rw relative grid items-center gap-12 pt-12 pb-16 sm:pt-16 lg:grid-cols-[1fr_1.05fr] lg:gap-10 lg:pt-20 lg:pb-24">
          <div className="animate-fade-up">
            <p className="eyebrow">Research • Data • Evidence</p>
            <h1 className="mt-4 font-serif text-[2.5rem] leading-[1.08] font-medium tracking-[-0.015em] text-navy sm:text-[3.25rem] lg:text-[3.6rem]">
              Expert Support at Every Stage of Your Research.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-charcoal/85 sm:text-[1.1875rem]">
              From study design and sample size to data cleaning, SPSS and R analysis, systematic and scoping reviews, and manuscript and
              publication support — practical, ethical help that turns your research into meaningful evidence.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/contact" size="lg">
                Get Research Support <ArrowRight aria-hidden className="size-4" />
              </Button>
              <Button href={whatsappUrl()} variant="whatsapp" size="lg">
                <MessageCircle aria-hidden className="size-4" /> Chat on WhatsApp
              </Button>
            </div>
            <ServiceRotator />
          </div>
          <div className="animate-fade-up [animation-delay:150ms]">
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section aria-label="What we cover" className="border-y border-navy-700 bg-navy text-white">
        <ul className="container-rw grid grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <li
              key={p.title}
              className={`border-white/10 ${i % 2 === 1 ? 'border-l' : ''} ${i >= 2 ? 'border-t lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l' : ''}`}
            >
              <Link to={p.to} className={`group flex h-full items-center gap-3 py-5 pr-2 sm:gap-4 sm:pr-6 lg:py-6 ${i % 2 === 1 ? 'pl-4 sm:pl-6' : 'pl-0'} ${i === 2 ? 'lg:pl-6' : ''}`}>
                <span className="hidden size-11 shrink-0 place-items-center rounded-[6px] bg-white/8 text-sage-300 transition-colors group-hover:bg-sage-300 group-hover:text-navy sm:grid">
                  <p.icon aria-hidden className="size-5" strokeWidth={1.6} />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[0.6875rem] text-sage-300">{String(i + 1).padStart(2, '0')}</span>
                  <span className="block text-[0.9375rem] leading-tight font-semibold whitespace-nowrap group-hover:underline sm:text-base">{p.title}</span>
                  <span className="mt-0.5 block text-[0.8125rem] whitespace-nowrap text-white/60">{p.tools}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <WhatWeDoSection />
      <ServicesSection />
      <MethodologySection />
      <SampleSizeSection />
      <CleaningSection />
      <CoreValueSection />
      <SpssRSection />
      <WorkflowSection />
      <MethodsSection />
      <VizSection />
      <CTA
        tone="cream"
        title="Not Sure Which Service You Need?"
        text="Tell us where you are in your research — planning, analysing, reviewing or publishing — and we’ll suggest the right next step."
        primary={{ label: 'Discuss My Research', to: '/contact' }}
      />
      <EvidenceSection />
      <PublicationSection />
      <WhySection />
      <InsightsSection />
      <CTA
        title="Have a Research Question or Dataset?"
        text="Whatever stage you are at, we’ll help you find the right next step and turn your research into meaningful evidence."
        primary={{ label: 'Get Research Support', to: '/contact' }}
      />
      <StartPrompt />
    </>
  )
}
