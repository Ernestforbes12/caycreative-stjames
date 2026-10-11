/**
 * Event Schema: sanity/schemas/event.js
 *
 * Defines the structure of a church event in Sanity CMS.
 * Church staff create and manage events through Sanity Studio at /studio.
 *
 * Fields:
 * - title: event name
 * - slug: URL friendly name, used for the event's own page (/events/your-slug)
 * - description: what the event is about
 * - eventDate: when the event takes place (stored as YYYY-MM-DD)
 * - eventTime: what time the event starts
 * - location: where the event is held
 * - category: type of event or ministry hosting it
 * - image: event photo or flyer
 * - featured: whether to prioritize it in the homepage events preview
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
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Auto-generated URL for this event. Click Generate.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'eventDate',
      title: 'Event Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'eventTime',
      title: 'Event Time',
      type: 'string',
      description: 'e.g. 10:00 AM or 7:00 PM',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. Main Sanctuary or Fellowship Hall',
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
          { title: 'Ushers Ministry', value: 'Ushers Ministry' },
          { title: 'Sunday School', value: 'Sunday School' },
          { title: 'Special Service', value: 'Special Service' },
          { title: 'Other', value: 'Other' },
        ],
      },
    },
    {
      name: 'image',
      title: 'Event Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      description: 'Show this event first in the homepage events preview',
      initialValue: false,
    },
  ],
  orderings: [
    {
      title: 'Event Date, Soonest First',
      name: 'eventDateAsc',
      by: [{ field: 'eventDate', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'eventDate',
      media: 'image',
    },
    // Show the stored date string as is, so the Studio list
    // never shifts it by a day because of timezones
    prepare({ title, date, media }) {
      return { title, subtitle: date, media }
    },
  },
}