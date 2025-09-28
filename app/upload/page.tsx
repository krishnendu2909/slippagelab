'use client'

// Simplified Upload page matching exact features from user images
import { useState } from 'react'
import toast from 'react-hot-toast'

interface TradeData {
  symbol: string
  qty: number
  price: string
  slippage: string
}

export default function SimplifiedUploadPage() {
  const [dragActive, setDragActive] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<TradeData[] | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('overview')

  // Parse simplified CSV
  const parseCSV = (csvContent: string): TradeData[] => {
    const lines = csvContent.trim().split('\n')
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase())
    
    const trades: TradeData[] = []
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim())
      if (values.length !== headers.length) continue

      trades.push({
        symbol: values[headers.indexOf('symbol')],
        qty: parseInt(values[headers.indexOf('qty')]),
        price: values[headers.indexOf('price')],
        slippage: values[headers.indexOf('slippage')]
      })
    }
    return trades
  }

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsProcessing(true)
    setError(null)

    try {
      const content = await file.text()
      const results = parseCSV(content)
      setAnalysisResults(results)
      toast.success('Analysis complete!')
    } catch (err) {
      setError('Error processing file')
    } finally {
      setIsProcessing(false)
    }
  }

  // Handle drag and drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(e.type === "dragenter" || e.type === "dragover")
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const file = e.dataTransfer.files?.[0]
    if (!file) return

    setIsProcessing(true)
    try {
      const content = await file.text()
      const results = parseCSV(content)
      setAnalysisResults(results)
      toast.success('Analysis complete!')
    } catch (err) {
      setError('Error processing file')
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadSample = () => {
    const link = document.createElement('a')
    link.href = '/sample-trades.csv'
    link.download = 'sample-trades.csv'
    link.click()
  }

  // Calculate actual total savings from analysis results
  const calculateTotalSavings = () => {
    if (!analysisResults) return 0
    
    const validTrades = analysisResults.filter(trade => trade.symbol && trade.qty && trade.price && trade.slippage)
    
    const totalSavings = validTrades
      .reduce((total, trade) => {
        const currentSlippage = parseFloat(trade.slippage.replace('%', ''))
        const optimizedSlippage = 0.2
        const price = parseFloat(trade.price)
        const quantity = trade.qty
        
        // Skip if any values are invalid
        if (isNaN(currentSlippage) || isNaN(price) || isNaN(quantity)) return total
        
        const savings = ((currentSlippage - optimizedSlippage) / 100) * quantity * price
        // Round each individual trade's savings (same as table display)
        return total + Math.round(savings)
      }, 0)
    
    // Return exact number without rounding here - let display components handle rounding
    return totalSavings
  }


  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Upload Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Analyze Your Trading Data
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Upload your trading CSV to discover hidden slippage losses and potential savings
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Area */}
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Upload Trading Data</h2>
              
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                  dragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                
                <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {isProcessing ? 'Processing...' : 'Drop your CSV file here'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  or click to select from your computer
                </p>
                
                <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" id="file-upload" />
                <label htmlFor="file-upload" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium cursor-pointer hover:bg-blue-700">
                  Choose File
                </label>
                
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">Supports CSV files up to 10MB</p>
              </div>

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-600 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Required Format</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Your CSV should include:</p>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Symbol (Stock/Option name)</li>
                  <li>• Quantity (Number of shares/contracts)</li>
                  <li>• Entry Price</li>
                  <li>• Exit Price</li>
                  <li>• Timestamp</li>
                </ul>
                <button onClick={downloadSample} className="mt-3 text-blue-600 hover:underline text-sm font-medium">
                  Download Sample CSV
                </button>
              </div>
            </div>

            {/* Sample Preview */}
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Sample Analysis Preview</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Here's what your analysis will look like</p>
              
              <table className="w-full text-sm mb-6">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 text-gray-900 dark:text-white">Symbol</th>
                    <th className="text-left py-2 text-gray-900 dark:text-white">Qty</th>
                    <th className="text-left py-2 text-gray-900 dark:text-white">Price</th>
                    <th className="text-left py-2 text-gray-900 dark:text-white">Slippage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 text-gray-900 dark:text-white">RELIANCE</td>
                    <td className="py-2 text-gray-600 dark:text-gray-300">100</td>
                    <td className="py-2 text-gray-600 dark:text-gray-300">₹2450.5</td>
                    <td className="py-2 text-red-600">0.85%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-gray-900 dark:text-white">TCS</td>
                    <td className="py-2 text-gray-600 dark:text-gray-300">50</td>
                    <td className="py-2 text-gray-600 dark:text-gray-300">₹3280.75</td>
                    <td className="py-2 text-red-600">1.2%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-gray-900 dark:text-white">HDFC</td>
                    <td className="py-2 text-gray-600 dark:text-gray-300">75</td>
                    <td className="py-2 text-gray-600 dark:text-gray-300">₹1650.25</td>
                    <td className="py-2 text-red-600">0.95%</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-900 dark:text-white">INFY</td>
                    <td className="py-2 text-gray-600 dark:text-gray-300">200</td>
                    <td className="py-2 text-gray-600 dark:text-gray-300">₹1420.8</td>
                    <td className="py-2 text-red-600">1.1%</td>
                  </tr>
                </tbody>
              </table>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-center">
                  <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-1">₹8,353</h3>
                  <p className="text-red-700 dark:text-red-300 text-sm">Monthly Slippage Loss</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
                  <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-1">₹6,718</h3>
                  <p className="text-green-700 dark:text-green-300 text-sm">Potential Savings</p>
                </div>
              </div>

              <button 
                onClick={() => window.location.href = '/explorer'}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Explore Interactive Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Analysis Results */}
      {analysisResults && (
        <section className="py-8 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <button 
                onClick={() => setAnalysisResults(null)}
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
              >
                ← Back to Upload
              </button>
              <div className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 px-4 py-2 rounded-full text-sm font-medium">
                Analysis Complete ✓
              </div>
            </div>

            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your Trading Analysis Results</h2>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 w-full">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">₹{Math.round(calculateTotalSavings()).toLocaleString('en-IN')}</h3>
                <p className="text-gray-900 dark:text-white font-semibold mb-1">Potential Monthly Savings</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Based on your uploaded data</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">80%</h3>
                <p className="text-gray-900 dark:text-white font-semibold mb-1">Slippage Reduction</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Average improvement achieved</p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-lg p-6 text-center">
                <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">1000x</h3>
                <p className="text-gray-900 dark:text-white font-semibold mb-1">Faster Execution</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">0.001s vs 3.2s average</p>
              </div>
              
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
              <nav className="flex space-x-8">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`py-2 px-1 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'overview' 
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  Overview
                </button>
                <button 
                  onClick={() => setActiveTab('slippage')}
                  className={`py-2 px-1 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'slippage' 
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  Slippage Analysis
                </button>
                <button 
                  onClick={() => setActiveTab('projections')}
                  className={`py-2 px-1 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'projections' 
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  Projections
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="mb-12">
              {activeTab === 'overview' && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Slippage Loss Comparison (6 Months)</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Manual Trading vs Algo</p>
                  
                  {/* Simple bar chart representation */}
                  <div className="space-y-3">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => {
                      const baseSavings = Math.round(calculateTotalSavings())
                      const monthlyLoss = baseSavings * (1 + index * 0.1)
                      const algoLoss = Math.round(monthlyLoss * 0.2)
                      
                      return (
                        <div key={month} className="flex items-center space-x-4">
                          <span className="w-8 text-sm text-gray-600 dark:text-gray-300">{month}</span>
                          <div className="flex-1 flex space-x-1">
                            <div className="bg-red-500 h-6 rounded flex items-center justify-end pr-2" style={{width: `${Math.max(15, (monthlyLoss / baseSavings) * 40)}%`}}>
                              <span className="text-white text-xs">₹{Math.round(monthlyLoss).toLocaleString()}</span>
                            </div>
                            <div className="bg-green-500 h-6 rounded flex items-center justify-end pr-2" style={{width: `${Math.max(5, (algoLoss / baseSavings) * 40)}%`}}>
                              <span className="text-white text-xs">₹{algoLoss.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'slippage' && (
                <div className="space-y-8">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Slippage Analysis Breakdown</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <h4 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Current Average</h4>
                        <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                          {analysisResults ? 
                            (() => {
                              const validTrades = analysisResults.filter(trade => trade.symbol && trade.qty && trade.price && trade.slippage)
                              if (validTrades.length === 0) return '1.0'
                              const avgSlippage = validTrades.reduce((sum, trade) => {
                                const slippage = parseFloat(trade.slippage.replace('%', ''))
                                return sum + (isNaN(slippage) ? 0 : slippage)
                              }, 0) / validTrades.length
                              return avgSlippage.toFixed(2)
                            })()
                            : '1.0'}%
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Manual trading slippage</p>
                      </div>
                      
                      <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <h4 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">Optimized Target</h4>
                        <p className="text-3xl font-bold text-green-600 dark:text-green-400">0.2%</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Algorithmic trading</p>
                      </div>
                      
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">Improvement</h4>
                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                          {analysisResults ? 
                            (() => {
                              const validTrades = analysisResults.filter(trade => trade.symbol && trade.qty && trade.price && trade.slippage)
                              if (validTrades.length === 0) return '80'
                              const avgSlippage = validTrades.reduce((sum, trade) => {
                                const slippage = parseFloat(trade.slippage.replace('%', ''))
                                return sum + (isNaN(slippage) ? 0 : slippage)
                              }, 0) / validTrades.length
                              const improvement = ((avgSlippage - 0.2) / avgSlippage) * 100
                              return Math.round(improvement)
                            })()
                            : '80'}%
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Reduction achieved</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Why Slippage Occurs</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Market Volatility</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Price movements between order placement and execution</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Execution Delay</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Manual processing time allows prices to change</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Order Size Impact</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Large orders can move market prices</p>
                        </div>
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Liquidity Gaps</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Insufficient buyers/sellers at desired price</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}


              {activeTab === 'projections' && (
                <div className="space-y-8">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Savings Projections</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">3 Months</h4>
                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">₹{(Math.round(calculateTotalSavings()) * 3).toLocaleString('en-IN')}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Short-term savings</p>
                      </div>
                      
                      <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <h4 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">6 Months</h4>
                        <p className="text-3xl font-bold text-green-600 dark:text-green-400">₹{(Math.round(calculateTotalSavings()) * 6).toLocaleString('en-IN')}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Medium-term savings</p>
                      </div>
                      
                      <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <h4 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-2">1 Year</h4>
                        <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">₹{(Math.round(calculateTotalSavings()) * 12).toLocaleString('en-IN')}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Annual savings</p>
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* Detailed Analysis Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-12">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Your Trading Data Analysis</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {analysisResults ? analysisResults.filter(trade => trade.symbol && trade.qty && trade.price && trade.slippage).length : 0} trades processed
                </span>
              </div>
              
              <div className="overflow-x-auto max-h-96 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-600 sticky top-0">
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-900 dark:text-white font-semibold">Symbol</th>
                      <th className="text-left py-3 px-4 text-gray-900 dark:text-white font-semibold">Quantity</th>
                      <th className="text-left py-3 px-4 text-gray-900 dark:text-white font-semibold">Price</th>
                      <th className="text-left py-3 px-4 text-gray-900 dark:text-white font-semibold">Current Slippage</th>
                      <th className="text-left py-3 px-4 text-gray-900 dark:text-white font-semibold">Optimized Slippage</th>
                      <th className="text-left py-3 px-4 text-gray-900 dark:text-white font-semibold">Savings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysisResults.filter(trade => trade.symbol && trade.qty && trade.price && trade.slippage).map((trade, index) => {
                      const currentSlippage = parseFloat(trade.slippage.replace('%', ''))
                      const optimizedSlippage = 0.2
                      const price = parseFloat(trade.price)
                      const quantity = trade.qty
                      
                      // Skip if any values are invalid
                      if (isNaN(currentSlippage) || isNaN(price) || isNaN(quantity)) return null
                      
                      const savings = ((currentSlippage - optimizedSlippage) / 100) * quantity * price
                      
                      return (
                        <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{trade.symbol}</td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{quantity}</td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-300">₹{price.toLocaleString()}</td>
                          <td className="py-3 px-4 text-red-600 dark:text-red-400">{trade.slippage}</td>
                          <td className="py-3 px-4 text-green-600 dark:text-green-400">0.2%</td>
                          <td className="py-3 px-4 text-green-600 dark:text-green-400 font-semibold">₹{Math.round(savings).toLocaleString()}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 dark:text-white font-semibold">Total Monthly Savings:</span>
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">₹{Math.round(calculateTotalSavings()).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

          </div>
        </section>
      )}

    </div>
  )
}
