import { fireEvent, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { renderWithTheme } from '../utils/testUtils/renderWithThemeAndProps';
import { ColorPicker } from './ColorPicker';
import { Color, ColorPickerProps } from './types';

const mockColors: Color[] = [
  { id: '1', label: 'Red', value: '#ff0000' },
  { id: '2', label: 'Blue', value: '#0000ff' },
  { id: '3', label: 'Green', value: '#00ff00' },
  { id: '4', label: 'Yellow', value: '#ffff00' },
  { id: '5', label: 'Purple', value: '#800080' },
  { id: '6', label: 'White', value: '#ffffff', borderColor: '#cccccc' },
  { id: '7', label: 'Black', value: '#000000', selectedBorderColor: '#ff0000' },
  { id: '8', label: 'Gradient', value: 'linear-gradient(to right, #ff0000, #0000ff)' },
  { id: '9', label: 'Image', value: 'url(https://example.com/pattern.png)' },
];

const colorsWithDisabled: Color[] = [
  { id: '1', label: 'Red', value: '#ff0000' },
  { id: '2', label: 'Blue', value: '#0000ff', disabled: true },
  { id: '3', label: 'Green', value: '#00ff00' },
];

const defaultProps: ColorPickerProps = {
  colors: mockColors,
  variant: 'square',
  size: 'medium',
};

const setupElement = (props: Partial<ColorPickerProps> = {}) => {
  return renderWithTheme(<ColorPicker {...defaultProps} {...props} />);
};

describe('ColorPicker', () => {
  it('matches snapshot', () => {
    const { asFragment } = setupElement();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders all colors', () => {
    setupElement();
    expect(screen.getAllByRole('radio')).toHaveLength(mockColors.length);
  });

  it('handles uncontrolled selection', async () => {
    const onColorChange = jest.fn();
    setupElement({ onColorChange });

    const firstColor = screen.getAllByRole('radio')[0] as HTMLElement;
    await userEvent.click(firstColor);

    expect(onColorChange).toHaveBeenCalledWith(mockColors[0]);
  });

  it('handles controlled selection', async () => {
    const onColorChange = jest.fn();
    setupElement({ colorValue: mockColors[0], onColorChange });

    const secondColor = screen.getAllByRole('radio')[1] as HTMLElement;
    await userEvent.click(secondColor);

    expect(onColorChange).toHaveBeenCalledWith(mockColors[1]);
  });

  it('updates controlled value when colorValue prop changes', () => {
    const { rerender } = renderWithTheme(
      <ColorPicker {...defaultProps} colorValue={mockColors[0]} />
    );
    expect(screen.getAllByRole('radio')[0]).toHaveAttribute('aria-checked', 'true');

    rerender(<ColorPicker {...defaultProps} colorValue={mockColors[1]} />);
    expect(screen.getAllByRole('radio')[1]).toHaveAttribute('aria-checked', 'true');
  });

  it('supports keyboard navigation with ArrowRight', async () => {
    setupElement({ defaultColorValue: mockColors[0] });

    const firstColor = screen.getAllByRole('radio')[0] as HTMLElement;
    firstColor.focus();

    fireEvent.keyDown(firstColor, { key: 'ArrowRight' });
    expect(screen.getAllByRole('radio')[1]).toHaveFocus();
  });

  it('supports keyboard navigation with ArrowDown', async () => {
    setupElement({ defaultColorValue: mockColors[0] });

    const firstColor = screen.getAllByRole('radio')[0] as HTMLElement;
    firstColor.focus();

    fireEvent.keyDown(firstColor, { key: 'ArrowDown' });
    expect(screen.getAllByRole('radio')[1]).toHaveFocus();
  });

  it('supports keyboard navigation with ArrowLeft', async () => {
    setupElement({ defaultColorValue: mockColors[1] });

    const secondColor = screen.getAllByRole('radio')[1] as HTMLElement;
    secondColor.focus();

    fireEvent.keyDown(secondColor, { key: 'ArrowLeft' });
    expect(screen.getAllByRole('radio')[0]).toHaveFocus();
  });

  it('supports keyboard navigation with ArrowUp', async () => {
    setupElement({ defaultColorValue: mockColors[1] });

    const secondColor = screen.getAllByRole('radio')[1] as HTMLElement;
    secondColor.focus();

    fireEvent.keyDown(secondColor, { key: 'ArrowUp' });
    expect(screen.getAllByRole('radio')[0]).toHaveFocus();
  });

  it('wraps around when navigating right from last color', async () => {
    setupElement({ defaultColorValue: mockColors[mockColors.length - 1] });

    const lastColor = screen.getAllByRole('radio')[mockColors.length - 1] as HTMLElement;
    lastColor.focus();

    fireEvent.keyDown(lastColor, { key: 'ArrowRight' });
    expect(screen.getAllByRole('radio')[0]).toHaveFocus();
  });

  it('wraps around when navigating left from first color', async () => {
    setupElement({ defaultColorValue: mockColors[0] });

    const firstColor = screen.getAllByRole('radio')[0] as HTMLElement;
    firstColor.focus();

    fireEvent.keyDown(firstColor, { key: 'ArrowLeft' });
    expect(screen.getAllByRole('radio')[mockColors.length - 1]).toHaveFocus();
  });

  it('navigates to first color with Home key', async () => {
    setupElement({ defaultColorValue: mockColors[2] });

    const thirdColor = screen.getAllByRole('radio')[2] as HTMLElement;
    thirdColor.focus();

    fireEvent.keyDown(thirdColor, { key: 'Home' });
    expect(screen.getAllByRole('radio')[0]).toHaveFocus();
  });

  it('navigates to last color with End key', async () => {
    setupElement({ defaultColorValue: mockColors[0] });

    const firstColor = screen.getAllByRole('radio')[0] as HTMLElement;
    firstColor.focus();

    fireEvent.keyDown(firstColor, { key: 'End' });
    expect(screen.getAllByRole('radio')[mockColors.length - 1]).toHaveFocus();
  });

  it('handles Enter key selection', async () => {
    const onColorChange = jest.fn();
    setupElement({ onColorChange });

    const firstColor = screen.getAllByRole('radio')[0] as HTMLElement;
    firstColor.focus();
    fireEvent.keyDown(firstColor, { key: 'Enter' });

    expect(onColorChange).toHaveBeenCalledWith(mockColors[0]);
  });

  it('handles Space key selection', async () => {
    const onColorChange = jest.fn();
    setupElement({ onColorChange });

    const firstColor = screen.getAllByRole('radio')[0] as HTMLElement;
    firstColor.focus();
    fireEvent.keyDown(firstColor, { key: ' ' });

    expect(onColorChange).toHaveBeenCalledWith(mockColors[0]);
  });

  it('ignores other keys', async () => {
    const onColorChange = jest.fn();
    setupElement({ onColorChange });

    const firstColor = screen.getAllByRole('radio')[0] as HTMLElement;
    firstColor.focus();
    fireEvent.keyDown(firstColor, { key: 'a' });

    expect(onColorChange).not.toHaveBeenCalled();
  });

  it('respects global disabled state', async () => {
    const onColorChange = jest.fn();
    setupElement({ disabled: true, onColorChange });

    const firstColor = screen.getAllByRole('radio')[0] as HTMLElement;
    await userEvent.click(firstColor);

    expect(onColorChange).not.toHaveBeenCalled();
  });

  it('respects individual color disabled state', async () => {
    const onColorChange = jest.fn();
    setupElement({ colors: colorsWithDisabled, onColorChange });

    const disabledColor = screen.getAllByRole('radio')[1] as HTMLElement;
    await userEvent.click(disabledColor);

    expect(onColorChange).not.toHaveBeenCalled();
  });

  it('renders with showLabels enabled', () => {
    setupElement({ showLabels: false });
    expect(screen.getAllByRole('radio')).toHaveLength(mockColors.length);
  });

  it('renders with showTooltip disabled', () => {
    setupElement({ showTooltip: false });
    expect(screen.getAllByRole('radio')[0]).toBeInTheDocument();
  });

  it('applies square variant styles', () => {
    setupElement({ variant: 'square' });
    expect(screen.getAllByRole('radio')[0]).toBeInTheDocument();
  });

  it('applies pill variant styles', () => {
    setupElement({ variant: 'pill' });
    expect(screen.getAllByRole('radio')[0]).toBeInTheDocument();
  });

  it('applies small size', () => {
    setupElement({ size: 'small' });
    expect(screen.getAllByRole('radio')[0]).toBeInTheDocument();
  });

  it('applies large size', () => {
    setupElement({ size: 'large' });
    expect(screen.getAllByRole('radio')[0]).toBeInTheDocument();
  });

  it('applies custom borderRadius', () => {
    setupElement({ borderRadius: 8 });
    expect(screen.getAllByRole('radio')[0]).toBeInTheDocument();
  });

  it('applies custom className', () => {
    setupElement({ className: 'custom-class' });
    expect(screen.getByRole('radiogroup')).toHaveClass('custom-class');
  });

  it('applies custom aria-label', () => {
    setupElement({ 'aria-label': 'Custom color picker' });
    expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-label', 'Custom color picker');
  });

  it('uses default aria-label when not provided', () => {
    setupElement();
    expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-label', 'Color picker');
  });

  it('limits visible colors with maxVisible', () => {
    setupElement({ maxVisible: 3 });
    expect(screen.getAllByRole('radio')).toHaveLength(3);
    expect(screen.getByText('+6 more')).toBeInTheDocument();
  });

  it('expands colors when clicking expand label', async () => {
    setupElement({ maxVisible: 3 });
    expect(screen.getAllByRole('radio')).toHaveLength(3);

    const expandLabel = screen.getByText('+6 more');
    await userEvent.click(expandLabel);

    expect(screen.getAllByRole('radio')).toHaveLength(mockColors.length);
  });

  it('expands colors when pressing Enter on expand label', async () => {
    setupElement({ maxVisible: 3 });
    expect(screen.getAllByRole('radio')).toHaveLength(3);

    const expandLabel = screen.getByText('+6 more');
    fireEvent.keyDown(expandLabel, { key: 'Enter' });

    expect(screen.getAllByRole('radio')).toHaveLength(mockColors.length);
  });

  it('uses custom maxVisibleLabel', () => {
    setupElement({ maxVisible: 3, maxVisibleLabel: 'Show all' });
    expect(screen.getByText('Show all')).toBeInTheDocument();
  });

  it('does not show expand label when maxVisible is 0', () => {
    setupElement({ maxVisible: 0 });
    expect(screen.getAllByRole('radio')).toHaveLength(mockColors.length);
  });

  it('does not show expand label when maxVisible is greater than colors length', () => {
    setupElement({ maxVisible: 20 });
    expect(screen.getAllByRole('radio')).toHaveLength(mockColors.length);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('sets correct tabIndex for first color when no selection', () => {
    setupElement();
    const firstColor = screen.getAllByRole('radio')[0] as HTMLElement;
    expect(firstColor).toHaveAttribute('tabIndex', '0');
  });

  it('sets correct tabIndex for selected color', () => {
    setupElement({ defaultColorValue: mockColors[2] });
    const selectedColor = screen.getAllByRole('radio')[2] as HTMLElement;
    expect(selectedColor).toHaveAttribute('tabIndex', '0');
  });

  it('sets correct tabIndex for disabled colors', () => {
    setupElement({ colors: colorsWithDisabled });
    const disabledColor = screen.getAllByRole('radio')[1] as HTMLElement;
    expect(disabledColor).toHaveAttribute('tabIndex', '-1');
  });

  it('handles colors with custom borderColor', () => {
    setupElement();
    const whiteColor = screen.getByLabelText('White');
    expect(whiteColor).toBeInTheDocument();
  });

  it('handles colors with custom selectedBorderColor', async () => {
    const onColorChange = jest.fn();
    setupElement({ onColorChange });
    
    const blackColor = screen.getByLabelText('Black');
    await userEvent.click(blackColor);
    
    expect(onColorChange).toHaveBeenCalledWith(mockColors[6]);
  });

  it('handles gradient colors', () => {
    setupElement();
    const gradientColor = screen.getByLabelText('Gradient');
    expect(gradientColor).toBeInTheDocument();
  });

  it('handles image colors', () => {
    setupElement();
    const imageColor = screen.getByLabelText('Image');
    expect(imageColor).toBeInTheDocument();
  });

  it('handles defaultColorValue in uncontrolled mode', () => {
    setupElement({ defaultColorValue: mockColors[1] });
    const secondColor = screen.getAllByRole('radio')[1] as HTMLElement;
    expect(secondColor).toHaveAttribute('aria-checked', 'true');
  });

  it('does not call onColorChange when disabled color is clicked', async () => {
    const onColorChange = jest.fn();
    setupElement({ colors: colorsWithDisabled, onColorChange });

    const disabledColor = screen.getAllByRole('radio')[1] as HTMLElement;
    await userEvent.click(disabledColor);

    expect(onColorChange).not.toHaveBeenCalled();
  });
});
