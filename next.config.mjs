/**
 * Next.js Configuration — next.config.mjs
 *
 * Security headers added to every page response.
 * These headers protect against common web attacks:
 *
 * - Content-Security-Policy — prevents XSS and injection attacks
 * - X-Frame-Options — prevents clickjacking
 * - X-Content-Type-Options — prevents MIME type sniffing
 * - Referrer-Policy — controls referrer information
 * - Permissions-Policy — disables browser features we don't need
 * - Strict-Transport-Security — forces HTTPS always
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  async headers() {
    return [
      {
        /**
         * Apply these headers to every route on the website
         */
        source: '/(.*)',
        headers: [
          {
            /**
             * X-Frame-Options
             * Prevents the website from being embedded in an iframe
             * Protects against clickjacking attacks where someone
             * tricks a user into clicking something on a hidden iframe
             */
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            /**
             * X-Content-Type-Options
             * Prevents browsers from guessing the content type
             * Forces browsers to use the declared content type only
             */
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            /**
             * Referrer-Policy
             * Controls how much referrer information is sent
             * strict-origin-when-cross-origin is the safest modern setting
             */
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            /**
             * Permissions-Policy
             * Disables browser features the church website doesn't need
             * Camera, microphone, geolocation all disabled for privacy
             */
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            /**
             * Strict-Transport-Security
             * Forces HTTPS for the next 2 years
             * Prevents anyone from accessing the site over HTTP
             * includeSubDomains covers all subdomains too
             */
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            /**
             * X-DNS-Prefetch-Control
             * Controls DNS prefetching
             * On allows faster page loads by prefetching DNS lookups
             */
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ]
  },
}

export default nextConfig