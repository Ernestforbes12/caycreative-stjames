/**
 * Sanity Client — lib/sanity.js
 *
 * Initializes and exports the Sanity client instance.
 * Used to fetch sermons, events, and announcements from the CMS.
 * Church staff can update content in Sanity Studio without touching code.
 */

import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
})

const builder = imageUrlBuilder(sanityClient)

/**
 * urlFor — Helper function
 * Converts a Sanity image reference into a usable image URL.
 * Usage: urlFor(image).width(800).url()
 */
export const urlFor = (source) => builder.image(source)