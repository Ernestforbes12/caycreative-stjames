/**
 * Sanity Studio Page — app/studio/[[...tool]]/page.jsx
 *
 * Embeds the Sanity Studio directly into the Next.js app.
 * Accessible at /studio on the website.
 *
 * The church secretary or pastor can log in at:
 * stjamesnativebaptist.com/studio
 *
 * They need a Sanity account invited to the project
 * to access the studio — unauthorized users cannot log in.
 */

'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity/sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}