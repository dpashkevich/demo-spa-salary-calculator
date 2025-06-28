import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor, act } from '@testing-library/react'
import App from '../App'

// Mock the dataService module
vi.mock('../services/dataService', () => ({
  loadSalaryData: vi.fn(() =>
    Promise.resolve({
      'United States': {
        'JavaScript / TypeScript': {
          entries: [
            { value: 50, category: '<1 year', metadata: { Country: 'United States', Language: 'JavaScript / TypeScript', Experience: '<1 year', Salary: '$50K / year' } }
          ]
        }
      }
    })
  ),
  getAvailableCountries: vi.fn(() => ['United States']),
  getAvailableLanguages: vi.fn(() => ['JavaScript / TypeScript']),
  getExperienceLevels: vi.fn(() => ['<1 year']),
  processDataForChart: vi.fn(() => ({ '<1 year': [40, 60] }))
}))

describe('App component', () => {
  it('renders the main heading', async () => {
    await act(async () => {
      render(<App />)
    })

    // Use getByRole for heading elements
    expect(screen.getByRole('heading', { name: /IT Salary Calculator/i })).toBeInTheDocument()
  })

  it('displays the step 1 section', async () => {
    await act(async () => {
      render(<App />)
    })

    // Look for the step number "1" as a heading
    expect(screen.getByRole('heading', { name: '1' })).toBeInTheDocument()
    expect(screen.getByText('Enter your programming language and country.')).toBeInTheDocument()
  })

  it('displays programming language selector', async () => {
    await act(async () => {
      render(<App />)
    })

    await waitFor(() => {
      expect(screen.getByText('Programming language')).toBeInTheDocument()
    })
  })

  it('displays country selector', async () => {
    await act(async () => {
      render(<App />)
    })

    await waitFor(() => {
      expect(screen.getByText('Country')).toBeInTheDocument()
    })
  })

  it('displays the description text', async () => {
    await act(async () => {
      render(<App />)
    })

    expect(screen.getByText(/Each year, our extensive surveys reach out to over 30,000 developers/)).toBeInTheDocument()
  })
})