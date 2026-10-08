import { Seo } from '../components/layout/Seo'
import { Button } from '../components/ui/Button'

export default function NotFound() {
  return (
    <section className="bg-cream py-24 sm:py-32">
      <Seo title="Page not found | ResearchWise Analytics" description="The page you requested could not be found." index={false} />
      <div className="container-rw max-w-2xl text-center">
        <p className="font-mono text-sm text-olive">404 · p &gt; 0.05</p>
        <h1 className="mt-3 font-serif text-[2.5rem] font-medium text-navy">Page not found</h1>
        <p className="mt-4 text-lg text-muted">The page you are looking for does not exist or has moved.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button to="/">Go to homepage</Button>
          <Button to="/services" variant="secondary">
            View services
          </Button>
        </div>
      </div>
    </section>
  )
}
