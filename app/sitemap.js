/**
 * Sitemap — app/sitemap.js
 *
 * Automatically generates a sitemap.xml file for the website.
 * This tells Google every page that exists so it can crawl
 * and index them faster.
 *
 * Accessible at: stjamesnativebaptist.com/sitemap.xml
 *
 * Static pages are hardcoded below.
 * Dynamic event pages are fetched from Sanity and added automatically
 * so every new event published gets indexed by Google.
 */

import { sanityClient } from '@/lib/sanity'

const baseUrl = 'https://caycreative-stjames.vercel.app'

/**
 * GROQ query — fetches all event slugs for sitemap
 */
const eventSlugsQuery = `*[_type == "event" && defined(slug.current)] {
  "slug": slug.current,
  _updatedAt
}`

export default async function sitemap() {
  /**
   * Static pages — these never change
   * changeFrequency tells Google how often to re-crawl
   * priority tells Google which pages are most important (1.0 = highest)
   */
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sermons`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/prayer-request`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/give`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  /**
   * Dynamic event pages — fetched from Sanity
   * Every published event gets its own sitemap entry automatically
   */
  let eventPages = []
  try {
    const events = await sanityClient.fetch(eventSlugsQuery)
    eventPages = events.map((event) => ({
      url: `${baseUrl}/events/${event.slug}`,
      lastModified: new Date(event._updatedAt),
      changeFrequency: 'weekly',
      priority: 0.6,
    }))
  } catch (error) {
    console.error('Failed to fetch events for sitemap:', error)
  }

  return [...staticPages, ...eventPages]
}