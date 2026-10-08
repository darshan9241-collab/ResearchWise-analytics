// Shared content for data-analysis sections (home page + /data-analysis).

export const coreAreas = [
  { n: '01', title: 'Data Cleaning & Coding', text: 'Prepare datasets for reliable statistical analysis.' },
  { n: '02', title: 'Statistical Analysis', text: 'Apply appropriate descriptive and inferential statistical methods.' },
  { n: '03', title: 'Statistical Modelling', text: 'Perform regression, association analysis and appropriate statistical modelling.' },
  { n: '04', title: 'Results & Interpretation', text: 'Convert statistical output into clear research findings.' },
]

export const workflowSteps = [
  { n: '01', title: 'Research Question', text: 'Clarify the objective each analysis must answer.' },
  { n: '02', title: 'Study Design & Variables', text: 'Identify design, outcomes, exposures and variable types.' },
  { n: '03', title: 'Data Cleaning & Coding', text: 'Validate, code and document the dataset.' },
  { n: '04', title: 'Exploratory Data Analysis', text: 'Examine distributions, missingness and outliers.' },
  { n: '05', title: 'Statistical Test Selection', text: 'Match tests to design, variables and assumptions.' },
  { n: '06', title: 'Statistical Analysis', text: 'Run the tests and models, checking assumptions.' },
  { n: '07', title: 'Interpretation', text: 'Explain effect sizes, intervals and significance.' },
  { n: '08', title: 'Publication-Ready Tables & Figures', text: 'Format results to journal standards.' },
]

export const methodCategories = [
  {
    title: 'Descriptive Analysis',
    code: 'DESC',
    methods: ['Frequencies', 'Percentages', 'Mean', 'Median', 'Standard deviation', 'Interquartile range', 'Distribution assessment'],
  },
  {
    title: 'Comparative Analysis',
    code: 'COMP',
    methods: ['Chi-square test', 'Fisher’s exact test', 'Independent t-test', 'Paired t-test', 'ANOVA', 'Mann-Whitney U', 'Kruskal-Wallis'],
  },
  {
    title: 'Association & Correlation',
    code: 'ASSOC',
    methods: ['Pearson correlation', 'Spearman correlation', 'Association analysis'],
  },
  {
    title: 'Regression & Modelling',
    code: 'MODEL',
    methods: ['Linear regression', 'Logistic regression', 'Multivariable regression', 'Odds ratios', 'Confidence intervals', 'Model assessment'],
  },
]

export const spssList = [
  'Data preparation',
  'Descriptive statistics',
  'Frequencies and percentages',
  'Chi-square',
  'Fisher’s exact test',
  't-tests',
  'ANOVA',
  'Correlation',
  'Regression analysis',
  'Logistic regression',
  'Non-parametric tests',
  'Publication-ready tables',
  'Statistical interpretation',
]

export const rList = [
  'Data preparation',
  'Statistical testing',
  'Regression modelling',
  'Advanced analysis',
  'Data visualization',
  'Publication-quality figures',
  'Reproducible R scripts',
  'Automated workflows',
  'Results interpretation',
]

export const cleaningList = [
  'Missing-value management',
  'Variable coding',
  'Data validation',
  'Duplicate checking',
  'Outlier assessment',
  'Variable categorization',
  'Consistency checks',
  'Data documentation',
  'Analysis-ready dataset preparation',
]

export const sampleSizeList = [
  'Cross-sectional studies',
  'Prevalence studies',
  'Case-control studies',
  'Cohort studies',
  'Comparative studies',
  'Clinical/intervention studies',
  'Power-based calculations',
  'Non-response adjustment',
  'Design effect where applicable',
]

export const methodologyList = [
  'Study design',
  'Research objectives',
  'Research questions',
  'Hypotheses',
  'Variables',
  'Operational definitions',
  'Sampling',
  'Data collection tools',
  'Statistical analysis plan',
  'Protocol review',
]

export const principles = [
  { n: '01', title: 'Scientific Rigor', text: 'Every analysis follows from the research question and study design, with assumptions checked rather than assumed.' },
  { n: '02', title: 'Appropriate Statistical Methods', text: 'Tests and models are chosen for your variables and data — not for the most impressive-sounding technique.' },
  { n: '03', title: 'Clear Interpretation', text: 'Results are explained in research language: effect sizes, confidence intervals and what they mean for your question.' },
  { n: '04', title: 'Research Integrity', text: 'We report what the data show. We never fabricate, manipulate or selectively report results.' },
]

export const audiences = [
  'Public health researchers',
  'Medical researchers',
  'Nursing researchers',
  'Nutrition researchers',
  'Life-science researchers',
  'Epidemiologists',
  'Clinical researchers',
  'Healthcare professionals',
  'Postgraduate students',
  'PhD scholars',
  'Academic researchers',
  'Research teams and organizations',
]

export const dataAnalysisFaq = [
  {
    q: 'What do I need to share to get started?',
    a: 'A short description of your study, your objectives, and your dataset (Excel, SPSS, CSV or similar). A questionnaire or data dictionary helps us understand your variables. If you are still planning, we can start from your protocol.',
  },
  {
    q: 'Should I choose SPSS or R?',
    a: 'Both produce valid results. SPSS suits researchers who want output in a familiar format; R suits those who need reproducible scripts, complex models or highly customised figures. If your institution or supervisor prefers one, we use that.',
  },
  {
    q: 'Will you tell me which statistical test to use?',
    a: 'Yes. Test selection depends on your research question, study design, variable types and data distribution. We explain why a test is appropriate so that you can justify it in your methods section.',
  },
  {
    q: 'Do you guarantee significant results?',
    a: 'No. We apply appropriate methods and report what your data show. Non-significant results are valid findings, and we help you interpret and report them correctly.',
  },
  {
    q: 'Is my data kept confidential?',
    a: 'Your dataset is used only for your analysis. We recommend removing direct identifiers such as names and phone numbers before sharing data, and we can advise on how to do this.',
  },
  {
    q: 'Can you help after I receive reviewer comments?',
    a: 'Yes. If reviewers ask for additional analyses, changes to models or clarification of statistical methods, we can support the re-analysis and help you structure your response.',
  },
]
