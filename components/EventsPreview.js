/**
 * EventsPreview Component — components/EventsPreview.js
 *
 * Displays the three most upcoming featured events on the homepage.
 * Fetches live data from Sanity CMS — no hardcoded events.
 *
 * Church staff can mark events as "Featured on Homepage" in Sanity Studio
 * to control which events appear here.
 *
 * If fewer than 3 events are featured — shows the 3 soonest upcoming events.
 */

import { sanityClient } from '@/lib/sanity'
import Link from 'next/link'
import { MapPin, Calendar, ChevronRight } from 'lucide-react'

/**
 * GROQ query — fetches 3 upcoming events
 * Prioritizes featured events first
 * Falls back to soonest upcoming events
 */
const eventsQuery = `*[_type == "event"] | order(featured desc, eventDate asc)[0...3] {
  _id,
  title,
  description,
  eventDate,
  eventTime,
  location,
  category,
  featured,
  "slug": slug.current,
  "image": image.asset->url
}`

export default async function EventsPreview() {
  let events = []
  try {
    events = await sanityClient.fetch(eventsQuery)
  } catch (error) {
    console.error('Failed to fetch events:', error)
  }

  /**
   * Format day — e.g. 18
   */
 const getDay = (dateStr) => {
    if (!dateStr) return ''
    return dateStr.split('-')[2]
  }

  const getMonth = (dateStr) => {
    if (!dateStr) return ''
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    return months[parseInt(dateStr.split('-')[1]) - 1]
  }
  /**
   * Format full date — e.g. May 18, 2026
   */
  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <section className="py-24 bg-[#FAF7F2]">
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
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#7A1B1B] hover:text-[#C9A227] transition-colors duration-300 border-b border-[#C9A227] pb-0.5">
              View All Events
              <ChevronRight size={14} />
            </span>
          </Link>
        </div>

        {/* No events state */}
        {events.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#6B6B6B]">No upcoming events at this time. Check back soon.</p>
          </div>
        )}

        {/* Events grid */}
        {events.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event) => (
              <Link
                key={event._id}
                href={event.slug ? `/events/${event.slug}` : '/events'}
                className="bg-white group cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl block"
              >

                {/* Event image with date badge */}
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

              </Link>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}