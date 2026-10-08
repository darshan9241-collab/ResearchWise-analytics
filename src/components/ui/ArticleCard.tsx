import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Article } from '../../data/articles'
import { Badge } from './Badge'

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group relative flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-white p-6 transition-colors hover:border-navy/40">
      <div className="flex items-center justify-between gap-3">
        <Badge tone="sage">{article.category}</Badge>
        <span className="text-sm text-muted">{article.minutes} min read</span>
      </div>
      <h3 className="mt-4 font-serif text-xl leading-snug font-medium text-navy">
        <Link to={`/insights/${article.slug}`} className="after:absolute after:inset-0 group-hover:underline">
          {article.title}
        </Link>
      </h3>
      <p className="mt-2 text-[0.9375rem] text-muted">{article.excerpt}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[0.9375rem] font-semibold text-navy" aria-hidden>
        Read article <ArrowUpRight className="size-4" />
      </span>
    </article>
  )
}
