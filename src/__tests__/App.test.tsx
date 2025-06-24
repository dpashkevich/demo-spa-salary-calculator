import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
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

  it('increments counter on button click', () => {
    render(<App />)
    const buttonElement = screen.getByRole('button')
    
    // Verify initial count
    expect(buttonElement).toHaveTextContent('count is 0')
    
    // Click the button
    fireEvent.click(buttonElement)
    
    // Verify count has incremented
    expect(buttonElement).toHaveTextContent('count is 1')
  })
})