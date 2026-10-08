import { useSearchParams } from 'react-router-dom'
import { Seo } from '../components/layout/Seo'
import { PageHero } from '../components/sections/PageHero'
import { ArticleCard } from '../components/ui/ArticleCard'
import { CTA } from '../components/ui/CTA'
import { articleCategories, articles } from '../data/articles'

export default function Insights() {
  const [params, setParams] = useSearchParams()
  const active = params.get('category') ?? ''
  const list = active ? articles.filter((a) => a.category === active) : articles
  const used = new Set(articles.map((a) => a.category))

  const select = (c: string) => setParams(c ? { category: c } : {}, { replace: true })

  return (
    <>
      <Seo
        title="Insights | Statistics, SPSS & R Guides | ResearchWise Analytics"
        description="Practical guides on statistical tests, SPSS, R, regression, data cleaning, data visualization and research methodology for health and life-science researchers."
      />
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Insights' }]}
        eyebrow="Insights"
        title="Practical Guides to Research Data Analysis"
        subtitle="Clear explanations of statistical tests, SPSS, R, regression and data preparation — written for researchers."
      />
      <section className="py-14 sm:py-16">
        <div className="container-rw">
          <div role="group" aria-label="Filter by category" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
            {['', ...articleCategories].map((c) => {
              const on = c === active
              const disabled = c !== '' && !used.has(c as never)
              return (
                <button
                  key={c || 'all'}
                  type="button"
                  aria-pressed={on}
                  disabled={disabled}
                  onClick={() => select(c)}
                  className={`min-h-10 shrink-0 rounded-[3px] border px-3.5 text-sm font-semibold whitespace-nowrap transition-colors ${
                    on ? 'border-navy bg-navy text-white' : 'border-line bg-white text-navy hover:border-navy/50'
                  } disabled:cursor-not-allowed disabled:text-muted/50 disabled:hover:border-line`}
                >
                  {c || 'All'}
                </button>
              )
            })}
          </div>
          <p className="mt-4 text-sm text-muted" aria-live="polite">
            {list.length} {list.length === 1 ? 'article' : 'articles'}
            {active && ` in ${active}`}
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </section>
      <CTA
        tone="cream"
        title="Not Sure Which Statistical Test to Use?"
        text="Tell us about your research question and dataset. We can help identify an appropriate analysis approach."
        primary={{ label: 'Discuss My Research', to: '/contact' }}
      />
    </>
  )
}
