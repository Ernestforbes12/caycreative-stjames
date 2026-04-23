/**
 * Give Page — app/give/page.js
 *
 * Provides online giving options for the congregation.
 *
 * Sections:
 * - Hero — page title with church photo background
 * - Why We Give — biblical foundation for giving
 * - Giving options — RBC bank deposit and in person
 * - Security notice
 * - FAQ — common questions about giving
 * - Bottom CTA
 *
 * Payment method: RBC Royal Bank direct deposit
 * Account: ST JAMES NAT BAPTIST | Branch: 05745 | Account: 1572932
 * After transfer — send screenshot to (242) 424-3282
 */

import { Heart, Shield, Church, HelpCircle, Building } from 'lucide-react'

export const metadata = {
  title: 'Give | St. James Native Baptist Church',
  description: 'Support the ministry of St. James Native Baptist Church in Nassau, Bahamas through your generous giving.',
}

/**
 * Giving options — RBC bank deposit and in person
 * Updated from Cash App/PayPal to direct bank deposit
 */
const givingOptions = [
  {
    icon: Building,
    title: 'Direct Bank Deposit',
    description: 'Transfer your tithes and offerings directly to the church bank account via RBC Royal Bank.',
    details: [
      { label: 'Bank', value: 'RBC Royal Bank' },
      { label: 'Short Name', value: 'ST JAMES NAT BAPTIST' },
      { label: 'Branch/Transit', value: '05745' },
      { label: 'Account Number', value: '1572932' },
    ],
    note: 'After your transfer please send a screenshot to (242) 424-3282 for reconciliation.',
    color: '#7A1B1B',
  },
  {
    icon: Church,
    title: 'In Person',
    description: 'Give during any of our Sunday services or Tuesday Prayer Meeting.',
    details: [
      { label: 'Sunday School', value: '9:30 AM' },
      { label: 'Morning Worship', value: '10:30 AM' },
      { label: 'Tuesday Prayer', value: '7:00 PM via Zoom' },
    ],
    note: 'Offering envelopes are available at the entrance of the sanctuary.',
    color: '#C9A227',
  },
]

/**
 * FAQ — updated for bank deposit giving method
 */
const faqs = [
  {
    question: 'Is my bank transfer secure?',
    answer: 'Yes. RBC Royal Bank uses bank level encryption and security for all transfers. Your financial information is fully protected.',
  },
  {
    question: 'What do I put in the transfer memo?',
    answer: 'Please include your full name in the Comments, Beneficiary Reference, Memo, or Narrative section of your transfer so the church can identify your giving.',
  },
  {
    question: 'Do I need to notify the church after transferring?',
    answer: 'Yes — please send a screenshot of your transfer confirmation to (242) 424-3282 to assist with reconciliation.',
  },
  {
    question: 'What is my giving used for?',
    answer: 'Your tithes and offerings support the ministry, maintenance, outreach programs, and community initiatives of St. James Native Baptist Church.',
  },
]

export default function GivePage() {
  return (
    <main>

      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <img
          src="/images/church2.jpeg"
          alt="St. James Native Baptist Church"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 30%' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(42,10,10,0.88)' }}
        />
        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          <span className="text-[#C9A227] text-xs font-semibold tracking-[0.25em] uppercase block mb-4">
            Support the Ministry
          </span>
          <h1
            className="font-[family-name:var(--font-playfair)] text-white font-black leading-tight mb-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Give
          </h1>
          <p className="text-white/60 italic text-base leading-relaxed">
            "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." — 2 Corinthians 9:7
          </p>
          <div className="w-12 h-0.5 bg-[#C9A227] mx-auto mt-6" />
        </div>
      </section>

      {/* Why We Give */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="text-[#C9A227] text-xs font-semibold tracking-[0.25em] uppercase block mb-3">
            The Heart Behind Giving
          </span>
          <h2
            className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] font-bold mb-6"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
          >
            Why We Give
          </h2>
          <div className="w-12 h-0.5 bg-[#C9A227] mx-auto mb-10" />
          <p className="text-[#6B6B6B] leading-loose mb-6">
            Giving is an act of worship and trust. At St. James Native Baptist Church
            we believe that everything we have belongs to God. Our tithes and offerings
            are a joyful response to His generosity toward us.
          </p>
          <p className="text-[#6B6B6B] leading-loose">
            Your giving directly supports our Sunday worship services, Tuesday Prayer
            Meetings, community outreach programs, youth ministry, and the maintenance
            of our historic church building that has served Nassau since 1856.
          </p>
        </div>
      </section>

      {/* Giving Options */}
      <section className="py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#C9A227] text-xs font-semibold tracking-[0.25em] uppercase block mb-3">
              Ways to Give
            </span>
            <h2
              className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] font-bold"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
            >
              Choose How You Give
            </h2>
            <div className="w-12 h-0.5 bg-[#C9A227] mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {givingOptions.map((option) => {
              const Icon = option.icon
              return (
                <div
                  key={option.title}
                  className="bg-white p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{ borderTop: `4px solid ${option.color}` }}
                >
                  {/* Icon */}
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                    style={{ background: `${option.color}15` }}
                  >
                    <Icon size={28} style={{ color: option.color }} />
                  </div>

                  <h3 className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] text-xl font-bold mb-4">
                    {option.title}
                  </h3>

                  <p className="text-[#6B6B6B] text-sm leading-relaxed mb-6">
                    {option.description}
                  </p>

                  {/* Details table */}
                  <div
                    className="p-4 mb-4 space-y-2"
                    style={{ background: '#FAF7F2' }}
                  >
                    {option.details.map((detail) => (
                      <div key={detail.label} className="flex justify-between items-center text-sm">
                        <span className="text-[#6B6B6B] text-xs uppercase tracking-widest">
                          {detail.label}
                        </span>
                        <span className="font-semibold text-[#1A1A1A]">
                          {detail.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Note */}
                  {option.note && (
                    <p className="text-xs text-[#6B6B6B] leading-relaxed italic">
                      {option.note}
                    </p>
                  )}

                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Security notice */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div
            className="flex items-start gap-4 p-8"
            style={{ background: '#FAF7F2', borderLeft: '4px solid #C9A227' }}
          >
            <Shield size={24} className="text-[#C9A227] shrink-0 mt-1" />
            <div>
              <h3 className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] font-bold text-lg mb-2">
                Your Giving is Secure
              </h3>
              <p className="text-[#6B6B6B] text-sm leading-relaxed">
                All bank transfers through RBC Royal Bank are protected by
                bank level encryption and fraud protection. St. James Native
                Baptist Church never stores your financial information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#FAF7F2]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#C9A227] text-xs font-semibold tracking-[0.25em] uppercase block mb-3">
              Common Questions
            </span>
            <h2
              className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] font-bold"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
            >
              Giving FAQ
            </h2>
            <div className="w-12 h-0.5 bg-[#C9A227] mx-auto mt-6" />
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="bg-white p-8"
                style={{ borderLeft: '3px solid #C9A227' }}
              >
                <div className="flex items-start gap-4">
                  <HelpCircle size={18} className="text-[#C9A227] shrink-0 mt-1" />
                  <div>
                    <h3 className="font-[family-name:var(--font-playfair)] text-[#7A1B1B] font-bold mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-[#6B6B6B] text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        className="py-24 text-center px-6"
        style={{ background: '#7A1B1B' }}
      >
        <Heart size={40} className="text-[#C9A227] mx-auto mb-6" />
        <h2
          className="font-[family-name:var(--font-playfair)] text-[#C9A227] font-bold mb-4"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
        >
          Every Gift Makes a Difference
        </h2>
        <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-lg mx-auto">
          No gift is too small. Your generosity helps us continue serving
          Nassau and spreading the Gospel for generations to come.
        </p>
        
          <a href="/contact"
          className="inline-block px-10 py-4 text-white text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:opacity-80"
          style={{ background: '#C9A227' }}
        >
          Contact Us With Questions
        </a>
      </section>

    </main>
  )
}