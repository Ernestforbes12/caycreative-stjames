/**
 * Team Member Schema — sanity/schemas/teamMember.js
 *
 * Defines the structure of a team member in Sanity CMS.
 * Church staff can add deacons, ministers, choir members,
 * ushers and other ministry team members through Sanity Studio.
 *
 * Fields:
 * - name — full name
 * - role — their title or position
 * - ministry — which ministry they belong to
 * - bio — short biography
 * - photo — their photo
 * - order — controls display order on the page
 */

export default {
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'role',
      title: 'Role or Title',
      type: 'string',
      description: 'e.g. Senior Pastor, Deacon, Choir Director, Head Usher',
      validation: Rule => Rule.required()
    },
    {
      name: 'ministry',
      title: 'Ministry',
      type: 'string',
      options: {
        list: [
          { title: 'Leadership', value: 'Leadership' },
          { title: 'Deacons', value: 'Deacons' },
          { title: 'Ministers', value: 'Ministers' },
          { title: 'Music Ministry', value: 'Music Ministry' },
          { title: "Women's Fellowship", value: "Women's Fellowship" },
          { title: "Men's Ministry", value: "Men's Ministry" },
          { title: 'Youth Ministry', value: 'Youth Ministry' },
          { title: 'Ushers Ministry', value: 'Ushers Ministry' },
          { title: 'Community Outreach', value: 'Community Outreach' },
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'bio',
      title: 'Short Bio',
      type: 'text',
      rows: 3,
      description: 'Optional — a brief description of their ministry role'
    },
    {
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first — e.g. Pastor = 1, Deacons = 2, 3, 4...'
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo'
    }
  }
}