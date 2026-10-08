import type { ArticleSlug } from '../config/routes'
import { S, type Source } from './sources'

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
  /** Published sources the article is based on. */
  sources: Source[]
}

export const articles: Article[] = [
  {
    slug: 'which-statistical-test-should-i-use',
    sources: [S.kirkwood, S.altmanBook, S.sampl],
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
    sources: [S.cochran1954, S.kimChi, S.kirkwood],
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
    sources: [S.hosmer, S.peduzzi, S.vittinghoff],
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
    sources: [S.blandOR, S.zhangYu, S.kirkwood],
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
    sources: [S.blandNormal, S.sampl, S.altmanBook],
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
    sources: [S.vandenBroeck, S.ibmSpss, S.pallant],
    title: 'SPSS Data Cleaning Checklist',
    category: 'SPSS',
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
    sources: [S.ibmSpss, S.rCore, S.goodEnough],
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
    sources: [S.greenland, S.absence, S.blandBonferroni, S.sampl],
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
    sources: [S.sampl, S.strobe, S.hosmer],
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
    sources: [S.weissgerber, S.ggplot2, S.blandKM],
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
      { type: 'h2', text: 'Show the data, not just the mean' },
      { type: 'p', text: 'For continuous outcomes — especially in small samples — bar graphs of means can hide the distribution, outliers and sample size. Dot plots, box plots or violin plots that show individual values give readers a more honest picture of the data.' },
    ],
  },

  // ─── SPSS ──────────────────────────────────────────────────────────────────
  {
    slug: 'how-to-report-spss-output',
    sources: [S.ibmSpss, S.sampl, S.field],
    title: 'How to Report SPSS Output in Your Results Section',
    category: 'SPSS',
    excerpt: 'Which numbers to take from SPSS tables — and which to leave out — when writing up chi-square, t-test, ANOVA and logistic regression results.',
    minutes: 6,
    body: [
      { type: 'p', text: 'SPSS produces far more output than a results section needs. Pasting raw output tables into a thesis or manuscript is rarely acceptable; instead, extract the key statistics and present them in a formatted table or sentence.' },
      { type: 'h2', text: 'Chi-square test (Crosstabs)' },
      { type: 'ul', items: ['Report counts and percentages for each group from the Crosstabulation table.', 'From the Chi-Square Tests table, report the Pearson Chi-Square value, its degrees of freedom (df) and the two-sided p-value.', 'Check the footnote on expected counts. If expected counts are too small, report Fisher’s Exact Test instead.'] },
      { type: 'h2', text: 'Independent-samples t-test' },
      { type: 'ul', items: ['Report the mean and standard deviation for each group (Group Statistics table).', 'In the Independent Samples Test table, look first at Levene’s Test for Equality of Variances. If it suggests unequal variances, use the “Equal variances not assumed” row (the Welch test).', 'Report t, df, the p-value, and the mean difference with its 95% confidence interval.'] },
      { type: 'h2', text: 'One-way ANOVA' },
      { type: 'p', text: 'Report F with both degrees of freedom — for example F(2, 147) — and the p-value. If the result is significant and post hoc comparisons were planned, report which groups differed and the method used.' },
      { type: 'h2', text: 'Binary logistic regression' },
      { type: 'ul', items: ['In the “Variables in the Equation” table, Exp(B) is the odds ratio.', 'Tick “CI for exp(B)” in the Options dialog so SPSS reports the 95% confidence interval — it is not shown by default.', 'Report the number of cases included in the model (Case Processing Summary), since cases with missing values are excluded.', 'State the reference category for each categorical variable.'] },
      { type: 'h2', text: 'p = .000 is never correct' },
      { type: 'p', text: 'SPSS displays “.000” when a p-value is smaller than 0.0005. A p-value is never exactly zero, so report it as p < 0.001.' },
    ],
  },

  // ─── R ─────────────────────────────────────────────────────────────────────
  {
    slug: 'reproducible-analysis-in-r',
    sources: [S.goodEnough, S.r4ds, S.rCore],
    title: 'Reproducible Analysis in R: A Practical Starting Point',
    category: 'R',
    excerpt: 'Simple habits that make an R analysis easy to re-run, check and extend — months or years later.',
    minutes: 5,
    body: [
      { type: 'p', text: 'A reproducible analysis is one where someone else — or you, later — can run the same code on the same data and obtain the same results. In R this does not require advanced tools, only a few consistent habits.' },
      { type: 'h2', text: 'Organise the project' },
      { type: 'ul', items: ['Use an RStudio Project so that every file path is relative to the project folder.', 'Keep the raw data in its own folder and never edit it by hand; all changes should happen in code.', 'Separate folders for data, scripts and outputs make the workflow easy to follow.'] },
      { type: 'h2', text: 'Write scripts, not console commands' },
      { type: 'ul', items: ['Save every step — import, cleaning, analysis, figures — in scripts that run from top to bottom.', 'Comment the reasons for decisions, not just what the code does.', 'Use set.seed() before anything involving random numbers, such as bootstrapping or multiple imputation.'] },
      { type: 'h2', text: 'Record the environment' },
      { type: 'p', text: 'Results can change between package versions. Record the versions used — sessionInfo() prints them — or manage them with a tool such as renv.' },
      { type: 'h2', text: 'Combine code and results' },
      { type: 'p', text: 'R Markdown or Quarto documents mix code, results and text, so tables and figures in a report are generated directly from the analysis rather than copied by hand.' },
    ],
  },

  // ─── Biostatistics ─────────────────────────────────────────────────────────
  {
    slug: 'p-values-and-confidence-intervals',
    sources: [S.greenland, S.asaP, S.absence],
    title: 'P-Values and Confidence Intervals: What They Really Mean',
    category: 'Biostatistics',
    excerpt: 'Common misinterpretations of p-values and confidence intervals — and how to report them correctly.',
    minutes: 5,
    body: [
      { type: 'p', text: 'P-values and confidence intervals are the most frequently reported statistics in health research, and among the most frequently misinterpreted. The American Statistical Association issued a formal statement on p-values in 2016 to address this.' },
      { type: 'h2', text: 'What a p-value is' },
      { type: 'p', text: 'A p-value indicates how compatible the data are with a specified statistical model — usually one assuming no effect. A small p-value means the data would be unusual if that model were true.' },
      { type: 'h2', text: 'What a p-value is not' },
      { type: 'ul', items: ['It is not the probability that the null hypothesis is true.', 'It does not measure the size or importance of an effect.', 'p = 0.05 is not a natural boundary between “real” and “no” effect.', 'A non-significant result is not evidence of no effect — it may reflect a small or imprecise study.'] },
      { type: 'h2', text: 'Why confidence intervals help' },
      { type: 'p', text: 'A 95% confidence interval shows the range of effect sizes reasonably compatible with the data. A wide interval signals imprecision. An interval that includes both trivial and important effects means the study cannot distinguish between them.' },
      { type: 'h2', text: 'How to report' },
      { type: 'ul', items: ['Report the effect estimate with its 95% confidence interval.', 'Give exact p-values (e.g. p = 0.034) rather than only “p < 0.05”; use p < 0.001 for very small values.', 'Interpret results in light of study design, data quality and prior evidence — not significance alone.'] },
    ],
  },

  // ─── Data Cleaning ─────────────────────────────────────────────────────────
  {
    slug: 'handling-missing-data',
    sources: [S.sterneMI, S.vandenBroeck, S.strobe],
    title: 'Handling Missing Data in Research',
    category: 'Data Cleaning',
    excerpt: 'Why missing data matter, the main types of missingness, and which handling approaches are — and are not — appropriate.',
    minutes: 6,
    body: [
      { type: 'p', text: 'Almost every research dataset has missing values. How they are handled can change results, so the approach should be planned and reported, not left to software defaults.' },
      { type: 'h2', text: 'Three types of missingness' },
      {
        type: 'table',
        head: ['Type', 'Meaning'],
        rows: [
          ['Missing completely at random (MCAR)', 'Missingness is unrelated to any data, observed or unobserved.'],
          ['Missing at random (MAR)', 'Missingness can be explained by other observed variables.'],
          ['Missing not at random (MNAR)', 'Missingness depends on the unobserved value itself.'],
        ],
      },
      { type: 'h2', text: 'Common approaches' },
      { type: 'ul', items: [
        'Complete-case analysis: uses only participants with no missing values. Simple, but loses power and can be biased when data are not MCAR.',
        'Mean imputation and other single imputation: generally not recommended, because they understate uncertainty and can distort relationships between variables.',
        'Multiple imputation: creates several plausible completed datasets and combines the results. Valid under MAR when the imputation model is appropriate, but it must be done and reported carefully.',
      ] },
      { type: 'h2', text: 'What to report' },
      { type: 'ul', items: ['The number of participants with missing data for each key variable.', 'How missing data were handled, and why.', 'For multiple imputation: the variables in the imputation model and the number of imputations.', 'Sensitivity analyses, where the conclusions might depend on the method used.'] },
      { type: 'p', text: 'Reporting guidelines such as STROBE explicitly ask authors to explain how missing data were addressed.' },
    ],
  },

  // ─── Research Methodology ──────────────────────────────────────────────────
  {
    slug: 'choosing-a-study-design',
    sources: [S.grimes, S.mann, S.strobe],
    title: 'Choosing the Right Study Design',
    category: 'Research Methodology',
    excerpt: 'Cross-sectional, case-control, cohort or trial? How your research question determines the design — and what each design can and cannot tell you.',
    minutes: 6,
    body: [
      { type: 'p', text: 'The study design determines what kind of conclusions your data can support. It should follow from the research question, not from convenience.' },
      { type: 'h2', text: 'Observational or experimental?' },
      { type: 'p', text: 'If the investigator assigns the exposure or intervention, the study is experimental (for example, a randomised controlled trial). If the investigator only observes, it is observational.' },
      {
        type: 'table',
        head: ['Design', 'Typical question', 'Main strength', 'Main limitation'],
        rows: [
          ['Cross-sectional', 'How common is a condition, and what is it associated with?', 'Quick; estimates prevalence', 'Cannot establish which came first'],
          ['Case-control', 'Are past exposures associated with a (often rare) outcome?', 'Efficient for rare outcomes', 'Prone to recall and selection bias; gives odds ratios'],
          ['Cohort', 'Does an exposure precede and predict an outcome?', 'Establishes temporal sequence; measures incidence', 'Costly and slow for rare outcomes'],
          ['Randomised controlled trial', 'Does an intervention cause a change in outcome?', 'Randomisation balances known and unknown confounders', 'Not always ethical or feasible'],
        ],
      },
      { type: 'h2', text: 'Matching design to analysis' },
      { type: 'p', text: 'Each design implies particular measures of association: prevalence and prevalence ratios for cross-sectional studies, odds ratios for case-control studies, and risk ratios or hazard ratios for cohort studies and trials. Planning this link early makes the statistical analysis plan straightforward.' },
    ],
  },
  {
    slug: 'why-sample-size-calculation-matters',
    sources: [S.lwanga, S.charan, S.kirkwood],
    title: 'Why Sample Size Calculation Matters',
    category: 'Research Methodology',
    excerpt: 'What goes into a sample size calculation, a worked prevalence example, and the adjustments that are often forgotten.',
    minutes: 5,
    body: [
      { type: 'p', text: 'A study that is too small may miss important effects and produce imprecise estimates. A study that is too large wastes resources and exposes more participants than necessary. A justified sample size calculation is also a standard requirement of ethics committees and journals.' },
      { type: 'h2', text: 'What the calculation depends on' },
      { type: 'ul', items: ['The primary objective and outcome.', 'The study design.', 'The expected prevalence, mean or effect size, taken from literature or pilot data.', 'The confidence level, and for comparative studies, the desired power.', 'The required precision or minimum important difference.'] },
      { type: 'h2', text: 'Worked example: estimating a prevalence' },
      { type: 'p', text: 'For a single proportion: n = Z² × p(1 − p) / d². With an expected prevalence of 30% (p = 0.30), absolute precision of 5% (d = 0.05) and 95% confidence (Z = 1.96): n = 1.96² × 0.30 × 0.70 / 0.05² ≈ 323.' },
      { type: 'h2', text: 'Adjustments that are often forgotten' },
      { type: 'ul', items: ['Non-response: with 10% expected non-response, divide by 0.90 — 323 / 0.90 ≈ 359.', 'Design effect: cluster sampling usually needs a larger sample. A design effect of 2 doubles the requirement before the non-response adjustment.', 'Several objectives: calculate for each primary objective and use the largest.'] },
      { type: 'p', text: 'The assumptions — and their sources — should be stated in the protocol so that reviewers can follow the calculation.' },
    ],
  },

  // ─── Systematic Reviews ────────────────────────────────────────────────────
  {
    slug: 'systematic-review-steps',
    sources: [S.cochrane, S.prisma2020, S.prospero, S.rob2],
    title: 'The Key Steps of a Systematic Review',
    category: 'Systematic Reviews',
    excerpt: 'From a focused question to PRISMA reporting: the stages of a systematic review and what each involves.',
    minutes: 6,
    body: [
      { type: 'p', text: 'A systematic review answers a focused question by identifying, appraising and synthesising all relevant studies using explicit, reproducible methods. The Cochrane Handbook describes these methods in detail.' },
      { type: 'h2', text: '1. Define the question' },
      { type: 'p', text: 'Most intervention reviews use PICO: Population, Intervention, Comparator and Outcome. Exposure questions often use PECO.' },
      { type: 'h2', text: '2. Write and register a protocol' },
      { type: 'p', text: 'A protocol sets out the methods before the review begins, reducing the risk of decisions being influenced by the results. Health-related reviews can be registered in PROSPERO.' },
      { type: 'h2', text: '3. Search comprehensively' },
      { type: 'p', text: 'Search several bibliographic databases using controlled vocabulary and free-text terms, and consider trial registries and grey literature. Record the full search strategy for each database.' },
      { type: 'h2', text: '4. Screen and extract' },
      { type: 'p', text: 'Titles, abstracts and full texts are screened against the eligibility criteria — ideally by two reviewers working independently — and data are extracted using a piloted form.' },
      { type: 'h2', text: '5. Assess risk of bias' },
      { type: 'p', text: 'Use a tool suited to the study designs included; for example, RoB 2 for randomised trials.' },
      { type: 'h2', text: '6. Synthesise' },
      { type: 'p', text: 'Combine results narratively and, where studies are sufficiently similar, statistically in a meta-analysis, examining heterogeneity between studies.' },
      { type: 'h2', text: '7. Report' },
      { type: 'p', text: 'Report the review using the PRISMA 2020 statement, including its 27-item checklist and a flow diagram showing how studies were identified, screened and included.' },
    ],
  },

  // ─── Scoping Reviews ───────────────────────────────────────────────────────
  {
    slug: 'scoping-review-or-systematic-review',
    sources: [S.munn, S.arksey, S.peters2020, S.prismaScr, S.jbiManual],
    title: 'Scoping Review or Systematic Review? How to Choose',
    category: 'Scoping Reviews',
    excerpt: 'The two review types answer different questions. Here is how to decide which one fits your aim.',
    minutes: 5,
    body: [
      { type: 'p', text: 'Systematic and scoping reviews both use systematic, transparent methods, but they have different purposes. Choosing the wrong one is a common reason for difficulty with protocols and peer review.' },
      {
        type: 'table',
        head: ['', 'Systematic review', 'Scoping review'],
        rows: [
          ['Purpose', 'Answer a focused question, often about effectiveness or association', 'Map the extent, range and nature of evidence on a topic'],
          ['Question framework', 'PICO / PECO', 'PCC — Population, Concept, Context'],
          ['Critical appraisal', 'Expected (risk of bias)', 'Not usually required'],
          ['Synthesis', 'Narrative and/or meta-analysis', 'Descriptive mapping, tables and charts'],
          ['Reporting guideline', 'PRISMA 2020', 'PRISMA-ScR'],
        ],
      },
      { type: 'h2', text: 'When a scoping review fits' },
      { type: 'ul', items: ['To identify the types of evidence available in a field.', 'To clarify key concepts or definitions in the literature.', 'To examine how research has been conducted on a topic.', 'To identify knowledge gaps — or as a precursor to a systematic review.'] },
      { type: 'h2', text: 'Methodological frameworks' },
      { type: 'p', text: 'Arksey and O’Malley proposed the original framework: identifying the research question, identifying relevant studies, study selection, charting the data, and collating, summarising and reporting results, with optional consultation. JBI guidance builds on this framework.' },
    ],
  },

  // ─── Publication ───────────────────────────────────────────────────────────
  {
    slug: 'choosing-a-journal',
    sources: [S.thinkCheck, S.icmje, S.doaj, S.cope],
    title: 'Choosing a Journal and Avoiding Predatory Publishers',
    category: 'Publication',
    excerpt: 'How to shortlist suitable journals for your manuscript — and the warning signs of a predatory journal.',
    minutes: 5,
    body: [
      { type: 'p', text: 'Submitting to a well-matched, legitimate journal saves time and protects your work. Predatory journals charge fees without providing genuine peer review or proper archiving.' },
      { type: 'h2', text: 'Finding a good match' },
      { type: 'ul', items: ['Read the journal’s aims and scope, and check recent articles similar to yours.', 'Confirm that it publishes your article type (original research, review, short report).', 'Check indexing claims directly in the database itself, rather than relying on the journal’s website.', 'Review author guidelines, word limits, required reporting checklists and any article processing charges.'] },
      { type: 'h2', text: 'Warning signs of a predatory journal' },
      { type: 'ul', items: ['Unsolicited emails inviting you to submit, often to journals outside your field.', 'Promises of very rapid peer review or guaranteed acceptance.', 'Fees that are unclear or only disclosed after acceptance.', 'An editorial board that cannot be verified, or contact details that are vague.', 'Misleading metrics or unverifiable indexing claims.'] },
      { type: 'p', text: 'The Think. Check. Submit. checklist offers a structured way to assess a journal. The ICMJE Recommendations also address predatory or pseudo-journals.' },
    ],
  },
  {
    slug: 'understanding-turnitin-similarity-report',
    sources: [S.turnitinHelp, S.cope],
    title: 'Understanding Your Turnitin Similarity Report',
    category: 'Publication',
    excerpt: 'What the similarity percentage does and does not tell you, and how to respond to matched text appropriately.',
    minutes: 4,
    body: [
      { type: 'p', text: 'A Turnitin Similarity Report shows where text in a document matches text in Turnitin’s databases. The overall percentage is a starting point for review — Turnitin itself states that the score is not a determination of plagiarism.' },
      { type: 'h2', text: 'Why matches occur' },
      { type: 'ul', items: ['Correctly quoted and cited material.', 'Reference lists and standard phrases, such as names of scales or methods.', 'Your own earlier work, such as a submitted thesis or a previous publication.', 'Text that has been copied or too closely paraphrased without attribution.'] },
      { type: 'h2', text: 'There is no universal acceptable percentage' },
      { type: 'p', text: 'Institutions and journals set their own policies, and the same percentage can mean very different things depending on which sources match and why. Always check the relevant policy, and look at individual matches rather than the overall number.' },
      { type: 'h2', text: 'Responding appropriately' },
      { type: 'ul', items: ['Add or correct citations where a source has been used.', 'Use quotation marks for text taken word for word.', 'Rewrite closely paraphrased passages genuinely in your own words, with citation.', 'Disclose and cite reuse of your own previous work, as required by the journal or institution.'] },
      { type: 'p', text: 'Tools that disguise copied text, for example automated paraphrasing to avoid detection, do not address the underlying issue and are generally regarded as academic misconduct.' },
    ],
  },
]

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}
