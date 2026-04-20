/**
 * PrayerRequestForm Component — components/PrayerRequestForm.js
 *
 * Secure form for submitting prayer requests.
 * Submissions are stored in Supabase prayer_requests table.
 *
 * Security features:
 * - Honeypot field — catches bots silently
 * - Client side validation before submission
 * - Rate limiting handled in API route — max 3 per IP per hour
 * - Input sanitization on the server side
 *
 * Features:
 * - Anonymous submission toggle — name and email become optional
 * - Character counter on prayer request textarea
 * - Success and error states
 */

'use client'

import { useState } from 'react'
import { HandHeart, CheckCircle, AlertCircle, EyeOff } from 'lucide-react'

export default function PrayerRequestForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    prayerRequest: '',
    isAnonymous: false,
    honeypot: '',
  })

  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const maxChars = 500

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Honeypot check
    if (formData.honeypot) {
      setStatus('success')
      return
    }

    // Validate prayer request
    if (!formData.prayerRequest.trim()) {
      setErrorMessage('Please enter your prayer request.')
      setStatus('error')
      return
    }

    // If not anonymous, validate name and email
    if (!formData.isAnonymous) {
      if (!formData.name.trim()) {
        setErrorMessage('Please enter your name or submit anonymously.')
        setStatus('error')
        return
      }
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setErrorMessage('Please enter a valid email address.')
        setStatus('error')
        return
      }
    }

    setStatus('loading')

    try {
      const response = await fetch('/api/prayer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          prayerRequest: formData.prayerRequest,
          isAnonymous: formData.isAnonymous,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Something went wrong.')
      }

      setStatus('success')
      setFormData({
        name: '',
        email: '',
        prayerRequest: '',
        isAnonymous: false,
        honeypot: '',
      })

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
          Prayer Request Received
        </h3>
        <p className="text-[#6B6B6B] text-sm leading-relaxed">
          Thank you for trusting us with your prayer request. Our pastoral
          team and prayer warriors will lift you up in prayer.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Honeypot — hidden from humans */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={handleChange}
        style={{ display: 'none' }}
        tabIndex="-1"
        autoComplete="off"
      />

      {/* Anonymous toggle */}
      <div
        className="flex items-center justify-between p-4"
        style={{ background: '#FAF7F2', border: '1px solid #E0DDD8' }}
      >
        <div className="flex items-center gap-3">
          <EyeOff size={18} className="text-[#C9A227]" />
          <div>
            <p className="text-sm font-semibold text-[#1A1A1A]">
              Submit Anonymously
            </p>
            <p className="text-xs text-[#6B6B6B]">
              Your name and email will not be recorded
            </p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="isAnonymous"
            checked={formData.isAnonymous}
            onChange={handleChange}
            className="sr-only peer"
          />
          <div
            className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"
            style={{
              background: formData.isAnonymous ? '#C9A227' : '#E0DDD8',
            }}
          />
        </label>
      </div>

      {/* Name and Email — hidden when anonymous */}
      {!formData.isAnonymous && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-[#1A1A1A] mb-2">
              Your Name <span className="text-[#C9A227]">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Smith"
              className="w-full px-4 py-3 text-sm border bg-white text-[#1A1A1A] outline-none transition-all duration-300 focus:border-[#C9A227]"
              style={{ borderColor: '#E0DDD8' }}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-[#1A1A1A] mb-2">
              Email <span className="text-[#6B6B6B] normal-case tracking-normal font-normal">(optional)</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@email.com"
              className="w-full px-4 py-3 text-sm border bg-white text-[#1A1A1A] outline-none transition-all duration-300 focus:border-[#C9A227]"
              style={{ borderColor: '#E0DDD8' }}
            />
          </div>
        </div>
      )}

      {/* Prayer Request */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-xs font-semibold tracking-widest uppercase text-[#1A1A1A]">
            Your Prayer Request <span className="text-[#C9A227]">*</span>
          </label>
          <span className="text-xs text-[#6B6B6B]">
            {formData.prayerRequest.length}/{maxChars}
          </span>
        </div>
        <textarea
          name="prayerRequest"
          value={formData.prayerRequest}
          onChange={handleChange}
          placeholder="Share your prayer request here. Everything shared is treated with complete confidentiality."
          required
          rows={7}
          maxLength={maxChars}
          className="w-full px-4 py-3 text-sm border bg-white text-[#1A1A1A] outline-none transition-all duration-300 focus:border-[#C9A227] resize-none"
          style={{ borderColor: '#E0DDD8' }}
        />
      </div>

      {/* Confidentiality notice */}
      <p className="text-xs text-[#6B6B6B] leading-relaxed">
        All prayer requests are handled with complete confidentiality by our
        pastoral team. Your request will never be shared publicly.
      </p>

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
        <HandHeart size={16} />
        {status === 'loading' ? 'Submitting...' : 'Submit Prayer Request'}
      </button>

    </form>
  )
}