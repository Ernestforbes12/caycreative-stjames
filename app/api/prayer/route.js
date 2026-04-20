/**
 * Prayer Request API Route — app/api/prayer/route.js
 *
 * Handles POST requests from the PrayerRequestForm component.
 * Validates, sanitizes, and stores submissions in Supabase.
 *
 * Security:
 * - Input validation on all fields
 * - Input sanitization — strips HTML tags to prevent XSS
 * - Rate limiting — max 3 submissions per IP per hour
 * - Anonymous submissions supported — name and email optional
 *
 * Method: POST
 * Body: { name, email, request, isAnonymous }
 * Returns: { success: true } or { message: 'error reason' }
 */

import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

/**
 * sanitize — strips HTML tags from user input
 * Prevents XSS attacks
 */
function sanitize(str) {
  if (!str) return ''
  return str.replace(/<[^>]*>/g, '').trim()
}

/**
 * rateLimit — in memory rate limiter
 * Max 3 prayer requests per IP per hour
 */
const submissionMap = new Map()

function isRateLimited(ip) {
  const now = Date.now()
  const windowMs = 60 * 60 * 1000
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
    const ip = request.headers.get('x-forwarded-for') || 'unknown'

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { message: 'Too many submissions. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, email, prayerRequest, isAnonymous } = body

    // Prayer request text is the only required field
    if (!prayerRequest) {
      return NextResponse.json(
        { message: 'Please enter your prayer request.' },
        { status: 400 }
      )
    }

    // Validate email only if provided
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { message: 'Please enter a valid email address.' },
          { status: 400 }
        )
      }
    }

    // Sanitize all inputs
    const sanitizedData = {
      name: isAnonymous ? null : sanitize(name),
      email: isAnonymous ? null : sanitize(email),
      request: sanitize(prayerRequest),
      is_anonymous: isAnonymous || false,
    }

    // Store in Supabase prayer_requests table
    const { error } = await supabase
      .from('prayer_requests')
      .insert([sanitizedData])

    if (error) throw error

    return NextResponse.json({ success: true }, { status: 200 })

  } catch (error) {
    console.error('Prayer request error:', error)
    return NextResponse.json(
      { message: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}