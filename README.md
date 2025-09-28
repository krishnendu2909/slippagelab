# SlippageLab - SEBI-Compliant Educational Slippage Simulator

A production-grade Next.js 13 educational tool for exploring slippage impacts in algorithmic trading. Built for fintech professionals and retail traders to understand how execution speed affects trading returns.

## 🎯 Overview

SlippageLab helps traders transition from manual to algorithmic execution by demonstrating the financial impact of slippage. Based on 2025 AlgoBulls research showing 1-1.5 Rp/lot delays in manual execution costing 5-10% returns.

### Key Features

- **Interactive Slippage Simulator**: Adjust execution speed and see real-time P&L impact
- **Educational Focus**: SEBI-compliant tool with no investment advice
- **Real Market Data**: Based on Jan-Mar 2025 NSE trading patterns
- **Professional UI**: Exact Nubra.io design system implementation
- **Comprehensive Analysis**: PDF export with detailed insights

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Modern web browser

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd slippagelab

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to explore the application.

### Production Build

```bash
# Build for production
npm run build

# Start production server
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

## 🎨 Design System

### Color Palette (Nubra.io Brand)

- **Primary Blue**: `#3b82f6` - CTAs and branding
- **Success Green**: `#22c55e` - Positive metrics
- **Warning Amber**: `#f59e0b` - Slippage alerts
- **Neutral Gray**: `#f3f4f6` - Backgrounds
- **Text Colors**: `#6b7280` (body), `#1f2937` (headings)

### Typography

- **Font**: Inter (Google Fonts)
- **Responsive**: Mobile-first design with 768px breakpoint
- **Grid**: 8px spacing system for consistency

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

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint checking
```

### Code Style

- TypeScript for type safety
- Comprehensive comments explaining 2025 data context
- Accessibility-first component design
- Mobile-responsive layouts

### Adding New Features

1. Create component in `/components`
2. Add TypeScript types in `/types/index.ts`
3. Update navigation in `Navbar.tsx`
4. Add page in `/app` directory
5. Test responsive design and accessibility

## 📱 User Journey

1. **Home**: Introduction to slippage concepts
2. **Upload**: CSV upload or sample data preview
3. **Explore**: Interactive slippage adjustment with real-time charts
4. **Results**: Side-by-side performance comparison
5. **Export**: PDF generation and next steps

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

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Manual Deployment

1. Run `npm run build`
2. Deploy `.next` folder to hosting provider
3. Configure environment for Node.js 18+

### Environment Variables

No environment variables required - fully client-side application.

## 📈 Analytics & Monitoring

### Key Metrics to Track

- User journey completion rate
- Slippage values most commonly tested
- PDF download rates
- Time spent on exploration page

### Performance Monitoring

- Core Web Vitals compliance
- Bundle size monitoring
- Error tracking for PDF generation

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

### Market Data Sources

- **AlgoBulls 2025**: 5-10% return improvement research
- **uTrade**: 25-30% adoption uplift data
- **NSE 2025**: Price levels and slippage patterns

### Learning Objectives

1. Understand slippage impact on trading returns
2. Compare manual vs algorithmic execution
3. Quantify potential savings from faster execution
4. Explore transition strategies to algo trading

## 🔗 Related Resources

- [Nubra.io Platform](https://nubra.io) - Advanced algo trading tools
- [SEBI Guidelines](https://sebi.gov.in) - Regulatory compliance
- [NSE Market Data](https://nseindia.com) - Real-time market information

## 📄 License

MIT License - See LICENSE file for details.

## 🆘 Support

For technical issues or questions:
- Create GitHub issue with detailed description
- Include browser version and steps to reproduce
- Attach screenshots for UI-related issues

---

**Built with ❤️ by the Nubra.io Team**

*Empowering traders with educational tools for better market understanding.*
