/**
 * Sanity Studio Configuration — sanity/sanity.config.js
 *
 * Configures the Sanity Studio for St. James Native Baptist Church.
 * This is the dashboard the church staff uses to manage content.
 *
 * Schemas registered here:
 * - sermon — manage sermon archive
 * - event — manage upcoming events
 * - announcement — manage homepage announcements
 */

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import sermon from './schemas/sermon'
import event from './schemas/event'
import announcement from './schemas/announcement'
import teamMember from './schemas/teamMember'

export default defineConfig({
  name: 'stjames-studio',
  title: 'St. James Native Baptist Church',

  /**
   * Project ID and dataset from Sanity dashboard
   * These connect the Studio to the correct Sanity project
   */
  projectId: 'jhigxgl2',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
  ],

  /**
   * Register all content schemas
   * Each schema appears as a content type in the Studio sidebar
   */
  schema: {
    types: [sermon, event, announcement, teamMember],
  },
})