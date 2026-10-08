import { MessageCircle } from 'lucide-react'
import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { whatsappUrl } from '../../lib/contact'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

export function Layout() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Suspense fallback={<div className="min-h-[70vh]" aria-busy="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <StickyWhatsApp />
    </>
  )
}

/** Persistent WhatsApp button on mobile/tablet. */
function StickyWhatsApp() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bottom-4 z-30 inline-flex min-h-12 items-center gap-2 rounded-full bg-navy px-5 text-[0.9375rem] font-semibold text-white shadow-[0_10px_30px_-10px_rgb(22_37_61/0.6)] hover:bg-navy-700 lg:hidden"
      style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
    >
      <MessageCircle aria-hidden className="size-5 text-sage-300" />
      Chat on WhatsApp
    </a>
  )
}
