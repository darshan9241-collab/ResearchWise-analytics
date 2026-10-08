import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  as?: 'div' | 'article' | 'li'
  tone?: 'white' | 'cream' | 'navy'
}

const tones = {
  white: 'bg-white border-line',
  cream: 'bg-cream border-cream-200',
  navy: 'bg-navy border-navy-700 text-white',
}

export function Card({ children, className = '', as: Tag = 'div', tone = 'white' }: Props) {
  return <Tag className={`rounded-[var(--radius-card)] border ${tones[tone]} ${className}`}>{children}</Tag>
}
