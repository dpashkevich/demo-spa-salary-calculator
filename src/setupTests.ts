import '@testing-library/jest-dom'

// Mock ResizeObserver for tests (for recharts/ResponsiveContainer)
if (typeof globalThis.ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}