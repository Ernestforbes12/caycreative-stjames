/**
 * AboutSnippet Component — components/AboutSnippet.js
 *
 * A brief introduction to the church on the homepage.
 * Links through to the full About page.
 *
 * Features:
 * - Image left, text right layout
 * - Gold frame offset behind the image for depth
 * - Est. 1856 gold badge on the image
 * - Core values grid
 * - GSAP scroll triggered animations — image slides in from left, text from right
 */

'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const values = [
  'Christ Centered',
  'Bible Based',
  'Community Focused',
  'Prayer Driven',
]

export default function AboutSnippet() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      /**
       * Image slides in from the left as section enters viewport
       * Text slides in from the right simultaneously
       * scrub: false — clean one time animation, not tied to scroll
       */
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        opacity: 0,
        x: -60,
        duration: 1,
        ease: 'power3.out',
      })

      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        opacity: 0,
        x: 60,
        duration: 1,
        ease: 'power3.out',
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left — Image with frame and badge */}
          <div ref={imageRef} className="relative">

            {/* Gold offset frame behind image */}
            <div
              className="absolute top-[-1rem] left-[-1rem] right-[1rem] bottom-[1rem]"
              style={{ border: '1px solid #C9A227' }}
            />

            {/* Church photo placeholder — swap for real photo after church visit */}
            <div
              className="relative z-10 w-full aspect-[4/5] overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #2a0a0a, #4a1010)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1438032005730-c779502df39b?w=800&q=80"
                alt="St. James Native Baptist Church congregation"
                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
              />
            </div>

            {/* Est. 1856 gold badge */}
            <div
              className="absolute bottom-[-1.5rem] right-[-1.5rem] z-20 p-6 text-center"
              style={{ background: '#C9A227' }}
            >
              <div className="font-[family-name:var(--font-playfair)] text-white text-3xl font-black leading-none">
                1856
              </div>
              <div className="text-white/80 text-xs tracking-[0.15em] uppercase mt-1">
                Est.
              </div>
            </div>

          </div>

          {/* Right — Text content */}
          <div ref={textRef}>

            <span className="text-[#C9A227] text-xs font-semibold tracking-[0.25em] uppercase block mb-3">
              Our Heritage
            </span>

            <h2
              className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] font-bold leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Rooted in Faith,<br />Growing in Grace
            </h2>

            <div className="w-12 h-0.5 bg-[#C9A227] mb-8" />

            <p className="text-[#6B6B6B] leading-loose mb-8 text-base">
              For 170 years, St. James Native Baptist Church has stood as a
              pillar of faith and community in the heart of Nassau, Bahamas.
              We are a Christ-centered congregation committed to biblical
              truth, loving fellowship, and serving our island home with
              the soul-nourishing message of the Gospel.
            </p>

            {/* Core values grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {values.map((value) => (
                <div key={value} className="flex items-center gap-3">
                  <div
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: '#C9A227' }}
                  />
                  <span className="text-sm font-medium text-[#1A1A1A]">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Link to full About page */}
            <Link href="/about">
              <button
                className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase transition-all duration-300 group"
                style={{ color: '#7A1B1B', borderBottom: '1px solid #C9A227', paddingBottom: '2px' }}
                onMouseEnter={(e) => e.currentTarget.style.gap = '1rem'}
                onMouseLeave={(e) => e.currentTarget.style.gap = '0.5rem'}
              >
                Discover Our Story
                <ChevronRight size={14} />
              </button>
            </Link>

          </div>
        </div>
      </div>
    </section>
  )
}