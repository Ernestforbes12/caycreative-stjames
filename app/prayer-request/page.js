/**
 * Prayer Request Page — app/prayer-request/page.js
 *
 * A safe and welcoming space for visitors to submit prayer requests.
 * All submissions are stored securely in Supabase.
 *
 * Sections:
 * - Hero — warm, inviting with church photo background
 * - Promise cards — what happens after you submit
 * - Prayer request form
 * - Bible verse banner at the bottom
 */

import PrayerRequestForm from '@/components/PrayerRequestForm'
import { Shield, Heart, Clock } from 'lucide-react'

export const metadata = {
  title: 'Prayer Request | St. James Native Baptist Church',
  description: 'Submit a prayer request to St. James Native Baptist Church in Nassau, Bahamas. Our pastoral team prays for every request submitted.',
}

const promises = [
  {
    icon: Heart,
    title: 'Prayed Over',
    description: 'Every request is personally prayed over by our pastoral team and prayer warriors.',
  },
  {
    icon: Shield,
    title: 'Completely Confidential',
    description: 'Your request is never shared publicly. It stays between you, our team, and God.',
  },
  {
    icon: Clock,
    title: 'Within 24 Hours',
    description: 'Our team reviews and prays over every submission within 24 hours of receiving it.',
  },
]

export default function PrayerRequestPage() {
  return (
    <main>

      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <img
          src="/images/church1.jpeg"
          alt="St. James Native Baptist Church"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 40%' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(42,10,10,0.88)' }}
        />
        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          <span className="text-[#C9A227] text-xs font-semibold tracking-[0.25em] uppercase block mb-4">
            We Are Here For You
          </span>
          <h1
            className="font-[family-name:var(--font-playfair)] text-white font-black leading-tight mb-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Prayer Request
          </h1>
          <p className="text-white/60 italic text-base leading-relaxed">
            "Cast all your anxiety on him because he cares for you." — 1 Peter 5:7
          </p>
          <div className="w-12 h-0.5 bg-[#C9A227] mx-auto mt-6" />
        </div>
      </section>

      {/* Promise Cards */}
      <section className="py-16 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {promises.map((promise) => {
              const Icon = promise.icon
              return (
                <div
                  key={promise.title}
                  className="bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ borderTop: '3px solid #C9A227' }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'rgba(201,162,39,0.1)' }}
                  >
                    <Icon size={22} className="text-[#C9A227]" />
                  </div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] font-bold text-lg mb-3">
                    {promise.title}
                  </h3>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed">
                    {promise.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Prayer Request Form */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[#C9A227] text-xs font-semibold tracking-[0.25em] uppercase block mb-3">
              Share Your Heart
            </span>
            <h2
              className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] font-bold mb-4"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
            >
              How Can We Pray For You?
            </h2>
            <div className="w-12 h-0.5 bg-[#C9A227] mx-auto" />
          </div>
          <PrayerRequestForm />
        </div>
      </section>

      {/* Bottom Bible Verse Banner */}
      <section
        className="py-20 text-center px-6"
        style={{ background: '#7A1B1B' }}
      >
        <p
          className="font-[family-name:var(--font-playfair)] text-white italic leading-relaxed max-w-2xl mx-auto mb-4"
          style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}
        >
          "And the prayer offered in faith will make the sick person well;
          the Lord will raise them up."
        </p>
        <cite className="text-[#C9A227] text-xs tracking-[0.2em] uppercase not-italic">
          James 5:15
        </cite>
      </section>

    </main>
  )
}