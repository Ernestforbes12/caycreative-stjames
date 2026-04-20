/**
 * Give Page — app/give/page.js
 *
 * Provides online giving options for the congregation.
 * 
 * Sections:
 * - Hero — page title with church photo background
 * - Why We Give — biblical foundation for giving
 * - Giving options — Cash App, PayPal, in person
 * - FAQ — common questions about giving
 * - Bottom CTA — encourage first time givers
 */

import { Heart, Shield, Smartphone, DollarSign, Church, HelpCircle } from 'lucide-react'

export const metadata = {
  title: 'Give | St. James Native Baptist Church',
  description: 'Support the ministry of St. James Native Baptist Church in Nassau, Bahamas through your generous giving.',
}

const givingOptions = [
  {
    icon: Smartphone,
    title: 'Cash App',
    description: 'Send your tithe or offering quickly and securely through Cash App.',
    action: '$StJamesNBC',
    actionLabel: 'Cash App Tag',
    color: '#00D632',
  },
  {
    icon: DollarSign,
    title: 'PayPal',
    description: 'Give securely online using your PayPal account or any major credit card.',
    action: 'stjamesnbc@gmail.com',
    actionLabel: 'PayPal Email',
    color: '#003087',
  },
  {
    icon: Church,
    title: 'In Person',
    description: 'Give during any of our Sunday services or Wednesday Bible Study.',
    action: 'Every Service',
    actionLabel: 'Offering Collected',
    color: '#7A1B1B',
  },
]

const faqs = [
  {
    question: 'Is my giving secure?',
    answer: 'Yes. Cash App and PayPal both use bank level encryption to protect every transaction.',
  },
  {
    question: 'Can I set up recurring giving?',
    answer: 'Yes — both Cash App and PayPal allow you to schedule automatic recurring payments so you never miss a tithe.',
  },
  {
    question: 'Will I receive a receipt for my giving?',
    answer: 'Cash App and PayPal both provide automatic transaction receipts via email for every gift.',
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
            Your giving directly supports our Sunday worship services, Wednesday Bible
            Study, community outreach programs, youth ministry, and the maintenance
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {givingOptions.map((option) => {
              const Icon = option.icon
              return (
                <div
                  key={option.title}
                  className="bg-white p-10 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{ borderTop: `4px solid ${option.color}` }}
                >
                  {/* Icon */}
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
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

                  {/* Action detail */}
                  <div
                    className="p-3 mb-6"
                    style={{ background: '#FAF7F2' }}
                  >
                    <p className="text-xs text-[#6B6B6B] uppercase tracking-widest mb-1">
                      {option.actionLabel}
                    </p>
                    <p className="font-semibold text-[#1A1A1A] text-sm">
                      {option.action}
                    </p>
                  </div>

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
                All online giving through Cash App and PayPal is protected by
                bank level encryption and fraud protection. St. James Native
                Baptist Church never stores your payment information.
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