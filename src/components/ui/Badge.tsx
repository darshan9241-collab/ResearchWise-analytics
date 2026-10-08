import type { ReactNode } from 'react'

type Tone = 'sage' | 'olive' | 'navy' | 'cream'

const tones: Record<Tone, string> = {
  sage: 'bg-sage-100 text-sage-700',
  olive: 'bg-olive-100 text-olive',
  navy: 'bg-navy text-white',
  cream: 'bg-cream text-navy',
}

export function Badge({ children, tone = 'sage', className = '' }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-[3px] px-2 py-0.5 text-[0.75rem] font-semibold tracking-wide uppercase ${tones[tone]} ${className}`}>
      {children}
    </span>
  )
}
