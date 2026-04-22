/**
 * Footer Component — components/Footer.js
 */

import Link from 'next/link'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

const quickLinks = [
  { label: 'Our History', href: '/about' },
  { label: 'Watch Sermons', href: '/sermons' },
  { label: 'Upcoming Events', href: '/events' },
  { label: 'Prayer Request', href: '/prayer-request' },
  { label: 'Give Online', href: '/give' },
  { label: 'Contact Us', href: '/contact' },
]

const ministryLinks = [
  { label: 'Youth Ministry', href: '/about' },
  { label: "Women's Fellowship", href: '/about' },
  { label: "Men's Ministry", href: '/about' },
  { label: 'Music Ministry', href: '/about' },
  { label: 'Ushers Ministry', href: '/about' },
  { label: 'Community Outreach', href: '/about' },
]

const serviceTimes = [
  { day: 'Sunday', name: 'Sunday School', time: '9:30 AM' },
  { day: 'Sunday', name: 'Morning Worship', time: '11:00 AM' },
  { day: 'Wednesday', name: 'Bible Study', time: '7:00 PM' },
]

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white/60 border-t border-white/5">
      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Column 1 — Brand and Contact */}
          <div className="lg:col-span-1">
            <span className="font-[family-name:var(--font-playfair)] text-white text-lg font-bold tracking-tight block mb-4">
              St. James Native Baptist Church
            </span>
            <p className="text-sm leading-relaxed mb-6">
              A historic sanctuary in Nassau, Bahamas, dedicated to serving God and our neighbors since 1856.
            </p>

            {/* Contact Details */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-[#C9A227] mt-0.5 shrink-0" />
                <span className="text-sm">St James Road, Nassau, The Bahamas</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-[#C9A227] shrink-0" />
                <span className="text-sm">(242) 394-3983</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-[#C9A227] shrink-0" />
                <span className="text-sm">stjamesnbc@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h4 className="font-[family-name:var(--font-playfair)] text-white text-sm font-bold tracking-wide mb-6 uppercase">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-[#C9A227] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Ministries */}
          <div>
            <h4 className="font-[family-name:var(--font-playfair)] text-white text-sm font-bold tracking-wide mb-6 uppercase">
              Ministries
            </h4>
            <ul className="space-y-3">
              {ministryLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-[#C9A227] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Service Times */}
          <div>
            <h4 className="font-[family-name:var(--font-playfair)] text-white text-sm font-bold tracking-wide mb-6 uppercase">
              Service Times
            </h4>
            <div className="space-y-5">
              {serviceTimes.map((service) => (
                <div key={service.name} className="flex items-start gap-3">
                  <Clock size={16} className="text-[#C9A227] mt-1 shrink-0" />
                  <div>
                    <div className="text-[10px] text-white/40 uppercase tracking-[0.15em] mb-0.5 font-bold">
                      {service.day}
                    </div>
                    <div className="text-sm text-white/70">{service.name}</div>
                    <div className="text-sm font-semibold text-white">{service.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30 tracking-wider uppercase">
          <span>© {new Date().getFullYear()} St. James Native Baptist Church, Nassau, Bahamas</span>

          {/* Cay Creative credit with logo */}
          
            < a href="https://caycreative242.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 group transition-all duration-300"
          >
            <img
              src="/images/cay-creative-logo.png"
              alt="Cay Creative"
              className="w-6 h-6 object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <span className="text-white/30 group-hover:text-[#C9A227] transition-colors duration-300">
              Designed & Developed by Cay Creative
            </span>
          </a>
        </div>
      </div>
    </footer>
  )
}