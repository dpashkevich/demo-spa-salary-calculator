// React import not needed with new JSX transform
import * as stylex from '@stylexjs/stylex';
import { Info } from "lucide-react";
import { SalaryChart } from './SalaryChart';

const styles = stylex.create({
  container: {
    position: 'relative',
  },
  header: {
    background: 'linear-gradient(to bottom, #6b57ff, rgba(107, 87, 255, 0))',
    borderTopLeftRadius: '1.5rem',
    borderTopRightRadius: '1.5rem',
    padding: '1.5rem',
    marginBottom: '0',
  },
  headerContent: {
    color: 'white',
  },
  stepNumber: {
    fontSize: '2.25rem',
    marginBottom: '1rem',
  },
  stepDescription: {
    fontSize: '1.25rem',
  },
  resultsContainer: {
    backgroundColor: 'white',
    borderBottomLeftRadius: '1.5rem',
    borderBottomRightRadius: '1.5rem',
    padding: '1.5rem',
    minHeight: '500px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  title: {
    fontSize: '1.5rem',
    color: 'rgb(17, 24, 39)',
  },
  highlight: {
    color: '#6b57ff',
  },
  chartContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  chartWrapper: {
    flex: 1,
  },
  labelsContainer: {
    height: '320px',
    position: 'relative',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
  },
  levelLabel: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    height: '10%',
    fontSize: '13px',
    color: 'rgba(25, 25, 28, 0.7)',
  },
  infoSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  description: {
    color: 'rgb(75, 85, 99)',
  },
  underline: {
    textDecoration: 'underline',
  },
  noteContainer: {
    backgroundColor: 'rgb(249, 250, 251)',
    borderRadius: '0.5rem',
    padding: '1rem',
    display: 'flex',
    gap: '0.75rem',
  },
  icon: {
    width: '1.5rem',
    height: '1.5rem',
    color: 'rgb(75, 85, 99)',
    flexShrink: 0,
    marginTop: '0.125rem',
  },
  noteText: {
    color: 'rgb(75, 85, 99)',
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

interface ResultsDisplayProps {
  language: string;
  country: string;
  onTooltipChange: (data: TooltipData | null) => void;
}

export function ResultsDisplay({ language, country, onTooltipChange }: ResultsDisplayProps) {
  const levels = ['16+ years', '11-16 years', '6-10 years', '3-5 years', '1-2 years', '<1 year'];

  return (
    <div {...stylex.props(styles.container)}>
      {/* Step 2 Header */}
      <div {...stylex.props(styles.header)}>
        <div {...stylex.props(styles.headerContent)}>
          <h3 {...stylex.props(styles.stepNumber)}>2</h3>
          <p {...stylex.props(styles.stepDescription)}>Salary range based on your parameters.</p>
        </div>
      </div>

      {/* Results Display */}
      <div {...stylex.props(styles.resultsContainer)}>
        <div {...stylex.props(styles.content)}>
          <h3 {...stylex.props(styles.title)}>
            Most <span {...stylex.props(styles.highlight)}>{language}</span> developers in{' '}
            <span {...stylex.props(styles.highlight)}>{country}</span> can expect the following net salary distribution by experience level (excluding any bonuses):
          </h3>

          {/* Chart and Labels Container */}
          <div {...stylex.props(styles.chartContainer)}>
            <div {...stylex.props(styles.chartWrapper)}>
              <SalaryChart
                language={language}
                country={country}
                onTooltipChange={onTooltipChange}
              />
            </div>

            {/* Y-axis labels positioned inside white container but outside chart */}
            <div {...stylex.props(styles.labelsContainer)}>
              {levels.map((level, index) => {
                const topPercent = (index / 5) * 100; // Match the chart positioning
                return (
                  <div
                    key={level}
                    {...stylex.props(styles.levelLabel)}
                    style={{
                      top: `${topPercent}%`
                    }}
                  >
                    {level}
                  </div>
                );
              })}
            </div>
          </div>

          <div {...stylex.props(styles.infoSection)}>
            <p {...stylex.props(styles.description)}>
              The graph shows salary distribution among users of the selected technology in the specified region, based on responses from{' '}
              <span {...stylex.props(styles.underline)}>Developer Ecosystem Survey 2024</span>.
            </p>

            <div {...stylex.props(styles.noteContainer)}>
              <Info {...stylex.props(styles.icon)} />
              <p {...stylex.props(styles.noteText)}>
                Note: Experience levels refer to total years of professional coding, not years using the selected technology.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}