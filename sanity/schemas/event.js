/**
 * Event Schema — sanity/schemas/event.js
 *
 * Defines the structure of a church event in Sanity CMS.
 * Church staff can create and manage events through Sanity Studio.
 *
 * Fields:
 * - title — event name
 * - description — what the event is about
 * - eventDate — when the event takes place
 * - eventTime — what time the event starts
 * - location — where the event is held
 * - category — type of event
 * - image — event photo
 * - featured — whether to show on homepage events preview
 */

export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required()
    },
    {
      name: 'eventDate',
      title: 'Event Date',
      type: 'date',
      validation: Rule => Rule.required()
    },
    {
      name: 'eventTime',
      title: 'Event Time',
      type: 'string',
      description: 'e.g. 10:00 AM or 7:00 PM'
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. Main Sanctuary or Fellowship Hall'
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Community', value: 'Community' },
          { title: 'Music Ministry', value: 'Music Ministry' },
          { title: 'Outreach', value: 'Outreach' },
          { title: 'Youth', value: 'Youth' },
          { title: "Women's Ministry", value: "Women's Ministry" },
          { title: "Men's Ministry", value: "Men's Ministry" },
          { title: 'Special Service', value: 'Special Service' },
          { title: 'Other', value: 'Other' },
        ]
      }
    },
    {
      name: 'image',
      title: 'Event Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      description: 'Show this event in the homepage events preview',
      initialValue: false
    },
  ],
  orderings: [
    {
      title: 'Event Date — Soonest First',
      name: 'eventDateAsc',
      by: [{ field: 'eventDate', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'eventDate',
      media: 'image'
    }
  }
}