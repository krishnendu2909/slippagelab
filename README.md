# SlippageLab - SEBI-Compliant Educational Slippage Simulator

An educational tool for exploring slippage impacts in algorithmic trading. Built for fintech professionals and retail traders to understand how execution speed affects trading returns.

## 🎯 Overview

SlippageLab helps traders transition from manual to algorithmic execution by demonstrating the financial impact of slippage. 

### Key Features

- **Interactive Slippage Simulator**: Adjust execution speed and see real-time P&L impact
- **Educational Focus**: SEBI-compliant tool with no investment advice
- **Real Market Data**: Based on Jan-Mar 2025 NSE trading patterns
- **Comprehensive Analysis**: PDF export with detailed insights

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Modern web browser

### Installation

```bash
git clone [<repository-url>](https://github.com/krishnendu2909/slippagelab)
cd slippagelab

npm install

npm run dev
```

Visit `https://slippagelabbykrishnendu.vercel.app/` to explore the application.

### Production Build

```bash
npm run build

npm start
```

## 📁 Project Structure

```
slippagelab/
├── app/                          # Next.js 13 App Router
│   ├── data/
│   │   └── mockData.json        # 60 trades (Jan-Mar 2025)
│   ├── layout.tsx               # Root layout with theme support
│   ├── page.tsx                 # Home page
│   ├── upload/page.tsx          # CSV upload & preview
│   ├── explore/page.tsx         # Interactive slippage testing
│   ├── results/page.tsx         # Performance comparison
│   ├── export/page.tsx          # PDF generation & insights
│   └── globals.css              # TailwindCSS + custom styles
├── components/                   # Reusable UI components
│   ├── Navbar.tsx               # Navigation with theme toggle
│   ├── MetricCard.tsx           # Financial KPI display
│   ├── EquityChart.tsx          # Recharts performance visualization
│   ├── SlippageSlider.tsx       # Interactive slippage control
│   ├── AlertPopup.tsx           # Toast notifications
│   └── TooltipWrapper.tsx       # Educational help system
├── types/
│   └── index.ts                 # TypeScript definitions
├── public/
│   └── assets/
│       ├── black.png            # Light theme logo
│       └── white.png            # Dark theme logo
├── tailwind.config.js           # Nubra.io color scheme
├── next.config.js               # Next.js optimization
├── vercel.json                  # Deployment configuration
└── package.json                 # Dependencies & scripts
```

## 📊 Data & Calculations

### Mock Data Structure

60 realistic trades from Jan-Mar 2025 including:
- NIFTY, BANKNIFTY, and major stocks
- Price range: ₹22,500-23,900 (NIFTY 2025 levels)
- Slippage: 1.0-1.5 Rp/lot realistic range
- P&L: ±₹500-2,000 per trade

### Slippage Calculation

```typescript
// Variant P&L calculation based on slippage adjustment
variantPnL = originalPnL * (1 - (slippage - 1.0) / 100)

// Savings calculation
savings = (baselineSlippage - currentSlippage) * totalPnL / 100
```

## 🔧 Technical Stack

### Core Technologies

- **Framework**: Next.js 13 with App Router
- **Styling**: TailwindCSS with custom design system
- **Charts**: Recharts for financial data visualization
- **PDF**: jsPDF for report generation
- **Notifications**: React Hot Toast
- **Tooltips**: React Tooltip for educational content

### Performance Optimizations

- Bundle size: <1MB target
- Lighthouse score: 95+ (accessibility, performance)
- Image optimization: WebP/AVIF support
- Static generation where possible

## 📱 User Journey

1. **Home**: Introduction to slippage concepts
2. **Upload**: CSV upload or sample data preview
3. **Explore**: Interactive slippage adjustment with real-time charts


## 🔒 SEBI Compliance

### Educational Disclaimers

- No investment advice provided
- Clear educational purpose statements
- Risk warnings on all pages
- Data source attribution (AlgoBulls 2025)

### Privacy

- Client-side data processing only
- No server uploads or data storage
- Local browser-based calculations

## 🤝 Contributing

### Development Setup

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Make changes with comprehensive comments
4. Test responsive design and accessibility
5. Submit pull request with detailed description

### Code Standards

- Follow existing TypeScript patterns
- Add comprehensive comments linking to 2025 data sources
- Ensure mobile responsiveness
- Test with screen readers for accessibility

## 📚 Educational Context

### Learning Objectives

1. Understand slippage impact on trading returns
2. Compare manual vs algorithmic execution
3. Quantify potential savings from faster execution
4. Explore transition strategies to algo trading

