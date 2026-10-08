import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Seo } from '../components/layout/Seo'
import { PageHero } from '../components/sections/PageHero'
import { ArticleCard } from '../components/ui/ArticleCard'
import { CTA } from '../components/ui/CTA'
import { articles, getArticle, type Block } from '../data/articles'
import NotFound from './NotFound'

export default function Article() {
  const { slug = '' } = useParams()
  const article = getArticle(slug)
  if (!article) return <NotFound />

  const more = articles.filter((a) => a.slug !== article.slug && a.category === article.category)
  const related = [...more, ...articles.filter((a) => a.slug !== article.slug && a.category !== article.category)].slice(0, 3)

  return (
    <>
      <Seo title={`${article.title} | ResearchWise Analytics`} description={article.excerpt} />
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Insights', to: '/insights' }, { label: article.category }]}
        eyebrow={`${article.category} · ${article.minutes} min read`}
        title={article.title}
        subtitle={article.excerpt}
      />
      <article className="py-14 sm:py-16">
        <div className="container-rw">
          <div className="prose-rw mx-auto max-w-[720px]">
            {article.body.map((b, i) => (
              <BlockView key={i} block={b} />
            ))}
            <p className="mt-10 border-t border-line pt-6 text-sm text-muted">
              This article is general guidance. The right approach for your study depends on its design, data and objectives.
            </p>
            <Link to="/insights" className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-navy hover:underline">
              <ArrowLeft aria-hidden className="size-4" /> All insights
            </Link>
          </div>
        </div>
      </article>
      <section className="border-t border-line bg-cream py-14">
        <div className="container-rw">
          <h2 className="font-serif text-[1.75rem] font-medium text-navy">Further reading</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </section>
      <CTA title="Need Help Applying This to Your Data?" text="Tell us about your research question and dataset. We can help identify an appropriate analysis approach." primary={{ label: 'Discuss My Dataset', to: '/contact' }} />
    </>
  )
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case 'p':
      return <p>{block.text}</p>
    case 'h2':
      return <h2>{block.text}</h2>
    case 'ul':
      return (
        <ul>
          {block.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      )
    case 'table':
      return (
        <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <table>
            <thead>
              <tr>
                {block.head.map((h, i) => (
                  <th key={i} scope="col">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((r, i) => (
                <tr key={i}>
                  {r.map((c, j) => (
                    <td key={j}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
  }
}
