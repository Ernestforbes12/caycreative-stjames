/**
 * AnnouncementBanner Component — components/AnnouncementBanner.js
 *
 * Displays an active announcement from Sanity CMS at the top of the homepage.
 * Pastor or secretary can create announcements in Sanity Studio.
 *
 * Features:
 * - Only shows when an active announcement exists in Sanity
 * - Dismissible — user can close it with the X button
 * - Optional link button for more information
 * - Automatically hides when announcement expires
 */

'use client'

import { useState } from 'react'
import { X, Megaphone } from 'lucide-react'

export default function AnnouncementBanner({ announcement }) {
  const [dismissed, setDismissed] = useState(false)

  if (!announcement || dismissed) return null

  if (announcement.expiresAt && new Date(announcement.expiresAt) < new Date()) {
    return null
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 w-full py-3 px-6"
      style={{ background: '#C9A227' }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Megaphone size={16} className="text-white shrink-0" />
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-white font-semibold text-sm">
              {announcement.title}
            </span>
            <span className="text-white/80 text-sm hidden sm:block">
              — {announcement.message}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {announcement.link && (
            
              <a href={announcement.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-xs font-semibold tracking-widest uppercase border-b border-white/50 hover:border-white transition-colors duration-200 whitespace-nowrap"
            >
              {announcement.linkText || 'Learn More'}
            </a>
          )}
          <button
            onClick={() => setDismissed(true)}
            className="text-white/70 hover:text-white transition-colors duration-200"
            aria-label="Dismiss announcement"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}