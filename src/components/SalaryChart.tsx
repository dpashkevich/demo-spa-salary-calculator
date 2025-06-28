import React from 'react';
import * as stylex from '@stylexjs/stylex';
import { processDataForChart, getExperienceLevels, type SalaryData } from '../services/dataService';

interface TooltipData {
  country: string;
  language: string;
  experience: string;
  salaryRange: [number, number];
  x: number;
  y: number;
}

interface SalaryChartProps {
  language: string;
  country: string;
  salaryData: SalaryData;
  onTooltipChange: (data: TooltipData | null) => void;
}

const styles = stylex.create({
  chartContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: '800px',
  },
  chartGrid: {
    position: 'relative',
    height: '320px',
    width: '100%',
  },
  gridLines: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  verticalLine: {
    width: '1px',
    height: '100%',
  },
  horizontalLine: {
    height: '1px',
    width: '100%',
  },
  xAxisLabels: {
    position: 'absolute',
    bottom: '-2rem',
    width: '100%',
  },
  xAxisLabel: {
    position: 'absolute',
    fontSize: '13px',
    color: 'rgba(25, 25, 28, 0.7)',
    transform: 'translateX(-50%)',
  },
  rangeContainer: {
    position: 'absolute',
  },
  rangeLine: {
    position: 'relative',
    height: '12px',
    display: 'flex',
    alignItems: 'center',
  },
  rangeBar: {
    width: '100%',
    height: '2px',
    backgroundColor: '#6B57FF',
    borderRadius: '9999px',
    position: 'relative',
  },
  circle: {
    position: 'absolute',
    width: '12px',
    height: '12px',
    backgroundColor: 'rgba(123, 97, 255, 0.6)',
    border: '1px solid #19191C',
    borderRadius: '50%',
    cursor: 'pointer',
    transform: 'translateY(-50%)',
    top: '50%',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: 'rgba(123, 97, 255, 0.8)',
      transform: 'translateY(-50%) scale(1.1)',
    },
  },
  circleStart: {
    left: '-6px',
  },
  circleEnd: {
    right: '-6px',
  },
  circleQuarter: {
    left: '25%',
    transform: 'translateX(-50%) translateY(-50%)',
    ':hover': {
      transform: 'translateX(-50%) translateY(-50%) scale(1.1)',
    },
  },
  circleHalf: {
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
    ':hover': {
      transform: 'translateX(-50%) translateY(-50%) scale(1.1)',
    },
  },
  circleThreeQuarter: {
    left: '75%',
    transform: 'translateX(-50%) translateY(-50%)',
    ':hover': {
      transform: 'translateX(-50%) translateY(-50%) scale(1.1)',
    },
  },
});

export function SalaryChart({ language, country, salaryData, onTooltipChange }: SalaryChartProps) {
  // Get dynamic data from the loaded salary data
  const levels = getExperienceLevels(salaryData).reverse(); // Reverse to show from highest to lowest experience
  const currentRanges = processDataForChart(salaryData, country, language);

  // Calculate chart bounds based on actual data
  const allSalaries = Object.values(currentRanges).flat();
  const maxSalary = allSalaries.length > 0 ? Math.max(...allSalaries) : 200;
  const chartMaxSalary = Math.ceil(maxSalary / 50) * 50; // Round up to nearest 50

  const handleCircleHover = (
    event: React.MouseEvent<HTMLDivElement>,
    level: string,
    range: [number, number]
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    
    onTooltipChange({
      country,
      language,
      experience: level,
      salaryRange: range,
      x: rect.left + rect.width / 2,
      y: rect.top
    });
  };

  const handleMouseLeave = () => {
    onTooltipChange(null);
  };

  return (
    <div {...stylex.props(styles.chartContainer)}>
      {/* Chart Grid */}
      <div {...stylex.props(styles.chartGrid)}>
        {/* Grid lines */}
        <div {...stylex.props(styles.gridLines)}>
          {/* Vertical lines */}
          {Array.from({ length: 5 }, (_, i) => (
            <div 
              key={`v-${i}`} 
              {...stylex.props(styles.gridLine, styles.verticalLine)}
              style={{ left: `${(i / 4) * 100}%` }} 
            />
          ))}
          {/* Horizontal lines - dynamic based on experience levels */}
          {Array.from({ length: levels.length + 1 }, (_, i) => (
            <div 
              key={`h-${i}`} 
              {...stylex.props(styles.gridLine, styles.horizontalLine)}
              style={{ top: `${(i / levels.length) * 100}%` }} 
            />
          ))}
        </div>

        {/* X-axis labels */}
        <div {...stylex.props(styles.xAxisLabels)}>
          {(() => {
            const steps = 4;
            const stepValue = chartMaxSalary / steps;
            return Array.from({ length: steps + 1 }, (_, i) => {
              const value = i * stepValue;
              const position = (i / steps) * 100;
              return {
                value: `$${value}K`,
                position
              };
            });
          })().map((label, index) => (
            <span 
              key={index}
              {...stylex.props(styles.xAxisLabel)}
              style={{ left: `${label.position}%` }}
            >
              {label.value}
            </span>
          ))}
        </div>

        {/* Salary range bars - positioned to match the Y-axis labels */}
        {levels.map((level, index) => {
          const range = currentRanges[level];
          
          // Skip if no data available for this level
          if (!range) {
            return null;
          }
          
          const leftPercent = (range[0] / chartMaxSalary) * 100;
          const widthPercent = ((range[1] - range[0]) / chartMaxSalary) * 100;
          const topPercent = (index / (levels.length - 1)) * 100; // Position from top to bottom

          return (
            <div 
              key={level} 
              {...stylex.props(styles.rangeContainer)}
              style={{ 
                top: `${topPercent}%`, 
                left: `${leftPercent}%`, 
                width: `${widthPercent}%`,
                height: `${100 / levels.length}%`
              }}
            >
              {/* Range line */}
              <div {...stylex.props(styles.rangeLine)}>
                <div {...stylex.props(styles.rangeBar)}>
                  {/* Start circle */}
                  <div 
                    {...stylex.props(styles.circle, styles.circleStart)}
                    onMouseEnter={(e) => handleCircleHover(e, level, range)}
                    onMouseLeave={handleMouseLeave}
                  />
                  {/* End circle */}
                  <div 
                    {...stylex.props(styles.circle, styles.circleEnd)}
                    onMouseEnter={(e) => handleCircleHover(e, level, range)}
                    onMouseLeave={handleMouseLeave}
                  />
                  {/* Middle circles */}
                  <div 
                    {...stylex.props(styles.circle, styles.circleQuarter)}
                    onMouseEnter={(e) => handleCircleHover(e, level, range)}
                    onMouseLeave={handleMouseLeave}
                  />
                  <div 
                    {...stylex.props(styles.circle, styles.circleHalf)}
                    onMouseEnter={(e) => handleCircleHover(e, level, range)}
                    onMouseLeave={handleMouseLeave}
                  />
                  <div 
                    {...stylex.props(styles.circle, styles.circleThreeQuarter)}
                    onMouseEnter={(e) => handleCircleHover(e, level, range)}
                    onMouseLeave={handleMouseLeave}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}