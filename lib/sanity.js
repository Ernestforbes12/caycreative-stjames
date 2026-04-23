/**
 * Sanity Client — lib/sanity.js
 *
 * Initializes and exports the Sanity client instance.
 * useCdn: false — ensures we always get fresh content
 * not cached CDN content when fetching on the server
 */

import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const builder = imageUrlBuilder(sanityClient)

export const urlFor = (source) => builder.image(source)