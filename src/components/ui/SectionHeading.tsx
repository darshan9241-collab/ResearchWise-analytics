import type { ReactNode } from 'react'

interface Props {
  eyebrow?: string
  title: ReactNode
  lead?: ReactNode
  align?: 'left' | 'center'
  /** Use on navy backgrounds. */
  inverted?: boolean
  as?: 'h1' | 'h2'
  className?: string
}

export function SectionHeading({ eyebrow, title, lead, align = 'left', inverted = false, as: Tag = 'h2', className = '' }: Props) {
  const center = align === 'center' ? 'mx-auto text-center' : ''
  return (
    <div className={`max-w-3xl ${center} ${className}`}>
      {eyebrow && <p className={`eyebrow mb-3 ${inverted ? 'text-sage-300' : ''}`}>{eyebrow}</p>}
      <Tag
        className={`font-serif text-[2rem] leading-[1.15] font-medium tracking-[-0.01em] sm:text-[2.5rem] ${inverted ? 'text-white' : 'text-navy'}`}
      >
        {title}
      </Tag>
      {lead && <p className={`mt-4 text-lg ${inverted ? 'text-white/75' : 'text-muted'}`}>{lead}</p>}
    </div>
  )
}
