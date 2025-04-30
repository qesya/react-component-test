import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FSC } from '../Fsc';

describe("FSC Component", () => {
  it("renders with default required states for all labels", () => {
    render(<FSC />);

    expect(screen.getByText("FUELLING")).toHaveClass("bg-violet-100");
    expect(screen.getByText("SERVICING")).toHaveClass("bg-violet-100");
    expect(screen.getByText("CLEANING")).toHaveClass("bg-violet-100");
  });

  it("changes state correctly on left-click (cycle through current and completed)", () => {
    render(<FSC />);

    const fuellingButton = screen.getByText("FUELLING");
    const servicingButton = screen.getByText("SERVICING");
    const cleaningButton = screen.getByText("CLEANING");

    fireEvent.click(fuellingButton);
    expect(fuellingButton).toHaveClass("bg-red-600");

    fireEvent.click(fuellingButton);
    expect(fuellingButton).toHaveClass("bg-green-600");

    fireEvent.click(fuellingButton);
    expect(fuellingButton).toHaveClass("bg-red-600");

    fireEvent.click(servicingButton);
    expect(servicingButton).toHaveClass("bg-red-600");
    fireEvent.click(cleaningButton);
    expect(cleaningButton).toHaveClass("bg-red-600");
  });

  it("cycles through states correctly on right-click (Required <-> Not Required)", () => {
    render(<FSC />);

    const fuellingButton = screen.getByText("FUELLING");

    fireEvent.contextMenu(fuellingButton);
    expect(fuellingButton).toHaveClass("bg-gray-100");

    fireEvent.contextMenu(fuellingButton);
    expect(fuellingButton).toHaveClass("bg-violet-100");
  });

  it("renders the first letter of the label if `letter` prop is passed", () => {
    render(<FSC letter />);

    expect(screen.getByText("F")).toBeInTheDocument();
    expect(screen.getByText("S")).toBeInTheDocument();
    expect(screen.getByText("C")).toBeInTheDocument();
  });
});
