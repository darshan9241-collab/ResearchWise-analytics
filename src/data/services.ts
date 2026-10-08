import {
  BookOpenCheck,
  Braces,
  Calculator,
  Compass,
  FileSearch,
  FileText,
  Layers,
  ListChecks,
  Map as MapIcon,
  Send,
  type LucideIcon,
} from 'lucide-react'
import type { ServiceSlug } from '../config/routes'

export type ServiceTier = 'primary' | 'secondary'
export type ServiceGroup = 'analysis' | 'design' | 'evidence' | 'publication'

export interface Service {
  slug: ServiceSlug
  title: string
  /** Short label for footers and dropdowns. */
  shortTitle: string
  tier: ServiceTier
  group: ServiceGroup
  icon: LucideIcon
  summary: string
  /** Full capability list (service page). */
  capabilities: string[]
  /** 3–5 items shown on cards. */
  highlights: string[]
  headline: string
  subtitle: string
  intro: string[]
  approach: { title: string; text: string }[]
  deliverables: string[]
  ctaLabel: string
  /** Scope / ethics note shown on the service page. */
  note?: string
  seoTitle: string
  seoDescription: string
}

export const services: Service[] = [
  {
    slug: 'spss-data-analysis',
    title: 'SPSS Data Analysis',
    shortTitle: 'SPSS Data Analysis',
    tier: 'primary',
    group: 'analysis',
    icon: ListChecks,
    summary:
      'Professional statistical analysis using IBM SPSS Statistics for research, dissertations, theses and manuscripts.',
    capabilities: [
      'Data cleaning and coding',
      'Descriptive statistics',
      'Chi-square & Fisher’s exact test',
      't-test & ANOVA',
      'Correlation analysis',
      'Regression analysis',
      'Publication-ready tables',
      'Statistical interpretation',
    ],
    highlights: ['Descriptive & inferential statistics', 'Chi-square, t-test, ANOVA', 'Linear & logistic regression', 'Publication-ready tables'],
    headline: 'SPSS Data Analysis for Research',
    subtitle: 'Accurate statistical analysis with clear interpretation and research-ready outputs.',
    intro: [
      'IBM SPSS Statistics remains one of the most widely used tools in health, nursing and social-science research. We use it to run analyses that match your study design, objectives and variable types — and we explain every result in plain research language.',
      'You receive the SPSS output, formatted results tables and a written interpretation you can understand, defend and build on.',
    ],
    approach: [
      { title: 'Data preparation', text: 'Variable definitions, value labels, recoding, missing-value codes and computed variables set up correctly before any test is run.' },
      { title: 'Descriptive analysis', text: 'Frequencies, percentages, means, medians, standard deviations and IQRs, chosen according to the distribution of each variable.' },
      { title: 'Inferential analysis', text: 'Independent and paired t-tests, one-way ANOVA, Mann-Whitney U, Wilcoxon and Kruskal-Wallis tests, with assumptions checked first.' },
      { title: 'Association testing', text: 'Chi-square and Fisher’s exact tests for categorical data; Pearson and Spearman correlation for continuous and ordinal data.' },
      { title: 'Regression', text: 'Linear and binary logistic regression, including multivariable models, odds ratios and 95% confidence intervals.' },
      { title: 'Statistical interpretation', text: 'What each result means for your research question — effect sizes and confidence intervals, not just p-values.' },
      { title: 'Tables', text: 'Results reformatted into clean, journal-style tables rather than raw SPSS output.' },
      { title: 'Graphs', text: 'Bar charts, histograms, box plots and scatter plots that are clear enough for a thesis or manuscript.' },
    ],
    deliverables: ['Cleaned and labelled SPSS dataset (.sav)', 'SPSS output file', 'Formatted results tables', 'Written statistical interpretation', 'Charts where appropriate'],
    ctaLabel: 'Get SPSS Analysis Support',
    seoTitle: 'SPSS Data Analysis for Research | ResearchWise Analytics',
    seoDescription:
      'SPSS data analysis for research: descriptive statistics, chi-square, t-test, ANOVA, correlation, linear and logistic regression, publication-ready tables and clear interpretation.',
  },
  {
    slug: 'r-data-analysis',
    title: 'R Data Analysis',
    shortTitle: 'R Data Analysis',
    tier: 'primary',
    group: 'analysis',
    icon: Braces,
    summary: 'Statistical analysis and data visualization using R and RStudio.',
    capabilities: [
      'Data preparation',
      'Descriptive and inferential statistics',
      'Regression and statistical modelling',
      'Hypothesis testing',
      'Data visualization',
      'Publication-quality graphs',
      'Reproducible R scripts',
      'Results interpretation',
    ],
    highlights: ['Regression & statistical modelling', 'Publication-quality graphs', 'Reproducible R scripts', 'Results interpretation'],
    headline: 'R Data Analysis & Statistical Modelling',
    subtitle: 'Flexible, reproducible and publication-quality analysis using R and RStudio.',
    intro: [
      'R gives full control over every step of an analysis — from importing and reshaping data to modelling and figure design. Because the analysis lives in a script, it can be re-run, checked and extended at any time.',
      'We write clear, commented R code so you can see exactly how each result was produced.',
    ],
    approach: [
      { title: 'Data preparation', text: 'Importing, reshaping, recoding and validating data with transparent, re-runnable code.' },
      { title: 'Statistical testing', text: 'Parametric and non-parametric tests selected for your variables and study design, with assumption checks.' },
      { title: 'Regression modelling', text: 'Linear, logistic and multivariable regression with model diagnostics, odds ratios and confidence intervals.' },
      { title: 'Data visualization', text: 'Figures built with ggplot2: distributions, comparisons, forest plots, ROC curves and survival curves where appropriate.' },
      { title: 'Reproducible scripts', text: 'A documented R script or R Markdown/Quarto report that reproduces every table and figure.' },
      { title: 'Results interpretation', text: 'A written explanation of what the models and tests show, and how to report them.' },
    ],
    deliverables: ['Commented R script or R Markdown/Quarto report', 'Formatted results tables', 'Publication-quality figures (PNG, PDF or TIFF)', 'Written interpretation of results'],
    ctaLabel: 'Get R Analysis Support',
    seoTitle: 'R Data Analysis & Statistical Modelling | ResearchWise Analytics',
    seoDescription:
      'R and RStudio data analysis for research: regression modelling, hypothesis testing, ggplot2 publication-quality graphs and reproducible R scripts.',
  },
  {
    slug: 'data-cleaning',
    title: 'Data Cleaning & Coding',
    shortTitle: 'Data Cleaning & Coding',
    tier: 'primary',
    group: 'analysis',
    icon: Layers,
    summary: 'Prepare your research dataset for accurate and reliable statistical analysis.',
    capabilities: [
      'Data cleaning',
      'Variable coding',
      'Missing-value management',
      'Data validation',
      'Outlier assessment',
      'Variable categorization',
      'Consistency checks',
      'Analysis-ready datasets',
    ],
    highlights: ['Variable coding', 'Missing-value management', 'Validation & consistency checks', 'Analysis-ready datasets'],
    headline: 'Clean Data. Reliable Results.',
    subtitle: 'Careful dataset preparation so that every statistical result rests on accurate, consistent data.',
    intro: [
      'Most errors in statistical results begin in the dataset: inconsistent codes, unlabelled categories, impossible values, duplicated records or missing data treated as zero. Analysis cannot correct these problems — it only carries them forward.',
      'We prepare your dataset systematically and document every change, so the final analysis-ready file is traceable back to your raw data.',
    ],
    approach: [
      { title: 'Missing-value management', text: 'Identify, code and report missing data consistently, and agree an appropriate handling approach.' },
      { title: 'Variable coding', text: 'Consistent numeric codes and value labels for categorical variables, and correct measurement levels.' },
      { title: 'Data validation', text: 'Range checks, valid-value checks and skip-pattern checks against your questionnaire or data dictionary.' },
      { title: 'Duplicate checking', text: 'Detect duplicate participant IDs and repeated records before they inflate your sample.' },
      { title: 'Outlier assessment', text: 'Flag extreme and implausible values for review — not silent deletion.' },
      { title: 'Variable categorization', text: 'Derive age groups, BMI categories, scores and composite variables using stated cut-offs.' },
      { title: 'Consistency checks', text: 'Cross-check related variables (e.g. sex and pregnancy status, dates of events) for logical consistency.' },
      { title: 'Documentation', text: 'A codebook and change log describing every variable and every modification.' },
    ],
    deliverables: ['Analysis-ready dataset (SPSS, Excel, CSV or R format)', 'Codebook / data dictionary', 'Change log of cleaning decisions', 'Summary of data-quality issues found'],
    ctaLabel: 'Prepare My Dataset',
    seoTitle: 'Research Data Cleaning & Coding | ResearchWise Analytics',
    seoDescription:
      'Research data cleaning and coding: missing values, variable coding, validation, duplicate and outlier checks, consistency checks and documented analysis-ready datasets.',
  },
  {
    slug: 'sample-size',
    title: 'Sample Size Calculation',
    shortTitle: 'Sample Size Calculation',
    tier: 'primary',
    group: 'design',
    icon: Calculator,
    summary: 'Study-specific sample size calculation based on research objectives, study design and statistical requirements.',
    capabilities: [
      'Cross-sectional studies',
      'Case-control studies',
      'Cohort studies',
      'Clinical and intervention studies',
      'Prevalence studies',
      'Comparative studies',
      'Custom sample-size calculations',
      'Assumption and methodology documentation',
    ],
    highlights: ['Prevalence & cross-sectional studies', 'Case-control & cohort studies', 'Power-based calculations', 'Documented assumptions'],
    headline: 'Study-Specific Sample Size Calculation',
    subtitle: 'Sample sizes derived from your objectives, study design and justified statistical assumptions — not from a generic number.',
    intro: [
      'There is no single “correct” sample size for a study type. The required number depends on your primary objective, the outcome measure, the expected prevalence or effect size, the confidence level, the power you need and how participants will be sampled.',
      'We calculate the sample size for your specific study, explain each assumption and give you a write-up you can place directly into your protocol.',
    ],
    approach: [
      { title: 'Study design', text: 'Cross-sectional, case-control, cohort, comparative or intervention — each uses a different formula.' },
      { title: 'Expected prevalence or effect', text: 'Drawn from published literature or pilot data, with the source cited.' },
      { title: 'Confidence level', text: 'Usually 95%, with the corresponding critical value stated.' },
      { title: 'Power', text: 'For comparative and analytical designs, typically 80% or 90%, chosen with you.' },
      { title: 'Precision', text: 'Absolute or relative precision for estimation studies, justified for your context.' },
      { title: 'Design effect', text: 'Applied for cluster or multistage sampling where appropriate.' },
      { title: 'Non-response adjustment', text: 'Final sample inflated for an expected non-response or attrition rate.' },
    ],
    deliverables: ['Final sample size with step-by-step calculation', 'Formula and parameter values used', 'Justification and references for assumptions', 'Protocol-ready sample size paragraph'],
    ctaLabel: 'Calculate My Sample Size',
    seoTitle: 'Sample Size Calculation for Research | ResearchWise Analytics',
    seoDescription:
      'Study-specific sample size calculation for cross-sectional, case-control, cohort and intervention studies, with power, precision, design effect and non-response adjustment.',
  },
  {
    slug: 'research-methodology',
    title: 'Research Methodology Support',
    shortTitle: 'Research Methodology',
    tier: 'primary',
    group: 'design',
    icon: Compass,
    summary: 'Methodological guidance from research question to analysis plan.',
    capabilities: [
      'Study design selection',
      'Research objectives',
      'Research questions/hypotheses',
      'Variables and operational definitions',
      'Sampling methodology',
      'Data collection tools',
      'Statistical analysis plan',
      'Research protocol review',
    ],
    highlights: ['Study design selection', 'Variables & operational definitions', 'Sampling methodology', 'Statistical analysis plan'],
    headline: 'Strong Research Starts With Strong Methods',
    subtitle: 'Methodological guidance that connects your research question, study design, data and analysis plan.',
    intro: [
      'Most analysis problems are design problems that surface late. A clear objective, a suitable design, well-defined variables and a pre-specified analysis plan make the statistical work straightforward and defensible.',
      'We review and strengthen your methodology at the planning stage so that the data you collect can actually answer your question.',
    ],
    approach: [
      { title: 'Study design', text: 'Choosing a design that fits the research question, resources and ethical constraints.' },
      { title: 'Objectives & questions', text: 'Specific, measurable objectives and research questions or hypotheses.' },
      { title: 'Variables', text: 'Outcome, exposure and confounding variables with clear operational definitions.' },
      { title: 'Sampling', text: 'Sampling frame, technique and inclusion/exclusion criteria.' },
      { title: 'Data collection tools', text: 'Questionnaire and data-collection-form review for structure, coding and analysability.' },
      { title: 'Statistical analysis plan', text: 'Which test or model will address each objective, specified before data collection.' },
      { title: 'Protocol review', text: 'A structured review of your full protocol with written comments.' },
    ],
    deliverables: ['Written methodological review and recommendations', 'Variable list with operational definitions', 'Statistical analysis plan', 'Comments on data collection tools'],
    ctaLabel: 'Discuss My Study',
    seoTitle: 'Research Methodology Support | ResearchWise Analytics',
    seoDescription:
      'Research methodology support: study design, objectives, hypotheses, variables, sampling, data collection tools, statistical analysis plans and protocol review.',
  },
  {
    slug: 'systematic-review',
    title: 'Systematic Review Support',
    shortTitle: 'Systematic Reviews',
    tier: 'secondary',
    group: 'evidence',
    icon: BookOpenCheck,
    summary: 'Structured support for systematic reviews and evidence synthesis.',
    capabilities: [
      'Research question development',
      'PICO/PECO formulation',
      'Search strategy development',
      'PRISMA guidance',
      'Screening workflow',
      'Data extraction',
      'Risk-of-bias assessment',
      'Evidence synthesis',
      'Meta-analysis support',
    ],
    highlights: ['PICO/PECO formulation', 'Search strategy & PRISMA', 'Risk-of-bias assessment', 'Meta-analysis support'],
    headline: 'Systematic Review Support',
    subtitle: 'Methodical support for each stage of a systematic review, from question to synthesis.',
    intro: [
      'A systematic review is only as strong as its protocol, search and appraisal. We support researchers through each stage using established reporting guidance, while the review question, decisions and authorship remain yours.',
    ],
    approach: [
      { title: 'Question & framework', text: 'Refining the review question with PICO or PECO.' },
      { title: 'Search strategy', text: 'Database-specific search strings with controlled vocabulary and free-text terms.' },
      { title: 'Screening workflow', text: 'Title/abstract and full-text screening process and PRISMA flow documentation.' },
      { title: 'Data extraction', text: 'Structured extraction forms tailored to your outcomes.' },
      { title: 'Risk of bias', text: 'Guidance on appropriate tools for the included study designs.' },
      { title: 'Synthesis & meta-analysis', text: 'Narrative synthesis and, where studies are sufficiently comparable, meta-analysis with forest plots and heterogeneity assessment.' },
    ],
    deliverables: ['Search strategy documentation', 'PRISMA flow diagram', 'Data extraction templates', 'Synthesis or meta-analysis outputs where applicable'],
    ctaLabel: 'Discuss My Review',
    seoTitle: 'Systematic Review Support | ResearchWise Analytics',
    seoDescription:
      'Systematic review support: PICO/PECO, search strategy, PRISMA, screening, data extraction, risk-of-bias assessment, evidence synthesis and meta-analysis.',
  },
  {
    slug: 'scoping-review',
    title: 'Scoping Reviews',
    shortTitle: 'Scoping Reviews',
    tier: 'secondary',
    group: 'evidence',
    icon: MapIcon,
    summary: 'Structured support for scoping reviews and evidence mapping.',
    capabilities: [
      'Research question & PCC framework',
      'Protocol development',
      'Search strategy development',
      'Literature screening',
      'Data charting & extraction',
      'Evidence mapping & synthesis',
      'PRISMA-ScR reporting',
      'JBI methodology guidance',
    ],
    highlights: ['PCC framework', 'Protocol & search strategy', 'Data charting', 'PRISMA-ScR reporting'],
    headline: 'Scoping Review Support',
    subtitle: 'Support for mapping the extent and nature of evidence on a topic, following JBI guidance and PRISMA-ScR.',
    intro: [
      'Scoping reviews map what evidence exists rather than pooling effect estimates. They need a clear Population–Concept–Context question, a transparent protocol and careful data charting. We support each stage while you retain ownership of the review.',
    ],
    approach: [
      { title: 'PCC question', text: 'Framing the review with Population, Concept and Context.' },
      { title: 'Protocol', text: 'A protocol structured according to JBI methodology.' },
      { title: 'Search & screening', text: 'Search strategy development and screening workflow.' },
      { title: 'Data charting', text: 'Charting forms and extraction of study characteristics.' },
      { title: 'Evidence mapping', text: 'Tabular and visual summaries of the evidence landscape.' },
      { title: 'Reporting', text: 'Alignment with the PRISMA-ScR checklist.' },
    ],
    deliverables: ['Protocol structure', 'Search strategy documentation', 'Data charting template', 'Evidence map tables and figures'],
    ctaLabel: 'Discuss My Review',
    seoTitle: 'Scoping Review Support | ResearchWise Analytics',
    seoDescription:
      'Scoping review support: PCC framework, protocol development, search strategy, screening, data charting, evidence mapping and PRISMA-ScR reporting.',
  },
  {
    slug: 'manuscript-thesis',
    title: 'Manuscript & Thesis Support',
    shortTitle: 'Manuscript Support',
    tier: 'secondary',
    group: 'publication',
    icon: FileText,
    summary: 'Professional support to improve the structure, clarity and methodological quality of research documents.',
    capabilities: [
      'Results section development',
      'Tables & figures',
      'Academic language editing',
      'Methodology review',
      'Reference & journal formatting',
      'Statistical interpretation',
      'Manuscript quality checks',
      'Thesis/dissertation review',
    ],
    highlights: ['Results section & tables', 'Statistical interpretation', 'Methodology review', 'Academic language editing'],
    headline: 'Manuscript & Thesis Support',
    subtitle: 'Support to improve the structure, clarity and methodological quality of your own research writing.',
    intro: [
      'We help researchers present their own work clearly — particularly the methods and results, where statistical accuracy matters most. We review, edit and advise; the research and the writing remain yours.',
    ],
    approach: [
      { title: 'Results presentation', text: 'Structuring the results section around your objectives, with accurate statistical reporting.' },
      { title: 'Tables & figures', text: 'Formatting tables and figures to journal or university standards.' },
      { title: 'Methodology review', text: 'Checking that the methods section accurately describes design, sampling and analysis.' },
      { title: 'Language editing', text: 'Academic language editing for clarity and consistency.' },
      { title: 'Formatting', text: 'Reference style and journal or institutional formatting.' },
      { title: 'Quality checks', text: 'Consistency between abstract, methods, results and tables.' },
    ],
    deliverables: ['Edited document with tracked changes', 'Reviewer-style comments', 'Formatted tables and figures'],
    ctaLabel: 'Discuss My Manuscript',
    note: 'We do not write theses, dissertations or manuscripts on a researcher’s behalf. Our support is editorial, methodological and statistical.',
    seoTitle: 'Manuscript & Thesis Support | ResearchWise Analytics',
    seoDescription:
      'Manuscript and thesis support: results presentation, tables and figures, statistical interpretation, methodology review, academic language editing and formatting.',
  },
  {
    slug: 'manuscript-publication',
    title: 'Manuscript Publication Support',
    shortTitle: 'Publication Support',
    tier: 'secondary',
    group: 'publication',
    icon: Send,
    summary: 'End-to-end support to help prepare and submit research manuscripts for publication.',
    capabilities: [
      'Journal selection',
      'Manuscript formatting',
      'Journal guideline compliance',
      'Submission support',
      'Cover letter preparation',
      'Reviewer response guidance',
      'Revision support',
      'Resubmission assistance',
    ],
    highlights: ['Journal selection', 'Guideline compliance', 'Reviewer response guidance', 'Revision & resubmission'],
    headline: 'Manuscript Publication Support',
    subtitle: 'Practical support to prepare, submit and revise your manuscript for an appropriate journal.',
    intro: [
      'Getting a sound study published involves choosing a suitable journal, meeting its requirements precisely and responding well to peer review. We support each of these steps.',
    ],
    approach: [
      { title: 'Journal selection', text: 'Shortlisting suitable, legitimate journals based on scope, audience and article type.' },
      { title: 'Formatting & compliance', text: 'Aligning the manuscript with author guidelines and reporting checklists.' },
      { title: 'Submission', text: 'Cover letter preparation and guidance through the submission system.' },
      { title: 'Peer review', text: 'Structuring point-by-point responses to reviewer comments.' },
      { title: 'Revision & resubmission', text: 'Support with revisions, including statistical re-analysis where reviewers request it.' },
    ],
    deliverables: ['Journal shortlist with rationale', 'Formatted manuscript', 'Cover letter draft', 'Response-to-reviewers framework'],
    ctaLabel: 'Discuss My Manuscript',
    note: 'Publication decisions are made by journals and their peer reviewers. We do not guarantee acceptance or publication.',
    seoTitle: 'Manuscript Publication Support | ResearchWise Analytics',
    seoDescription:
      'Manuscript publication support: journal selection, formatting, guideline compliance, cover letters, reviewer response guidance and resubmission support.',
  },
  {
    slug: 'turnitin',
    title: 'Turnitin Similarity Checking',
    shortTitle: 'Turnitin',
    tier: 'secondary',
    group: 'publication',
    icon: FileSearch,
    summary: 'Similarity checking and academic originality review using Turnitin.',
    capabilities: [
      'Similarity report',
      'Source identification',
      'Similarity percentage review',
      'Matching-source analysis',
      'Citation and referencing review',
      'Guidance on addressing inappropriate similarity',
    ],
    highlights: ['Similarity report', 'Matching-source analysis', 'Citation & referencing review', 'Guidance on appropriate revision'],
    headline: 'Similarity Checking & Academic Originality Review',
    subtitle: 'A Turnitin similarity report with a clear explanation of what the matches mean and how to address them appropriately.',
    intro: [
      'A similarity percentage on its own says little. Matches may come from correctly quoted and cited material, standard methodological phrases, your own previously submitted work, or text that genuinely needs proper attribution or rewriting in your own words.',
      'We run the check, review the matching sources with you and explain where citation, quotation or your own revision is needed.',
    ],
    approach: [
      { title: 'Similarity report', text: 'A Turnitin report for your document.' },
      { title: 'Source identification', text: 'Which sources the matches come from and how significant each is.' },
      { title: 'Percentage review', text: 'Interpreting the overall percentage in the context of your institution’s or journal’s own policy.' },
      { title: 'Citation review', text: 'Identifying matches that need correct quotation or referencing.' },
      { title: 'Guidance', text: 'Advice on how to address inappropriate similarity through proper attribution and your own rewriting.' },
    ],
    deliverables: ['Turnitin similarity report', 'Summary of key matching sources', 'Written guidance on citation and revision'],
    ctaLabel: 'Request a Similarity Check',
    note: 'We do not offer plagiarism removal or guarantee any similarity percentage. Acceptable similarity is defined by your institution or journal, and responsibility for originality rests with the author.',
    seoTitle: 'Turnitin Similarity Checking | ResearchWise Analytics',
    seoDescription:
      'Turnitin similarity checking and academic originality review: similarity report, source identification, citation review and guidance on addressing similarity appropriately.',
  },
]

export const primaryServices = services.filter((s) => s.tier === 'primary')
export const secondaryServices = services.filter((s) => s.tier === 'secondary')

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}
