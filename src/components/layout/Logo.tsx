import { useState } from 'react'
import { BRAND } from '../../config/site'

interface Props {
  /** Rendered height in px; width follows the file's own aspect ratio. */
  height?: number
  inverted?: boolean
  className?: string
}

/**
 * Official logo (BRAND.logo). The image is never redrawn, recoloured or stretched.
 * If the file fails to load, a plain text name is shown so the layout does not break.
 */
export function Logo({ height = 56, inverted = false, className = '' }: Props) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span className={`inline-flex flex-col leading-none ${className}`} style={{ minHeight: height }}>
        <span className={`font-serif text-[1.3rem] font-semibold tracking-[-0.01em] ${inverted ? 'text-white' : 'text-navy'}`}>
          {BRAND.name}
        </span>
        <span className={`mt-1 text-[0.6875rem] font-semibold tracking-[0.22em] uppercase ${inverted ? 'text-sage-300' : 'text-olive'}`}>
          {BRAND.tagline}
        </span>
      </span>
    )
  }

  return (
    <img
      src={BRAND.logo}
      alt={BRAND.name}
      // Intrinsic ratio of the official file (936×645) — reserves space, never stretches.
      width={Math.round((height * 936) / 645)}
      height={height}
      decoding="async"
      style={{ height, width: 'auto' }}
      className={`block max-w-none object-contain ${className}`}
      onError={() => setFailed(true)}
    />
  )
}
