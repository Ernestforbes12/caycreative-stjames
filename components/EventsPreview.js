/**
 * EventsPreview Component — components/EventsPreview.js
 *
 * Displays a preview of the three most upcoming events on the homepage.
 * Full events list lives on the /events page managed via Sanity CMS.
 *
 * Features:
 * - Three event cards in a horizontal grid
 * - Horizontal scroll section on mobile
 * - Date badge on each card
 * - GSAP scroll triggered stagger animation
 * - Links through to full Events page
 *
 * Note: Events are hardcoded for now — will be replaced with
 * Sanity CMS fetch once CMS is configured in a later step.
 */

'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Calendar, MapPin, ChevronRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/**
 * Placeholder events — replace with Sanity CMS fetch later
 * Each event needs: title, description, date, month, day, location, category, image
 */
const events = [
  {
    title: 'Harvest Festival Luncheon',
    description: 'Annual celebration of gratitude featuring island delicacies and warm fellowship.',
    day: '18',
    month: 'May',
    location: 'Fellowship Hall',
    category: 'Community',
    image: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=800&q=80',
  },
  {
    title: 'Voices of Zion Concert',
    description: 'An evening of contemporary gospel and classic hymns performed by our combined choirs.',
    day: '25',
    month: 'May',
    location: 'Main Sanctuary',
    category: 'Music Ministry',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
  },
  {
    title: 'Community Outreach Day',
    description: 'Serving local Nassau families through food, prayer, and the love of Christ.',
    day: '01',
    month: 'Jun',
    location: 'St James Road',
    category: 'Outreach',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
  },
]

export default function EventsPreview() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {

      /**
       * Cards stagger in from below as section enters viewport
       * Each card is delayed slightly after the previous one
       */
      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 60,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        immediateRender: false,
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-[#C9A227] text-xs font-semibold tracking-[0.25em] uppercase block mb-3">
              Gather Together
            </span>
            <h2
              className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] font-bold"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Upcoming Events
            </h2>
          </div>
          <Link href="/events">
            <button
              className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase transition-all duration-300"
              style={{ color: '#7A1B1B', borderBottom: '1px solid #C9A227', paddingBottom: '2px' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#C9A227'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#7A1B1B'}
            >
              View All Events
              <ChevronRight size={14} />
            </button>
          </Link>
        </div>

        {/* Events grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div
              key={event.title}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-white group cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >

              {/* Event image with date badge */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

                {/* Date badge */}
                <div
                  className="absolute top-4 left-4 p-3 text-center"
                  style={{ background: '#C9A227' }}
                >
                  <div className="font-[family-name:var(--font-playfair)] text-white text-2xl font-black leading-none">
                    {event.day}
                  </div>
                  <div className="text-white/85 text-xs tracking-widest uppercase mt-0.5">
                    {event.month}
                  </div>
                </div>

              </div>

              {/* Event details */}
              <div className="p-6">

                {/* Category tag */}
                <div className="text-[#C9A227] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                  {event.category}
                </div>

                {/* Event title */}
                <h3 className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] text-xl font-bold mb-3 leading-snug">
                  {event.title}
                </h3>

                {/* Description */}
                <p className="text-[#6B6B6B] text-sm leading-relaxed mb-4">
                  {event.description}
                </p>

                {/* Location */}
                <div className="flex items-center gap-2 text-xs text-[#6B6B6B]">
                  <MapPin size={13} className="text-[#C9A227]" />
                  <span>{event.location}</span>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}