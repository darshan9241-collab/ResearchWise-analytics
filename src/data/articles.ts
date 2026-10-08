import type { ArticleSlug } from '../config/routes'

export const articleCategories = [
  'SPSS',
  'R',
  'Biostatistics',
  'Statistical Tests',
  'Data Cleaning',
  'Regression',
  'Data Visualization',
  'Research Methodology',
  'Systematic Reviews',
  'Scoping Reviews',
  'Publication',
] as const

export type ArticleCategory = (typeof articleCategories)[number]

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'table'; head: string[]; rows: string[][] }

export interface Article {
  slug: ArticleSlug
  title: string
  category: ArticleCategory
  excerpt: string
  minutes: number
  body: Block[]
}

export const articles: Article[] = [
  {
    slug: 'which-statistical-test-should-i-use',
    title: 'Which Statistical Test Should I Use?',
    category: 'Statistical Tests',
    excerpt: 'A practical guide to matching your research question, outcome variable and study design to the right test.',
    minutes: 6,
    body: [
      { type: 'p', text: 'Choosing a statistical test is not a matter of preference. It follows from three questions: what is your research question asking, what type is your outcome variable, and how are your groups or measurements structured?' },
      { type: 'h2', text: '1. Identify the type of outcome variable' },
      { type: 'ul', items: ['Categorical (e.g. disease yes/no, education level) — summarised with counts and percentages.', 'Continuous (e.g. blood pressure, BMI, age) — summarised with mean and SD or median and IQR, depending on distribution.'] },
      { type: 'h2', text: '2. Identify what you are comparing' },
      { type: 'p', text: 'Are you comparing two groups, more than two groups, the same participants measured twice, or examining the relationship between two continuous variables?' },
      { type: 'h2', text: '3. Check assumptions' },
      { type: 'p', text: 'Parametric tests such as the t-test and ANOVA assume an approximately normal distribution within groups (or a reasonably large sample) and, for some versions, similar variances. When these assumptions are clearly violated, use the non-parametric alternative.' },
      { type: 'h2', text: 'Quick reference' },
      {
        type: 'table',
        head: ['Situation', 'Parametric', 'Non-parametric / alternative'],
        rows: [
          ['Two categorical variables', 'Chi-square test', 'Fisher’s exact test (small expected counts)'],
          ['Continuous outcome, 2 independent groups', 'Independent t-test', 'Mann-Whitney U'],
          ['Continuous outcome, 2 paired measurements', 'Paired t-test', 'Wilcoxon signed-rank'],
          ['Continuous outcome, 3+ independent groups', 'One-way ANOVA', 'Kruskal-Wallis'],
          ['Two continuous variables', 'Pearson correlation', 'Spearman correlation'],
          ['Binary outcome, several predictors', 'Binary logistic regression', '—'],
          ['Continuous outcome, several predictors', 'Multiple linear regression', '—'],
        ],
      },
      { type: 'p', text: 'This table is a starting point. Clustered data, repeated measures over time, time-to-event outcomes and very small samples need more specific approaches.' },
    ],
  },
  {
    slug: 'chi-square-vs-fishers-exact-test',
    title: 'Chi-Square vs Fisher’s Exact Test',
    category: 'Statistical Tests',
    excerpt: 'Both test the association between categorical variables. The choice depends on your expected cell counts.',
    minutes: 4,
    body: [
      { type: 'p', text: 'The chi-square test of independence and Fisher’s exact test both assess whether two categorical variables are associated. The chi-square test relies on a large-sample approximation; Fisher’s exact test calculates the probability directly.' },
      { type: 'h2', text: 'The expected-count rule' },
      { type: 'p', text: 'The chi-square approximation is considered unreliable when more than 20% of cells have an expected count below 5, or any cell has an expected count below 1. Note that this refers to expected counts, not the observed counts in your table. SPSS reports this in a footnote under the Chi-Square Tests table.' },
      { type: 'h2', text: 'When to use which' },
      { type: 'ul', items: ['Use the Pearson chi-square test when expected counts are adequate.', 'Use Fisher’s exact test for 2×2 tables with small expected counts.', 'For larger tables with small expected counts, an exact test (the Fisher–Freeman–Halton extension) is available in SPSS through the Exact option or in R with fisher.test().', 'Consider whether sparse categories can be meaningfully combined — but only if this makes sense conceptually.'] },
      { type: 'h2', text: 'Reporting' },
      { type: 'p', text: 'Report the counts and percentages for each group, the test used, the test statistic (for chi-square, with degrees of freedom) and the p-value. State in your methods which test was used and why.' },
    ],
  },
  {
    slug: 'when-to-use-logistic-regression',
    title: 'When Should You Use Logistic Regression?',
    category: 'Regression',
    excerpt: 'Logistic regression models a binary outcome while accounting for several explanatory variables at once.',
    minutes: 5,
    body: [
      { type: 'p', text: 'Binary logistic regression is used when the outcome has two categories — for example, hypertension present or absent — and you want to examine its association with one or more explanatory variables.' },
      { type: 'h2', text: 'Typical reasons to use it' },
      { type: 'ul', items: ['To estimate the association between an exposure and a binary outcome while adjusting for confounders.', 'To identify factors independently associated with an outcome.', 'To build a model that predicts the probability of an outcome.'] },
      { type: 'h2', text: 'Crude vs adjusted estimates' },
      { type: 'p', text: 'A crude (unadjusted) odds ratio examines one variable at a time. An adjusted odds ratio from a multivariable model estimates the association while holding the other variables in the model constant. Reporting both helps readers see how adjustment changes the estimate.' },
      { type: 'h2', text: 'Points to check' },
      { type: 'ul', items: ['Enough outcome events: a commonly cited guide is around 10 events per predictor variable, though this is a rule of thumb rather than a strict requirement.', 'Variable selection should be guided by subject knowledge and the research question, not by p-values alone.', 'Check for multicollinearity between predictors.', 'Assess model fit (e.g. Hosmer–Lemeshow test, classification table or area under the ROC curve, depending on the purpose).'] },
      { type: 'p', text: 'If the outcome has more than two unordered categories, multinomial logistic regression is used; for ordered categories, ordinal logistic regression.' },
    ],
  },
  {
    slug: 'how-to-interpret-odds-ratios',
    title: 'How to Interpret Odds Ratios',
    category: 'Biostatistics',
    excerpt: 'What an odds ratio of 2.1 actually means, how to read its confidence interval, and when odds are not risks.',
    minutes: 5,
    body: [
      { type: 'p', text: 'An odds ratio (OR) compares the odds of an outcome in one group with the odds in a reference group.' },
      { type: 'ul', items: ['OR = 1: no difference in odds between groups.', 'OR > 1: higher odds of the outcome in the comparison group.', 'OR < 1: lower odds of the outcome in the comparison group.'] },
      { type: 'h2', text: 'Worked example' },
      { type: 'p', text: '“Smokers had higher odds of hypertension than non-smokers (adjusted OR 2.10, 95% CI 1.32–3.35).” This means the odds of hypertension among smokers were about 2.1 times the odds among non-smokers, after adjusting for the other variables in the model.' },
      { type: 'h2', text: 'Reading the confidence interval' },
      { type: 'p', text: 'If the 95% confidence interval does not include 1, the association is statistically significant at the 5% level. The width of the interval shows the precision of the estimate: a very wide interval (e.g. 1.05–14.8) indicates considerable uncertainty, often due to a small sample or few events.' },
      { type: 'h2', text: 'Odds are not risks' },
      { type: 'p', text: 'It is incorrect to say smokers were “2.1 times more likely” to have hypertension unless the outcome is rare. When an outcome is common (roughly above 10%), the odds ratio overstates the relative risk. Use the language of odds, or report prevalence or risk ratios where the design allows.' },
      { type: 'h2', text: 'Always state the reference category' },
      { type: 'p', text: 'An OR is meaningless without knowing what it is compared to. Mark the reference category clearly in your results table (commonly with “1.00 (ref)”).' },
    ],
  },
  {
    slug: 'mean-vs-median',
    title: 'Mean vs Median: Which Should You Report?',
    category: 'Biostatistics',
    excerpt: 'The right summary depends on the shape of your data. Here is how to decide — and how to justify it.',
    minutes: 4,
    body: [
      { type: 'p', text: 'Both the mean and the median describe the centre of a distribution, but they behave very differently when data are skewed or contain extreme values.' },
      { type: 'h2', text: 'Report mean (SD) when' },
      { type: 'ul', items: ['The variable is approximately symmetric and roughly normally distributed.', 'There are no extreme values distorting the average.'] },
      { type: 'h2', text: 'Report median (IQR) when' },
      { type: 'ul', items: ['The distribution is clearly skewed — common for income, length of hospital stay, lab values and costs.', 'There are outliers that would pull the mean away from the typical value.', 'The variable is ordinal, such as a single Likert item.'] },
      { type: 'h2', text: 'How to check' },
      { type: 'p', text: 'Look at a histogram and a box plot, compare the mean and median, and consider skewness. Formal normality tests (Shapiro–Wilk, Kolmogorov–Smirnov) can support the decision but become oversensitive in large samples, so do not rely on them alone.' },
      { type: 'h2', text: 'Be consistent' },
      { type: 'p', text: 'The summary should match the test: mean (SD) with t-tests and ANOVA; median (IQR) with Mann-Whitney U or Kruskal-Wallis. State your approach in the methods section.' },
    ],
  },
  {
    slug: 'spss-data-cleaning-checklist',
    title: 'SPSS Data Cleaning Checklist',
    category: 'Data Cleaning',
    excerpt: 'A step-by-step checklist to prepare an SPSS dataset before running a single statistical test.',
    minutes: 5,
    body: [
      { type: 'p', text: 'Work on a copy of your raw data, and keep a record of every change. A dataset you cannot trace back to its source is a dataset you cannot defend.' },
      { type: 'h2', text: 'Variable View' },
      { type: 'ul', items: ['Give each variable a short name and a full descriptive label.', 'Add value labels for every categorical code (e.g. 1 = Male, 2 = Female).', 'Set the correct measurement level: Nominal, Ordinal or Scale.', 'Define user-missing values (e.g. 99 = No response) so they are not analysed as real values.'] },
      { type: 'h2', text: 'Checks to run' },
      { type: 'ul', items: ['Frequencies for every categorical variable — look for unexpected codes.', 'Descriptives (min, max) for continuous variables — look for impossible values such as age 250.', 'Identify duplicate cases on the participant ID (Data → Identify Duplicate Cases).', 'Cross-tabulate related variables to check logical consistency.', 'Check that skip patterns from the questionnaire were followed.'] },
      { type: 'h2', text: 'Derived variables' },
      { type: 'ul', items: ['Use Transform → Recode into Different Variables, so the original is preserved.', 'Document the cut-offs used for age groups, BMI categories or score categories, with a reference.', 'Re-run frequencies on every new variable to verify the recode worked.'] },
      { type: 'h2', text: 'Before analysis' },
      { type: 'p', text: 'Save the cleaned file with a new name, export a codebook (File → Display Data File Information) and keep the syntax used for cleaning. Syntax makes your cleaning reproducible.' },
    ],
  },
  {
    slug: 'spss-vs-r-for-research',
    title: 'SPSS vs R: Which Is Better for Research?',
    category: 'R',
    excerpt: 'Neither is “better” in general. The right choice depends on your analysis, your workflow and your institution.',
    minutes: 4,
    body: [
      { type: 'p', text: 'SPSS and R both run standard statistical analyses correctly. For most descriptive, comparative and regression analyses in health research, they produce the same results.' },
      {
        type: 'table',
        head: ['', 'SPSS', 'R'],
        rows: [
          ['Interface', 'Menus with optional syntax', 'Code-based (RStudio IDE)'],
          ['Learning curve', 'Gentler for beginners', 'Steeper initially'],
          ['Reproducibility', 'Good if syntax is saved', 'Built-in through scripts'],
          ['Graphics', 'Standard charts', 'Highly customisable (ggplot2)'],
          ['Advanced methods', 'Wide range; some need add-on modules', 'Very wide range through packages'],
          ['Cost', 'Commercial licence', 'Free and open source'],
        ],
      },
      { type: 'h2', text: 'Choose SPSS when' },
      { type: 'ul', items: ['Your supervisor, department or team uses SPSS.', 'You want to open and explore output in a familiar format.'] },
      { type: 'h2', text: 'Choose R when' },
      { type: 'ul', items: ['You need a fully reproducible analysis.', 'You need customised publication-quality figures.', 'Your analysis requires methods outside standard SPSS modules.'] },
    ],
  },
  {
    slug: 'common-errors-in-statistical-analysis',
    title: 'Common Errors in Statistical Analysis',
    category: 'Biostatistics',
    excerpt: 'Frequent mistakes that reviewers notice — and how to avoid them in your own analysis.',
    minutes: 6,
    body: [
      { type: 'ul', items: [
        'Using an independent t-test on paired data (or the reverse). Before-and-after measurements on the same participants need a paired test.',
        'Running multiple t-tests instead of ANOVA when comparing three or more groups, which inflates the chance of a false-positive finding.',
        'Ignoring test assumptions, such as using a t-test on heavily skewed data with a small sample.',
        'Reporting p-values without effect sizes or confidence intervals. A p-value does not tell you how large or important an effect is.',
        'Interpreting a non-significant result as proof of no effect. It may reflect limited power.',
        'Describing odds ratios as “times more likely” when the outcome is common.',
        'Selecting variables for a multivariable model only by p-value, without considering confounding or the research question.',
        'Treating missing-value codes (e.g. 99) as real data.',
        'Reporting percentages without the denominator, especially when there are missing data.',
        'Presenting causal conclusions from cross-sectional data.',
      ] },
      { type: 'p', text: 'Most of these errors are avoided by writing a statistical analysis plan before analysis begins and checking each step against the study design.' },
    ],
  },
  {
    slug: 'how-to-present-regression-results',
    title: 'How to Present Regression Results',
    category: 'Regression',
    excerpt: 'A clear structure for regression tables, plus the details reviewers expect in your text.',
    minutes: 5,
    body: [
      { type: 'p', text: 'A regression table should allow a reader to see each variable, its reference category, the estimate, its precision and its significance at a glance.' },
      { type: 'h2', text: 'Example logistic regression table (illustrative)' },
      {
        type: 'table',
        head: ['Variable', 'Crude OR (95% CI)', 'Adjusted OR (95% CI)', 'p'],
        rows: [
          ['Age ≥ 40 years (ref: < 40)', '2.41 (1.58–3.67)', '1.96 (1.24–3.10)', '0.004'],
          ['Current smoker (ref: no)', '2.35 (1.52–3.63)', '2.10 (1.32–3.35)', '0.002'],
          ['BMI ≥ 25 kg/m² (ref: < 25)', '1.82 (1.20–2.76)', '1.54 (0.99–2.40)', '0.056'],
        ],
      },
      { type: 'h2', text: 'Include' },
      { type: 'ul', items: ['The reference category for every categorical variable.', 'Estimates with 95% confidence intervals, rounded consistently (usually two decimals).', 'The variables adjusted for, stated in a footnote.', 'The sample size included in the model, which may differ from the full sample because of missing data.', 'A measure of model fit appropriate to the model type.'] },
      { type: 'h2', text: 'In the text' },
      { type: 'p', text: 'Highlight the key findings in words, using the adjusted estimates, rather than repeating every number in the table.' },
    ],
  },
  {
    slug: 'publication-ready-graphs',
    title: 'How to Create Publication-Ready Graphs',
    category: 'Data Visualization',
    excerpt: 'Principles for figures that are accurate, readable and accepted by journals.',
    minutes: 4,
    body: [
      { type: 'h2', text: 'Choose the right chart' },
      { type: 'ul', items: ['Distribution of one continuous variable: histogram or box plot.', 'Comparison across groups: box plot, or dot plot with confidence intervals.', 'Relationship between two continuous variables: scatter plot.', 'Effect estimates from several studies or models: forest plot.', 'Diagnostic accuracy: ROC curve.', 'Time-to-event data: Kaplan-Meier curve.'] },
      { type: 'h2', text: 'Design for clarity' },
      { type: 'ul', items: ['Label axes with variable names and units.', 'Remove 3D effects, heavy gridlines and decoration.', 'Use colour sparingly, and make sure the figure still works in greyscale.', 'Show uncertainty: confidence intervals or error bars, with the type stated in the legend.', 'Start bar-chart axes at zero.'] },
      { type: 'h2', text: 'Meet journal requirements' },
      { type: 'p', text: 'Check the required file format (often TIFF, EPS or PDF), resolution (commonly at least 300 dpi for images) and figure dimensions. Producing figures in R with ggplot2 makes it easy to export at an exact size and resolution.' },
    ],
  },
]

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}
