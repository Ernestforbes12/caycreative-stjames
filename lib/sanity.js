/**
 * Sanity Client: lib/sanity.js
 *
 * Initializes and exports the Sanity client instance.
 * perspective: 'published' means the website only ever shows
 * published content, never unpublished drafts.
 * useCdn: false makes sure server fetches are always fresh.
 */

import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  perspective: 'published',
  token: process.env.SANITY_API_TOKEN,
})

const builder = imageUrlBuilder(sanityClient)

/**
 * urlFor: converts a Sanity image reference into a usable image URL.
 * Usage: urlFor(image).width(800).url()
 */
export const urlFor = (source) => builder.image(source)