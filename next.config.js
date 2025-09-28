/** @type {import('next').NextConfig} */
// Next.js configuration optimized for Vercel deployment and performance
// Supports SlippageLab's educational fintech simulator requirements
const nextConfig = {
  images: {
    domains: [], // No external image domains needed for this project
    formats: ['image/webp', 'image/avif'], // Optimize logo assets for performance
  },
  // Optimize bundle size for <1MB target per Vercel requirements
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Remove console logs in production
  },
  poweredByHeader: false, // Remove X-Powered-By header for security
  reactStrictMode: true, // Enable React strict mode for better development experience
}

module.exports = nextConfig
