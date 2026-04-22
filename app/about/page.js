/**
 * About Page — app/about/page.js
 *
 * Tells the full story of St. James Native Baptist Church.
 *
 * Sections:
 * - Hero — church photo with overlay and page title
 * - History — founding story, Rev. Thomas Romer, 1856
 * - Mission and Vision
 * - Core Values
 * - Pastor Bio
 */

import Image from 'next/image'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { sanityClient } from '@/lib/sanity'

const teamQuery = `*[_type == "teamMember"] | order(order asc) {
  _id,
  name,
  role,
  ministry,
  bio,
  "photo": photo.asset->url
}`

/**
 * Page metadata — SEO
 * Google will show this when someone searches for the church
 */
export const metadata = {
  title: 'About Us | St. James Native Baptist Church',
  description: 'Learn about the history of St. James Native Baptist Church, founded in 1856 by Rev. Thomas Romer in Nassau, Bahamas.',
}

const values = [
  {
    title: 'Christ Centered',
    description: 'Everything we do flows from our relationship with Jesus Christ — our foundation and our focus.',
  },
  {
    title: 'Bible Based',
    description: 'We believe the Word of God is our ultimate authority for faith, life, and community.',
  },
  {
    title: 'Community Focused',
    description: 'We are deeply rooted in Nassau and committed to serving our neighbors with love and action.',
  },
  {
    title: 'Prayer Driven',
    description: 'Prayer is the heartbeat of St. James — we believe in its power to transform lives.',
  },
  {
    title: 'Welcoming to All',
    description: 'Every person who walks through our doors is welcomed as family regardless of background.',
  },
  {
    title: 'Spiritually Nourishing',
    description: 'We provide Soul Food — biblical teaching that feeds the spirit and strengthens the soul.',
  },
]

export default async function AboutPage() {
  let teamMembers = []
  try {
    teamMembers = await sanityClient.fetch(teamQuery)
  } catch (error) {
    console.error('Failed to fetch team members:', error)
  }

  /**
   * Group team members by ministry
   * So Leadership shows first, then Deacons, etc.
   */
  const groupedTeam = teamMembers.reduce((acc, member) => {
    if (!acc[member.ministry]) acc[member.ministry] = []
    acc[member.ministry].push(member)
    return acc
  }, {})

  return (
    <main>

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img
          src="/images/church3.jpeg"
          alt="St. James Native Baptist Church"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 40%' }}

        />
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(42,10,10,0.85)' }}
        />
        <div className="relative z-10 text-center px-6">
          <span className="text-[#C9A227] text-xs font-semibold tracking-[0.25em] uppercase block mb-4">
            Est. 1856 — Nassau, Bahamas
          </span>
          <h1
            className="font-[family-name:var(--font-playfair)] text-white font-black leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Our Story
          </h1>
          <div className="w-12 h-0.5 bg-[#C9A227] mx-auto mt-6" />
        </div>
      </section>

      {/* History Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Image */}
            <div className="relative">
              <div
                className="absolute top-[-1rem] left-[-1rem] right-[1rem] bottom-[1rem]"
                style={{ border: '1px solid #C9A227' }}
              />
              <img
                src="/images/church2.jpeg"
                alt="St. James Native Baptist Church exterior"
                className="relative z-10 w-full aspect-[4/3] object-cover"
              />
              <div
                className="absolute bottom-[-1.5rem] right-[-1.5rem] z-20 p-6 text-center"
                style={{ background: '#7A1B1B' }}
              >
                <div className="font-[family-name:var(--font-playfair)] text-white text-3xl font-black leading-none">
                  1856
                </div>
                <div className="text-white/80 text-xs tracking-[0.15em] uppercase mt-1">
                  Founded
                </div>
              </div>
            </div>

            {/* Text */}
            <div>
              <span className="text-[#C9A227] text-xs font-semibold tracking-[0.25em] uppercase block mb-3">
                Our Heritage
              </span>
              <h2
                className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] font-bold leading-tight mb-6"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
              >
                170 Years of Faith in Nassau
              </h2>
              <div className="w-12 h-0.5 bg-[#C9A227] mb-8" />
              <p className="text-[#6B6B6B] leading-loose mb-6">
                St. James Native Baptist Church was organized in 1856 by Rev. Thomas Romer,
                a man of deep faith and vision who planted the seeds of this congregation
                in the heart of Nassau, Bahamas. For over 170 years our church has stood
                as a beacon of hope, faith, and community on St. James Road.
              </p>
              <p className="text-[#6B6B6B] leading-loose mb-6">
                Through generations of faithful members, dedicated pastors, and the
                unwavering grace of God, St. James has grown from a small gathering
                of believers into a vibrant, Christ-centered community that continues
                to serve Nassau with the soul-nourishing message of the Gospel.
              </p>
              <p className="text-[#6B6B6B] leading-loose">
                We carry Rev. Romer's legacy forward every Sunday — welcoming all
                who seek spiritual nourishment, community, and a home in Christ.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#C9A227] text-xs font-semibold tracking-[0.25em] uppercase block mb-3">
              Why We Exist
            </span>
            <h2
              className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] font-bold"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
            >
              Mission & Vision
            </h2>
            <div className="w-12 h-0.5 bg-[#C9A227] mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

            {/* Mission */}
            <div
              className="p-10 bg-white"
              style={{ borderTop: '3px solid #7A1B1B' }}
            >
              <h3 className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] text-xl font-bold mb-4">
                Our Mission
              </h3>
              <p className="text-[#6B6B6B] leading-loose text-sm">
                To glorify God by making disciples of Jesus Christ —
                providing Soul Food through biblical preaching, genuine
                fellowship, and compassionate service to Nassau and beyond.
              </p>
            </div>

            {/* Vision */}
            <div
              className="p-10 bg-white"
              style={{ borderTop: '3px solid #C9A227' }}
            >
              <h3 className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] text-xl font-bold mb-4">
                Our Vision
              </h3>
              <p className="text-[#6B6B6B] leading-loose text-sm">
                To be a thriving, multigenerational church that transforms
                lives, strengthens families, and serves as a spiritual
                anchor for the Bahamian community for generations to come.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#C9A227] text-xs font-semibold tracking-[0.25em] uppercase block mb-3">
              What We Stand For
            </span>
            <h2
              className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] font-bold"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
            >
              Our Core Values
            </h2>
            <div className="w-12 h-0.5 bg-[#C9A227] mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="p-8 bg-[#FAF7F2] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className="w-8 h-8 flex items-center justify-center mb-4 font-[family-name:var(--font-playfair)] font-black text-white text-sm"
                  style={{ background: '#C9A227' }}
                >
                  {index + 1}
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] text-lg font-bold mb-3">
                  {value.title}
                </h3>
                <p className="text-[#6B6B6B] text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pastor Bio — placeholder until real info is provided */}
      <section
        className="py-24"
        style={{ background: '#7A1B1B' }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[#C9A227] text-xs font-semibold tracking-[0.25em] uppercase block mb-3">
            Spiritual Leadership
          </span>
          <h2
            className="font-[family-name:var(--font-playfair)] text-white font-bold mb-6"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
          >
            Our Pastor
          </h2>
          <div className="w-12 h-0.5 bg-[#C9A227] mx-auto mb-12" />

          <div className="bg-white/5 border border-white/10 p-10 max-w-2xl mx-auto">
            {/* Pastor photo placeholder */}
            <div
              className="w-28 h-28 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ background: 'rgba(201,162,39,0.2)', border: '2px solid #C9A227' }}
            >
              <span className="font-[family-name:var(--font-playfair)] text-[#C9A227] text-3xl font-black">
                P
              </span>
            </div>
            <h3 className="font-[family-name:var(--font-playfair)] text-white text-2xl font-bold mb-2">
              Pastor Name
            </h3>
            <p className="text-[#C9A227] text-xs tracking-widest uppercase mb-6">
              Senior Pastor
            </p>
            <p className="text-white/60 leading-loose text-sm">
              Pastor bio coming soon. This section will be updated with the
              pastor's full biography, ministry background, and personal
              message to the congregation.
            </p>
          </div>

        </div>
      </section>
    {/* Ministry Team Section */}
      {Object.keys(groupedTeam).length > 0 && (
        <section className="py-24 bg-[#FAF7F2]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-[#C9A227] text-xs font-semibold tracking-[0.25em] uppercase block mb-3">
                Serving Together
              </span>
              <h2
                className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] font-bold"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
              >
                Our Ministry Team
              </h2>
              <div className="w-12 h-0.5 bg-[#C9A227] mx-auto mt-6" />
            </div>

            {/* Grouped by ministry */}
            {Object.entries(groupedTeam).map(([ministry, members]) => (
              <div key={ministry} className="mb-16">

                {/* Ministry heading */}
                <h3 className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] text-xl font-bold mb-8 pb-3 border-b border-[#C9A227]/30">
                  {ministry}
                </h3>

                {/* Members grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {members.map((member) => (
                    <div
                      key={member._id}
                      className="bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      {/* Photo or placeholder */}
                      {member.photo ? (
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                          style={{ border: '2px solid #C9A227' }}
                        />
                      ) : (
                        <div
                          className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                          style={{
                            background: 'rgba(201,162,39,0.1)',
                            border: '2px solid #C9A227'
                          }}
                        >
                          <span className="font-[family-name:var(--font-playfair)] text-[#C9A227] text-2xl font-black">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                      )}

                      {/* Name */}
                      <h4 className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] font-bold text-sm mb-1">
                        {member.name}
                      </h4>

                      {/* Role */}
                      <p className="text-[#C9A227] text-xs tracking-widest uppercase mb-2">
                        {member.role}
                      </p>

                      {/* Bio */}
                      {member.bio && (
                        <p className="text-[#6B6B6B] text-xs leading-relaxed">
                          {member.bio}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}