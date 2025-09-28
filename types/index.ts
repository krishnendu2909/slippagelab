// TypeScript type definitions for SlippageLab application
// Comprehensive types for fintech trading data and slippage analysis

// Core trading data types based on 2025 NSE market structure
export interface Trade {
  date: string                    // ISO date string (YYYY-MM-DD)
  symbol: string                  // Trading symbol (e.g., "NIFTY", "BANKNIFTY")
  side: 'BUY' | 'SELL'           // Trade direction
  qty: number                     // Quantity/lot size
  price: number                   // Execution price in INR
  slippage: number               // Slippage in Rp/lot (1.0-1.5 typical range)
  pnl: number                    // Profit/Loss in INR
}

// Equity curve data point for performance visualization
export interface EquityPoint {
  date: string                   // ISO date string
  pnl: number                    // Individual trade P&L
  cumulative: number             // Cumulative P&L up to this point
}

// Comprehensive trading performance metrics
export interface TradingMetrics {
  totalPnL: number              // Total profit/loss in INR
  winRate: number               // Percentage of winning trades (0-100)
  maxDrawdown: number           // Maximum drawdown percentage (negative)
  sharpeRatio: number           // Risk-adjusted return ratio
  avgSlippage: number           // Average slippage across all trades
  totalTrades: number           // Total number of trades analyzed
}

// Complete mock data structure matching mockData.json
export interface MockData {
  trades: Trade[]               // Array of individual trades
  equityCurve: EquityPoint[]    // Equity curve data points
  totalPnL: number              // Summary total P&L
  winRate: number               // Summary win rate
  maxDrawdown: number           // Summary max drawdown
  sharpeRatio: number           // Summary Sharpe ratio
  avgSlippage: number           // Summary average slippage
  totalTrades: number           // Summary trade count
}

// Slippage analysis results for comparison
export interface SlippageAnalysis {
  originalSlippage: number      // Baseline slippage (typically 1.2 Rp)
  optimizedSlippage: number     // Target slippage (1.0-1.5 Rp range)
  slippageReduction: number     // Absolute reduction in Rp/lot
  percentageImprovement: number // Percentage improvement in execution
  estimatedSavings: number      // Estimated savings in INR
  impactDescription: string     // Human-readable impact summary
}

// Component prop types for reusable components

// MetricCard component props
export interface MetricCardProps {
  title: string
  desc?: string
  value?: string | number
  icon?: string
  edge?: string
  color?: 'blue' | 'green' | 'amber' | 'red'
  children?: React.ReactNode
  className?: string
}

// EquityChart component props
export interface EquityChartProps {
  data: EquityPoint[]
  height?: number
  stroke?: string
  dataKey?: string
  alt?: string
  showGrid?: boolean
  showTooltip?: boolean
  className?: string
}

// SlippageSlider component props
export interface SlippageSliderProps {
  min?: number
  max?: number
  step?: number
  value: number
  onChange: (value: number) => void
  label?: string
  tooltipId?: string
  className?: string
  disabled?: boolean
}

// AlertPopup component props
export interface AlertPopupProps {
  text?: string
  message?: string
  slippage?: number
  icon?: string
  variant?: 'warning' | 'info' | 'success'
  className?: string
  disabled?: boolean
  onClick?: () => void
}

// Navigation and routing types
export interface NavLink {
  href: string
  label: string
  description: string
}

// Theme management types
export type Theme = 'light' | 'dark'

export interface ThemeConfig {
  theme: Theme
  toggleTheme: () => void
}

// Session storage data types for cross-page state management
export interface SessionData {
  exploredSlippage?: number
  resultsData?: {
    slippage: number
    metrics: {
      originalPnL: number
      variantPnL: number
      absoluteSavings: number
      percentageSavings: number
      slippageReduction: number
      tradesAnalyzed: number
    }
    timestamp: string
  }
}

// API response types (for future backend integration)
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// File upload types for CSV processing
export interface UploadedFile {
  name: string
  size: number
  type: string
  lastModified: number
}

export interface CsvParseResult {
  trades: Trade[]
  errors: string[]
  summary: {
    totalRows: number
    validTrades: number
    invalidRows: number
  }
}

// Performance calculation utilities types
export interface PerformanceCalculation {
  calculateSlippageImpact: (trades: Trade[], targetSlippage: number) => EquityPoint[]
  calculateSavings: (original: number, optimized: number) => number
  formatCurrency: (amount: number) => string
  formatPercentage: (value: number) => string
}

// SEBI compliance and educational content types
export interface ComplianceNotice {
  title: string
  content: string
  type: 'disclaimer' | 'educational' | 'warning'
  required: boolean
}

// Market data types for 2025 context
export interface MarketContext {
  year: number                  // 2025
  avgManualSlippage: number     // 1.2-1.5 Rp/lot typical
  avgAlgoSlippage: number       // 1.0-1.1 Rp/lot achievable
  industryImprovement: number   // 5-10% return improvement potential
  adoptionUplift: number        // 25-30% efficiency uplift
  dataSource: string            // e.g., "AlgoBulls 2025", "uTrade research"
}

// Error handling types
export interface AppError {
  code: string
  message: string
  details?: any
  timestamp: Date
}

// Utility types for better type safety
export type SlippageRange = 1.0 | 1.1 | 1.2 | 1.3 | 1.4 | 1.5
export type TradeSide = 'BUY' | 'SELL'
export type MetricColor = 'blue' | 'green' | 'amber' | 'red'
export type ToastVariant = 'warning' | 'info' | 'success' | 'error'

// Component state types
export interface ExplorePageState {
  slippage: number
  previewData: EquityPoint[]
  isLoading: boolean
  error?: string
}

export interface ResultsPageState {
  originalData: EquityPoint[]
  variantData: EquityPoint[]
  metrics: SlippageAnalysis
  isCalculating: boolean
}

export interface UploadPageState {
  preview: boolean
  dragActive: boolean
  uploadedFile?: UploadedFile
  parsedData?: CsvParseResult
}

// Export page specific types
export interface PdfGenerationOptions {
  includeCharts: boolean
  includeMetrics: boolean
  includeRecommendations: boolean
  format: 'A4' | 'Letter'
}

// Global app state type (for future state management)
export interface AppState {
  theme: Theme
  currentSlippage: number
  analysisResults?: SlippageAnalysis
  userData?: {
    trades: Trade[]
    metrics: TradingMetrics
  }
}
