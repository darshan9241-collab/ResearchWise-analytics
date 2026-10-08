import { Menu, MessageCircle, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { whatsappUrl } from '../../lib/contact'
import { Button } from '../ui/Button'
import { Logo } from './Logo'

export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/data-analysis', label: 'Data Analysis' },
  { to: '/about', label: 'About' },
  { to: '/insights', label: 'Insights' },
  { to: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className={`sticky top-0 z-40 border-b bg-white transition-shadow ${scrolled ? 'border-line shadow-[0_4px_20px_-14px_rgb(22_37_61/0.35)]' : 'border-transparent'}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-navy focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <div className="container-rw flex h-[76px] items-center justify-between gap-6">
        <Link to="/" className="shrink-0" aria-label="ResearchWise Analytics — home">
          <Logo height={56} />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `relative px-3 py-2 text-[0.9375rem] font-medium transition-colors ${isActive ? 'text-navy after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:bg-sage' : 'text-charcoal/80 hover:text-navy'}`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-[4px] px-3 text-[0.9375rem] font-semibold text-sage-700 hover:bg-sage-100"
          >
            <MessageCircle aria-hidden className="size-[18px]" />
            <span className="hidden xl:inline">Chat on WhatsApp</span>
            <span className="sr-only xl:hidden">Chat on WhatsApp</span>
          </a>
          <Button to="/contact">Get Research Support</Button>
        </div>

        <button
          type="button"
          className="-mr-2 grid size-11 place-items-center rounded-[4px] text-navy lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 top-[76px] bottom-0 overflow-y-auto border-t border-line bg-white lg:hidden">
          <nav aria-label="Mobile" className="container-rw py-4">
            <ul>
              {NAV_LINKS.map((l) => (
                <li key={l.to} className="border-b border-line">
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    className={({ isActive }) => `flex min-h-14 items-center text-lg font-medium ${isActive ? 'text-navy' : 'text-charcoal'}`}
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3">
              <Button to="/contact" size="lg">
                Get Research Support
              </Button>
              <Button href={whatsappUrl()} variant="whatsapp" size="lg">
                <MessageCircle aria-hidden className="size-4" /> Chat on WhatsApp
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
