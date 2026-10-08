import type { ServiceSlug } from '../config/routes'

export type GlyphKind = 'plan' | 'data' | 'analyse' | 'interpret' | 'review' | 'publish'

export interface Stage {
  n: string
  glyph: GlyphKind
  title: string
  tagline: string
  summary: string
  whatWeDo: string[]
  youReceive: string[]
  services: ServiceSlug[]
}

/** The research journey shown on the home page. Together the stages cover all 10 services. */
export const stages: Stage[] = [
  {
    n: '01',
    glyph: 'plan',
    title: 'Plan Your Study',
    tagline: 'Before data collection',
    summary: 'We help you choose a suitable study design, define your variables, calculate the sample size and set out how the data will be analysed.',
    whatWeDo: ['Study design selection', 'Objectives, research questions and hypotheses', 'Variables and operational definitions', 'Sample size calculation', 'Statistical analysis plan', 'Protocol review'],
    youReceive: ['Documented sample size calculation', 'Statistical analysis plan', 'Written methodological feedback'],
    services: ['research-methodology', 'sample-size'],
  },
  {
    n: '02',
    glyph: 'data',
    title: 'Prepare Your Data',
    tagline: 'Raw data → analysis-ready',
    summary: 'We clean, code and validate your dataset so that every result rests on accurate, consistent data — and we document every change.',
    whatWeDo: ['Data cleaning and validation', 'Variable coding and labelling', 'Missing-value management', 'Duplicate and outlier checks', 'Derived and categorised variables', 'Codebook and change log'],
    youReceive: ['Analysis-ready dataset', 'Codebook / data dictionary', 'Log of cleaning decisions'],
    services: ['data-cleaning'],
  },
  {
    n: '03',
    glyph: 'analyse',
    title: 'Analyse Your Data',
    tagline: 'SPSS & R',
    summary: 'We select and run statistical tests and models that match your research question, study design and variable types — checking assumptions first.',
    whatWeDo: ['Descriptive statistics', 'Chi-square, t-tests, ANOVA and non-parametric tests', 'Correlation and association analysis', 'Linear and logistic regression', 'Assumption and model checks', 'Reproducible R scripts'],
    youReceive: ['SPSS output or R scripts', 'Formatted results tables', 'Notes on methods used'],
    services: ['spss-data-analysis', 'r-data-analysis'],
  },
  {
    n: '04',
    glyph: 'interpret',
    title: 'Interpret & Visualise',
    tagline: 'Output → findings',
    summary: 'We turn statistical output into clear findings: what each result means, how precise it is, and how to present it in tables and figures.',
    whatWeDo: ['Plain-language interpretation of results', 'Effect sizes and confidence intervals', 'Publication-ready tables', 'Charts and figures', 'Guidance on reporting results'],
    youReceive: ['Written interpretation', 'Publication-ready tables and figures'],
    services: ['spss-data-analysis', 'r-data-analysis'],
  },
  {
    n: '05',
    glyph: 'review',
    title: 'Synthesise Evidence',
    tagline: 'Systematic & scoping reviews',
    summary: 'We support structured reviews of the literature, from framing the question and building the search to screening, extraction and synthesis.',
    whatWeDo: ['PICO / PECO / PCC question framing', 'Search strategy development', 'Screening workflow and PRISMA flow', 'Data extraction and charting', 'Risk-of-bias assessment', 'Evidence synthesis and meta-analysis'],
    youReceive: ['Search strategy documentation', 'PRISMA flow diagram', 'Extraction templates and synthesis outputs'],
    services: ['systematic-review', 'scoping-review'],
  },
  {
    n: '06',
    glyph: 'publish',
    title: 'Write & Publish',
    tagline: 'Manuscript → journal',
    summary: 'We help you present your own work clearly and navigate journal submission and peer review — without promising outcomes no one can guarantee.',
    whatWeDo: ['Results and methods section review', 'Academic language editing', 'Journal selection and formatting', 'Cover letters and submission support', 'Responses to reviewer comments', 'Turnitin similarity checking'],
    youReceive: ['Edited manuscript with comments', 'Journal shortlist', 'Similarity report with guidance'],
    services: ['manuscript-thesis', 'manuscript-publication', 'turnitin'],
  },
]
