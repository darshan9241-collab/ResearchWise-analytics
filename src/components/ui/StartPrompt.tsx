import { MessageCircle, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { whatsappUrl } from '../../lib/contact'

const KEY = 'rw-start-prompt-dismissed'

function wasDismissed() {
  try {
    return sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

/**
 * Compact "Not sure where to start?" pill, bottom-left. It slides in after the visitor
 * scrolls; clicking it opens a small speech bubble with a WhatsApp link.
 * Desktop only (mobile already has the sticky WhatsApp button). Dismissal lasts the session.
 */
export function StartPrompt() {
  const [show, setShow] = useState(false)
  const [open, setOpen] = useState(false)
  const [dismissed, setDismissed] = useState(wasDismissed)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (dismissed) return
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 1.2) setShow(true)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [dismissed])

  // Close the bubble on Esc or a click elsewhere.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onDown = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [open])

  if (dismissed) return null

  const dismiss = () => {
    setDismissed(true)
    try {
      sessionStorage.setItem(KEY, '1')
    } catch {
      /* storage unavailable — dismissal lasts for this page view */
    }
  }

  return (
    <div
      ref={ref}
      className={`fixed bottom-5 left-5 z-30 hidden transition-all duration-500 lg:block ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
      {...(!show && { inert: true })}
    >
      {/* Speech bubble */}
      <div
        id="start-bubble"
        role="region"
        aria-label="Get started"
        className={`absolute bottom-full left-0 mb-3 w-[250px] origin-bottom-left rounded-[10px] border border-line bg-white p-4 shadow-[0_18px_40px_-18px_rgb(22_37_61/0.5)] transition-all duration-200 ${
          open ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'
        }`}
        {...(!open && { inert: true })}
      >
        <p className="text-[0.9375rem] leading-snug text-navy">Tell us about your study — we’ll suggest the right next step.</p>
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-full bg-sage-100 px-3.5 text-sm font-semibold text-navy hover:bg-sage-300/60"
        >
          <MessageCircle aria-hidden className="size-4 text-sage-700" /> Chat on WhatsApp
        </a>
        {/* tail */}
        <span aria-hidden className="absolute -bottom-[7px] left-6 size-3 rotate-45 border-r border-b border-line bg-white" />
      </div>

      {/* Pill */}
      <div className="flex items-center rounded-full bg-navy text-white shadow-[0_12px_30px_-12px_rgb(22_37_61/0.7)]">
        <button
          type="button"
          aria-expanded={open}
          aria-controls="start-bubble"
          onClick={() => setOpen((o) => !o)}
          className="flex min-h-11 items-center gap-2.5 rounded-full py-2 pr-2 pl-3 text-sm font-semibold hover:text-sage-300"
        >
          <span aria-hidden className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-sage-300 opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex size-2.5 rounded-full bg-sage-300" />
          </span>
          Not sure where to start?
        </button>
        <button
          type="button"
          onClick={dismiss}
          className="mr-1 grid size-9 place-items-center rounded-full text-white/60 hover:bg-white/10 hover:text-white"
        >
          <X aria-hidden className="size-3.5" />
          <span className="sr-only">Dismiss</span>
        </button>
      </div>
    </div>
  )
}
