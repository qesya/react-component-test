import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dropdown } from '../Dropdown';

// Mock the Moodlet component
vi.mock('../Moodlet', () => ({
  Moodlet: () => <div data-testid="moodlet" />,
}));

const options = [
  { id: '1', label: 'Option 1' },
  { id: '2', label: 'Option 2' },
  { id: '3', label: 'Option 3', disabled: true },
];

describe('Dropdown', () => {
  it('displays placeholder when no option is selected', () => {
    render(<Dropdown options={options} onSelect={vi.fn()} />);
    expect(screen.getByText('Text options')).toBeInTheDocument();
  });

  it('displays the selected option label', () => {
    render(
      <Dropdown
        options={options}
        selectedId="2"
        onSelect={vi.fn()}
        placeholder="Choose one"
      />
    );
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('shows the list of options when clicked', () => {
    render(<Dropdown options={options} onSelect={vi.fn()} />);
    fireEvent.click(screen.getByText('Text options'));
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('calls onSelect and closes dropdown when an option is clicked', () => {
    const onSelect = vi.fn();
    render(<Dropdown options={options} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Text options'));
    fireEvent.click(screen.getByText('Option 1'));
    expect(onSelect).toHaveBeenCalledWith('1');
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  it('does not call onSelect when a disabled option is clicked', () => {
    const onSelect = vi.fn();
    render(<Dropdown options={options} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Text options'));
    fireEvent.click(screen.getByText('Option 3'));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('closes dropdown when clicking outside', () => {
    render(
      <div>
        <Dropdown options={options} onSelect={vi.fn()} />
        <button data-testid="outside-button">Outside</button>
      </div>
    );

    fireEvent.click(screen.getByText('Text options'));
    expect(screen.getByText('Option 1')).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByTestId('outside-button'));
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });
});
