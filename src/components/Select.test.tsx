import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Select from "./Select";

describe("Select", () => {
  it("renders with placeholder and options", () => {
    render(
      <Select
        value=""
        onChange={() => {}}
        options={[
          { value: "", label: "Select country" },
          { value: "australia", label: "Australia" },
        ]}
        placeholder="Select country"
      />
    );
    expect(screen.getAllByText("Select country").length).toBeGreaterThan(1);
    expect(screen.getByText("Australia")).toBeInTheDocument();
  });

  it("calls onChange when selecting", () => {
    const handleChange = vi.fn();
    render(
      <Select
        value=""
        onChange={handleChange}
        options={[
          { value: "", label: "Select country" },
          { value: "australia", label: "Australia" },
        ]}
        placeholder="Select country"
      />
    );
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "australia" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("shows error message", () => {
    render(<Select value="" onChange={() => {}} options={[]} error="Error!" />);
    expect(screen.getByText("Error!")).toBeInTheDocument();
  });
});
