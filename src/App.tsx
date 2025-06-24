import { useState } from 'react'
import * as stylex from '@stylexjs/stylex'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

// Keyframes for logo spin animation
const logoSpin = stylex.keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' }
})

// StyleX styles
const styles = stylex.create({
  root: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '2rem',
    textAlign: 'center',
  },
  logo: {
    height: '6em',
    padding: '1.5em',
    willChange: 'filter',
    transition: 'filter 300ms',
    ':hover': {
      filter: 'drop-shadow(0 0 2em #646cffaa)',
    }
  },
  reactLogo: {
    ':hover': {
      filter: 'drop-shadow(0 0 2em #61dafbaa)',
    }
  },
  animatedLogo: {
    animation: `${logoSpin} infinite 20s linear`,
  },
  card: {
    padding: '2em',
  },
  readTheDocs: {
    color: '#888',
  }
})

// Media query styles
const mediaStyles = stylex.create({
  animatedLogo: {
    '@media (prefers-reduced-motion: no-preference)': {
      animation: `${logoSpin} infinite 20s linear`,
    }
  }
})

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div {...stylex.props(styles.root)}>
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} {...stylex.props(styles.logo)} alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img 
              src={reactLogo} 
              {...stylex.props(
                styles.logo, 
                styles.reactLogo,
                mediaStyles.animatedLogo
              )} 
              alt="React logo" 
            />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div {...stylex.props(styles.card)}>
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p {...stylex.props(styles.readTheDocs)}>
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </>
  )
}

export default App