import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import InputText from "./InputText";

describe("InputText", () => {
  it("renders with placeholder", () => {
    render(<InputText value="" onChange={() => {}} placeholder="Type here" />);
    expect(screen.getByPlaceholderText("Type here")).toBeInTheDocument();
  });

  it("calls onChange when typing", () => {
    const handleChange = vi.fn();
    render(
      <InputText value="" onChange={handleChange} placeholder="Type here" />
    );
    const input = screen.getByPlaceholderText("Type here");
    fireEvent.change(input, { target: { value: "abc" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("shows error message", () => {
    render(<InputText value="" onChange={() => {}} error="Error!" />);
    expect(screen.getByText("Error!")).toBeInTheDocument();
  });
});
