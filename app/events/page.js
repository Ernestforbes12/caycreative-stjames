/**
 * Events Page — app/events/page.js
 *
 * Displays all upcoming church events.
 * Events will be managed via Sanity CMS — configured in a later step.
 * Currently using hardcoded placeholder events.
 *
 * Sections:
 * - Hero — page title with church photo background
 * - Events grid — all upcoming events with date, description, location
 * - CTA — encourage visitors to check back or contact the church
 */

import { MapPin, Calendar } from 'lucide-react'

export const metadata = {
  title: 'Events | St. James Native Baptist Church',
  description: 'Upcoming events at St. James Native Baptist Church in Nassau, Bahamas. Join us for worship, fellowship, and community outreach.',
}

/**
 * Placeholder events — will be replaced with Sanity CMS fetch
 * when CMS is configured in a later step
 */
const events = [
  {
    title: 'Harvest Festival Luncheon',
    description: 'Annual celebration of gratitude featuring island delicacies and warm fellowship with the congregation and community.',
    day: '18',
    month: 'May',
    year: '2026',
    location: 'Fellowship Hall',
    category: 'Community',
    image: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=800&q=80',
    time: '12:00 PM',
  },
  {
    title: 'Voices of Zion Concert',
    description: 'An evening of contemporary gospel and classic hymns performed by our combined choirs. All are welcome.',
    day: '25',
    month: 'May',
    year: '2026',
    location: 'Main Sanctuary',
    category: 'Music Ministry',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
    time: '7:00 PM',
  },
  {
    title: 'Community Outreach Day',
    description: 'Serving local Nassau families through food, prayer, and the love of Christ. Volunteers welcome.',
    day: '01',
    month: 'Jun',
    year: '2026',
    location: 'St James Road',
    category: 'Outreach',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
    time: '9:00 AM',
  },
  {
    title: 'Youth Ministry Workshop',
    description: 'A full day workshop for young people focused on faith, leadership, and purpose. Ages 13 to 25.',
    day: '08',
    month: 'Jun',
    year: '2026',
    location: 'Education Wing',
    category: 'Youth',
    image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=80',
    time: '10:00 AM',
  },
  {
    title: "Women's Fellowship Brunch",
    description: 'A morning of encouragement, prayer, and sisterhood for the women of St. James and their guests.',
    day: '15',
    month: 'Jun',
    year: '2026',
    location: 'Fellowship Hall',
    category: "Women's Ministry",
    image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&q=80',
    time: '10:00 AM',
  },
  {
    title: 'Annual Church Anniversary Service',
    description: 'Celebrating 170 years of faith, community, and the grace of God at St. James Native Baptist Church.',
    day: '22',
    month: 'Jun',
    year: '2026',
    location: 'Main Sanctuary',
    category: 'Special Service',
    image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=800&q=80',
    time: '11:00 AM',
  },
]

export default function EventsPage() {
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

          {/* Section header */}
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

          {/* Events grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event.title}
                className="bg-white group cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >

                {/* Event image with date badge */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
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

                  {/* Category badge */}
                  <div
                    className="absolute top-4 right-4 px-3 py-1"
                    style={{ background: 'rgba(42,10,10,0.85)' }}
                  >
                    <span className="text-[#C9A227] text-xs font-semibold tracking-widest uppercase">
                      {event.category}
                    </span>
                  </div>

                </div>

                {/* Event details */}
                <div className="p-6">
                  <h3 className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] text-xl font-bold mb-3 leading-snug">
                    {event.title}
                  </h3>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed mb-4">
                    {event.description}
                  </p>

                  {/* Location and time */}
                  <div className="space-y-2 pt-4 border-t border-[#E0DDD8]">
                    <div className="flex items-center gap-2 text-xs text-[#6B6B6B]">
                      <MapPin size={13} className="text-[#C9A227] shrink-0" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#6B6B6B]">
                      <Calendar size={13} className="text-[#C9A227] shrink-0" />
                      <span>{event.month} {event.day}, {event.year} — {event.time}</span>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
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