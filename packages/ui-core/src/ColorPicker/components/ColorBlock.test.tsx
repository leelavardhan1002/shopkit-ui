import { fireEvent, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { renderWithTheme } from '../../utils/testUtils/renderWithThemeAndProps';
import { ColorPickerPropsProvider } from '../contexts/ColorPickerProps.context';
import { ColorPickerRefRegistryProvider } from '../contexts/ColorPickerRefRegistry.context';
import { ColorPickerStateProvider } from '../contexts/ColorPickerState.context';
import { Color, ColorPickerProps } from '../types';
import { ColorBlock } from './ColorBlock';

const mockColor: Color = { id: '1', label: 'Red', value: '#ff0000' };
const mockDisabledColor: Color = { id: '2', label: 'Blue', value: '#0000ff', disabled: true };
const mockLightColor: Color = { id: '3', label: 'White', value: '#ffffff', borderColor: '#cccccc' };
const mockColorWithSelectedBorder: Color = {
  id: '4',
  label: 'Black',
  value: '#000000',
  selectedBorderColor: '#ff0000',
};

const wrapper = (props: Partial<ColorPickerProps> = {}) => {
  const WrapperComponent = ({ children }: { children: React.ReactNode }) => (
    <ColorPickerPropsProvider props={{ colors: [mockColor], ...props }}>
      <ColorPickerStateProvider>
        <ColorPickerRefRegistryProvider>{children}</ColorPickerRefRegistryProvider>
      </ColorPickerStateProvider>
    </ColorPickerPropsProvider>
  );
  return WrapperComponent;
};

describe('ColorBlock', () => {
  it('renders color block', () => {
    renderWithTheme(<ColorBlock color={mockColor} index={0} />, { wrapper: wrapper() });
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('renders without tooltip', () => {
    renderWithTheme(<ColorBlock color={mockColor} index={0} />, {
      wrapper: wrapper({ showTooltip: false }),
    });

    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('handles click event', async () => {
    const onColorChange = jest.fn();
    renderWithTheme(<ColorBlock color={mockColor} index={0} />, {
      wrapper: wrapper({ onColorChange }),
    });

    const colorBlock = screen.getByRole('radio');
    await userEvent.click(colorBlock);

    expect(onColorChange).toHaveBeenCalledWith(mockColor);
  });

  it('does not handle click when globally disabled', async () => {
    const onColorChange = jest.fn();
    renderWithTheme(<ColorBlock color={mockColor} index={0} />, {
      wrapper: wrapper({ disabled: true, onColorChange }),
    });

    const colorBlock = screen.getByRole('radio');
    await userEvent.click(colorBlock);

    expect(onColorChange).not.toHaveBeenCalled();
  });

  it('does not handle click when color is disabled', async () => {
    const onColorChange = jest.fn();
    renderWithTheme(<ColorBlock color={mockDisabledColor} index={0} />, {
      wrapper: wrapper({ onColorChange }),
    });

    const colorBlock = screen.getByRole('radio');
    await userEvent.click(colorBlock);

    expect(onColorChange).not.toHaveBeenCalled();
  });

  it('sets correct tabIndex for first color', () => {
    renderWithTheme(<ColorBlock color={mockColor} index={0} />, { wrapper: wrapper() });
    expect(screen.getByRole('radio')).toHaveAttribute('tabIndex', '0');
  });

  it('sets correct tabIndex for non-first color', () => {
    renderWithTheme(<ColorBlock color={mockColor} index={1} />, { wrapper: wrapper() });
    expect(screen.getByRole('radio')).toHaveAttribute('tabIndex', '-1');
  });

  it('sets correct tabIndex for disabled color', () => {
    renderWithTheme(<ColorBlock color={mockDisabledColor} index={0} />, { wrapper: wrapper() });
    expect(screen.getByRole('radio')).toHaveAttribute('tabIndex', '-1');
  });

  it('sets aria-checked to true when selected', () => {
    renderWithTheme(<ColorBlock color={mockColor} index={0} />, {
      wrapper: wrapper({ colorValue: mockColor }),
    });
    expect(screen.getByRole('radio')).toHaveAttribute('aria-checked', 'true');
  });

  it('sets aria-checked to false when not selected', () => {
    renderWithTheme(<ColorBlock color={mockColor} index={0} />, { wrapper: wrapper() });
    expect(screen.getByRole('radio')).toHaveAttribute('aria-checked', 'false');
  });

  it('sets aria-disabled when globally disabled', () => {
    renderWithTheme(<ColorBlock color={mockColor} index={0} />, {
      wrapper: wrapper({ disabled: true }),
    });
    expect(screen.getByRole('radio')).toHaveAttribute('aria-disabled', 'true');
  });

  it('sets aria-disabled when color is disabled', () => {
    renderWithTheme(<ColorBlock color={mockDisabledColor} index={0} />, { wrapper: wrapper() });
    expect(screen.getByRole('radio')).toHaveAttribute('aria-disabled', 'true');
  });

  it('sets aria-label from color label', () => {
    renderWithTheme(<ColorBlock color={mockColor} index={0} />, { wrapper: wrapper() });
    expect(screen.getByRole('radio')).toHaveAttribute('aria-label', 'Red');
  });

  it('applies opacity style when disabled', () => {
    renderWithTheme(<ColorBlock color={mockDisabledColor} index={0} />, { wrapper: wrapper() });
    expect(screen.getByRole('radio')).toHaveStyle({ opacity: 0.4 });
  });

  it('applies cursor style when disabled', () => {
    renderWithTheme(<ColorBlock color={mockDisabledColor} index={0} />, { wrapper: wrapper() });
    expect(screen.getByRole('radio')).toHaveStyle({ cursor: 'not-allowed' });
  });

  it('handles keyboard navigation', () => {
    renderWithTheme(<ColorBlock color={mockColor} index={0} />, { wrapper: wrapper() });

    const colorBlock = screen.getByRole('radio');
    fireEvent.keyDown(colorBlock, { key: 'ArrowRight' });

    expect(colorBlock).toBeInTheDocument();
  });

  it('renders with custom borderColor', () => {
    renderWithTheme(<ColorBlock color={mockLightColor} index={0} />, { wrapper: wrapper() });
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('renders with custom selectedBorderColor when selected', () => {
    renderWithTheme(<ColorBlock color={mockColorWithSelectedBorder} index={0} />, {
      wrapper: wrapper({ colorValue: mockColorWithSelectedBorder }),
    });
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('renders with pill variant', () => {
    renderWithTheme(<ColorBlock color={mockColor} index={0} />, {
      wrapper: wrapper({ variant: 'pill' }),
    });
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('renders with small size', () => {
    renderWithTheme(<ColorBlock color={mockColor} index={0} />, {
      wrapper: wrapper({ size: 'small' }),
    });
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('renders with large size', () => {
    renderWithTheme(<ColorBlock color={mockColor} index={0} />, {
      wrapper: wrapper({ size: 'large' }),
    });
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('renders with custom borderRadius', () => {
    renderWithTheme(<ColorBlock color={mockColor} index={0} />, {
      wrapper: wrapper({ borderRadius: 8 }),
    });
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });
});
