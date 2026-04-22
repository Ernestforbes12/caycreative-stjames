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
import Link from 'next/link'
import { MapPin, Calendar } from 'lucide-react'

export const metadata = {
  title: 'Events | St. James Native Baptist Church',
  description: 'Upcoming events at St. James Native Baptist Church in Nassau, Bahamas.',
}

const eventsQuery = `*[_type == "event"] | order(eventDate asc) {
  _id,
  title,
  description,
  eventDate,
  eventTime,
  location,
  category,
  featured,
  slug,
  "image": image.asset->url
}`

export default async function EventsPage() {
  const events = await sanityClient.fetch(eventsQuery)

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getDay = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).getDate().toString().padStart(2, '0')
  }

  const getMonth = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short' })
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[45vh] flex items-center justify-center overflow-hidden">
        <img
          src="/images/church2.jpeg"
          alt="St. James Native Baptist Church Events"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 30%' }}
        />
        <div className="absolute inset-0 bg-[#2a0a0a]/85" />
        <div className="relative z-10 text-center px-6">
          <span className="text-[#C9A227] text-xs font-bold tracking-[0.3em] uppercase block mb-4">
            Gather Together
          </span>
          <h1
            className="font-[family-name:var(--font-playfair)] text-white font-black leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            Upcoming Events
          </h1>
          <div className="w-16 h-1 bg-[#C9A227] mx-auto mt-6" />
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#C9A227] text-xs font-bold tracking-[0.25em] uppercase block mb-3">
              What's Coming Up
            </span>
            <h2 className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] font-bold text-3xl md:text-4xl">
              Events & Gatherings
            </h2>
          </div>

          {events.length === 0 ? (
            <div className="text-center py-20 bg-white border border-[#E0DDD8] rounded-sm shadow-sm">
              <p className="text-[#6B6B6B] italic font-medium">No upcoming events at this time. Check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <Link
                  key={event._id}
                  href={`/events/${event.slug?.current || event._id}`}
                  className="bg-white group overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col border border-black/5"
                >
                  {/* Event image */}
                  <div className="relative h-56 overflow-hidden">
                    {event.image ? (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#2a0a0a] to-[#4a1010]" />
                    )}
                    
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />

                    {/* Date badge */}
                    <div className="absolute top-0 left-6 w-14 py-3 text-center shadow-lg" style={{ background: '#C9A227' }}>
                      <div className="font-[family-name:var(--font-playfair)] text-white text-2xl font-black leading-none">
                        {getDay(event.eventDate)}
                      </div>
                      <div className="text-white text-[10px] font-bold tracking-widest uppercase mt-1">
                        {getMonth(event.eventDate)}
                      </div>
                    </div>

                    {/* Category badge */}
                    {event.category && (
                      <div className="absolute bottom-4 right-4 px-3 py-1 bg-[#7A1B1B]/90 backdrop-blur-sm">
                        <span className="text-[#C9A227] text-[10px] font-bold tracking-widest uppercase">
                          {event.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Event details */}
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] text-xl font-bold mb-4 leading-tight group-hover:text-[#C9A227] transition-colors">
                      {event.title}
                    </h3>

                    {event.description && (
                      <p className="text-[#6B6B6B] text-sm leading-relaxed mb-6 line-clamp-3">
                        {event.description}
                      </p>
                    )}

                    <div className="mt-auto space-y-3 pt-6 border-t border-[#E0DDD8]">
                      {event.location && (
                        <div className="flex items-center gap-3 text-xs text-[#6B6B6B] font-medium">
                          <MapPin size={14} className="text-[#C9A227] shrink-0" />
                          {event.location}
                        </div>
                      )}
                      <div className="flex items-center gap-3 text-xs text-[#6B6B6B] font-medium">
                        <Calendar size={14} className="text-[#C9A227] shrink-0" />
                        <span>
                          {formatDate(event.eventDate)}
                          {event.eventTime && ` — ${event.eventTime}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 text-center px-6 bg-[#7A1B1B]">
        <h2 className="font-[family-name:var(--font-playfair)] text-[#C9A227] font-bold text-3xl mb-4">
          Want to Stay Updated?
        </h2>
        <p className="text-white/70 text-sm leading-relaxed mb-10 max-w-lg mx-auto font-medium">
          Contact us to be added to our announcements list and never miss
          an event at St. James Native Baptist Church.
        </p>
        
        <Link 
          href="/contact"
          className="inline-block px-12 py-5 bg-[#C9A227] text-white text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#e8c35a] hover:shadow-xl"
        >
          Contact Us
        </Link>
      </section>
    </main>
  )
}