'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { mockDb } from '@/data/mockDatabase'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideNavFooter = pathname === '/portal' || pathname === '/admin'

  // Initialize auth
  useEffect(() => {
    mockDb.auth.init()
  }, [])

  // Mobile keyboard handling
  useEffect(() => {
    const handleFocus = (event: FocusEvent) => {
      const target = event.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 300)
      }
    }
    document.addEventListener('focus', handleFocus, true)
    return () => document.removeEventListener('focus', handleFocus, true)
  }, [])

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-brand-orange selection:text-white">
      {!hideNavFooter && <Navbar />}
      <main className="flex-grow relative z-10">{children}</main>
      {!hideNavFooter && <Footer />}
    </div>
  )
}