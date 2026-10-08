import { Instagram, Mail, MessageCircle } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { BRAND, CONTACT_EMAIL, INSTAGRAM_URL } from '../../config/site'
import { services } from '../../data/services'
import { mailtoUrl, whatsappUrl } from '../../lib/contact'
import { Logo } from './Logo'
import { NAV_LINKS } from './Navbar'

export function Footer() {
  const mail = mailtoUrl()
  return (
    <footer className="bg-navy pb-20 text-white/80 lg:pb-0">
      <div className="container-rw grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <div className="inline-block rounded-[4px] bg-white px-3 py-2">
            <Logo height={64} />
          </div>
          <p className="mt-5 font-serif text-xl text-white">{BRAND.name}</p>
          <p className="mt-1 text-xs font-semibold tracking-[0.22em] text-sage-300 uppercase">{BRAND.tagline}</p>
          <p className="mt-4 text-[0.9375rem]">{BRAND.description}</p>
        </div>

        <FooterCol title="Quick Links">
          {NAV_LINKS.map((l) => (
            <FooterLink key={l.to} to={l.to}>
              {l.label}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Data & Methods">
          {services.slice(0, 5).map((s) => (
            <FooterLink key={s.slug} to={`/services/${s.slug}`}>
              {s.shortTitle}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Reviews & Publication">
          {services.slice(5).map((s) => (
            <FooterLink key={s.slug} to={`/services/${s.slug}`}>
              {s.shortTitle}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Contact">
          <li>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center gap-2 hover:text-white">
              <MessageCircle aria-hidden className="size-4 text-sage-300" /> WhatsApp
            </a>
          </li>
          {mail && (
            <li>
              <a href={mail} className="inline-flex min-h-9 items-center gap-2 break-all hover:text-white">
                <Mail aria-hidden className="size-4 shrink-0 text-sage-300" /> {CONTACT_EMAIL}
              </a>
            </li>
          )}
          {INSTAGRAM_URL && (
            <li>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center gap-2 hover:text-white">
                <Instagram aria-hidden className="size-4 text-sage-300" /> Follow ResearchWise Analytics
              </a>
            </li>
          )}
          <FooterLink to="/contact">Contact form</FooterLink>
        </FooterCol>
      </div>

      <div className="border-t border-white/10">
        <div className="container-rw flex flex-col gap-3 py-6 text-sm text-white/60 md:flex-row md:items-start md:justify-between md:gap-10">
          <p className="shrink-0">© 2026 {BRAND.name}. All rights reserved.</p>
          <p className="max-w-2xl md:text-right">
            ResearchWise Analytics provides research, statistical and academic support. Researchers remain responsible for the final content,
            interpretation and submission of their work.
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-semibold tracking-[0.12em] text-white uppercase">{title}</h2>
      <ul className="mt-4 space-y-1.5 text-[0.9375rem]">{children}</ul>
    </div>
  )
}

function FooterLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <li className="list-none">
      <Link to={to} className="inline-flex min-h-9 items-center hover:text-white hover:underline">
        {children}
      </Link>
    </li>
  )
}
