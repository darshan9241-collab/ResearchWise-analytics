// Free, offline website assistant: matches a visitor's question against the
// website's own content and replies with the best-matching answer.
// No API, no network calls — everything runs in the browser.

import { CONTACT_EMAIL, INSTAGRAM_URL, WHATSAPP_NUMBER } from '../../config/site'
import { audiences, dataAnalysisFaq, methodCategories, principles, workflowSteps } from '../../data/analysis'
import { articles } from '../../data/articles'
import { services } from '../../data/services'
import { stages } from '../../data/whatWeDo'

export interface Suggestion {
  label: string
  id: string
}

export interface Reply {
  text: string
  suggestions?: Suggestion[]
}

interface Entry {
  id: string
  /** Short label used for follow-up suggestion chips. */
  label: string
  title: string
  keywords: string
  body: string
  answer: string
}

// ─── Text processing ──────────────────────────────────────────────────────────

const STOP = new Set(
  'a an the and or but of to in on for with by at from as is are was were be been being am do does did done can could would should will shall may might must i me my we our us you your yours it its this that these those there here what which who whom whose when where why how about into over under than then so if not no yes please tell know want need get got give any some all also just like more most much many very really ok okay hi hello hey thanks thank one'.split(
    ' ',
  ),
)

/** Maps alternative wordings to one canonical term. */
const SYNONYMS: Record<string, string> = {
  plagiarism: 'turnitin',
  similarity: 'turnitin',
  originality: 'turnitin',
  plagiarised: 'turnitin',
  plagiarized: 'turnitin',
  rstudio: 'r',
  ibm: 'spss',
  stats: 'statistic',
  statistical: 'statistic',
  statistics: 'statistic',
  biostatistic: 'biostatistics',
  analyse: 'analysis',
  analyze: 'analysis',
  analysing: 'analysis',
  analyzing: 'analysis',
  analysed: 'analysis',
  analyzed: 'analysis',
  dataset: 'data',
  datasets: 'data',
  spreadsheet: 'data',
  excel: 'data',
  publish: 'publication',
  publishing: 'publication',
  journal: 'publication',
  journals: 'publication',
  paper: 'manuscript',
  article: 'manuscript',
  thesis: 'thesis',
  dissertation: 'thesis',
  phd: 'thesis',
  meta: 'metaanalysis',
  prisma: 'prisma',
  graph: 'chart',
  graphs: 'chart',
  plot: 'chart',
  plots: 'chart',
  figure: 'chart',
  figures: 'chart',
  visualisation: 'visualization',
  visualise: 'visualization',
  visualize: 'visualization',
  phone: 'contact',
  number: 'contact',
  call: 'contact',
  reach: 'contact',
  mail: 'email',
  insta: 'instagram',
  questionnaire: 'tool',
  survey: 'tool',
  hypothesis: 'hypotheses',
  pvalue: 'pvalue',
  'p-value': 'pvalue',
  logistic: 'logistic',
  odds: 'odds',
  cleaning: 'clean',
  cleaned: 'clean',
  coding: 'code',
  missing: 'missing',
}

function stem(w: string): string {
  if (w.length > 4 && w.endsWith('ies')) return w.slice(0, -3) + 'y'
  if (w.length > 5 && w.endsWith('ing')) return w.slice(0, -3)
  if (w.length > 4 && w.endsWith('ed')) return w.slice(0, -2)
  if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss')) return w.slice(0, -1)
  return w
}

export function tokenize(text: string): string[] {
  const words = text
    .toLowerCase()
    .replace(/p[\s-]?values?/g, ' pvalue ')
    .replace(/meta[\s-]analys[ie]s/g, ' metaanalysis ')
    .replace(/sample[\s-]size/g, ' samplesize ')
    .replace(/chi[\s-]?square[d]?/g, ' chisquare ')
    .replace(/t[\s-]test/g, ' ttest ')
    .replace(/[’']/g, '')
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
  const out: string[] = []
  for (const w of words) {
    if (STOP.has(w)) continue
    const syn = SYNONYMS[w] ?? SYNONYMS[stem(w)]
    out.push(syn ?? stem(w))
  }
  return out
}

// ─── Knowledge base, built from the website's data ───────────────────────────

const link = (label: string, href: string) => `[${label}](${href})`
const bullets = (items: string[]) => items.map((i) => `- ${i}`).join('\n')
const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}`

function buildEntries(): Entry[] {
  const entries: Entry[] = []

  // Overview of all services
  entries.push({
    id: 'services',
    label: 'All services',
    title: 'services offer provide list what do you do',
    keywords: 'service offer provide help support available list range',
    body: services.map((s) => s.title).join(' '),
    answer: `ResearchWise Analytics offers 10 research support services:\n${bullets(
      services.map((s) => link(s.title, `/services/${s.slug}`)),
    )}\n\nSee all of them on the ${link('Services', '/services')} page.`,
  })

  // Each service
  for (const s of services) {
    entries.push({
      id: `service:${s.slug}`,
      label: s.title,
      title: `${s.title} ${s.shortTitle} ${s.headline}`,
      keywords: [...s.capabilities, ...s.approach.map((a) => a.title)].join(' '),
      body: [s.summary, s.subtitle, ...s.intro, ...s.approach.map((a) => a.text), ...s.deliverables].join(' '),
      answer: `**${s.title}** — ${s.summary}\n\nThis includes:\n${bullets(s.capabilities.slice(0, 6))}${
        s.note ? `\n\n${s.note}` : ''
      }\n\nYou receive: ${s.deliverables.join('; ')}.\n\n${link(`Learn more about ${s.title}`, `/services/${s.slug}`)}`,
    })
  }

  // Six stages of the research process
  for (const st of stages) {
    entries.push({
      id: `stage:${st.n}`,
      label: st.title,
      title: `${st.title} ${st.tagline}`,
      keywords: st.whatWeDo.join(' '),
      body: [st.summary, ...st.youReceive].join(' '),
      answer: `**${st.title}** (${st.tagline}) — ${st.summary}\n\nWhat we do:\n${bullets(st.whatWeDo)}\n\nRelated: ${st.services
        .map((slug) => {
          const s = services.find((x) => x.slug === slug)!
          return link(s.title, `/services/${slug}`)
        })
        .join(', ')}`,
    })
  }

  // Insights articles
  for (const a of articles) {
    const firstPara = a.body.find((b) => b.type === 'p')
    entries.push({
      id: `article:${a.slug}`,
      label: a.title,
      title: a.title,
      keywords: `${a.category} ${a.body
        .filter((b) => b.type === 'h2')
        .map((b) => (b.type === 'h2' ? b.text : ''))
        .join(' ')}`,
      body: a.body
        .map((b) => (b.type === 'p' || b.type === 'h2' ? b.text : b.type === 'ul' ? b.items.join(' ') : b.rows.flat().join(' ')))
        .join(' '),
      answer: `**${a.title}** — ${a.excerpt}${firstPara && firstPara.type === 'p' ? `\n\n${firstPara.text}` : ''}\n\n${link(
        'Read the full article',
        `/insights/${a.slug}`,
      )} (with sources).`,
    })
  }

  // Data analysis FAQ
  dataAnalysisFaq.forEach((f, i) => {
    entries.push({
      id: `faq:${i}`,
      label: f.q,
      title: f.q,
      keywords: '',
      body: f.a,
      answer: `${f.a}\n\nMore on the ${link('Data Analysis', '/data-analysis')} page.`,
    })
  })

  entries.push(
    {
      id: 'contact',
      label: 'How to contact us',
      title: 'contact whatsapp email instagram get in touch',
      keywords: 'contact phone number call message reach start begin enquiry enquire book order hire talk team person human',
      body: 'contact form message whatsapp email instagram',
      answer: `You can reach the ResearchWise Analytics team:\n- **WhatsApp:** ${link(`+${WHATSAPP_NUMBER}`, whatsappLink)} (quickest)\n- **Email:** ${link(
        CONTACT_EMAIL,
        `mailto:${CONTACT_EMAIL}`,
      )}\n- **Instagram:** ${link('@researchwise_analytics', INSTAGRAM_URL)}\n\nOr use the form on the ${link('Contact', '/contact')} page. It helps to mention your study design, type of data, software preference (SPSS or R) and timeline.`,
    },
    {
      id: 'about',
      label: 'About ResearchWise',
      title: 'about researchwise analytics who are you company',
      keywords: 'about company team mission platform background',
      body: 'research biostatistics support platform quality clarity credibility data statistics methodology evidence synthesis scientific communication integrity',
      answer: `ResearchWise Analytics is a research and biostatistics support platform focused on helping researchers strengthen the quality, clarity and credibility of their work — from study design and data analysis (SPSS and R) to evidence synthesis and publication.\n\n${link(
        'About us',
        '/about',
      )}`,
    },
    {
      id: 'audience',
      label: 'Who we support',
      title: 'who do you support help work with',
      keywords: 'student students postgraduate phd scholar researcher nurse nursing doctor medical public health clinical epidemiologist university team organization',
      body: audiences.join(' '),
      answer: `We support:\n${bullets(audiences)}\n\n${link('About us', '/about')}`,
    },
    {
      id: 'principles',
      label: 'Why ResearchWise',
      title: 'why choose researchwise quality principles',
      keywords: 'why choose trust quality rigor rigour integrity ethical ethics honest reliable',
      body: principles.map((p) => `${p.title} ${p.text}`).join(' '),
      answer: `Our work is built on four principles:\n${bullets(principles.map((p) => `**${p.title}** — ${p.text}`))}`,
    },
    {
      id: 'methods',
      label: 'Statistical methods we support',
      title: 'statistical methods tests supported',
      keywords: methodCategories.flatMap((c) => c.methods).join(' '),
      body: methodCategories.map((c) => c.title).join(' '),
      answer: `Statistical methods we support:\n${bullets(methodCategories.map((c) => `**${c.title}:** ${c.methods.join(', ')}`))}\n\n${link(
        'Data Analysis',
        '/data-analysis',
      )}`,
    },
    {
      id: 'workflow',
      label: 'Our analysis workflow',
      title: 'workflow process steps how does it work',
      keywords: 'process steps procedure how work workflow stage approach method',
      body: workflowSteps.map((s) => `${s.title} ${s.text}`).join(' '),
      answer: `Every analysis project follows the same 8 steps:\n${workflowSteps.map((s) => `${Number(s.n)}. ${s.title}`).join('\n')}\n\n${link(
        'See the workflow',
        '/data-analysis',
      )}`,
    },
    {
      id: 'policy',
      label: 'What we don’t do',
      title: 'guarantee ghostwriting write my thesis for me',
      keywords: 'guarantee guaranteed promise assure acceptance accepted significant result ghostwrite ghostwriting write complete whole fake fabricate manipulate remove percentage',
      body: 'support not misconduct',
      answer:
        'ResearchWise Analytics provides research, statistical and academic **support**. We do not write theses, dissertations or manuscripts on a researcher’s behalf, fabricate or manipulate data, or offer “plagiarism removal”. We also cannot guarantee significant results, publication or journal acceptance, or any particular Turnitin percentage — researchers remain responsible for the final content and submission of their work.',
    },
  )

  return entries
}

// ─── Search index (simple weighted BM25-style scoring) ───────────────────────

interface Indexed {
  entry: Entry
  title: Map<string, number>
  keywords: Map<string, number>
  body: Map<string, number>
  titleText: string
}

const counts = (tokens: string[]) => tokens.reduce((m, t) => m.set(t, (m.get(t) ?? 0) + 1), new Map<string, number>())

let INDEX: { docs: Indexed[]; idf: Map<string, number>; byId: Map<string, Entry> } | null = null

function getIndex() {
  if (INDEX) return INDEX
  const entries = buildEntries()
  const docs = entries.map((entry) => ({
    entry,
    title: counts(tokenize(entry.title)),
    keywords: counts(tokenize(entry.keywords)),
    body: counts(tokenize(entry.body)),
    titleText: entry.label.toLowerCase(),
  }))
  const df = new Map<string, number>()
  for (const d of docs) for (const t of new Set([...d.title.keys(), ...d.keywords.keys(), ...d.body.keys()])) df.set(t, (df.get(t) ?? 0) + 1)
  const idf = new Map<string, number>()
  for (const [t, n] of df) idf.set(t, Math.log(1 + (docs.length - n + 0.5) / (n + 0.5)))
  INDEX = { docs, idf, byId: new Map(entries.map((e) => [e.id, e])) }
  return INDEX
}

const ASKS_FOR_HELP = /\b(do you|can you|could you|help|offer|provide|need|looking for|service)\b/

function rank(question: string) {
  const { docs, idf } = getIndex()
  const wantsService = ASKS_FOR_HELP.test(question)
  const q = [...new Set(tokenize(question))]
  const lower = question.toLowerCase()
  return docs
    .map((d) => {
      let score = 0
      for (const t of q) {
        const w = idf.get(t)
        if (!w) continue
        score += w * ((d.title.has(t) ? 3 : 0) + (d.keywords.has(t) ? 1.6 : 0) + Math.min(d.body.get(t) ?? 0, 3) * 0.45)
      }
      if (d.titleText.length > 6 && lower.includes(d.titleText)) score += 6
      if (score > 0 && wantsService && d.entry.id.startsWith('service:')) score *= 1.6
      return { entry: d.entry, score }
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
}

// ─── Small talk and fixed intents ────────────────────────────────────────────

const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]
const contactLine = `You can reach the team on ${link('WhatsApp', whatsappLink)} or by ${link('email', `mailto:${CONTACT_EMAIL}`)}.`

const SMALL_TALK: { test: RegExp; replies: string[] }[] = [
  {
    test: /\bhow (are|r) (you|u)\b|how('?s| is) it going|how do you do|how have you been|what'?s up|\bwassup\b/,
    replies: [
      'I’m doing well, thank you for asking! How can I help with your research today?',
      'All good here, thanks! What would you like to know about our services or research support?',
    ],
  },
  {
    test: /\b(who|what) are you\b|\bare you (a |an )?(bot|robot|human|real|person|ai)\b|\byour name\b/,
    replies: [
      'I’m the ResearchWise Analytics website assistant. I find answers from the information on this website — our services, how we work and our Insights articles. For anything specific to your study, our team is happy to help on WhatsApp or by email.',
    ],
  },
  {
    test: /\bwhat can you (do|help)|how can you help|^help( me)?[.!?]*$/,
    replies: [
      'I can answer questions about ResearchWise Analytics using this website — for example our 10 services, SPSS and R analysis, sample size, systematic and scoping reviews, publication support, and topics covered in our Insights articles. Try asking “What services do you offer?”',
    ],
  },
  { test: /\b(thanks|thank you|thank u|thx|ty|much appreciated)\b/, replies: ['You’re welcome! Anything else I can help with?', 'Happy to help! Let me know if you have another question.'] },
  { test: /\b(bye|goodbye|good bye|see you|see ya|take care)\b/, replies: [`Goodbye, and all the best with your research! ${contactLine}`] },
  { test: /^(ok|okay|cool|great|nice|fine|alright|sure|good|awesome|perfect)[.!]*$/, replies: ['Great! Is there anything else you’d like to know?'] },
  { test: /\bgood (morning|afternoon|evening|night)\b/, replies: ['Hello, and good to see you! How can I help with your research today?'] },
]

const GREETING = /^(hi+|hello+|hey+|hai|hiya|namaste|greetings|good (morning|afternoon|evening))\b[\s,!.]*/

const FIXED: { test: RegExp; reply: string }[] = [
  {
    test: /\b(price|prices|pricing|cost|costs|fee|fees|charge|charges|rate|rates|how much|payment|pay|budget|quote|quotation|affordable|cheap|discount)\b/,
    reply: `Prices aren’t listed on the website, because they depend on the scope of each project. Share a few details about your study and the team will give you a quote. ${contactLine}`,
  },
  {
    test: /\b(how long|turnaround|deadline|time ?frame|timeline|how many days|how soon|urgent|delivery time|when will)\b/,
    reply: `Turnaround times aren’t listed on the website — they depend on the project. Tell the team your deadline and they’ll let you know what’s possible. ${contactLine}`,
  },
  {
    test: /\b(what|which|list|all|your)\b.*\bservices?\b|\bservices?\b.*\b(offer|provide|available|do you have)\b|\bwhat do you (do|offer)\b/,
    reply: '@services',
  },
  {
    test: /\bwho (do|can) you (support|help|work with|serve)\b|\bwho is (this|it|researchwise) for\b|\b(students?|scholars?|nurses?|doctors?)\b.*\b(can|do) you help\b/,
    reply: '@audience',
  },
]

const FALLBACK = `I couldn’t find that on our website. Our team can help directly — ${contactLine.charAt(0).toLowerCase()}${contactLine.slice(
  1,
)} You can also browse our ${link('Services', '/services')} or ${link('Insights', '/insights')}.`

// ─── Public API ──────────────────────────────────────────────────────────────

function withSuggestions(entry: Entry, others: { entry: Entry }[]): Reply {
  const suggestions = others
    .filter((o) => o.entry.id !== entry.id)
    .slice(0, 3)
    .map((o) => ({ label: o.entry.label, id: o.entry.id }))
  return { text: entry.answer, suggestions: suggestions.length ? suggestions : undefined }
}

/** Answer a specific entry (used by suggestion chips). */
export function answerById(id: string): Reply {
  const { byId } = getIndex()
  const entry = byId.get(id)
  return entry ? { text: entry.answer } : { text: FALLBACK }
}

/** Answer a free-text question. */
export function answer(question: string): Reply {
  const raw = question.trim().toLowerCase()
  if (!raw) return { text: 'Please type a question.' }

  // Greeting on its own, or followed by a real question.
  let q = raw
  let prefix = ''
  const greet = raw.match(GREETING)
  if (greet) {
    q = raw.slice(greet[0].length).trim()
    if (!q || tokenize(q).length === 0) {
      const talk = SMALL_TALK.find((s) => s.test.test(q))
      return { text: talk ? pick(talk.replies) : 'Hello! 👋 How can I help you today? You can ask about our services, data analysis, or anything on this website.' }
    }
    prefix = 'Hello! '
  }

  for (const s of SMALL_TALK) if (s.test.test(q)) return { text: prefix + pick(s.replies) }

  for (const f of FIXED) {
    if (!f.test.test(q)) continue
    if (f.reply.startsWith('@')) return { text: prefix + answerById(f.reply.slice(1)).text }
    return { text: prefix + f.reply }
  }

  const ranked = rank(q)
  const best = ranked[0]
  // Require a reasonably strong match; otherwise be honest that it isn't covered.
  if (!best || best.score < 3.2) return { text: prefix + FALLBACK }
  const reply = withSuggestions(best.entry, ranked.slice(1).filter((r) => r.score > best.score * 0.45))
  return { ...reply, text: prefix + reply.text }
}
