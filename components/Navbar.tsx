'use client'

// Navigation component for SlippageLab with Nubra.io branding
// Fixed header with logo, navigation links, and theme toggle
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  // Track current theme for logo switching between black.png (light) and white.png (dark)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hasUploadedData, setHasUploadedData] = useState(false)
  const pathname = usePathname()

  // Initialize theme from localStorage and <html>.dark class
  useEffect(() => {
    // Determine current theme by checking html.dark class or saved preference
    const html = document.documentElement
    const isDark = html.classList.contains('dark')
    const savedTheme = (localStorage.getItem('theme') as 'light' | 'dark') || (isDark ? 'dark' : 'light')
    setTheme(savedTheme)

    // Observe class changes on <html> to react to theme toggles
    const handleClassChange = () => {
      const nowDark = document.documentElement.classList.contains('dark')
      setTheme(nowDark ? 'dark' : 'light')
    }
    const observer = new MutationObserver(handleClassChange)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    
    return () => observer.disconnect()
  }, [])

  // Check for uploaded data on component mount and storage changes
  useEffect(() => {
    const checkUploadStatus = () => {
      if (typeof window !== 'undefined') {
        const data = sessionStorage.getItem('analysisResults')
        setHasUploadedData(!!data)
      }
    }
    
    // Initial check after component mounts
    checkUploadStatus()
    
    // Check periodically to catch sessionStorage changes
    const interval = setInterval(checkUploadStatus, 500)
    
    // Listen for storage changes
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', checkUploadStatus)
      window.addEventListener('dataUploaded', checkUploadStatus)
    }
    
    return () => {
      clearInterval(interval)
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', checkUploadStatus)
        window.removeEventListener('dataUploaded', checkUploadStatus)
      }
    }
  }, [])

  // Navigation links - simplified structure
  const allNavLinks = [
    { href: '/', label: 'Home', description: 'SlippageLab overview and introduction', alwaysShow: true },
    { href: '/upload', label: 'Upload', description: 'Upload trades for slippage analysis', alwaysShow: true },
    { href: '/explorer', label: 'Explorer', description: 'Interactive slippage calculator', alwaysShow: true }
  ]

  const navLinks = allNavLinks.filter(link => link.alwaysShow || hasUploadedData)

  // Check if current path matches nav link (exact match or starts with for nested routes)
  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  // Handle theme toggle with accessibility support
  const handleThemeToggle = () => {
    if (typeof window !== 'undefined' && window.toggleTheme) {
      window.toggleTheme()
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 shadow-lg" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo section with theme-aware image switching */}
          <div className="flex items-center space-x-4">
            <Link 
              href="/" 
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              aria-label="SlippageLab home page"
            >
              {/* Dynamic logo based on theme - black.png for light, white.png for dark */}
              <Image
                src={theme === 'dark' ? '/assets/white.png' : '/assets/black.png'}
                alt="SlippageLab logo"
                width={40}
                height={40}
                className="max-h-10 w-auto"
                priority
              />
              <div className="text-gray-900 dark:text-white">
                <h1 className="text-xl font-bold">SlippageLab</h1>
              </div>
            </Link>
          </div>

          {/* Desktop navigation links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium px-3 py-2 rounded-md ${isActiveLink(link.href) ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : ''}`}
                aria-current={isActiveLink(link.href) ? 'page' : undefined}
                title={link.description}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Theme toggle button */}
            <button
              onClick={handleThemeToggle}
              className="ml-4 p-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-md"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              title="Toggle theme"
            >
              {theme === 'light' ? (
                // Moon icon for dark mode
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                // Sun icon for light mode
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-success-500 transition-colors p-2"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                // Close icon
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger icon
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile navigation menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-blue-800 border-t border-blue-600">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2 text-white hover:text-success-500 transition-colors rounded-md ${
                    isActiveLink(link.href) ? 'bg-blue-600 text-success-500' : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-current={isActiveLink(link.href) ? 'page' : undefined}
                >
                  <div className="font-medium">{link.label}</div>
                  <div className="text-xs text-blue-200">{link.description}</div>
                </Link>
              ))}
              
              {/* Mobile theme toggle */}
              <button
                onClick={() => {
                  handleThemeToggle()
                  setIsMobileMenuOpen(false)
                }}
                className="block w-full text-left px-3 py-2 text-white hover:text-success-500 transition-colors rounded-md"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              >
                <div className="font-medium flex items-center">
                  {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                </div>
                <div className="text-xs text-blue-200">Toggle color theme</div>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// Extend Window interface for TypeScript support of global theme toggle
declare global {
  interface Window {
    toggleTheme: () => void
  }
}
