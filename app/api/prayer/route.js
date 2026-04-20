/**
 * Prayer Request API Route — app/api/prayer/route.js
 *
 * Handles POST requests from the PrayerRequestForm component.
 * Validates, sanitizes, and stores submissions in Supabase.
 * Sends email notification to pastor via Resend.
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
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const resend = new Resend(process.env.RESEND_API_KEY)

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

    if (!prayerRequest) {
      return NextResponse.json(
        { message: 'Please enter your prayer request.' },
        { status: 400 }
      )
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { message: 'Please enter a valid email address.' },
          { status: 400 }
        )
      }
    }

    const sanitizedData = {
      name: isAnonymous ? null : sanitize(name),
      email: isAnonymous ? null : sanitize(email),
      request: sanitize(prayerRequest),
      is_anonymous: isAnonymous || false,
    }

    // Store in Supabase
    const { error } = await supabase
      .from('prayer_requests')
      .insert([sanitizedData])

    if (error) throw error

    /**
     * Send email notification to pastor via Resend
     * Pastor receives an email every time a prayer request is submitted
     * Anonymous requests show "Anonymous" as the name
     */
    await resend.emails.send({
      from: 'St. James Website <ernest@caycreative242.com>',
      to: 'ernestforbes2002@gmail.com',
      subject: 'New Prayer Request — St. James Native Baptist Church',
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #FAF7F2;">
          
          <div style="background: #7A1B1B; padding: 30px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: #C9A227; font-size: 24px; margin: 0;">St. James Native Baptist Church</h1>
            <p style="color: rgba(255,255,255,0.7); font-size: 14px; margin: 8px 0 0;">New Prayer Request Received</p>
          </div>

          <div style="background: white; padding: 30px; border-left: 4px solid #C9A227; margin-bottom: 20px;">
            <p style="color: #6B6B6B; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 8px;">From</p>
            <p style="color: #1A1A1A; font-size: 16px; font-weight: bold; margin: 0;">
              ${isAnonymous ? 'Anonymous' : sanitize(name) || 'Not provided'}
            </p>
            ${!isAnonymous && email ? `
            <p style="color: #6B6B6B; font-size: 14px; margin: 4px 0 0;">${sanitize(email)}</p>
            ` : ''}
          </div>

          <div style="background: white; padding: 30px; border-left: 4px solid #7A1B1B; margin-bottom: 20px;">
            <p style="color: #6B6B6B; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 12px;">Prayer Request</p>
            <p style="color: #1A1A1A; font-size: 16px; line-height: 1.8; margin: 0;">
              ${sanitize(prayerRequest)}
            </p>
          </div>

          <div style="text-align: center; padding: 20px;">
            <p style="color: #6B6B6B; font-size: 12px; margin: 0;">
              This request was submitted through stjamesnativebaptist.com
            </p>
            <p style="color: #C9A227; font-size: 11px; margin: 8px 0 0; text-transform: uppercase; letter-spacing: 1px;">
              St. James Native Baptist Church — Nassau, Bahamas
            </p>
          </div>

        </div>
      `,
    })

    return NextResponse.json({ success: true }, { status: 200 })

  } catch (error) {
    console.error('Prayer request error:', error)
    return NextResponse.json(
      { message: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}