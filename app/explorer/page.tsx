'use client'
// Interactive Slippage Explorer - Dedicated page for real-time calculations
import { useState } from 'react'

export default function InteractiveExplorerPage() {
  const [slippageTest, setSlippageTest] = useState(1.2)
  const [tradesPerMonth, setTradesPerMonth] = useState(10)
  const [avgTradeSize, setAvgTradeSize] = useState(25000)

  // Fixed calculation - comparing current slippage to optimized algo slippage (0.2%)
  const calculateSavings = () => {
    const currentSlippage = slippageTest / 100 // Convert percentage to decimal
    const optimizedSlippage = 0.002 // 0.2% optimized slippage
    const slippageReduction = currentSlippage - optimizedSlippage
    
    // Monthly savings calculation
    const monthlySavings = slippageReduction * tradesPerMonth * avgTradeSize
    const sixMonthSavings = monthlySavings * 6
    const yearlySavings = monthlySavings * 12
    
    // Efficiency improvement percentage
    const efficiencyImprovement = (slippageReduction / currentSlippage) * 100
    
    return {
      monthly: Math.max(0, monthlySavings),
      sixMonth: Math.max(0, sixMonthSavings),
      yearly: Math.max(0, yearlySavings),
      efficiency: Math.max(0, efficiencyImprovement)
    }
  }

  const savings = calculateSavings()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Interactive Slippage Explorer</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">Adjust the parameters below to see how algorithmic trading can transform your profits</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Note: This is a simplified interactive tool for educational purposes only.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Slippage Control */}
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Your Current Slippage</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Adjust based on your trading experience</p>
              
              <div className="text-center mb-6">
                <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{slippageTest.toFixed(1)}%</span>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Average Slippage</p>
              </div>
              
              <div className="mb-4">
                <input
                  type="range"
                  min="0.2"
                  max="3.0"
                  step="0.1"
                  value={slippageTest}
                  onChange={(e) => setSlippageTest(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                />
                
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                  <span>0.2%</span>
                  <span>3.0%</span>
                </div>
              </div>
            </div>

            {/* Monthly Trades */}
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Monthly Trades</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">How often do you trade?</p>
              
              <div className="text-center mb-6">
                <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{tradesPerMonth}</span>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Trades per Month</p>
              </div>
              
              <div className="mb-4">
                <input
                  type="range"
                  min="10"
                  max="2000"
                  step="10"
                  value={tradesPerMonth}
                  onChange={(e) => setTradesPerMonth(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                />
                
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                  <span>10</span>
                  <span>2000</span>
                </div>
              </div>
            </div>

            {/* Trade Size */}
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Average Trade Size</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Your typical trade value</p>
              
              <div className="text-center mb-6">
                <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">₹{(avgTradeSize/1000).toFixed(0)}K</span>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Per Trade</p>
              </div>
              
              <div className="mb-4">
                <input
                  type="range"
                  min="5000"
                  max="100000"
                  step="1000"
                  value={avgTradeSize}
                  onChange={(e) => setAvgTradeSize(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                />
                
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                  <span>₹5K</span>
                  <span>₹100K</span>
                </div>
              </div>
            </div>
          </div>

          {/* Slippage Loss Comparison Chart */}
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8 mb-12">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Slippage Loss Comparison (6 Months)</h3>
            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">Manual Trading</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">Algo</span>
              </div>
            </div>
            
            {/* Simple chart representation */}
            <div className="space-y-4">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => {
                const manualLoss = (savings.monthly * (1 + index * 0.1)) / 6
                const algoLoss = manualLoss * 0.15 // 85% reduction
                const maxLoss = savings.monthly / 4
                
                return (
                  <div key={month} className="flex items-center space-x-4">
                    <span className="w-8 text-sm text-gray-600 dark:text-gray-300 font-medium">{month}</span>
                    <div className="flex-1 flex items-center space-x-2">
                      <div 
                        className="bg-red-500 h-6 rounded flex items-center justify-end pr-2" 
                        style={{width: `${Math.max(10, (manualLoss / maxLoss) * 60)}%`}}
                      >
                        <span className="text-white text-xs font-medium">₹{Math.round(manualLoss).toLocaleString()}</span>
                      </div>
                      <div 
                        className="bg-green-500 h-6 rounded flex items-center justify-end pr-2" 
                        style={{width: `${Math.max(5, (algoLoss / maxLoss) * 60)}%`}}
                      >
                        <span className="text-white text-xs font-medium">₹{Math.round(algoLoss).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Savings Display */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">Your Potential Savings</h3>
              
              <div className="space-y-6 text-center">
                <div>
                  <span className="text-4xl font-bold text-green-600 dark:text-green-400">₹{Math.round(savings.sixMonth).toLocaleString('en-IN')}</span>
                  <p className="text-gray-600 dark:text-gray-300 text-lg mt-1">Over 6 Months</p>
                </div>
                
                <div>
                  <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">₹{Math.round(savings.monthly).toLocaleString('en-IN')}</span>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">Per Month</p>
                </div>
                
                <div>
                  <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">{savings.efficiency.toFixed(0)}%</span>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">More Efficient</p>
                </div>
              </div>
              
              <button 
                onClick={() => window.location.href = '/upload'}
                className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors mt-8 text-lg"
              >
                See Detailed Analysis
              </button>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Impact on Your Trading</h3>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-600 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Execution Speed</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Manual: 2-5 seconds | Algo: 0.001 seconds</p>
                  </div>
                  <span className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium">1000x faster</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-600 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Price Accuracy</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Manual: {slippageTest.toFixed(1)}% slippage | Algo: 0.2% slippage</p>
                  </div>
                  <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium">85% reduction</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-600 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Emotional Trading</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Manual: High impact | Algo: Eliminated</p>
                  </div>
                  <span className="bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400 px-3 py-1 rounded-full text-sm font-medium">100% objective</span>
                </div>
              </div>
            </div>
          </div>


        </div>
      </section>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  )
}
