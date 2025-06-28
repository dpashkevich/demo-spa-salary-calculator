import React from 'react';
import * as stylex from '@stylexjs/stylex';

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
    color: 'rgba(255, 255, 255, 0.7)',
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

export function SalaryChart({ language, country, onTooltipChange }: SalaryChartProps) {
  const levels = ['16+ years', '11-16 years', '6-10 years', '3-5 years', '1-2 years', '<1 year'];
  const salaryRanges = {
    'JavaScript': { 
      '<1 year': [25, 45] as [number, number], 
      '1-2 years': [35, 60] as [number, number], 
      '3-5 years': [50, 80] as [number, number], 
      '6-10 years': [65, 95] as [number, number], 
      '11-16 years': [80, 120] as [number, number], 
      '16+ years': [100, 150] as [number, number] 
    },
    'Python': { 
      '<1 year': [30, 50] as [number, number], 
      '1-2 years': [40, 65] as [number, number], 
      '3-5 years': [55, 85] as [number, number], 
      '6-10 years': [70, 100] as [number, number], 
      '11-16 years': [85, 125] as [number, number], 
      '16+ years': [105, 155] as [number, number] 
    },
    'Java': { 
      '<1 year': [35, 55] as [number, number], 
      '1-2 years': [45, 70] as [number, number], 
      '3-5 years': [60, 90] as [number, number], 
      '6-10 years': [75, 105] as [number, number], 
      '11-16 years': [90, 130] as [number, number], 
      '16+ years': [110, 160] as [number, number] 
    },
    'TypeScript': { 
      '<1 year': [28, 48] as [number, number], 
      '1-2 years': [38, 63] as [number, number], 
      '3-5 years': [53, 83] as [number, number], 
      '6-10 years': [68, 98] as [number, number], 
      '11-16 years': [83, 123] as [number, number], 
      '16+ years': [103, 153] as [number, number] 
    },
    'React': { 
      '<1 year': [30, 50] as [number, number], 
      '1-2 years': [40, 65] as [number, number], 
      '3-5 years': [55, 85] as [number, number], 
      '6-10 years': [70, 100] as [number, number], 
      '11-16 years': [85, 125] as [number, number], 
      '16+ years': [105, 155] as [number, number] 
    },
    'Kotlin': { 
      '<1 year': [28, 47] as [number, number], 
      '1-2 years': [37, 62] as [number, number], 
      '3-5 years': [52, 82] as [number, number], 
      '6-10 years': [67, 97] as [number, number], 
      '11-16 years': [82, 122] as [number, number], 
      '16+ years': [102, 152] as [number, number] 
    }
  };

  const currentRanges = salaryRanges[language as keyof typeof salaryRanges] || salaryRanges.JavaScript;

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
          {[0, 107, 214, 321, 428].map((x, index) => (
            <div 
              key={`v-${index}`} 
              {...stylex.props(styles.gridLine, styles.verticalLine)}
              style={{ left: `${(x/428)*100}%` }} 
            />
          ))}
          {/* Horizontal lines - adjusted for 6 levels */}
          {[0, 64, 128, 192, 256, 320].map((y, index) => (
            <div 
              key={`h-${index}`} 
              {...stylex.props(styles.gridLine, styles.horizontalLine)}
              style={{ top: `${(y/320)*100}%` }} 
            />
          ))}
        </div>

        {/* X-axis labels */}
        <div {...stylex.props(styles.xAxisLabels)}>
          {[
            { value: '$0', position: 0 },
            { value: '$50K', position: (107/428)*100 },
            { value: '$100K', position: (214/428)*100 },
            { value: '$150K', position: (321/428)*100 },
            { value: '$200K', position: 100 }
          ].map((label, index) => (
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
          const range = currentRanges[level as keyof typeof currentRanges];
          const leftPercent = (range[0] / 200) * 100;
          const widthPercent = ((range[1] - range[0]) / 200) * 100;
          const topPercent = (index / 5) * 100; // Position from top to bottom

          return (
            <div 
              key={level} 
              {...stylex.props(styles.rangeContainer)}
              style={{ 
                top: `${topPercent}%`, 
                left: `${leftPercent}%`, 
                width: `${widthPercent}%`,
                height: '10%'
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