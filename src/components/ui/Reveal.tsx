import { useEffect, useRef, useState, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  delay?: number
}

/** Fades content up once when it enters the viewport. Content is fully visible without JS. */
export function Reveal({ children, className = '', delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<'idle' | 'hidden' | 'visible'>('idle')

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    // Already on screen at mount: leave it alone (no flash on first paint).
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return
    setState('hidden')
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('visible')
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const cls = state === 'idle' ? '' : state === 'hidden' ? 'reveal' : 'reveal is-visible'
  return (
    <div ref={ref} className={`${cls} ${className}`} style={delay && state !== 'idle' ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  )
}
