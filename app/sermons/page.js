/**
 * Sermons Page — app/sermons/page.js
 */

import { Play, Calendar, User, Headphones } from 'lucide-react'

export const metadata = {
  title: 'Sermons | St. James Native Baptist Church',
  description: 'Watch and listen to sermons from St. James Native Baptist Church in Nassau, Bahamas.',
}

const sermons = [
  {
    title: 'Walking in Faith Through Uncertain Times',
    preacher: 'Pastor',
    date: 'April 20, 2026',
    scripture: 'Hebrews 11:1',
    description: 'A powerful message about maintaining unwavering faith even when the path ahead is unclear.',
    duration: '45 min',
    featured: true,
  },
  {
    title: 'The Power of Prayer',
    preacher: 'Pastor',
    date: 'April 13, 2026',
    scripture: 'James 5:16',
    description: 'Exploring the transformative power of a consistent and sincere prayer life.',
    duration: '38 min',
    featured: false,
  },
  {
    title: 'Soul Food — Feeding Your Spirit Daily',
    preacher: 'Pastor',
    date: 'April 6, 2026',
    scripture: 'Matthew 4:4',
    description: 'Understanding the importance of daily spiritual nourishment through the Word of God.',
    duration: '42 min',
    featured: false,
  },
  {
    title: 'Rooted and Grounded in Love',
    preacher: 'Pastor',
    date: 'March 30, 2026',
    scripture: 'Ephesians 3:17',
    description: 'How being rooted in the love of Christ transforms every area of our lives.',
    duration: '40 min',
    featured: false,
  },
  {
    title: 'The God Who Restores',
    preacher: 'Pastor',
    date: 'March 23, 2026',
    scripture: 'Joel 2:25',
    description: 'A message of hope for those who feel broken — God specializes in restoration.',
    duration: '44 min',
    featured: false,
  },
  {
    title: 'Community — Better Together',
    preacher: 'Pastor',
    date: 'March 16, 2026',
    scripture: 'Ecclesiastes 4:9-10',
    description: 'Why God designed us for community and how we can strengthen our bonds as a church family.',
    duration: '36 min',
    featured: false,
  },
]

const featuredSermon = sermons.find(s => s.featured)
const archiveSermons = sermons.filter(s => !s.featured)

export default function SermonsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[45vh] flex items-center justify-center overflow-hidden">
        <img
          src="/images/church3.jpeg"
          alt="St. James Native Baptist Church"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 40%' }}
        />
        <div
          className="absolute inset-0 bg-[#2a0a0a]/90"
        />
        <div className="relative z-10 text-center px-6">
          <span className="text-[#C9A227] text-xs font-bold tracking-[0.3em] uppercase block mb-4">
            The Word of God
          </span>
          <h1
            className="font-[family-name:var(--font-playfair)] text-white font-black leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            Sermon Archive
          </h1>
          <div className="w-16 h-1 bg-[#C9A227] mx-auto mt-6" />
        </div>
      </section>

      {/* Featured Sermon */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#C9A227] text-xs font-bold tracking-[0.25em] uppercase block mb-3">
              Most Recent Message
            </span>
            <h2 className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] font-bold text-3xl md:text-4xl">
              Featured Sermon
            </h2>
          </div>

          <div
            className="max-w-4xl mx-auto p-8 md:p-16 relative shadow-2xl"
            style={{ background: '#FAF7F2', borderLeft: '6px solid #C9A227' }}
          >
            <div className="flex flex-wrap items-center gap-6 mb-8">
              <span className="px-4 py-1.5 text-[10px] font-bold tracking-widest uppercase bg-[#C9A227] text-white">
                Newest
              </span>
              <div className="flex items-center gap-2 text-[#6B6B6B] text-xs font-medium">
                <Calendar size={14} className="text-[#C9A227]" />
                {featuredSermon.date}
              </div>
              <div className="flex items-center gap-2 text-[#6B6B6B] text-xs font-medium">
                <User size={14} className="text-[#C9A227]" />
                {featuredSermon.preacher}
              </div>
              <div className="flex items-center gap-2 text-[#6B6B6B] text-xs font-medium">
                <Headphones size={14} className="text-[#C9A227]" />
                {featuredSermon.duration}
              </div>
            </div>

            <h3 className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] font-bold mb-4 leading-tight text-2xl md:text-4xl">
              {featuredSermon.title}
            </h3>

            <p className="text-[#C9A227] text-sm font-bold italic mb-6">
              {featuredSermon.scripture}
            </p>

            <p className="text-[#6B6B6B] leading-loose mb-10 text-lg">
              {featuredSermon.description}
            </p>

            <a
              href="#"
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#7A1B1B] text-white text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:bg-[#5a1414] hover:shadow-xl"
            >
              <Play size={18} fill="currentColor" />
              Listen to Message
            </a>
          </div>
        </div>
      </section>

      {/* Sermon Archive Grid */}
      <section className="py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-xl">
              <span className="text-[#C9A227] text-xs font-bold tracking-[0.25em] uppercase block mb-3">
                Library
              </span>
              <h2 className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] font-bold text-3xl md:text-4xl">
                Browse Past Messages
              </h2>
            </div>
            <div className="w-16 h-1 bg-[#C9A227]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {archiveSermons.map((sermon) => (
              <div
                key={sermon.title}
                className="bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col"
                style={{ borderTop: '4px solid #C9A227' }}
              >
                <div className="flex justify-between items-start mb-4">
                  <p className="text-[#C9A227] text-[11px] font-bold uppercase tracking-wider">
                    {sermon.scripture}
                  </p>
                  <div className="text-[10px] text-white bg-[#7A1B1B]/10 text-[#7A1B1B] px-2 py-1 font-bold rounded">
                    {sermon.duration}
                  </div>
                </div>

                <h3 className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] text-xl font-bold mb-4 leading-snug group-hover:text-[#C9A227] transition-colors">
                  {sermon.title}
                </h3>

                <p className="text-[#6B6B6B] text-sm leading-relaxed mb-8 flex-1 line-clamp-3">
                  {sermon.description}
                </p>

                <div className="pt-6 border-t border-[#E0DDD8] flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2 text-[10px] text-[#6B6B6B] font-bold uppercase tracking-widest">
                    <Calendar size={12} className="text-[#C9A227]" />
                    {sermon.date}
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-[#7A1B1B] hover:text-[#C9A227] transition-colors"
                  >
                    <Play size={12} fill="currentColor" />
                    Play
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}