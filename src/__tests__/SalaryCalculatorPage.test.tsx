import { render, screen, fireEvent } from "@testing-library/react";
import SalaryCalculatorPage from "../SalaryCalculatorPage";

describe("SalaryCalculatorPage", () => {
  it("renders the main title and subtitle", () => {
    render(<SalaryCalculatorPage />);
    expect(
      screen.getByRole("heading", { name: /IT Salary Calculator/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/estimate your income potential/i)
    ).toBeInTheDocument();
  });

  it("renders programming language and country selects", () => {
    render(<SalaryCalculatorPage />);
    expect(screen.getByLabelText(/Programming language/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
  });

  it("allows selecting a language", () => {
    render(<SalaryCalculatorPage />);
    const select = screen.getByLabelText(/Programming language/i);
    fireEvent.change(select, { target: { value: "python" } });
    expect(select).toHaveValue("python");
  });

  it("allows selecting a country", () => {
    render(<SalaryCalculatorPage />);
    const select = screen.getByLabelText(/Country/i);
    fireEvent.change(select, { target: { value: "germany" } });
    expect(select).toHaveValue("germany");
  });
});
