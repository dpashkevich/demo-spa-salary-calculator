# Demo SPA Salary Calculator

A modern, interactive salary calculator built as a Single Page Application (SPA) that provides salary insights by programming language and country. Features beautiful data visualizations and an intuitive user interface.

## ✨ Features

- **Interactive Salary Data**: Compare salaries across different programming languages and countries
- **Dynamic Visualizations**: Beautiful charts showing salary ranges by experience level
- **Responsive Design**: Optimized for desktop and mobile devices
- **Modern UI**: Clean, professional interface with smooth animations
- **Real-time Updates**: Instant results as you change selections
- **Detailed Tooltips**: Hover over data points for detailed salary information

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.0 with TypeScript
- **Build Tool**: Vite 7.0.0
- **Styling**: StyleX (Facebook's CSS-in-JS solution)
- **UI Components**: Radix UI for accessible, unstyled components
- **Icons**: Lucide React
- **Testing**: Vitest with jsdom and React Testing Library
- **Linting**: ESLint with TypeScript support
- **Development**: Hot Module Replacement (HMR) for fast development

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd demo-spa-salary-calculator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 📝 Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks
- `npm run test` - Run tests once
- `npm run test:watch` - Run tests in watch mode

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   ├── Header.tsx       # Application header
│   ├── InputForm.tsx    # Language/country selection
│   ├── ResultsDisplay.tsx    # Results container
│   └── SalaryChart.tsx  # Data visualization
├── styles/              # Global styles
├── __tests__/           # Test files
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## 🎯 How It Works

1. **Select Parameters**: Choose a programming language and country from the dropdown menus
2. **View Results**: Interactive chart displays salary ranges by experience level
3. **Explore Data**: Hover over chart elements to see detailed salary information
4. **Compare**: Switch between different languages and countries to compare salaries

## 🧪 Testing

The project includes a comprehensive testing setup with:

- **Vitest** for fast unit testing
- **jsdom** for DOM simulation
- **React Testing Library** for component testing

Run tests with:
```bash
npm run test        # Single run
npm run test:watch  # Watch mode
```

## 🔧 Development

The project uses modern development tools for an optimal developer experience:

- **TypeScript** for type safety
- **ESLint** for code quality
- **Vite** for fast builds and HMR
- **StyleX** for type-safe styling
- **Radix UI** for accessible components

## 📱 Browser Support

This application supports all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Building for Production

1. Build the application:
   ```bash
   npm run build
   ```

2. The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

3. Preview the production build locally:
   ```bash
   npm run preview
   ```

## 📄 License

This project is open source and available under the MIT License.
