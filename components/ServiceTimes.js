/**
 * ServiceTimes Component — components/ServiceTimes.js
 *
 * Displays the three weekly service times in a clean card grid.
 *
 * Features:
 * - Three cards — Sunday School, Morning Worship, Wednesday Bible Study
 * - Gold top border animates in on hover
 * - Cards fade and slide up on scroll using GSAP ScrollTrigger
 * - Lucide icons for each service type
 */

'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BookOpen, Sun, Moon } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/**
 * Service data
 * Update times or names here without touching the JSX below
 */
const services = [
  {
    icon: BookOpen,
    day: 'Sunday',
    name: 'Sunday School',
    time: '9:30 AM',
    location: 'Education Wing',
    description: 'Interactive biblical learning for all ages — from children to seniors.',
  },
  {
    icon: Sun,
    day: 'Sunday',
    name: 'Morning Worship',
    time: '11:00 AM',
    location: 'Main Sanctuary',
    description: 'A soulful experience of traditional hymns, gospel choir, and powerful scripture.',
  },
  {
    icon: Moon,
    day: 'Wednesday',
    name: 'Bible Study',
    time: '7:00 PM',
    location: 'Fellowship Hall',
    description: 'Mid-week spiritual nourishment through deep theological discussion and prayer.',
  },
]

export default function ServiceTimes() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {

      /**
       * Staggered card entrance animation
       * Each card fades up one after the other as the section scrolls into view
       * scrub: false here because we want a clean one-time animation, not scrubbed
       */
      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-[#C9A227] text-xs font-semibold tracking-[0.25em] uppercase block mb-3">
            You Are Welcome Here
          </span>
          <h2 className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] font-bold mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Worship With Us
          </h2>
          <div className="w-12 h-0.5 bg-[#C9A227] mx-auto" />
        </div>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E8E4DC]">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={service.name}
                ref={(el) => (cardsRef.current[index] = el)}
                className="bg-white p-10 relative overflow-hidden group transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
              >
                {/* Gold top border that grows on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#C9A227] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                {/* Icon */}
                <Icon
                  size={32}
                  className="text-[#C9A227] mb-6 transition-transform duration-300 group-hover:scale-110"
                />

                {/* Day label */}
                <div className="text-xs text-[#C9A227] font-semibold tracking-[0.2em] uppercase mb-2">
                  {service.day}
                </div>

                {/* Service name */}
                <h3 className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] text-2xl font-bold mb-2">
                  {service.name}
                </h3>

                {/* Time */}
                <div className="text-3xl font-light text-[#1A1A1A] tracking-tight mb-1">
                  {service.time}
                </div>

                {/* Location */}
                <div className="text-sm text-[#6B6B6B] mb-4">
                  {service.location}
                </div>

                {/* Description */}
                <p className="text-sm text-[#6B6B6B] leading-relaxed">
                  {service.description}
                </p>

                {/* Large Roman numeral background accent */}
                <div
                  className="absolute bottom-0 right-4 font-[family-name:var(--font-playfair)] font-black text-[8rem] leading-none select-none pointer-events-none"
                  style={{ color: 'rgba(122,27,27,0.04)' }}
                >
                  {['I', 'II', 'III'][index]}
                </div>

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}