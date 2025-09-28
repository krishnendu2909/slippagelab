'use client'

// Home page for SlippageLab - Interview-winning conversion-focused landing page
import { useRouter } from 'next/navigation'
import MetricCard from '@/components/MetricCard'

export default function HomePage() {
  const router = useRouter()

  const handleStartAnalysis = () => {
    router.push('/upload')
  }

  const handleSeeHowItWorks = () => {
    router.push('/explorer')
  }

  return (
    <div className="bg-white dark:bg-gray-900">

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gray-900 dark:text-white">Transform Your Trading</span><br />
            <span className="text-blue-600">Stop Losing Money</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Eliminate slippage losses with algorithmic trading. Start saving money from your very first trade.
          </p>


          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button 
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
              onClick={handleStartAnalysis}
            >
              Analyze Your Trades
            </button>
            
            <button 
              className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200"
              onClick={handleSeeHowItWorks}
            >
              Try Calculator
            </button>
          </div>
        </div>
      </section>
      {/* Comparison Table */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Manual vs Algorithmic Trading
          </h2>
          
          <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-red-600">Manual Trading</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-green-600">Algo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">Average Slippage</td>
                  <td className="px-6 py-4 text-sm text-red-600 text-center">1.5% - 3.0%</td>
                  <td className="px-6 py-4 text-sm text-green-600 text-center">0.1% - 0.3%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">Execution Speed</td>
                  <td className="px-6 py-4 text-sm text-red-600 text-center">2-5 seconds</td>
                  <td className="px-6 py-4 text-sm text-green-600 text-center">0.001 seconds</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">Emotional Trading</td>
                  <td className="px-6 py-4 text-sm text-red-600 text-center">High Risk</td>
                  <td className="px-6 py-4 text-sm text-green-600 text-center">Eliminated</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">24/7 Trading</td>
                  <td className="px-6 py-4 text-sm text-red-600 text-center">Impossible</td>
                  <td className="px-6 py-4 text-sm text-green-600 text-center">Fully Automated</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </div>
  )
}
