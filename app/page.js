/**
 * Homepage — app/page.js
 *
 * The main landing page of the St. James Native Baptist Church website.
 * Each section is its own component imported from components/
 * This file just stacks them together in order.
 */

import HeroSection from '@/components/HeroSection'
import ServiceTimes from '@/components/ServiceTimes'
import AboutSnippet from '@/components/AboutSnippet'
import EventsPreview from '@/components/EventsPreview'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServiceTimes />
      <AboutSnippet />
      <EventsPreview />
    </main>
  )
}