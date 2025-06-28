// @vitest-environment jsdom
// @filename: SalaryCalculatorPage.test.tsx
import { render, screen, fireEvent, act } from "@testing-library/react";
import SalaryCalculatorPage from "../SalaryCalculatorPage";

const mockData = {
  germany: {
    python: {
      entries: [
        { value: 50, category: "Junior", metadata: {} },
        { value: 100, category: "Senior", metadata: {} },
      ],
    },
    javascript: {
      entries: [{ value: 60, category: "Junior", metadata: {} }],
    },
  },
  usa: {
    python: {
      entries: [{ value: 120, category: "Senior", metadata: {} }],
    },
  },
};

// @ts-expect-error: global.fetch is being mocked for testing purposes
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockData),
  })
);

describe("SalaryCalculatorPage", () => {
  it("renders the main title and subtitle", async () => {
    await act(async () => {
      render(<SalaryCalculatorPage />);
    });
    expect(
      screen.getByRole("heading", { name: /IT Salary Calculator/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/estimate your income potential/i)
    ).toBeInTheDocument();
  });

  it("renders programming language and country selects", async () => {
    await act(async () => {
      render(<SalaryCalculatorPage />);
    });
    expect(screen.getByLabelText(/Programming language/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
  });

  it("allows selecting a language", async () => {
    await act(async () => {
      render(<SalaryCalculatorPage />);
    });
    const select = screen.getByLabelText(/Programming language/i);
    await act(async () => {
      fireEvent.change(select, { target: { value: "python" } });
    });
    expect(select).toHaveValue("python");
  });

  it("allows selecting a country", async () => {
    await act(async () => {
      render(<SalaryCalculatorPage />);
    });
    const select = screen.getByLabelText(/Country/i);
    await act(async () => {
      fireEvent.change(select, { target: { value: "germany" } });
    });
    expect(select).toHaveValue("germany");
  });
});
