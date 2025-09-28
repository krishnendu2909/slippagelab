/** @type {import('tailwindcss').Config} */
// TailwindCSS configuration with Nubra.io exact color scheme
// Primary blue #3b82f6, success green #22c55e, warning amber #f59e0b
module.exports = {
  darkMode: 'class', // Enable dark mode via 'dark' class on html element
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Exact Nubra.io brand colors from interface screenshots
      colors: {
        // Light theme colors (from first screenshot)
        nubra: {
          bg: '#ffffff',           // Pure white background
          sidebar: '#f8fafc',      // Light gray sidebar
          text: '#1e293b',         // Dark text
          accent: '#3b82f6',       // Blue accent
          green: '#10b981',        // Success green
          red: '#ef4444',          // Error/loss red
          border: '#e2e8f0',       // Light borders
        },
        // Dark theme colors (from second screenshot)  
        'nubra-dark': {
          bg: '#0f172a',           // Dark navy background
          sidebar: '#1e293b',      // Darker sidebar
          text: '#f1f5f9',         // Light text
          accent: '#3b82f6',       // Same blue accent
          green: '#10b981',        // Same success green
          red: '#ef4444',          // Same error red
          border: '#334155',       // Dark borders
        },
        // Keep standard Tailwind colors for compatibility
        primary: {
          500: '#3b82f6',
          600: '#2563eb',
        },
        success: {
          500: '#10b981',
          600: '#059669',
        },
        danger: {
          500: '#ef4444',
          600: '#dc2626',
        }
      },
      // Inter font family for professional fintech appearance
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      // 8px grid system for consistent spacing
      spacing: {
        '18': '4.5rem', // 72px
        '88': '22rem',  // 352px
      },
      // Responsive breakpoints optimized for mobile-first design
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px', // Mobile stack threshold
        'lg': '1024px',
        'xl': '1280px',
      }
    },
  },
  plugins: [],
}
