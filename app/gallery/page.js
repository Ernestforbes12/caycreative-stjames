/**
 * Gallery Page: app/gallery/page.js
 *
 * Fetches photo albums from Sanity CMS and displays them.
 * Church staff add albums in the studio at /studio.
 *
 * This is a Server Component, so metadata and data fetching work here.
 * The interactive grid and photo viewer live in GalleryAlbums (client component).
 */

import { sanityClient } from '@/lib/sanity'
import GalleryAlbums from '@/components/GalleryAlbums'

// Refresh this page's Sanity content at most once every 60 seconds
export const revalidate = 60

export const metadata = {
  title: 'Gallery | St. James Native Baptist Church',
  description: 'Photos from services, events, and celebrations at St. James Native Baptist Church in Nassau, Bahamas.',
}

/**
 * GROQ query: all albums, newest first.
 * Each photo returns its image URL, alt text, and caption.
 */
const albumsQuery = `*[_type == "album"] | order(date desc) {
  _id,
  title,
  date,
  description,
  "photos": photos[] {
    "url": asset->url,
    alt,
    caption
  }
}`

/**
 * formatDate
 * Converts 2026-10-24 into "October 24, 2026" by splitting the string,
 * so the browser timezone can never shift the day.
 */
const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const [year, month, day] = dateStr.split('-')
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return `${months[parseInt(month) - 1]} ${parseInt(day)}, ${year}`
}

export default async function GalleryPage() {
  let albums = []
  try {
    albums = await sanityClient.fetch(albumsQuery)
  } catch (error) {
    console.error('Failed to fetch albums:', error)
  }

  // Add a ready to display date label before passing data to the client component
  const albumsWithDates = albums.map((album) => ({
    ...album,
    dateLabel: formatDate(album.date),
    photos: album.photos || [],
  }))

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
        <div className="relative z-10 text-center px-6 pt-16">
          <span className="text-[#C9A227] text-xs font-semibold tracking-[0.25em] uppercase block mb-4">
            Moments Together
          </span>
          <h1
            className="font-[family-name:var(--font-playfair)] text-white font-black leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Gallery
          </h1>
          <div className="w-12 h-0.5 bg-[#C9A227] mx-auto mt-6" />
        </div>
      </section>

      {/* Albums */}
      <section className="py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-6">
          {albumsWithDates.length === 0 ? (
            <p className="text-center text-[#6B6B6B]">
              No photos have been added yet. Check back soon.
            </p>
          ) : (
            <GalleryAlbums albums={albumsWithDates} />
          )}
        </div>
      </section>

    </main>
  )
}