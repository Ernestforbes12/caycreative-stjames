/**
 * Album Schema: sanity/schemas/album.js
 *
 * Defines a photo album in Sanity CMS.
 * Church staff create an album (for example, an event or celebration)
 * and drag in as many photos as they like.
 *
 * Fields:
 * - title: album name, e.g. "Pink, Praise and Paint 2026"
 * - date: when the event took place (YYYY-MM-DD)
 * - description: optional short note about the album
 * - photos: the images, each with alt text and an optional caption
 */

export default {
  name: 'album',
  title: 'Photo Album',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Album Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Optional. A sentence about the event.',
    },
    {
      name: 'photos',
      title: 'Photos',
      type: 'array',
      description: 'Drag and drop several photos at once.',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Describe the photo',
              type: 'string',
              description: 'Short description for screen readers and Google, e.g. "Choir singing on Sunday morning"',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Optional. Shown under the photo.',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
  orderings: [
    {
      title: 'Date, Newest First',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'photos.0',
    },
    // Show the raw date string so the list never shifts it by timezone
    prepare({ title, date, media }) {
      return { title, subtitle: date, media }
    },
  },
}