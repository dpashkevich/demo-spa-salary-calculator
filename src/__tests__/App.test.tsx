import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App component', () => {
  it('renders the main heading', () => {
    render(<App />)
    expect(screen.getByText('Vite + React')).toBeInTheDocument()
  })

  it('displays the logos', () => {
    render(<App />)
    const viteLogoElement = screen.getByAltText('Vite logo')
    const reactLogoElement = screen.getByAltText('React logo')
    
    expect(viteLogoElement).toBeInTheDocument()
    expect(reactLogoElement).toBeInTheDocument()
  })

  it('displays the counter button', () => {
    render(<App />)
    const buttonElement = screen.getByRole('button')
    expect(buttonElement).toHaveTextContent('count is 0')
  })
})