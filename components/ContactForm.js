/**
 * ContactForm Component — components/ContactForm.js
 *
 * Secure contact form for the Contact page.
 * Submissions are stored in Supabase contact_submissions table.
 *
 * Security features:
 * - Honeypot field — hidden input that catches bots
 * - Client side validation before submission
 * - Rate limiting handled in API route (built in a later step)
 * - Input sanitization on the server side
 *
 * Fields:
 * - Name (required)
 * - Email (required)
 * - Phone (optional)
 * - Message (required)
 */

'use client'

import { useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

export default function ContactForm() {
  /**
   * formData — tracks all form field values
   */
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    honeypot: '', // hidden field — bots fill this, humans don't
  })

  /**
   * status — tracks the submission state
   * idle | loading | success | error
   */
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  /**
   * handleChange — updates formData when any field changes
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  /**
   * handleSubmit — validates and submits the form
   * If honeypot is filled — silently reject (it's a bot)
   * Otherwise send to our API route which stores in Supabase
   */
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Honeypot check — if this field has a value it's a bot
    if (formData.honeypot) {
      setStatus('success')
      return
    }

    // Basic client side validation
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill in all required fields.')
      setStatus('error')
      return
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.')
      setStatus('error')
      return
    }

    setStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Something went wrong.')
      }

      setStatus('success')
      setFormData({ name: '', email: '', phone: '', message: '', honeypot: '' })

    } catch (err) {
      setErrorMessage(err.message)
      setStatus('error')
    }
  }

  // Success state
  if (status === 'success') {
    return (
      <div
        className="p-10 text-center"
        style={{ background: '#FAF7F2', border: '1px solid #C9A227' }}
      >
        <CheckCircle size={48} className="text-[#C9A227] mx-auto mb-4" />
        <h3 className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] text-2xl font-bold mb-3">
          Message Sent
        </h3>
        <p className="text-[#6B6B6B] text-sm leading-relaxed">
          Thank you for reaching out. A member of our team will get back to you shortly.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Honeypot field — hidden from humans, visible to bots */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={handleChange}
        style={{ display: 'none' }}
        tabIndex="-1"
        autoComplete="off"
      />

      {/* Name and Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        {/* Name */}
        <div>
          <label className="block text-xs font-semibold tracking-widest uppercase text-[#1A1A1A] mb-2">
            Full Name <span className="text-[#C9A227]">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Smith"
            required
            className="w-full px-4 py-3 text-sm border bg-white text-[#1A1A1A] outline-none transition-all duration-300 focus:border-[#C9A227]"
            style={{ borderColor: '#E0DDD8' }}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold tracking-widest uppercase text-[#1A1A1A] mb-2">
            Email Address <span className="text-[#C9A227]">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@email.com"
            required
            className="w-full px-4 py-3 text-sm border bg-white text-[#1A1A1A] outline-none transition-all duration-300 focus:border-[#C9A227]"
            style={{ borderColor: '#E0DDD8' }}
          />
        </div>

      </div>

      {/* Phone */}
      <div>
        <label className="block text-xs font-semibold tracking-widest uppercase text-[#1A1A1A] mb-2">
          Phone Number <span className="text-[#6B6B6B] normal-case tracking-normal font-normal">(optional)</span>
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="(242) 000-0000"
          className="w-full px-4 py-3 text-sm border bg-white text-[#1A1A1A] outline-none transition-all duration-300 focus:border-[#C9A227]"
          style={{ borderColor: '#E0DDD8' }}
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-semibold tracking-widest uppercase text-[#1A1A1A] mb-2">
          Message <span className="text-[#C9A227]">*</span>
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="How can we help you?"
          required
          rows={6}
          className="w-full px-4 py-3 text-sm border bg-white text-[#1A1A1A] outline-none transition-all duration-300 focus:border-[#C9A227] resize-none"
          style={{ borderColor: '#E0DDD8' }}
        />
      </div>

      {/* Error message */}
      {status === 'error' && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200">
          <AlertCircle size={18} className="text-red-500 shrink-0" />
          <p className="text-red-600 text-sm">{errorMessage}</p>
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="flex items-center gap-3 px-10 py-4 text-white text-xs font-semibold tracking-widest uppercase transition-all duration-300 disabled:opacity-50"
        style={{ background: status === 'loading' ? '#6B6B6B' : '#7A1B1B' }}
        onMouseEnter={(e) => {
          if (status !== 'loading') e.currentTarget.style.background = '#C9A227'
        }}
        onMouseLeave={(e) => {
          if (status !== 'loading') e.currentTarget.style.background = '#7A1B1B'
        }}
      >
        <Send size={16} />
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>

    </form>
  )
}