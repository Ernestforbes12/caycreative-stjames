/**
 * VerseOfTheDay Component — components/VerseOfTheDay.js
 *
 * Displays a different Bible verse each day fetched from bible-api.com
 * No API key required — completely free.
 *
 * How the daily rotation works:
 * - We have an array of verse references
 * - We use the day of the year (1-365) to pick an index from the array
 * - Same verse shows all day, new verse every midnight
 *
 * Usage: Drop this component anywhere — currently used in HeroSection
 */

'use client'

import { useState, useEffect } from 'react'

/**
 * Curated list of verse references
 * bible-api.com accepts standard Bible reference format
 * Add or remove verses here to expand the rotation
 */
const verseReferences = [
  'john+3:16',
  'philippians+4:13',
  'psalm+23:1',
  'jeremiah+29:11',
  'romans+8:28',
  'isaiah+40:31',
  'matthew+6:33',
  'proverbs+3:5-6',
  'psalm+46:1',
  'matthew+11:28',
  'romans+15:13',
  'joshua+1:9',
  'psalm+121:1-2',
  '1+corinthians+13:4-5',
  'galatians+5:22-23',
  'ephesians+2:8-9',
  'hebrews+11:1',
  'james+1:17',
  '1+john+4:19',
  'revelation+21:4',
]

/**
 * getDailyVerseReference
 * Uses the current day of the year to pick a verse from the array
 * This ensures the verse changes every day automatically
 */
function getDailyVerseReference() {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const diff = now - start
  const oneDay = 1000 * 60 * 60 * 24
  const dayOfYear = Math.floor(diff / oneDay)
  return verseReferences[dayOfYear % verseReferences.length]
}

export default function VerseOfTheDay() {
  const [verse, setVerse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    /**
     * Fetch the daily verse from bible-api.com
     * If the fetch fails we fall back to a hardcoded verse
     * so the section never appears broken to visitors
     */
    async function fetchVerse() {
      try {
        const reference = getDailyVerseReference()
        const response = await fetch(`https://bible-api.com/${reference}`)

        if (!response.ok) throw new Error('Failed to fetch verse')

        const data = await response.json()

        setVerse({
          text: data.text.trim(),
          reference: data.reference,
        })
      } catch (err) {
        /**
         * Fallback verse — shown if API is unreachable
         */
        setVerse({
          text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
          reference: 'John 3:16',
        })
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchVerse()
  }, [])

  if (loading) {
    return (
      <div
        className="max-w-xs p-5 animate-pulse"
        style={{ borderLeft: '2px solid #C9A227', background: 'rgba(255,255,255,0.03)' }}
      >
        <div className="h-3 bg-white/10 rounded mb-2 w-full" />
        <div className="h-3 bg-white/10 rounded mb-2 w-4/5" />
        <div className="h-3 bg-white/10 rounded w-3/5" />
      </div>
    )
  }

  return (
    <div
      className="max-w-xs p-5"
      style={{ borderLeft: '2px solid #C9A227', background: 'rgba(255,255,255,0.03)' }}
    >
      <p className="font-[family-name:var(--font-playfair)] text-white/70 italic text-sm leading-relaxed mb-3">
        "{verse.text}"
      </p>
      <cite className="text-[#C9A227] text-xs tracking-[0.15em] uppercase not-italic">
        {verse.reference}
      </cite>
    </div>
  )
}