/**
 * Individual Event Page — app/events/[slug]/page.js
 *
 * Dynamically generated page for each event.
 * URL structure: /events/high-tea-party
 *
 * Next.js generates these pages at request time using
 * the slug from Sanity CMS.
 *
 * generateStaticParams — pre-generates all event pages
 * at build time for better performance and SEO.
 */

import { sanityClient } from '@/lib/sanity'
import { MapPin, Calendar, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

/**
 * GROQ query — fetches a single event by slug
 */
const eventQuery = `*[_type == "event" && slug.current == $slug][0] {
  _id,
  title,
  description,
  eventDate,
  eventTime,
  location,
  category,
  "image": image.asset->url,
  "slug": slug.current
}`

/**
 * GROQ query — fetches all event slugs for static generation
 */
const allSlugsQuery = `*[_type == "event" && defined(slug.current)] {
  "slug": slug.current
}`

/**
 * generateStaticParams
 * Tells Next.js which event pages to pre-generate at build time
 * This makes individual event pages fast and SEO friendly
 */
export async function generateStaticParams() {
  const events = await sanityClient.fetch(allSlugsQuery)
  return events.map((event) => ({ slug: event.slug }))
}

/**
 * generateMetadata
 * Dynamically generates SEO metadata for each event page
 */
export async function generateMetadata({ params }) {
  const { slug } = await params
  const event = await sanityClient.fetch(eventQuery, { slug })
  if (!event) return { title: 'Event Not Found' }
  return {
    title: `${event.title} | St. James Native Baptist Church`,
    description: event.description,
  }
}

export default async function EventPage({ params }) {
  const { slug } = await params
  const event = await sanityClient.fetch(eventQuery, { slug })

  /**
   * If event not found — show 404 page
   */
  if (!event) notFound()

  /**
   * Format date — converts 2026-05-29 to May 29, 2026
   */
  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <main>

      {/* Hero */}
      <section className="relative h-[60vh] flex items-end overflow-hidden">
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, #2a0a0a, #4a1010)' }}
          />
        )}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(42,10,10,0.97) 30%, rgba(42,10,10,0.4) 100%)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          {/* Back button */}
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#C9A227] text-xs tracking-widest uppercase transition-colors duration-300 mb-8 block"
          >
            <ArrowLeft size={14} />
            Back to Events
          </Link>

          {/* Category badge */}
          {event.category && (
            <span
              className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase text-white mb-4"
              style={{ background: '#C9A227' }}
            >
              {event.category}
            </span>
          )}

          {/* Event title */}
          <h1
            className="font-[family-name:var(--font-playfair)] text-white font-black leading-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          >
            {event.title}
          </h1>

          {/* Event meta */}
          <div className="flex flex-wrap gap-6">
            {event.eventDate && (
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <Calendar size={16} className="text-[#C9A227]" />
                <span>{formatDate(event.eventDate)}{event.eventTime && ` — ${event.eventTime}`}</span>
              </div>
            )}
            {event.location && (
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <MapPin size={16} className="text-[#C9A227]" />
                <span>{event.location}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Event Content */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">

          {event.description && (
            <div>
              <span className="text-[#C9A227] text-xs font-semibold tracking-[0.25em] uppercase block mb-3">
                About This Event
              </span>
              <h2
                className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] font-bold mb-6"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
              >
                Event Details
              </h2>
              <div className="w-12 h-0.5 bg-[#C9A227] mb-8" />
              <p className="text-[#6B6B6B] leading-loose text-base">
                {event.description}
              </p>
            </div>
          )}

          {/* Info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
            {event.eventDate && (
              <div
                className="p-6"
                style={{ background: '#FAF7F2', borderLeft: '3px solid #C9A227' }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Calendar size={18} className="text-[#C9A227]" />
                  <span className="text-xs font-semibold tracking-widest uppercase text-[#6B6B6B]">Date & Time</span>
                </div>
                <p className="text-[#1A1A1A] font-medium text-sm">
                  {formatDate(event.eventDate)}
                </p>
                {event.eventTime && (
                  <p className="text-[#6B6B6B] text-sm">{event.eventTime}</p>
                )}
              </div>
            )}

            {event.location && (
              <div
                className="p-6"
                style={{ background: '#FAF7F2', borderLeft: '3px solid #C9A227' }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <MapPin size={18} className="text-[#C9A227]" />
                  <span className="text-xs font-semibold tracking-widest uppercase text-[#6B6B6B]">Location</span>
                </div>
                <p className="text-[#1A1A1A] font-medium text-sm">{event.location}</p>
              </div>
            )}
          </div>

          {/* Back to events */}
          <div className="mt-16 pt-8 border-t border-[#E0DDD8]">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#7A1B1B] hover:text-[#C9A227] transition-colors duration-300"
            >
              <ArrowLeft size={14} />
              Back to All Events
            </Link>
          </div>

        </div>
      </section>

    </main>
  )
}