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
import { Menu, X } from 'lucide-react'

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
                className={`text-xs font-medium tracking-widest uppercase transition-colors duration-300 ${
                  scrolled
                    ? 'text-[#6B6B6B] hover:text-[#7A1B1B]'
                    : 'text-white/80 hover:text-[#C9A227]'
                }`}
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

        {/* Mobile Hamburger Button */}
        <button
          className={`md:hidden transition-colors duration-300 ${
            scrolled ? 'text-[#7A1B1B]' : 'text-white'
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
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