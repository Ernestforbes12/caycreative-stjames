/**
 * Contact Page — app/contact/page.js
 *
 * Allows visitors to get in touch with St. James Native Baptist Church.
 *
 * Sections:
 * - Hero — page title with church photo background
 * - Contact info cards — address, phone, email, service times
 * - Contact form — name, email, phone, message
 * - Google Maps embed — exact church location on St James Road
 *
 * Form submissions are stored in Supabase contact_submissions table.
 * Form is rate limited and sanitized — configured in a later step.
 *
 * This is a Server Component — metadata export works for SEO.
 * Interactive elements live in ContactCards and ContactForm client components.
 */

import { MapPin } from 'lucide-react'
import ContactForm from '@/components/ContactForm'
import ContactCards from '@/components/ContactCards'

export const metadata = {
  title: 'Contact Us | St. James Native Baptist Church',
  description: 'Get in touch with St. James Native Baptist Church in Nassau, Bahamas. Visit us on St James Road or call (242) 394-3983.',
}

export default function ContactPage() {
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
            We Would Love to Hear From You
          </span>
          <h1
            className="font-[family-name:var(--font-playfair)] text-white font-black leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Get In Touch
          </h1>
          <div className="w-12 h-0.5 bg-[#C9A227] mx-auto mt-6" />
        </div>
      </section>

      {/* Contact Details Cards */}
      <section className="py-16 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-6">
          <ContactCards />
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Contact Form */}
            <div>
              <span className="text-[#C9A227] text-xs font-semibold tracking-[0.25em] uppercase block mb-3">
                Send a Message
              </span>
              <h2
                className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] font-bold mb-6"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
              >
                We Will Get Back To You
              </h2>
              <div className="w-12 h-0.5 bg-[#C9A227] mb-10" />
              <ContactForm />
            </div>

            {/* Map */}
            <div>
              <span className="text-[#C9A227] text-xs font-semibold tracking-[0.25em] uppercase block mb-3">
                Find Us
              </span>
              <h2
                className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] font-bold mb-6"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
              >
                Our Location
              </h2>
              <div className="w-12 h-0.5 bg-[#C9A227] mb-10" />

              {/* Google Maps embed — St James Road Nassau */}
              <div className="w-full h-96 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3647.8!2d-77.318551!3d25.070188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjXCsDA0JzEyLjciTiA3N8KwMTknMDYuOCJX!5e0!3m2!1sen!2sbs!4v1714500000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="St. James Native Baptist Church location"
                />
              </div>

              {/* Address below map */}
              <div
                className="p-6 mt-0"
                style={{ background: '#7A1B1B' }}
              >
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#C9A227] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium text-sm">St James Road</p>
                    <p className="text-white/60 text-sm">Nassau, The Bahamas</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

    </main>
  )
}