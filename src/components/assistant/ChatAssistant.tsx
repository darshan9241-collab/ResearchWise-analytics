import { ArrowUp, MessageCircle, RotateCcw, Sparkles, X } from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { whatsappUrl } from '../../lib/contact'
import { answer, answerById, type Suggestion } from './engine'

type Msg = { role: 'user' | 'assistant'; content: string; suggestions?: Suggestion[] }

const STORAGE_KEY = 'rw-assistant-chat'
const SUGGESTIONS = [
  'What services do you offer?',
  'Do you help with SPSS or R analysis?',
  'Which statistical test should I use?',
  'How do I get started?',
]

function loadHistory(): Msg[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    const parsed = raw ? (JSON.parse(raw) as Msg[]) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/** Floating website assistant that answers questions from the website's content, entirely in the browser. */
export function ChatAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>(loadHistory)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const timerRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-30)))
    } catch {
      /* storage unavailable — history lasts for this page view */
    }
  }, [messages])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight })
  }, [messages, open])

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    const onKey = (e: globalThis.KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    // Lock page scroll while the full-screen mobile view is open.
    const mobile = window.matchMedia('(max-width: 639px)').matches
    if (mobile) document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      if (mobile) document.body.style.overflow = ''
    }
  }, [open])

  function close() {
    setOpen(false)
    launcherRef.current?.focus()
  }

  /** Answers locally from the website's content — no network, no API. */
  function send(text: string, entryId?: string) {
    const question = text.trim()
    if (!question || busy) return
    setMessages((prev) => [...prev, { role: 'user', content: question }, { role: 'assistant', content: '' }])
    setInput('')
    setBusy(true)
    const reply = entryId ? answerById(entryId) : answer(question)
    // Short pause so the reply feels conversational rather than instant.
    timerRef.current = window.setTimeout(() => {
      setMessages((prev) => {
        const next = prev.slice()
        next[next.length - 1] = { role: 'assistant', content: reply.text, suggestions: reply.suggestions }
        return next
      })
      setBusy(false)
    }, 350 + Math.min(reply.text.length, 600) / 3)
  }

  function reset() {
    window.clearTimeout(timerRef.current)
    setMessages([])
    setBusy(false)
    inputRef.current?.focus()
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    send(input)
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send(input)
    }
  }

  return (
    <>
      {/* Launcher */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-expanded={open}
        aria-controls="rw-assistant"
        className={`fixed right-4 bottom-[84px] z-40 grid size-14 place-items-center rounded-full border border-navy-700 bg-white text-navy shadow-[0_12px_30px_-10px_rgb(22_37_61/0.6)] transition-all hover:-translate-y-0.5 sm:right-6 lg:bottom-6 lg:flex lg:size-auto lg:min-h-12 lg:gap-2 lg:bg-navy lg:pr-5 lg:pl-4 lg:text-white ${
          open ? 'max-sm:hidden' : ''
        }`}
      >
        {open ? <X aria-hidden className="size-5" /> : <Sparkles aria-hidden className="size-5 text-olive lg:text-sage-300" />}
        <span className="sr-only lg:not-sr-only lg:text-[0.9375rem] lg:font-semibold">{open ? 'Close assistant' : 'Ask ResearchWise'}</span>
      </button>

      {/* Panel */}
      {open && (
        <section
          id="rw-assistant"
          role="dialog"
          aria-label="ResearchWise Assistant"
          className="fixed inset-0 z-50 flex flex-col bg-white sm:inset-auto sm:right-6 sm:bottom-[152px] sm:h-[min(620px,calc(100dvh-200px))] sm:w-[400px] sm:rounded-[12px] sm:border sm:border-line sm:shadow-[0_30px_70px_-25px_rgb(22_37_61/0.55)] lg:bottom-22"
        >
          <header className="flex items-center gap-3 border-b border-line bg-navy px-4 py-3 text-white sm:rounded-t-[12px]">
            <span className="grid size-9 place-items-center rounded-full bg-white/10">
              <Sparkles aria-hidden className="size-4 text-sage-300" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-[0.9375rem] font-semibold">ResearchWise Assistant</h2>
              <p className="text-xs text-white/65">Answers from our website</p>
            </div>
            {messages.length > 0 && (
              <button type="button" onClick={reset} className="grid size-10 place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-white">
                <RotateCcw aria-hidden className="size-4" />
                <span className="sr-only">Start a new conversation</span>
              </button>
            )}
            <button type="button" onClick={close} className="grid size-10 place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-white">
              <X aria-hidden className="size-5" />
              <span className="sr-only">Close assistant</span>
            </button>
          </header>

          <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto bg-cream/40 px-4 py-5" aria-live="polite">
            <Bubble role="assistant">
              <p>Hello! 👋 I’m the ResearchWise Analytics assistant. Ask me about our services, data analysis with SPSS or R, research methods — or anything on this website.</p>
            </Bubble>
            {messages.length === 0 && (
              <div className="flex flex-wrap gap-2 pl-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="rounded-full border border-sage-300 bg-white px-3 py-1.5 text-left text-sm text-navy hover:border-navy hover:bg-sage-100"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className="space-y-2">
              <Bubble role={m.role}>
                {m.role === 'assistant' ? (
                  m.content ? (
                    <Markdown text={m.content} onNavigate={() => window.matchMedia('(max-width: 639px)').matches && setOpen(false)} />
                  ) : (
                    <TypingDots />
                  )
                ) : (
                  <p className="whitespace-pre-wrap">{m.content}</p>
                )}
              </Bubble>
              {m.suggestions && i === messages.length - 1 && !busy && (
                <div className="pl-1">
                  <p className="mb-1.5 text-xs font-medium text-muted">You might also ask about:</p>
                  <div className="flex flex-wrap gap-2">
                    {m.suggestions.map((sg) => (
                      <button
                        key={sg.id}
                        type="button"
                        onClick={() => send(sg.label, sg.id)}
                        className="rounded-full border border-sage-300 bg-white px-3 py-1.5 text-left text-sm text-navy hover:border-navy hover:bg-sage-100"
                      >
                        {sg.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              </div>
            ))}
          </div>

          <form onSubmit={onSubmit} className="border-t border-line bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <div className="flex items-end gap-2 rounded-[10px] border border-line bg-white px-3 py-2 focus-within:border-navy">
              <label htmlFor="rw-assistant-input" className="sr-only">
                Your question
              </label>
              <textarea
                id="rw-assistant-input"
                ref={inputRef}
                rows={1}
                maxLength={1500}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Ask a question…"
                className="max-h-32 min-h-7 flex-1 resize-none bg-transparent py-1 text-base text-charcoal outline-none placeholder:text-muted/70"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="grid size-9 shrink-0 place-items-center rounded-full bg-navy text-white transition-opacity disabled:opacity-35"
              >
                <ArrowUp aria-hidden className="size-4" />
                <span className="sr-only">Send</span>
              </button>
            </div>
            <p className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-1 text-[0.75rem] text-muted">
              <span>For advice on your own study, talk to our team.</span>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-sage-700 hover:underline">
                <MessageCircle aria-hidden className="size-3.5" /> WhatsApp
              </a>
            </p>
          </form>
        </section>
      )}
    </>
  )
}

function Bubble({ role, children }: { role: Msg['role']; children: ReactNode }) {
  const user = role === 'user'
  return (
    <div className={`flex ${user ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[88%] rounded-[14px] px-3.5 py-2.5 text-[0.9375rem] leading-relaxed ${
          user ? 'rounded-br-[4px] bg-navy text-white' : 'rounded-bl-[4px] border border-line bg-white text-charcoal'
        }`}
      >
        <span className="sr-only">{user ? 'You:' : 'Assistant:'}</span>
        {children}
      </div>
    </div>
  )
}

function TypingDots() {
  return (
    <span className="flex gap-1 py-1.5" aria-label="Assistant is typing">
      {[0, 150, 300].map((d) => (
        <span key={d} className="size-1.5 animate-bounce rounded-full bg-sage-700 motion-reduce:animate-none" style={{ animationDelay: `${d}ms` }} />
      ))}
    </span>
  )
}

// ─── Minimal, safe markdown: paragraphs, bullet/numbered lists, **bold**, [links](url) ───

function Markdown({ text, onNavigate }: { text: string; onNavigate: () => void }) {
  const blocks: ReactNode[] = []
  let items: string[] = []
  let ordered = false
  const flush = () => {
    if (!items.length) return
    const Tag = ordered ? 'ol' : 'ul'
    blocks.push(
      <Tag key={blocks.length} className={`my-1.5 space-y-1 pl-5 ${ordered ? 'list-decimal' : 'list-disc'} marker:text-sage-700`}>
        {items.map((it, i) => (
          <li key={i}>{inline(it, onNavigate)}</li>
        ))}
      </Tag>,
    )
    items = []
  }
  for (const raw of text.split('\n')) {
    const line = raw.trimEnd()
    const bullet = line.match(/^\s*[-*•]\s+(.*)$/)
    const numbered = line.match(/^\s*\d+[.)]\s+(.*)$/)
    if (bullet || numbered) {
      if (items.length && ordered !== Boolean(numbered)) flush()
      ordered = Boolean(numbered)
      items.push((bullet ?? numbered)![1])
    } else {
      flush()
      const heading = line.match(/^#{1,6}\s+(.*)$/)
      if (heading) blocks.push(<p key={blocks.length} className="mt-2 font-semibold text-navy">{inline(heading[1], onNavigate)}</p>)
      else if (line.trim()) blocks.push(<p key={blocks.length} className="[&:not(:first-child)]:mt-2">{inline(line, onNavigate)}</p>)
    }
  }
  flush()
  return <>{blocks}</>
}

function inline(text: string, onNavigate: () => void): ReactNode[] {
  const out: ReactNode[] = []
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index))
    if (m[1]) {
      out.push(<strong key={m.index} className="font-semibold text-navy">{m[1]}</strong>)
    } else {
      const [label, href] = [m[2], m[3]]
      const cls = 'font-medium text-navy underline underline-offset-2 hover:text-sage-700'
      if (href.startsWith('/') && !href.startsWith('//')) {
        out.push(<Link key={m.index} to={href} className={cls} onClick={onNavigate}>{label}</Link>)
      } else if (/^(https:|mailto:)/.test(href)) {
        out.push(<a key={m.index} href={href} target="_blank" rel="noopener noreferrer" className={cls}>{label}</a>)
      } else {
        out.push(label) // unknown scheme: show as text only
      }
    }
    last = re.lastIndex
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}
