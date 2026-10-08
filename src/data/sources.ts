// Reference library for Insights articles: peer-reviewed papers, reporting guidelines,
// standard textbooks and official documentation. Each article cites entries from here.

export interface Source {
  text: string
  url?: string
}

const doi = (d: string) => `https://doi.org/${d}`

export const S = {
  // ── Textbooks ────────────────────────────────────────────────────────────
  kirkwood: { text: 'Kirkwood BR, Sterne JAC. Essential Medical Statistics. 2nd ed. Oxford: Blackwell Science; 2003.' },
  altmanBook: { text: 'Altman DG. Practical Statistics for Medical Research. London: Chapman & Hall; 1991.' },
  hosmer: { text: 'Hosmer DW, Lemeshow S, Sturdivant RX. Applied Logistic Regression. 3rd ed. Hoboken, NJ: Wiley; 2013.' },
  field: { text: 'Field A. Discovering Statistics Using IBM SPSS Statistics. 5th ed. London: SAGE; 2018.' },
  pallant: { text: 'Pallant J. SPSS Survival Manual. 7th ed. London: Routledge; 2020.' },
  ggplot2: { text: 'Wickham H. ggplot2: Elegant Graphics for Data Analysis. 2nd ed. New York: Springer; 2016.', url: doi('10.1007/978-3-319-24277-4') },
  r4ds: { text: 'Wickham H, Çetinkaya-Rundel M, Grolemund G. R for Data Science. 2nd ed. Sebastopol, CA: O’Reilly; 2023.', url: 'https://r4ds.hadley.nz/' },
  lwanga: { text: 'Lwanga SK, Lemeshow S. Sample Size Determination in Health Studies: A Practical Manual. Geneva: World Health Organization; 1991.' },

  // ── Official documentation & organisations ───────────────────────────────
  ibmSpss: { text: 'IBM Corp. IBM SPSS Statistics documentation.', url: 'https://www.ibm.com/docs/en/spss-statistics' },
  rCore: { text: 'R Core Team. R: A Language and Environment for Statistical Computing. Vienna: R Foundation for Statistical Computing.', url: 'https://www.r-project.org/' },
  cochrane: { text: 'Higgins JPT, Thomas J, Chandler J, et al., editors. Cochrane Handbook for Systematic Reviews of Interventions. Cochrane.', url: 'https://training.cochrane.org/handbook' },
  prospero: { text: 'PROSPERO: International prospective register of systematic reviews. National Institute for Health and Care Research.', url: 'https://www.crd.york.ac.uk/prospero/' },
  jbiManual: { text: 'Aromataris E, Lockwood C, Porritt K, Pilla B, Jordan Z, editors. JBI Manual for Evidence Synthesis. JBI; 2024.', url: 'https://synthesismanual.jbi.global' },
  icmje: { text: 'International Committee of Medical Journal Editors. Recommendations for the Conduct, Reporting, Editing, and Publication of Scholarly Work in Medical Journals.', url: 'https://www.icmje.org/recommendations/' },
  cope: { text: 'Committee on Publication Ethics (COPE). Guidance and resources on publication ethics.', url: 'https://publicationethics.org/' },
  thinkCheck: { text: 'Think. Check. Submit. — Checklist for choosing trusted journals.', url: 'https://thinkchecksubmit.org/' },
  doaj: { text: 'Directory of Open Access Journals (DOAJ).', url: 'https://doaj.org/' },
  equator: { text: 'EQUATOR Network. Enhancing the QUAlity and Transparency Of health Research — reporting guidelines library.', url: 'https://www.equator-network.org/' },
  turnitinHelp: { text: 'Turnitin. Interpreting the Similarity Report. Turnitin Help Center.', url: 'https://guides.turnitin.com/' },

  // ── Reporting guidelines ─────────────────────────────────────────────────
  prisma2020: { text: 'Page MJ, McKenzie JE, Bossuyt PM, et al. The PRISMA 2020 statement: an updated guideline for reporting systematic reviews. BMJ. 2021;372:n71.', url: doi('10.1136/bmj.n71') },
  prismaScr: { text: 'Tricco AC, Lillie E, Zarin W, et al. PRISMA Extension for Scoping Reviews (PRISMA-ScR): checklist and explanation. Ann Intern Med. 2018;169(7):467–473.', url: doi('10.7326/M18-0850') },
  strobe: { text: 'von Elm E, Altman DG, Egger M, et al. The Strengthening the Reporting of Observational Studies in Epidemiology (STROBE) statement: guidelines for reporting observational studies. Lancet. 2007;370(9596):1453–1457.', url: doi('10.1016/S0140-6736(07)61602-X') },
  sampl: { text: 'Lang TA, Altman DG. Basic statistical reporting for articles published in biomedical journals: the “Statistical Analyses and Methods in the Published Literature” or the SAMPL Guidelines. Int J Nurs Stud. 2015;52(1):5–9.', url: doi('10.1016/j.ijnurstu.2014.09.006') },

  // ── Journal articles ─────────────────────────────────────────────────────
  cochran1954: { text: 'Cochran WG. Some methods for strengthening the common χ² tests. Biometrics. 1954;10(4):417–451.', url: doi('10.2307/3001616') },
  kimChi: { text: 'Kim HY. Statistical notes for clinical researchers: chi-squared test and Fisher’s exact test. Restor Dent Endod. 2017;42(2):152–155.', url: doi('10.5395/rde.2017.42.2.152') },
  peduzzi: { text: 'Peduzzi P, Concato J, Kemper E, Holford TR, Feinstein AR. A simulation study of the number of events per variable in logistic regression analysis. J Clin Epidemiol. 1996;49(12):1373–1379.', url: doi('10.1016/S0895-4356(96)00236-3') },
  vittinghoff: { text: 'Vittinghoff E, McCulloch CE. Relaxing the rule of ten events per variable in logistic and Cox regression. Am J Epidemiol. 2007;165(6):710–718.', url: doi('10.1093/aje/kwk052') },
  blandOR: { text: 'Bland JM, Altman DG. Statistics notes: the odds ratio. BMJ. 2000;320(7247):1468.', url: doi('10.1136/bmj.320.7247.1468') },
  zhangYu: { text: 'Zhang J, Yu KF. What’s the relative risk? A method of correcting the odds ratio in cohort studies of common outcomes. JAMA. 1998;280(19):1690–1691.', url: doi('10.1001/jama.280.19.1690') },
  blandNormal: { text: 'Altman DG, Bland JM. Statistics notes: the normal distribution. BMJ. 1995;310(6975):298.', url: doi('10.1136/bmj.310.6975.298') },
  blandBonferroni: { text: 'Bland JM, Altman DG. Multiple significance tests: the Bonferroni method. BMJ. 1995;310(6973):170.', url: doi('10.1136/bmj.310.6973.170') },
  absence: { text: 'Altman DG, Bland JM. Absence of evidence is not evidence of absence. BMJ. 1995;311(7003):485.', url: doi('10.1136/bmj.311.7003.485') },
  blandKM: { text: 'Bland JM, Altman DG. Survival probabilities (the Kaplan-Meier method). BMJ. 1998;317(7172):1572.', url: doi('10.1136/bmj.317.7172.1572') },
  greenland: { text: 'Greenland S, Senn SJ, Rothman KJ, et al. Statistical tests, P values, confidence intervals, and power: a guide to misinterpretations. Eur J Epidemiol. 2016;31(4):337–350.', url: doi('10.1007/s10654-016-0149-3') },
  asaP: { text: 'Wasserstein RL, Lazar NA. The ASA statement on p-values: context, process, and purpose. Am Stat. 2016;70(2):129–133.', url: doi('10.1080/00031305.2016.1154108') },
  vandenBroeck: { text: 'Van den Broeck J, Cunningham SA, Eeckels R, Herbst K. Data cleaning: detecting, diagnosing, and editing data abnormalities. PLoS Med. 2005;2(10):e267.', url: doi('10.1371/journal.pmed.0020267') },
  sterneMI: { text: 'Sterne JAC, White IR, Carlin JB, et al. Multiple imputation for missing data in epidemiological and clinical research: potential and pitfalls. BMJ. 2009;338:b2393.', url: doi('10.1136/bmj.b2393') },
  goodEnough: { text: 'Wilson G, Bryan J, Cranston K, et al. Good enough practices in scientific computing. PLoS Comput Biol. 2017;13(6):e1005510.', url: doi('10.1371/journal.pcbi.1005510') },
  weissgerber: { text: 'Weissgerber TL, Milic NM, Winham SJ, Garovic VD. Beyond bar and line graphs: time for a new data presentation paradigm. PLoS Biol. 2015;13(4):e1002128.', url: doi('10.1371/journal.pbio.1002128') },
  grimes: { text: 'Grimes DA, Schulz KF. An overview of clinical research: the lay of the land. Lancet. 2002;359(9300):57–61.', url: doi('10.1016/S0140-6736(02)07283-5') },
  mann: { text: 'Mann CJ. Observational research methods. Research design II: cohort, cross sectional, and case-control studies. Emerg Med J. 2003;20(1):54–60.', url: doi('10.1136/emj.20.1.54') },
  charan: { text: 'Charan J, Biswas T. How to calculate sample size for different study designs in medical research? Indian J Psychol Med. 2013;35(2):121–126.', url: doi('10.4103/0253-7176.116232') },
  rob2: { text: 'Sterne JAC, Savović J, Page MJ, et al. RoB 2: a revised tool for assessing risk of bias in randomised trials. BMJ. 2019;366:l4898.', url: doi('10.1136/bmj.l4898') },
  munn: { text: 'Munn Z, Peters MDJ, Stern C, et al. Systematic review or scoping review? Guidance for authors when choosing between a systematic or scoping review approach. BMC Med Res Methodol. 2018;18:143.', url: doi('10.1186/s12874-018-0611-x') },
  arksey: { text: 'Arksey H, O’Malley L. Scoping studies: towards a methodological framework. Int J Soc Res Methodol. 2005;8(1):19–32.', url: doi('10.1080/1364557032000119616') },
  peters2020: { text: 'Peters MDJ, Marnie C, Tricco AC, et al. Updated methodological guidance for the conduct of scoping reviews. JBI Evid Synth. 2020;18(10):2119–2126.', url: doi('10.11124/JBIES-20-00167') },
  schober: { text: 'Schober P, Boer C, Schwarte LA. Correlation coefficients: appropriate use and interpretation. Anesth Analg. 2018;126(5):1763–1768.', url: doi('10.1213/ANE.0000000000002864') },
} satisfies Record<string, Source>
