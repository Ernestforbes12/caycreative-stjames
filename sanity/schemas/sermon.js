/**
 * Sermon Schema — sanity/schemas/sermon.js
 *
 * Defines the structure of a sermon in Sanity CMS.
 * Church staff can create and manage sermons through Sanity Studio.
 *
 * Fields:
 * - title — sermon title
 * - preacher — who preached the sermon
 * - date — when it was preached
 * - scripture — Bible reference
 * - description — short summary
 * - audioUrl — link to audio file or podcast
 * - videoUrl — YouTube or Vimeo link
 * - thumbnail — sermon image
 * - featured — whether to show as the featured sermon
 */

export default {
  name: 'sermon',
  title: 'Sermon',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Sermon Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'preacher',
      title: 'Preacher',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'date',
      title: 'Date Preached',
      type: 'date',
      validation: Rule => Rule.required()
    },
    {
      name: 'scripture',
      title: 'Scripture Reference',
      type: 'string',
      description: 'e.g. John 3:16 or Psalm 23:1-6'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'audioUrl',
      title: 'Audio URL',
      type: 'url',
      description: 'Link to audio file, podcast, or SoundCloud'
    },
    {
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube or Vimeo link'
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'featured',
      title: 'Featured Sermon',
      type: 'boolean',
      description: 'Show this as the featured sermon on the Sermons page',
      initialValue: false
    },
  ],
  orderings: [
    {
      title: 'Date — Newest First',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'preacher',
      media: 'thumbnail'
    }
  }
}