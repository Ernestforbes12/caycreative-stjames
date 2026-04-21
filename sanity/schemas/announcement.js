/**
 * Announcement Schema — sanity/schemas/announcement.js
 *
 * Defines the structure of an announcement banner in Sanity CMS.
 * Church staff can create announcements that appear on the homepage.
 *
 * Fields:
 * - title — short announcement headline
 * - message — full announcement text
 * - active — whether to show the announcement
 * - link — optional link for more information
 * - linkText — text for the link button
 * - expiresAt — when to stop showing the announcement
 */

export default {
  name: 'announcement',
  title: 'Announcement',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Announcement Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required()
    },
    {
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Show this announcement on the website',
      initialValue: true
    },
    {
      name: 'link',
      title: 'Link URL',
      type: 'url',
      description: 'Optional — link to more information'
    },
    {
      name: 'linkText',
      title: 'Link Button Text',
      type: 'string',
      description: 'e.g. Learn More or Register Now'
    },
    {
      name: 'expiresAt',
      title: 'Expires At',
      type: 'datetime',
      description: 'Optional — announcement will stop showing after this date'
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'message'
    }
  }
}