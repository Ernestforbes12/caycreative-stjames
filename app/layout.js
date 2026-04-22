/**
 * Root Layout — app/layout.js
 *
 * This file wraps every page on the website.
 * Anything placed here — navbar, footer, fonts — appears on every page.
 * Next.js App Router requires this file to exist at the app/ root.
 */

import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '700', '900'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
})

export const metadata = {
  title: 'St. James Native Baptist Church | Nassau, Bahamas',
  description: 'A Christ Centered Church in Nassau, Bahamas. Join us for Sunday Worship at 11:00 AM. Est. 1856.',
  keywords: 'church Nassau Bahamas, Native Baptist Church, St James Church Nassau',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className="bg-[#FAF7F2] text-[#1A1A1A] antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}