import { useState, useEffect, useRef } from 'react';
import * as stylex from '@stylexjs/stylex';
import { BackgroundSpiral } from './components/BackgroundSpiral';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { ResultsDisplay } from './components/ResultsDisplay';

const styles = stylex.create({
  container: {
    backgroundColor: 'black',
    minHeight: '100vh',
    width: '100vw',
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    position: 'relative',
    zIndex: 10,
    width: '100%',
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
    paddingTop: '3rem',
    paddingBottom: '3rem',
  },
  grid: {
    display: 'grid',
    gap: '2rem',
    width: '100%',
    maxWidth: '1280px',
    marginLeft: 'auto',
    marginRight: 'auto',
    '@media (min-width: 1024px)': {
      gridTemplateColumns: '1fr 2fr',
    },
  },
  tooltip: {
    position: 'fixed',
    zIndex: 9999,
    backgroundColor: 'rgb(17, 24, 39)',
    color: 'white',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    paddingTop: '0.75rem',
    paddingBottom: '0.75rem',
    borderRadius: '0.5rem',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    pointerEvents: 'none',
    minWidth: '200px',
    transitionProperty: 'all',
    transitionDuration: '200ms',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  tooltipVisible: {
    opacity: 1,
    transform: 'translateY(0)',
  },
  tooltipHidden: {
    opacity: 0,
    transform: 'translateY(0.5rem)',
  },
  tooltipContent: {
    display: 'grid',
    gap: '0.25rem',
    fontSize: '0.875rem',
  },
  tooltipRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0.5rem',
  },
  tooltipLabel: {
    color: 'rgb(156, 163, 175)',
    textAlign: 'right',
  },
  tooltipValue: {
    color: 'white',
    textAlign: 'left',
  },
});

interface TooltipData {
  country: string;
  language: string;
  experience: string;
  salaryRange: [number, number];
  x: number;
  y: number;
}

export default function App() {
  const [language, setLanguage] = useState('JavaScript');
  const [country, setCountry] = useState('United States');
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [displayTooltipData, setDisplayTooltipData] = useState<TooltipData | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Note: Results are always shown when language and country are set

  // Handle tooltip state changes with proper fade in/out
  useEffect(() => {
    if (tooltipData) {
      // Clear any pending timeouts/animations
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // First set the tooltip data (hidden state)
      setDisplayTooltipData(tooltipData);
      setIsTooltipVisible(false);

      // Then on next frame, make it visible for fade in animation
      animationFrameRef.current = requestAnimationFrame(() => {
        setIsTooltipVisible(true);
      });
    } else {
      // Hide tooltip with fade out animation
      setIsTooltipVisible(false);
      timeoutRef.current = setTimeout(() => {
        setDisplayTooltipData(null);
      }, 200); // Match transition duration
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [tooltipData]);

  return (
    <div {...stylex.props(styles.container)}>
      {/* Background Spiral */}
      <BackgroundSpiral />

      {/* Main Content */}
      <div {...stylex.props(styles.content)}>
        {/* Header */}
        <Header />

        {/* Input and Results Section */}
        <div {...stylex.props(styles.grid)}>
          {/* Step 1: Input Section */}
          <InputForm
            language={language}
            country={country}
            onLanguageChange={setLanguage}
            onCountryChange={setCountry}
          />

          {/* Step 2: Results Section */}
          <ResultsDisplay
            language={language}
            country={country}
            onTooltipChange={setTooltipData}
          />
        </div>
      </div>

      {/* Global Tooltip */}
      {displayTooltipData && (
        <div
          {...stylex.props(
            styles.tooltip,
            isTooltipVisible ? styles.tooltipVisible : styles.tooltipHidden
          )}
          style={{
            left: displayTooltipData.x,
            top: displayTooltipData.y - 10,
            transform: `translate(-50%, -100%) ${isTooltipVisible ? 'translateY(0)' : 'translateY(8px)'}`
          }}
        >
          <div {...stylex.props(styles.tooltipContent)}>
            <div {...stylex.props(styles.tooltipRow)}>
              <span {...stylex.props(styles.tooltipLabel)}>Country</span>
              <span {...stylex.props(styles.tooltipValue)}>{displayTooltipData.country}</span>
            </div>
            <div {...stylex.props(styles.tooltipRow)}>
              <span {...stylex.props(styles.tooltipLabel)}>Language</span>
              <span {...stylex.props(styles.tooltipValue)}>{displayTooltipData.language}</span>
            </div>
            <div {...stylex.props(styles.tooltipRow)}>
              <span {...stylex.props(styles.tooltipLabel)}>Experience</span>
              <span {...stylex.props(styles.tooltipValue)}>{displayTooltipData.experience}</span>
            </div>
            <div {...stylex.props(styles.tooltipRow)}>
              <span {...stylex.props(styles.tooltipLabel)}>Salary</span>
              <span {...stylex.props(styles.tooltipValue)}>${displayTooltipData.salaryRange[0]}K–${displayTooltipData.salaryRange[1]}K/year</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}