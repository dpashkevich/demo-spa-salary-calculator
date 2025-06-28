// React import not needed with new JSX transform
import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  container: {
    maxWidth: '56rem',
    marginBottom: '3rem',
  },
  title: {
    color: 'white',
    fontSize: '3.75rem',
    lineHeight: 1.2,
    marginBottom: '2rem',
    '@media (min-width: 1024px)': {
      fontSize: '4.5rem',
    },
  },
  description: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '1.125rem',
    marginBottom: '2rem',
    maxWidth: '42rem',
    lineHeight: 1.5,
  },
  underline: {
    textDecoration: 'underline',
  },
  subtitle: {
    color: 'white',
    fontSize: '1.5rem',
    marginBottom: '4rem',
    maxWidth: '42rem',
    lineHeight: 1.5,
  },
});

export function Header() {
  return (
    <div {...stylex.props(styles.container)}>
      <h1 {...stylex.props(styles.title)}>
        IT Salary<br />Calculator
      </h1>
      
      <p {...stylex.props(styles.description)}>
        Each year, our extensive surveys reach out to over 30,000 developers across over 180 countries, representing a diverse range of specialties. With data collected over multiple years, we are able to present a comprehensive analysis of tech trends using the methodology described <span {...stylex.props(styles.underline)}>here</span>.
      </p>
      
      <h2 {...stylex.props(styles.subtitle)}>
        Use our calculator to estimate your income potential based on software developer skills, programming language, location, and experience.
      </h2>
    </div>
  );
}