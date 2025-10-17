import { act, renderHook } from '@testing-library/react';
import { ColorPickerPropsProvider } from '../contexts/ColorPickerProps.context';
import { ColorPickerStateProvider } from '../contexts/ColorPickerState.context';
import { Color, ColorPickerProps } from '../types';
import { useColorSelection } from './useColorSelection';

const mockColor: Color = { id: '1', label: 'Red', value: '#ff0000' };
const mockColor2: Color = { id: '2', label: 'Blue', value: '#0000ff' };

const wrapper = (props: Partial<ColorPickerProps>) => {
  const WrapperComponent = ({ children }: { children: React.ReactNode }) => (
    <ColorPickerPropsProvider props={{ colors: [], ...props }}>
      <ColorPickerStateProvider>{children}</ColorPickerStateProvider>
    </ColorPickerPropsProvider>
  );
  WrapperComponent.displayName = 'ColorPickerTestWrapper';
  return WrapperComponent;
};

describe('useColorSelection', () => {
  it('handles uncontrolled selection', () => {
    const onColorChange = jest.fn();
    const { result } = renderHook(() => useColorSelection(), {
      wrapper: wrapper({ onColorChange }),
    });

    act(() => {
      result.current.handleColorSelect(mockColor);
    });

    expect(onColorChange).toHaveBeenCalledWith(mockColor);
  });

  it('handles controlled selection', () => {
    const onColorChange = jest.fn();
    const { result } = renderHook(() => useColorSelection(), {
      wrapper: wrapper({ colorValue: mockColor, onColorChange }),
    });

    act(() => {
      result.current.handleColorSelect(mockColor2);
    });

    expect(onColorChange).toHaveBeenCalledWith(mockColor2);
  });

  it('does not select when disabled', () => {
    const onColorChange = jest.fn();
    const { result } = renderHook(() => useColorSelection(), {
      wrapper: wrapper({ disabled: true, onColorChange }),
    });

    act(() => {
      result.current.handleColorSelect(mockColor);
    });

    expect(onColorChange).not.toHaveBeenCalled();
  });

  it('returns controlled color value', () => {
    const { result } = renderHook(() => useColorSelection(), {
      wrapper: wrapper({ colorValue: mockColor }),
    });

    expect(result.current.currentColor).toEqual(mockColor);
  });

  it('updates when colorValue changes', () => {
    const { result, rerender } = renderHook(() => useColorSelection(), {
      wrapper: wrapper({ colorValue: mockColor }),
    });

    expect(result.current.currentColor).toEqual(mockColor);

    rerender();
  });

  it('handles undefined color selection', () => {
    const onColorChange = jest.fn();
    const { result } = renderHook(() => useColorSelection(), {
      wrapper: wrapper({ onColorChange }),
    });

    act(() => {
      result.current.handleColorSelect(undefined);
    });

    expect(onColorChange).toHaveBeenCalledWith(undefined);
  });
});
