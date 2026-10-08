import { Seo } from '../components/layout/Seo'
import { ServicesSection } from '../components/sections/ServiceSections'
import { WorkflowSection } from '../components/sections/AnalysisSections'
import { CTA } from '../components/ui/CTA'

export default function Services() {
  return (
    <>
      <Seo
        title="Services | SPSS, R, Biostatistics & Research Support | ResearchWise Analytics"
        description="Research data analysis services: SPSS and R data analysis, data cleaning, sample size calculation, research methodology, systematic and scoping reviews, manuscript and publication support."
      />
      <div className="border-b border-line bg-cream">
        <ServicesSection headingAs="h1" />
      </div>
      <WorkflowSection title="How Every Analysis Project Runs" />
      <CTA
        title="Not Sure Which Service You Need?"
        text="Tell us about your research question and dataset. We can help identify an appropriate analysis approach."
        primary={{ label: 'Discuss My Research', to: '/contact' }}
      />
    </>
  )
}
