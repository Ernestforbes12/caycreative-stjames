/**
 * HeroSection Component — components/HeroSection.js
 *
 * Full screen hero section for the homepage.
 *
 * Features:
 * - Deep crimson to navy gradient background (replace with church photo later)
 * - GSAP animations — text fades in on load, scrubbed on scroll
 * - Established year badge
 * - Two CTA buttons — Join Us Sunday, Learn More
 * - Scroll indicator at the bottom
 *
 * Animation plan:
 * - Est. badge fades in first
 * - Heading scales up from slightly below
 * - Tagline fades in after heading
 * - Buttons slide up last
 * - Right side stat card and verse slide in from the right
 */

'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const heroRef = useRef(null)
  const estRef = useRef(null)
  const headingRef = useRef(null)
  const taglineRef = useRef(null)
  const buttonsRef = useRef(null)
  const rightRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      /**
       * Entry animation timeline
       * Plays once when the page loads
       * Each element staggers in after the previous one
       */
      const tl = gsap.timeline({ delay: 0.3 })

      tl.from(estRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: 'power3.out',
      })
      .from(headingRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
      }, '-=0.3')
      .from(taglineRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.4')
      .from(buttonsRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.3')
      .from(rightRef.current, {
        opacity: 0,
        x: 40,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.5')
      .from(scrollRef.current, {
        opacity: 0,
        duration: 0.5,
      }, '-=0.2')

      /**
       * Scrubbed scroll animation
       * As the user scrolls down the hero content moves up and fades out
       * scrub: true means the animation is tied directly to scroll position
       * giving the user full control — that GTA feel
       */
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        opacity: 0,
        y: -80,
      })

    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #2a0a0a 0%, #4a1010 35%, #1B3A6B 100%)',
      }}
    >

      {/* Background texture overlay */}
      <div className="absolute inset-0 opacity-5 bg-[url('/noise.png')] bg-repeat" />

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, rgba(42,10,10,0.95) 50%, rgba(42,10,10,0.3))',
        }}
      />

      {/* Top gradient — makes navbar links readable against the dark hero */}
      <div
        className="absolute top-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)',
        }}
      />

      {/* Main content grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-24 pb-16">

        {/* Left column — main text */}
        <div>

          {/* Established badge */}
          <div ref={estRef} className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#C9A227]" />
            <span className="text-[#C9A227] text-xs font-medium tracking-[0.2em] uppercase">
              Est. 1856 — Nassau, Bahamas
            </span>
          </div>

          {/* Main heading */}
          <h1
            ref={headingRef}
            className="font-[family-name:var(--font-playfair)] text-white font-black leading-[1.05] tracking-tight mb-6"
            style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}
          >
            Welcome to <br />
            <span className="text-[#C9A227]">St. James</span>
          </h1>

          {/* Tagline */}
          <p
            ref={taglineRef}
            className="text-white/60 font-light italic leading-relaxed mb-10"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}
          >
            A Christ Centered Church — Soul Food for the Soul
          </p>

          {/* CTA Buttons */}
          <div ref={buttonsRef} className="flex flex-wrap gap-4">
            <Link href="/contact">
              <button className="px-8 py-4 bg-[#C9A227] text-white text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:bg-[#e8c35a] hover:-translate-y-0.5">
                Join Us Sunday
              </button>
            </Link>
            <Link href="/about">
              <button className="px-8 py-4 border border-white/30 text-white text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:border-white/60 hover:bg-white/5">
                Learn More
              </button>
            </Link>
          </div>

        </div>

        {/* Right column — stat card and verse */}
        <div ref={rightRef} className="flex flex-col items-end gap-6">

          {/* 170 years stat card */}
          <div
            className="border p-8 text-center backdrop-blur-sm"
            style={{
              background: 'rgba(255,255,255,0.04)',
              borderColor: 'rgba(201,162,39,0.3)',
            }}
          >
            <div
              className="font-[family-name:var(--font-playfair)] text-[#C9A227] font-black leading-none mb-2"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            >
              170
            </div>
            <div className="text-white/50 text-xs tracking-[0.15em] uppercase">
              Years of Faith
            </div>
          </div>

          {/* Bible verse card */}
          <div
            className="max-w-xs p-5"
            style={{ borderLeft: '2px solid #C9A227', background: 'rgba(255,255,255,0.03)' }}
          >
            <p className="font-[family-name:var(--font-playfair)] text-white/70 italic text-sm leading-relaxed mb-3">
              "For where two or three are gathered together in my name, there am I in the midst of them."
            </p>
            <cite className="text-[#C9A227] text-xs tracking-[0.15em] uppercase not-italic">
              Matthew 18:20
            </cite>
          </div>

        </div>

      </div>

      
    </section>
  )
}