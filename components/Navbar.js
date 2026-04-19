/**
 * Navbar Component — components/Navbar.js
 *
 * Fixed navigation bar that appears on every page via app/layout.js.
 * 
 * Behavior:
 * - Starts transparent when over the hero section
 * - Transitions to frosted glass white background on scroll
 * - Collapses to hamburger menu on mobile
 * 
 * Icons: lucide-react
 * Fonts: Playfair Display for logo, Inter for links
 */

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

/**
 * Navigation links array
 * Add or remove pages here — the map below renders them automatically
 */
const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Sermons', href: '/sermons' },
  { label: 'Events', href: '/events' },
  { label: 'Prayer Request', href: '/prayer-request' },
  { label: 'Give', href: '/give' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  /**
   * scrolled — tracks if user has scrolled past 60px
   * Controls the transparent vs frosted glass background
   */
  const [scrolled, setScrolled] = useState(false)

  /**
   * menuOpen — tracks if mobile hamburger menu is open or closed
   */
  const [menuOpen, setMenuOpen] = useState(false)

  /**
   * useEffect — attaches scroll event listener when component mounts
   * Cleans up the listener when component unmounts to prevent memory leaks
   */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link href="/">
          <span
            className={`font-[family-name:var(--font-playfair)] text-lg font-bold tracking-tight transition-colors duration-500 ${
              scrolled ? 'text-[#7A1B1B]' : 'text-white'
            }`}
          >
            St. James Native Baptist
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-xs font-medium tracking-widest uppercase transition-all duration-300"
                style={{ color: scrolled ? '#4a4a4a' : '#ffffff' }}
                onMouseEnter={(e) => {
                  e.target.style.color = scrolled ? '#7A1B1B' : '#C9A227'
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = scrolled ? '#4a4a4a' : '#ffffff'
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA Button */}
        <button
          className="hidden md:block px-5 py-2 bg-[#C9A227] text-white text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:bg-[#e8c35a]"
        >
          Join Us Sunday
        </button>

        {/* Mobile Menu Button — prayer hands when closed, X when open */}
        <button
          className={`md:hidden transition-colors duration-300 ${
            scrolled ? 'text-[#7A1B1B]' : 'text-white'
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <X size={24} />
          ) : (
            <svg
              width="28"
              height="28"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform duration-300 hover:scale-110"
            >
              {/* Prayer hands SVG — two hands pressed together */}
              <path
                d="M20 48 C20 48 14 42 12 34 C10 26 12 18 16 14 C18 12 20 12 21 13 C22 14 22 16 21 18 L19 24"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M19 24 C19 24 17 20 19 16 C20 14 22 13 24 14 C26 15 26 17 25 20 L23 26"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M23 26 C23 26 22 22 24 18 C25 16 27 15 29 16 C31 17 31 20 30 23 L28 29"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M28 29 C28 29 27 25 29 21 C30 19 32 18 34 19 C36 20 36 23 35 26 L32 48"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M44 48 C44 48 50 42 52 34 C54 26 52 18 48 14 C46 12 44 12 43 13 C42 14 42 16 43 18 L45 24"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M45 24 C45 24 47 20 45 16 C44 14 42 13 40 14 C38 15 38 17 39 20 L41 26"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M41 26 C41 26 42 22 40 18 C39 16 37 15 35 16 C33 17 33 20 34 23 L36 29"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M36 29 C36 29 37 25 35 21 C34 19 32 18 30 19 C28 20 28 23 29 26 L32 48"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Base of hands */}
              <path
                d="M20 48 Q32 52 44 48"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          )}
        </button>
        
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-t border-[#C9A227]/20 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium tracking-widest uppercase text-[#6B6B6B] hover:text-[#7A1B1B] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <button className="mt-2 px-5 py-3 bg-[#C9A227] text-white text-xs font-semibold tracking-widest uppercase">
            Join Us Sunday
          </button>
        </div>
      )}
    </nav>
  )
}