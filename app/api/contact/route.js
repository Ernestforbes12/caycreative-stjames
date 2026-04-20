/**
 * Contact Form API Route — app/api/contact/route.js
 *
 * Handles POST requests from the ContactForm component.
 * Validates, sanitizes, and stores submissions in Supabase.
 *
 * Security:
 * - Input validation on all fields
 * - Input sanitization — strips HTML tags to prevent XSS
 * - Rate limiting — max 3 submissions per IP per hour
 * - Honeypot check handled on the client side
 *
 * Method: POST
 * Body: { name, email, phone, message }
 * Returns: { success: true } or { message: 'error reason' }
 */

import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

/**
 * Supabase admin client
 * Uses service role key for server side operations
 * Never expose this key on the client side
 */
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

/**
 * sanitize — strips HTML tags from user input
 * Prevents XSS attacks where a user injects malicious scripts
 */
function sanitize(str) {
  if (!str) return ''
  return str.replace(/<[^>]*>/g, '').trim()
}

/**
 * rateLimit — simple in-memory rate limiter
 * Tracks submissions per IP address
 * Max 3 submissions per IP per hour
 *
 * Note: For production at scale use Upstash Redis rate limiter
 * This in-memory solution resets when the server restarts
 */
const submissionMap = new Map()

function isRateLimited(ip) {
  const now = Date.now()
  const windowMs = 60 * 60 * 1000 // 1 hour
  const maxSubmissions = 3

  if (!submissionMap.has(ip)) {
    submissionMap.set(ip, [])
  }

  const timestamps = submissionMap.get(ip).filter(t => now - t < windowMs)
  submissionMap.set(ip, timestamps)

  if (timestamps.length >= maxSubmissions) {
    return true
  }

  timestamps.push(now)
  return false
}

export async function POST(request) {
  try {
    /**
     * Get the IP address for rate limiting
     * x-forwarded-for is set by Vercel in production
     */
    const ip = request.headers.get('x-forwarded-for') || 'unknown'

    // Rate limit check
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { message: 'Too many submissions. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, email, phone, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Please fill in all required fields.' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    // Sanitize all inputs before storing
    const sanitizedData = {
      name: sanitize(name),
      email: sanitize(email),
      phone: sanitize(phone),
      message: sanitize(message),
    }

    // Store in Supabase contact_submissions table
    const { error } = await supabase
      .from('contact_submissions')
      .insert([sanitizedData])

    if (error) throw error

    return NextResponse.json({ success: true }, { status: 200 })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { message: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}