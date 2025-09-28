// Root layout for SlippageLab - SEBI-compliant fintech educational simulator
// Implements Next.js 13 App Router with Inter font, Navbar, Footer, and theme toggle
import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import { Toaster } from 'react-hot-toast'

// SEO metadata optimized for fintech educational content
export const metadata: Metadata = {
  title: 'SlippageLab – Nubra 2025 | SEBI-Compliant Slippage Simulator',
  description: 'Educational simulator to explore slippage impacts in algo trading. Learn how faster execution saves 5-10% returns. SEBI-compliant, no investment advice.',
  keywords: ['slippage', 'algo trading', 'fintech', 'SEBI compliant', 'educational', 'trading simulator'],
  authors: [{ name: 'Nubra.io Team' }],
  robots: 'index, follow',
  openGraph: {
    title: 'SlippageLab - Explore Slippage Impacts',
    description: 'SEBI-compliant educational tool to understand how slippage affects trading returns',
    type: 'website',
    locale: 'en_IN',
  }
}

// Viewport configuration for Next.js 14
export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

// Root layout component with theme support and accessibility features
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="font-inter">
      <head>
        {/* Favicon using black.png for light theme default */}
        <link rel="icon" href="/assets/black.png" />
        {/* Preload Inter font for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {/* Skip to main content for accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-500 text-white px-4 py-2 rounded-md z-50">
          Skip to main content
        </a>
        
        {/* Fixed navigation header with Nubra.io branding */}
        <Navbar />
        
          {/* Main content area with proper semantic structure */}
          <main id="main-content" className="pt-16 min-h-screen">
          {children}
        </main>
        
        {/* Footer with SEBI compliance notice and branding */}
        <Footer />
        
        {/* Global toast notifications for user feedback */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
        
        {/* Theme toggle script for light/dark mode switching using Tailwind 'dark' class */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Theme toggle: toggles 'dark' class on <html> for Tailwind dark mode
              // Persists theme preference in localStorage for consistency
              function toggleTheme() {
                const html = document.documentElement;
                const isDark = html.classList.toggle('dark');
                const newTheme = isDark ? 'dark' : 'light';
                localStorage.setItem('theme', newTheme);
                const favicon = document.querySelector('link[rel="icon"]');
                if (favicon) favicon.href = isDark ? '/assets/white.png' : '/assets/black.png';
              }
              
              // Initialize theme from localStorage or default to light
              function initTheme() {
                const savedTheme = localStorage.getItem('theme') || 'light';
                const html = document.documentElement;
                if (savedTheme === 'dark') html.classList.add('dark'); else html.classList.remove('dark');
                const favicon = document.querySelector('link[rel="icon"]');
                if (favicon) favicon.href = savedTheme === 'dark' ? '/assets/white.png' : '/assets/black.png';
              }
              
              // Initialize theme on page load
              initTheme();
              
              // Make toggleTheme available globally for navbar button
              window.toggleTheme = toggleTheme;
            `,
          }}
        />
      </body>
    </html>
  )
}

function Footer() {
  return (
    <footer className="bg-neutral-100 dark:bg-gray-800 border-t border-neutral-200 dark:border-gray-700 py-8">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center">
          {/* Simple disclaimer */}
          <p className="text-neutral-400 dark:text-gray-400 text-xs">
            Educational tool for trading analysis
          </p>
        </div>
      </div>
    </footer>
  )
}
