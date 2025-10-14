import { renderHook } from '@testing-library/react';
import { useColorPickerRefRegistry, ColorPickerRefRegistryProvider } from './ColorPickerRefRegistry.context';

describe('ColorPickerRefRegistryContext', () => {
  it('throws error when used outside provider', () => {
    expect(() => {
      renderHook(() => useColorPickerRefRegistry());
    }).toThrow('useRefRegistry must be used within a RefRegistryProvider');
  });

  it('provides ref registry', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ColorPickerRefRegistryProvider>{children}</ColorPickerRefRegistryProvider>
    );

    const { result } = renderHook(() => useColorPickerRefRegistry(), { wrapper });
    expect(result.current.containerRef).toBeDefined();
  });
});
