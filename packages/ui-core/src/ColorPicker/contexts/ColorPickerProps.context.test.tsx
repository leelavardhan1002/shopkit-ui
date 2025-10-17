import { renderHook } from '@testing-library/react';
import { useColorPickerPropsContext, ColorPickerPropsProvider } from './ColorPickerProps.context';
import { ColorPickerProps } from '../types';

describe('ColorPickerPropsContext', () => {
  it('throws error when used outside provider', () => {
    expect(() => {
      renderHook(() => useColorPickerPropsContext());
    }).toThrow('useColorPickerPropsContext must be used within a ColorPickerPropsProvider');
  });

  it('provides props with defaults', () => {
    const props: ColorPickerProps = {
      colors: [],
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ColorPickerPropsProvider props={props}>{children}</ColorPickerPropsProvider>
    );

    const { result } = renderHook(() => useColorPickerPropsContext(), { wrapper });
    expect(result.current.colors).toEqual([]);
    expect(result.current.variant).toBe('square');
    expect(result.current.size).toBe('medium');
  });

  it('merges custom props with defaults', () => {
    const props: ColorPickerProps = {
      colors: [],
      variant: 'pill',
      size: 'large',
      showTooltip: true,
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ColorPickerPropsProvider props={props}>{children}</ColorPickerPropsProvider>
    );

    const { result } = renderHook(() => useColorPickerPropsContext(), { wrapper });
    expect(result.current.variant).toBe('pill');
    expect(result.current.size).toBe('large');
    expect(result.current.showTooltip).toBe(true);
  });
});
