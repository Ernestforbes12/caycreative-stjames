/**
 * GalleryAlbums Component: components/GalleryAlbums.js
 *
 * Shows each album as a titled photo grid.
 * Photos keep their natural shape (no cropping), arranged in columns,
 * so posters, flyers, and portraits all display fully.
 *
 * Clicking a photo opens a full screen viewer with:
 * - previous and next arrows
 * - keyboard support (left and right arrows, Escape to close)
 * - captions
 *
 * Client component, because it uses state and click handlers.
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * Sanity serves images through a CDN that resizes on request.
 * Width only (no crop), so every image keeps its natural proportions.
 */
const thumbUrl = (url) => `${url}?w=700&auto=format`
const fullUrl = (url) => `${url}?w=1800&auto=format`

export default function GalleryAlbums({ albums }) {
  // viewer holds which album and photo are open, or null when closed
  const [viewer, setViewer] = useState(null)

  const close = useCallback(() => setViewer(null), [])

  // Move to the next or previous photo, wrapping around at the ends
  const step = useCallback(
    (direction) => {
      setViewer((current) => {
        if (!current) return current
        const total = albums[current.albumIndex].photos.length
        return {
          ...current,
          photoIndex: (current.photoIndex + direction + total) % total,
        }
      })
    },
    [albums]
  )

  // Keyboard controls while the viewer is open
  useEffect(() => {
    if (!viewer) return

    const handleKey = (event) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
    }

    window.addEventListener('keydown', handleKey)
    // Stop the page behind the viewer from scrolling
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [viewer, close, step])

  const activePhoto = viewer
    ? albums[viewer.albumIndex].photos[viewer.photoIndex]
    : null

  return (
    <>
      {albums.map((album, albumIndex) => (
        <div key={album._id} className="mb-20 last:mb-0">

          {/* Album heading */}
          <div className="mb-8">
            <span className="text-[#C9A227] text-xs font-semibold tracking-[0.25em] uppercase block mb-2">
              {album.dateLabel}
            </span>
            <h2
              className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] font-bold"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}
            >
              {album.title}
            </h2>
            <div className="w-12 h-0.5 bg-[#C9A227] mt-4" />
            {album.description && (
              <p className="text-[#6B6B6B] text-sm leading-relaxed mt-4 max-w-2xl">
                {album.description}
              </p>
            )}
          </div>

          {/* Photo columns: each image keeps its natural shape */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3">
            {album.photos.map((photo, photoIndex) => (
              <button
                key={`${album._id}-${photoIndex}`}
                onClick={() => setViewer({ albumIndex, photoIndex })}
                className="group relative block w-full mb-3 break-inside-avoid overflow-hidden bg-[#E0DDD8]"
                aria-label={`Open photo: ${photo.alt || album.title}`}
              >
                <img
                  src={thumbUrl(photo.url)}
                  alt={photo.alt || album.title}
                  loading="lazy"
                  className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Full screen viewer */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 px-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          {/* Close button */}
          <button
            onClick={close}
            className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors"
            aria-label="Close viewer"
          >
            <X size={28} />
          </button>

          {/* Previous */}
          <button
            onClick={(event) => {
              event.stopPropagation()
              step(-1)
            }}
            className="absolute left-3 md:left-8 text-white/70 hover:text-[#C9A227] transition-colors"
            aria-label="Previous photo"
          >
            <ChevronLeft size={40} />
          </button>

          {/* Photo and caption */}
          <figure
            className="max-w-5xl max-h-[88vh] flex flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={fullUrl(activePhoto.url)}
              alt={activePhoto.alt || ''}
              className="max-h-[78vh] w-auto max-w-full object-contain"
            />
            {activePhoto.caption && (
              <figcaption className="text-white/70 text-sm mt-4 text-center">
                {activePhoto.caption}
              </figcaption>
            )}
          </figure>

          {/* Next */}
          <button
            onClick={(event) => {
              event.stopPropagation()
              step(1)
            }}
            className="absolute right-3 md:right-8 text-white/70 hover:text-[#C9A227] transition-colors"
            aria-label="Next photo"
          >
            <ChevronRight size={40} />
          </button>
        </div>
      )}
    </>
  )
}