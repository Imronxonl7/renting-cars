"use client"
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Container from './Container'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Cars', href: '/cars' },
  { label: 'Blog', href: '/blog' },
  { label: 'Teams', href: '/teams' },
  { label: 'Contact', href: '/contact' },
]

const Header = () => {
  const [active, setActive] = useState('Home')
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!menuOpen) {
        return
      }

      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
    }
  }, [menuOpen])

  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full">
      <Container className="">
        <div ref={menuRef}>
        <div className="flex items-center justify-between py-5 md:py-6">
          {/* Logo */}
          <Link href="/" className="inline-block">
              <h2 className="text-4xl font-semibold tracking-tight text-white">
                Dri<span className="text-[#edb458]">vora</span>
              </h2>
            </Link>

          {/* Nav */}
          <nav className="hidden xl:block">
            <ul className="flex gap-5 2xl:gap-7 items-center">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setActive(link.label)}
                    className="relative text-white text-sm font-medium transition-colors duration-200 hover:text-[#edb458] group"
                  >
                    {link.label}
                    {/* Active underline */}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-[#edb458] transition-all duration-300 ${
                        active === link.label ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Phone */}
          <div className="hidden items-center gap-3 lg:flex">
            <div className="w-9 h-9 rounded-full border border-[#edb458] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#edb458" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.05 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 17z"/>
              </svg>
            </div>
            <div className="text-white">
              <p className="text-[10px] text-gray-400 leading-none">Need help?</p>
              <p className="text-sm font-semibold leading-snug">855 100 4444</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Open menu"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/20 text-white xl:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? (
                <>
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </>
              ) : (
                <>
                  <path d="M3 6h18" />
                  <path d="M3 12h18" />
                  <path d="M3 18h18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="xl:hidden">
            <div className="rounded-3xl border border-white/10 bg-black/70 p-5 backdrop-blur-md">
              <nav>
                <ul className="space-y-4">
                  {navLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        onClick={() => {
                          setActive(link.label)
                          setMenuOpen(false)
                        }}
                        className={`block text-sm font-medium transition-colors ${
                          active === link.label ? 'text-[#edb458]' : 'text-white/85 hover:text-white'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-5 text-white">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#edb458]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#edb458" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.05 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 17z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 leading-none">Need help?</p>
                  <p className="text-sm font-semibold leading-snug">855 100 4444</p>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </Container>
    </header>
  )
}

export default Header
