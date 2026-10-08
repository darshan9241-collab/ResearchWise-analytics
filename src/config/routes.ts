// Single source of truth for public URLs. Also read by vite.config.ts to build sitemap.xml,
// so keep this file free of React/JSX imports.

export const SERVICE_SLUGS = [
  'spss-data-analysis',
  'r-data-analysis',
  'data-cleaning',
  'sample-size',
  'research-methodology',
  'systematic-review',
  'scoping-review',
  'manuscript-thesis',
  'manuscript-publication',
  'turnitin',
] as const

export type ServiceSlug = (typeof SERVICE_SLUGS)[number]

export const ARTICLE_SLUGS = [
  'which-statistical-test-should-i-use',
  'chi-square-vs-fishers-exact-test',
  'when-to-use-logistic-regression',
  'how-to-interpret-odds-ratios',
  'mean-vs-median',
  'spss-data-cleaning-checklist',
  'spss-vs-r-for-research',
  'common-errors-in-statistical-analysis',
  'how-to-present-regression-results',
  'publication-ready-graphs',
] as const

export type ArticleSlug = (typeof ARTICLE_SLUGS)[number]

export const STATIC_PATHS = ['/', '/services', '/data-analysis', '/about', '/insights', '/contact'] as const

export const ALL_PATHS: string[] = [
  ...STATIC_PATHS,
  ...SERVICE_SLUGS.map((s) => `/services/${s}`),
  ...ARTICLE_SLUGS.map((s) => `/insights/${s}`),
]
