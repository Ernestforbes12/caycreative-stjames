/**
 * Events Page — app/events/page.js
 *
 * Fetches and displays upcoming events from Sanity CMS.
 * Church staff can manage events through the Sanity Studio at /studio.
 *
 * Data fetching uses GROQ — Sanity's query language.
 * Results are sorted by event date — soonest first.
 */

import { sanityClient } from '@/lib/sanity'
import { MapPin, Calendar } from 'lucide-react'

export const metadata = {
  title: 'Events | St. James Native Baptist Church',
  description: 'Upcoming events at St. James Native Baptist Church in Nassau, Bahamas.',
}

/**
 * GROQ query — fetches all events from Sanity
 * sorted by eventDate ascending — soonest first
 */
const eventsQuery = `*[_type == "event"] | order(eventDate asc) {
  _id,
  title,
  description,
  eventDate,
  eventTime,
  location,
  category,
  featured,
  "image": image.asset->url
}`

export default async function EventsPage() {
  const events = await sanityClient.fetch(eventsQuery)

  /**
   * Format date — converts 2026-05-18 to May 18, 2026
   */
  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  /**
   * Get day number from date string — e.g. 18
   */
  const getDay = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).getDate().toString().padStart(2, '0')
  }

  /**
   * Get short month from date string — e.g. May
   */
  const getMonth = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short' })
  }

  return (
    <main>

      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <img
          src="/images/church2.jpeg"
          alt="St. James Native Baptist Church"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 30%' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(42,10,10,0.85)' }}
        />
        <div className="relative z-10 text-center px-6">
          <span className="text-[#C9A227] text-xs font-semibold tracking-[0.25em] uppercase block mb-4">
            Gather Together
          </span>
          <h1
            className="font-[family-name:var(--font-playfair)] text-white font-black leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Upcoming Events
          </h1>
          <div className="w-12 h-0.5 bg-[#C9A227] mx-auto mt-6" />
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <span className="text-[#C9A227] text-xs font-semibold tracking-[0.25em] uppercase block mb-3">
              What's Coming Up
            </span>
            <h2
              className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] font-bold"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
            >
              Events & Gatherings
            </h2>
            <div className="w-12 h-0.5 bg-[#C9A227] mx-auto mt-6" />
          </div>

          {/* No events state */}
          {events.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#6B6B6B]">No upcoming events at this time. Check back soon.</p>
            </div>
          )}

          {/* Events grid */}
          {events.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="bg-white group cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                >
                  {/* Event image */}
                  <div className="relative h-52 overflow-hidden">
                    {event.image ? (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div
                        className="w-full h-full"
                        style={{ background: 'linear-gradient(135deg, #2a0a0a, #4a1010)' }}
                      />
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

                    {/* Date badge */}
                    <div
                      className="absolute top-4 left-4 p-3 text-center"
                      style={{ background: '#C9A227' }}
                    >
                      <div className="font-[family-name:var(--font-playfair)] text-white text-2xl font-black leading-none">
                        {getDay(event.eventDate)}
                      </div>
                      <div className="text-white/85 text-xs tracking-widest uppercase mt-0.5">
                        {getMonth(event.eventDate)}
                      </div>
                    </div>

                    {/* Category badge */}
                    {event.category && (
                      <div
                        className="absolute top-4 right-4 px-3 py-1"
                        style={{ background: 'rgba(42,10,10,0.85)' }}
                      >
                        <span className="text-[#C9A227] text-xs font-semibold tracking-widest uppercase">
                          {event.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Event details */}
                  <div className="p-6">
                    <h3 className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] text-xl font-bold mb-3 leading-snug">
                      {event.title}
                    </h3>

                    {event.description && (
                      <p className="text-[#6B6B6B] text-sm leading-relaxed mb-4">
                        {event.description}
                      </p>
                    )}

                    <div className="space-y-2 pt-4 border-t border-[#E0DDD8]">
                      {event.location && (
                        <div className="flex items-center gap-2 text-xs text-[#6B6B6B]">
                          <MapPin size={13} className="text-[#C9A227] shrink-0" />
                          <span>{event.location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-xs text-[#6B6B6B]">
                        <Calendar size={13} className="text-[#C9A227] shrink-0" />
                        <span>
                          {formatDate(event.eventDate)}
                          {event.eventTime && ` — ${event.eventTime}`}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        className="py-20 text-center px-6"
        style={{ background: '#7A1B1B' }}
      >
        <h2
          className="font-[family-name:var(--font-playfair)] text-[#C9A227] font-bold mb-4"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
        >
          Want to Stay Updated?
        </h2>
        <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-lg mx-auto">
          Contact us to be added to our announcements list and never miss
          an event at St. James Native Baptist Church.
        </p>
        
          <a href="/contact"
          className="inline-block px-10 py-4 text-white text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:opacity-80"
          style={{ background: '#C9A227' }}
        >
          Contact Us
        </a>
      </section>

    </main>
  )
}