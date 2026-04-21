/**
 * Sermons Page — app/sermons/page.js
 *
 * Fetches and displays sermons from Sanity CMS.
 * Church staff can manage sermons through the Sanity Studio at /studio.
 *
 * Data fetching uses GROQ — Sanity's query language.
 * Results are sorted by date — newest first.
 */

import { sanityClient } from '@/lib/sanity'
import { Play, Calendar, User, Headphones } from 'lucide-react'

export const metadata = {
  title: 'Sermons | St. James Native Baptist Church',
  description: 'Watch and listen to sermons from St. James Native Baptist Church in Nassau, Bahamas.',
}

/**
 * GROQ query — fetches all sermons from Sanity
 * sorted by date descending — newest first
 */
const sermonsQuery = `*[_type == "sermon"] | order(date desc) {
  _id,
  title,
  preacher,
  date,
  scripture,
  description,
  audioUrl,
  videoUrl,
  featured,
  "thumbnail": thumbnail.asset->url
}`

export default async function SermonsPage() {
  /**
   * Fetch sermons from Sanity at request time
   * This means new sermons published in the studio
   * appear on the website automatically
   */
  const sermons = await sanityClient.fetch(sermonsQuery)

  const featuredSermon = sermons.find(s => s.featured) || sermons[0]
  const archiveSermons = sermons.filter(s => s._id !== featuredSermon?._id)

  /**
   * Format date from Sanity — converts 2026-04-20 to April 20, 2026
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
    <main>

      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <img
          src="/images/church3.jpeg"
          alt="St. James Native Baptist Church"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 40%' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(42,10,10,0.88)' }}
        />
        <div className="relative z-10 text-center px-6">
          <span className="text-[#C9A227] text-xs font-semibold tracking-[0.25em] uppercase block mb-4">
            The Word of God
          </span>
          <h1
            className="font-[family-name:var(--font-playfair)] text-white font-black leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Sermons
          </h1>
          <div className="w-12 h-0.5 bg-[#C9A227] mx-auto mt-6" />
        </div>
      </section>

      {/* No sermons state */}
      {sermons.length === 0 && (
        <section className="py-24 bg-white text-center">
          <p className="text-[#6B6B6B]">No sermons have been published yet. Check back soon.</p>
        </section>
      )}

      {/* Featured Sermon */}
      {featuredSermon && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-[#C9A227] text-xs font-semibold tracking-[0.25em] uppercase block mb-3">
                Latest Message
              </span>
              <h2
                className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] font-bold"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
              >
                Featured Sermon
              </h2>
              <div className="w-12 h-0.5 bg-[#C9A227] mx-auto mt-6" />
            </div>

            <div
              className="max-w-4xl mx-auto p-10 md:p-16"
              style={{ background: '#FAF7F2', borderLeft: '4px solid #C9A227' }}
            >
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span
                  className="px-3 py-1 text-xs font-semibold tracking-widest uppercase text-white"
                  style={{ background: '#C9A227' }}
                >
                  Latest
                </span>
                <span className="text-[#6B6B6B] text-xs flex items-center gap-1">
                  <Calendar size={12} className="text-[#C9A227]" />
                  {formatDate(featuredSermon.date)}
                </span>
                <span className="text-[#6B6B6B] text-xs flex items-center gap-1">
                  <User size={12} className="text-[#C9A227]" />
                  {featuredSermon.preacher}
                </span>
              </div>

              <h3
                className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] font-bold mb-3 leading-tight"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}
              >
                {featuredSermon.title}
              </h3>

              {featuredSermon.scripture && (
                <p className="text-[#C9A227] text-sm font-semibold italic mb-4">
                  {featuredSermon.scripture}
                </p>
              )}

              {featuredSermon.description && (
                <p className="text-[#6B6B6B] leading-loose mb-8">
                  {featuredSermon.description}
                </p>
              )}

              {/* Audio or Video link */}
              {(featuredSermon.videoUrl || featuredSermon.audioUrl) && (
                
                  <a href={featuredSermon.videoUrl || featuredSermon.audioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 text-white text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:opacity-80"
                  style={{ background: '#7A1B1B' }}
                >
                  <Play size={16} />
                  {featuredSermon.videoUrl ? 'Watch Sermon' : 'Listen to Sermon'}
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Sermon Archive */}
      {archiveSermons.length > 0 && (
        <section className="py-24 bg-[#FAF7F2]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-[#C9A227] text-xs font-semibold tracking-[0.25em] uppercase block mb-3">
                Past Messages
              </span>
              <h2
                className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] font-bold"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
              >
                Sermon Archive
              </h2>
              <div className="w-12 h-0.5 bg-[#C9A227] mx-auto mt-6" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {archiveSermons.map((sermon) => (
                <div
                  key={sermon._id}
                  className="bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ borderTop: '3px solid #C9A227' }}
                >
                  {sermon.scripture && (
                    <p className="text-[#C9A227] text-xs font-semibold italic mb-3">
                      {sermon.scripture}
                    </p>
                  )}

                  <h3 className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] text-lg font-bold mb-3 leading-snug">
                    {sermon.title}
                  </h3>

                  {sermon.description && (
                    <p className="text-[#6B6B6B] text-sm leading-relaxed mb-6">
                      {sermon.description}
                    </p>
                  )}

                  <div className="space-y-2 pt-4 border-t border-[#E0DDD8]">
                    <div className="flex items-center gap-2 text-xs text-[#6B6B6B]">
                      <Calendar size={12} className="text-[#C9A227]" />
                      <span>{formatDate(sermon.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#6B6B6B]">
                      <User size={12} className="text-[#C9A227]" />
                      <span>{sermon.preacher}</span>
                    </div>
                  </div>

                  {(sermon.videoUrl || sermon.audioUrl) && (
                    
                      <a href={sermon.videoUrl || sermon.audioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#7A1B1B] hover:text-[#C9A227] transition-colors duration-300"
                    >
                      <Play size={14} />
                      {sermon.videoUrl ? 'Watch Now' : 'Listen Now'}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

    </main>
  )
}