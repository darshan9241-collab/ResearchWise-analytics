import { useLocation } from 'react-router-dom'
import { SITE_URL } from '../../config/site'

interface Props {
  title: string
  description: string
  /** Set false for 404 pages. */
  index?: boolean
}

/** Per-page metadata. React 19 hoists these elements into <head>. */
export function Seo({ title, description, index = true }: Props) {
  const { pathname } = useLocation()
  const url = SITE_URL ? `${SITE_URL}${pathname === '/' ? '/' : pathname}` : ''
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {!index && <meta name="robots" content="noindex" />}
      {url && <link rel="canonical" href={url} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {url && <meta property="og:url" content={url} />}
      <meta name="twitter:card" content="summary" />
    </>
  )
}
