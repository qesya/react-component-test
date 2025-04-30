import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Moodlet } from "../Moodlet";

describe("Moodlet Component", () => {

  it("renders with the correct variant and type when props are provided", () => {
    render(<Moodlet content="Test Content" variant="blue" type="interactive" />);

    const moodlet = screen.getByText('Test Content', { exact: false });

    expect(moodlet.parentElement).toHaveClass('bg-sky-500');
    expect(moodlet.parentElement).toHaveClass('text-white');
  });

  it("renders iconLeft and iconRight correctly", () => {
    const iconLeft = <span data-testid="left-icon">Left Icon</span>;
    const iconRight = <span data-testid="right-icon">Right Icon</span>;

    render(<Moodlet content="Test Content" iconLeft={iconLeft} iconRight={iconRight} />);

    const leftIcon = screen.getByTestId('left-icon');
    expect(leftIcon).toBeInTheDocument();

    const rightIcon = screen.getByTestId('right-icon');
    expect(rightIcon).toBeInTheDocument();
  });

  it("does not call onClick when clicked if type is readonly", () => {
    const onClick = vi.fn();

    render(
      <Moodlet content="Test Content" type="readonly" onClick={onClick} />
    );

    fireEvent.click(screen.getByText('Test Content'));

    expect(onClick).not.toHaveBeenCalled();
  });

  it("calls onClick when clicked if type is interactive", () => {
    const onClick = vi.fn();

    render(
      <Moodlet content="Test Content" type="interactive" onClick={onClick} />
    );

    fireEvent.click(screen.getByText('Test Content'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders with ellipsis icon if ellipsis prop is provided", () => {
    render(
      <Moodlet content="Test Content" ellipsis={true} />
    );
  
    const ellipsisIcon = screen.getByTestId("ellipsis-icon");
    expect(ellipsisIcon).toBeInTheDocument();
  });

  it("renders content with the first letter if letter prop is true", () => {
    render(
      <Moodlet content="Test Content" letter={true} />
    );

    const letterContent = screen.getByText("T");
    expect(letterContent).toBeInTheDocument();
  });

  it("renders the full content if letter prop is false", () => {
    render(
      <Moodlet content="Test Content" letter={false} />
    );

    const fullContent = screen.getByText("Test Content");
    expect(fullContent).toBeInTheDocument();
  });

  it("does not render the content if content is not provided", () => {
    render(
      <Moodlet variant="primary" type="interactive" />
    );

    const content = screen.queryByText(/Test Content/i);
    expect(content).not.toBeInTheDocument();
  });

  it("applies the correct classes based on the variant", () => {
    render(
      <Moodlet content="Test Content" variant="primary" type="readonly" />
    );

    const moodlet = screen.getByText("Test Content");
    expect(moodlet.parentElement).toHaveClass("bg-violet-200");
    expect(moodlet.parentElement).toHaveClass("text-violet-600");
  });

  it("does not render icon if no iconLeft or iconRight is provided", () => {
    render(
      <Moodlet content="Test Content" />
    );

    const leftIcon = screen.queryByTestId("left-icon");
    const rightIcon = screen.queryByTestId("right-icon");

    expect(leftIcon).not.toBeInTheDocument();
    expect(rightIcon).not.toBeInTheDocument();
  });

  it("renders correct icon if iconLeft or iconRight is provided", () => {
    const iconLeft = <span data-testid="left-icon">Left Icon</span>;

    render(
      <Moodlet content="Test Content" iconLeft={iconLeft} />
    );

    const leftIcon = screen.getByTestId("left-icon");
    expect(leftIcon).toBeInTheDocument();
  });
});
