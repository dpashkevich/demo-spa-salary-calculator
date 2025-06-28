import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App component', () => {
  it('renders the main heading', () => {
    render(<App />)
    // Use getByRole for heading elements
    expect(screen.getByRole('heading', { name: /IT Salary Calculator/i })).toBeInTheDocument()
  })

  it('displays the step 1 section', () => {
    render(<App />)
    // Look for the step number "1" as a heading
    expect(screen.getByRole('heading', { name: '1' })).toBeInTheDocument()
    expect(screen.getByText('Enter your programming language and country.')).toBeInTheDocument()
  })

  it('displays programming language selector', () => {
    render(<App />)
    expect(screen.getByText('Programming language')).toBeInTheDocument()
    // Look for combobox without specific name
    const comboboxes = screen.getAllByRole('combobox')
    expect(comboboxes).toHaveLength(2) // Should have 2 comboboxes (language and country)
  })

  it('displays country selector', () => {
    render(<App />)
    expect(screen.getByText('Country')).toBeInTheDocument()
    // Look for combobox without specific name
    const comboboxes = screen.getAllByRole('combobox')
    expect(comboboxes).toHaveLength(2) // Should have 2 comboboxes (language and country)
  })

  it('displays the description text', () => {
    render(<App />)
    expect(screen.getByText(/Each year, our extensive surveys reach out to over 30,000 developers/)).toBeInTheDocument()
  })
})