'use client'

// MetricCard component for displaying financial KPIs and slippage metrics
// White card with colored left border, optimized for fintech data presentation
import { ReactNode } from 'react'

interface MetricCardProps {
  title: string                    // Main metric title (e.g., "Total P&L", "Slippage Cost")
  desc?: string                   // Description or explanation text
  value?: string | number         // Primary metric value
  icon?: string                   // Emoji or icon for visual identification
  edge?: string                   // Additional insight or "edge" information
  color?: 'blue' | 'green' | 'amber' | 'red' | 'purple'  // Color theme for left border and accents
  children?: ReactNode            // Custom content for complex metrics
  className?: string              // Additional CSS classes
}

export default function MetricCard({ 
  title, 
  desc, 
  value, 
  icon, 
  edge, 
  color = 'blue',
  children,
  className = ''
}: MetricCardProps) {
  
  // Color mapping for consistent theming across different metric types
  const colorClasses = {
    blue: {
      border: 'border-l-blue-500',      // Primary blue for general metrics
      accent: 'text-blue-500',
      bg: 'bg-blue-50'
    },
    green: {
      border: 'border-l-green-500',      // Success green for positive metrics
      accent: 'text-green-500',
      bg: 'bg-green-50'
    },
    amber: {
      border: 'border-l-amber-500',      // Warning amber for slippage alerts
      accent: 'text-amber-500',
      bg: 'bg-amber-50'
    },
    red: {
      border: 'border-l-red-500',          // Red for negative metrics or losses
      accent: 'text-red-500',
      bg: 'bg-red-50'
    },
    purple: {
      border: 'border-l-purple-500',       // Purple for special metrics
      accent: 'text-purple-500',
      bg: 'bg-purple-50'
    }
  }

  const colors = colorClasses[color] || colorClasses.blue // Fallback to blue if color not found

  // Explicit dark border class mapping to avoid dynamic class purging issues
  const darkBorderClassMap: Record<string, string> = {
    blue: 'dark:border-blue-500',
    green: 'dark:border-green-500',
    amber: 'dark:border-amber-500',
    red: 'dark:border-red-500',
    purple: 'dark:border-purple-500', // Add purple support
  }

  return (
    <div className={`
      bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 m-4 
      border-l-4 ${colors.border} ${darkBorderClassMap[color] || 'dark:border-blue-500'}
      border border-gray-200 dark:border-gray-700
      hover:shadow-xl transition-shadow duration-200
      ${className}
    `}>
      {/* Header section with icon and title */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          {icon && (
            <span className="text-2xl" role="img" aria-label={`${title} icon`}>
              {icon}
            </span>
          )}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
        
        {/* Primary value display */}
        {value && (
          <div className={`text-xl font-semibold ${colors.accent}`}>
            {typeof value === 'number' && value > 0 && '+'}
            {value}
          </div>
        )}
      </div>

      {/* Description text */}
      {desc && (
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 leading-relaxed">
          {desc}
        </p>
      )}

      {/* Custom children content */}
      {children && (
        <div className="mb-3">
          {children}
        </div>
      )}

      {/* Edge information - additional insights or recommendations */}
      {edge && (
        <div className={`${colors.bg} p-3 rounded-md mt-3`}>
          <p className="text-sm font-medium text-heading-text">
            💡 <span className="font-semibold">Insight:</span> {edge}
          </p>
        </div>
      )}
    </div>
  )
}

// Specialized metric card variants for common use cases

// Currency metric card with proper formatting for Indian Rupees
export function CurrencyMetricCard({ 
  title, 
  amount, 
  desc, 
  icon = '₹',
  ...props 
}: Omit<MetricCardProps, 'value'> & { amount: number }) {
  
  // Format currency with Indian number system (lakhs, crores)
  const formatCurrency = (value: number): string => {
    const absValue = Math.abs(value)
    const sign = value < 0 ? '-' : ''
    
    if (absValue >= 10000000) { // 1 crore
      return `${sign}₹${(absValue / 10000000).toFixed(1)}Cr`
    } else if (absValue >= 100000) { // 1 lakh
      return `${sign}₹${(absValue / 100000).toFixed(1)}L`
    } else if (absValue >= 1000) { // 1 thousand
      return `${sign}₹${(absValue / 1000).toFixed(1)}K`
    } else {
      return `${sign}₹${absValue.toLocaleString('en-IN')}`
    }
  }

  return (
    <MetricCard
      title={title}
      desc={desc}
      value={formatCurrency(amount)}
      icon={icon}
      color={amount >= 0 ? 'green' : 'red'}
      {...props}
    />
  )
}

// Percentage metric card for ratios and performance metrics
export function PercentageMetricCard({ 
  title, 
  percentage, 
  desc, 
  icon = '%',
  ...props 
}: Omit<MetricCardProps, 'value'> & { percentage: number }) {
  
  const formattedPercentage = `${percentage >= 0 ? '+' : ''}${percentage.toFixed(1)}%`
  
  return (
    <MetricCard
      title={title}
      desc={desc}
      value={formattedPercentage}
      icon={icon}
      color={percentage >= 0 ? 'green' : 'red'}
      {...props}
    />
  )
}

// Slippage metric card specifically for slippage-related metrics
export function SlippageMetricCard({ 
  title, 
  slippage, 
  desc, 
  impact,
  ...props 
}: Omit<MetricCardProps, 'value' | 'edge'> & { 
  slippage: number
  impact?: string 
}) {
  
  // Determine color based on slippage level (lower is better)
  const getSlippageColor = (slip: number): 'green' | 'amber' | 'red' => {
    if (slip <= 1.0) return 'green'      // Low slippage - good
    if (slip <= 1.3) return 'amber'      // Medium slippage - caution
    return 'red'                         // High slippage - problematic
  }

  return (
    <MetricCard
      title={title}
      desc={desc}
      value={`${slippage.toFixed(1)} Rp/lot`}
      icon="⚡"
      color={getSlippageColor(slippage)}
      edge={impact}
      {...props}
    />
  )
}
