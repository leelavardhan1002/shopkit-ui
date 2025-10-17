import { fireEvent, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { renderWithTheme } from '../utils/testUtils/renderWithThemeAndProps';
import { ColorPickerMain } from './ColorPickerMain';
import { ColorPickerPropsProvider } from './contexts/ColorPickerProps.context';
import { ColorPickerRefRegistryProvider } from './contexts/ColorPickerRefRegistry.context';
import { ColorPickerStateProvider } from './contexts/ColorPickerState.context';
import { Color, ColorPickerProps } from './types';

const mockColors: Color[] = [
  { id: '1', label: 'Red', value: '#ff0000' },
  { id: '2', label: 'Blue', value: '#0000ff' },
  { id: '3', label: 'Green', value: '#00ff00' },
  { id: '4', label: 'Yellow', value: '#ffff00' },
  { id: '5', label: 'Purple', value: '#800080' },
];

const wrapper = (props: Partial<ColorPickerProps> = {}) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ColorPickerPropsProvider props={{ colors: mockColors, ...props }}>
      <ColorPickerStateProvider>
        <ColorPickerRefRegistryProvider>{children}</ColorPickerRefRegistryProvider>
      </ColorPickerStateProvider>
    </ColorPickerPropsProvider>
  );
  return Wrapper;
};

describe('ColorPickerMain', () => {
  it('renders all colors', () => {
    renderWithTheme(<ColorPickerMain colors={mockColors} />, { wrapper: wrapper() });
    expect(screen.getAllByRole('radio')).toHaveLength(mockColors.length);
  });

  it('renders with custom className', () => {
    renderWithTheme(<ColorPickerMain colors={mockColors} className="custom-class" />, {
      wrapper: wrapper({ className: 'custom-class' }),
    });
    expect(screen.getByRole('radiogroup')).toHaveClass('custom-class');
  });

  it('renders with custom aria-label', () => {
    renderWithTheme(<ColorPickerMain colors={mockColors} aria-label="Custom picker" />, {
      wrapper: wrapper(),
    });
    expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-label', 'Custom picker');
  });

  it('uses default aria-label', () => {
    renderWithTheme(<ColorPickerMain colors={mockColors} />, { wrapper: wrapper() });
    expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-label', 'Color picker');
  });

  it('sets aria-disabled when disabled', () => {
    renderWithTheme(<ColorPickerMain colors={mockColors} disabled />, {
      wrapper: wrapper({ disabled: true }),
    });
    expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders with showLabels prop', () => {
    renderWithTheme(<ColorPickerMain colors={mockColors} />, {
      wrapper: wrapper({ showLabels: false }),
    });
    expect(screen.getAllByRole('radio')).toHaveLength(mockColors.length);
  });

  it('does not show labels when showLabels is false', () => {
    renderWithTheme(<ColorPickerMain colors={mockColors} />, { wrapper: wrapper() });
    expect(screen.getAllByRole('radio')).toHaveLength(mockColors.length);
  });

  it('limits visible colors with maxVisible', () => {
    renderWithTheme(<ColorPickerMain colors={mockColors} maxVisible={3} />, {
      wrapper: wrapper({ maxVisible: 3 }),
    });
    expect(screen.getAllByRole('radio')).toHaveLength(3);
    expect(screen.getByText('+2 more')).toBeInTheDocument();
  });

  it('expands colors when clicking expand label', async () => {
    renderWithTheme(<ColorPickerMain colors={mockColors} maxVisible={3} />, {
      wrapper: wrapper({ maxVisible: 3 }),
    });

    const expandLabel = screen.getByText('+2 more');
    await userEvent.click(expandLabel);

    expect(screen.getAllByRole('radio')).toHaveLength(mockColors.length);
  });

  it('expands colors when pressing Enter on expand label', () => {
    renderWithTheme(<ColorPickerMain colors={mockColors} maxVisible={3} />, {
      wrapper: wrapper({ maxVisible: 3 }),
    });

    const expandLabel = screen.getByText('+2 more');
    fireEvent.keyDown(expandLabel, { key: 'Enter' });

    expect(screen.getAllByRole('radio')).toHaveLength(mockColors.length);
  });

  it('does not expand when pressing other keys on expand label', () => {
    renderWithTheme(<ColorPickerMain colors={mockColors} maxVisible={3} />, {
      wrapper: wrapper({ maxVisible: 3 }),
    });

    const expandLabel = screen.getByText('+2 more');
    fireEvent.keyDown(expandLabel, { key: 'Space' });

    expect(screen.getAllByRole('radio')).toHaveLength(3);
  });

  it('uses custom maxVisibleLabel', () => {
    renderWithTheme(
      <ColorPickerMain colors={mockColors} maxVisible={3} maxVisibleLabel="Show all" />,
      { wrapper: wrapper({ maxVisible: 3, maxVisibleLabel: 'Show all' }) }
    );
    expect(screen.getByText('Show all')).toBeInTheDocument();
  });

  it('does not show expand label when maxVisible is 0', () => {
    renderWithTheme(<ColorPickerMain colors={mockColors} maxVisible={0} />, {
      wrapper: wrapper({ maxVisible: 0 }),
    });
    expect(screen.getAllByRole('radio')).toHaveLength(mockColors.length);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('does not show expand label when maxVisible is greater than colors length', () => {
    renderWithTheme(<ColorPickerMain colors={mockColors} maxVisible={10} />, {
      wrapper: wrapper({ maxVisible: 10 }),
    });
    expect(screen.getAllByRole('radio')).toHaveLength(mockColors.length);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('does not show expand label when already expanded', async () => {
    renderWithTheme(<ColorPickerMain colors={mockColors} maxVisible={3} />, {
      wrapper: wrapper({ maxVisible: 3 }),
    });

    const expandLabel = screen.getByText('+2 more');
    await userEvent.click(expandLabel);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
