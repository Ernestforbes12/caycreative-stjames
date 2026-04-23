/**
 * ContactCards Component — components/ContactCards.js
 *
 * Displays contact information cards with animated icons.
 * Separated into its own client component so the parent
 * contact page can remain a server component for SEO.
 *
 * All animations trigger simultaneously on card hover:
 * - Card lifts up
 * - Card shadow appears
 * - Icon does a full 360 spin and scales up
 */

'use client'

import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { useRef } from 'react'

const contactDetails = [
  {
    icon: MapPin,
    title: 'Visit Us',
    lines: ['St James Road', 'Nassau, The Bahamas'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    lines: ['(242) 394-3983'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['stjamesnbc@gmail.com'],
  },
  {
    icon: Clock,
    title: 'Service Times',
    lines: ['Sunday School — 9:30 AM', 'Morning Worship — 10:30 AM', 'Prayer Meeting — Tue 7:00 PM (Zoom)'],
  },
]

export default function ContactCards() {
  const iconRefs = useRef([])

  const handleMouseEnter = (index) => {
    if (iconRefs.current[index]) {
      iconRefs.current[index].style.transform = 'rotate(360deg) scale(1.15)'
    }
  }

  const handleMouseLeave = (index) => {
    if (iconRefs.current[index]) {
      iconRefs.current[index].style.transform = 'rotate(0deg) scale(1)'
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {contactDetails.map((detail, index) => {
        const Icon = detail.icon
        return (
          <div
            key={detail.title}
            className="bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default"
            style={{ borderTop: '3px solid #C9A227' }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            {/* Icon — spins when card is hovered */}
            <div
              ref={(el) => (iconRefs.current[index] = el)}
              className="mb-4 w-fit"
              style={{
                transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <Icon size={24} className="text-[#C9A227]" />
            </div>

            <h3 className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] font-bold text-lg mb-3">
              {detail.title}
            </h3>
            {detail.lines.map((line) => (
              <p key={line} className="text-[#6B6B6B] text-sm leading-relaxed">
                {line}
              </p>
            ))}
          </div>
        )
      })}
    </div>
  )
}