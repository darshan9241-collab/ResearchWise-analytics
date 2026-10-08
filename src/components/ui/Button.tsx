import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'whatsapp' | 'light' | 'outline-light'
type Size = 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 font-sans font-semibold rounded-[4px] transition-colors duration-200 min-h-11 text-center leading-tight'

const variants: Record<Variant, string> = {
  primary: 'bg-navy text-white hover:bg-navy-700',
  secondary: 'border border-navy/25 bg-white text-navy hover:border-navy hover:bg-cream',
  whatsapp: 'border border-sage-700/40 bg-sage-100 text-navy hover:bg-sage-300/60',
  light: 'bg-cream text-navy hover:bg-white',
  'outline-light': 'border border-white/35 text-white hover:bg-white/10',
}

const sizes: Record<Size, string> = {
  md: 'px-5 py-2.5 text-[0.9375rem]',
  lg: 'px-6 py-3.5 text-base',
}

interface Props {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  /** Internal route. */
  to?: string
  /** External URL — opens in a new tab. */
  href?: string
  type?: 'button' | 'submit'
  onClick?: () => void
  disabled?: boolean
}

export function Button({ children, variant = 'primary', size = 'md', className = '', to, href, type = 'button', onClick, disabled }: Props) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`
  if (to) {
    return (
      <Link to={to} className={cls} onClick={onClick}>
        {children}
      </Link>
    )
  }
  if (href) {
    const external = /^https?:/.test(href)
    return (
      <a href={href} className={cls} onClick={onClick} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {children}
      </a>
    )
  }
  return (
    <button type={type} className={`${cls} disabled:cursor-not-allowed disabled:opacity-60`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
