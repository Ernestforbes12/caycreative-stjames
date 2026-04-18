/**
 * CTABanner Component — components/CTABanner.js
 *
 * Full width call to action banner on the homepage.
 * Encourages visitors to submit a prayer request.
 *
 * Features:
 * - Deep crimson background with subtle diagonal accents
 * - Gold heading in Playfair Display
 * - Bible verse for emotional connection
 * - GSAP scroll triggered fade in animation
 * - Links to /prayer-request page
 */

'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HandHeart } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function CTABanner() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      /**
       * Content fades and scales up as section enters viewport
       * Gives the banner a dramatic entrance
       */
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        immediateRender: false,
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ background: '#7A1B1B' }}
    >

      {/* Decorative diagonal lines — purely visual */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #C9A227 0px, #C9A227 1px, transparent 1px, transparent 60px)',
        }}
      />

      {/* Left glow accent */}
      <div
        className="absolute top-0 left-0 w-96 h-full opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at left center, #C9A227, transparent)',
        }}
      />

      {/* Right glow accent */}
      <div
        className="absolute top-0 right-0 w-96 h-full opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at right center, #C9A227, transparent)',
        }}
      />

      {/* Main content */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-3xl mx-auto px-6 text-center"
      >

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <HandHeart size={40} className="text-[#C9A227]" />
        </div>

        {/* Label */}
        <span className="text-white/40 text-xs font-semibold tracking-[0.25em] uppercase block mb-4">
          We Are Here For You
        </span>

        {/* Heading */}
        <h2
          className="font-[family-name:var(--font-playfair)] text-[#C9A227] font-bold leading-tight mb-6"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
        >
          How Can We Pray For You?
        </h2>

        {/* Bible verse */}
        <p className="text-white/60 italic leading-relaxed mb-10 text-base max-w-xl mx-auto">
          "Cast all your anxiety on him because he cares for you."
          <br />
          <span className="text-[#C9A227]/80 not-italic text-xs tracking-widest uppercase mt-2 block">
            1 Peter 5:7
          </span>
        </p>

        <p className="text-white/50 text-sm leading-relaxed mb-10 max-w-lg mx-auto">
          Our pastoral team and prayer warriors are ready to stand with you.
          Every request is handled with care, confidentiality, and love.
        </p>

        {/* CTA Button */}
        <Link href="/prayer-request">
          <button
            className="px-12 py-5 text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:-translate-y-1"
            style={{ background: '#C9A227', color: '#fff' }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#e8c35a'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#C9A227'}
          >
            Submit a Prayer Request
          </button>
        </Link>

      </div>
    </section>
  )
}