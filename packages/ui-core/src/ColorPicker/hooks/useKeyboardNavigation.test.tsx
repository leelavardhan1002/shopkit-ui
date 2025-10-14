import { renderHook, act } from '@testing-library/react';
import { useKeyboardNavigation } from './useKeyboardNavigation';
import { ColorPickerPropsProvider } from '../contexts/ColorPickerProps.context';
import { ColorPickerStateProvider } from '../contexts/ColorPickerState.context';
import { ColorPickerRefRegistryProvider } from '../contexts/ColorPickerRefRegistry.context';
import { Color } from '../types';

const mockColors: Color[] = [
  { id: '1', label: 'Red', value: '#ff0000' },
  { id: '2', label: 'Blue', value: '#0000ff' },
  { id: '3', label: 'Green', value: '#00ff00' },
];

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ColorPickerPropsProvider props={{ colors: mockColors }}>
    <ColorPickerStateProvider>
      <ColorPickerRefRegistryProvider>{children}</ColorPickerRefRegistryProvider>
    </ColorPickerStateProvider>
  </ColorPickerPropsProvider>
);

describe('useKeyboardNavigation', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div role="radiogroup">
        <div role="radio" tabindex="0"></div>
        <div role="radio" tabindex="-1"></div>
        <div role="radio" tabindex="-1"></div>
      </div>
    `;
  });

  it('handles ArrowRight key', () => {
    const { result } = renderHook(() => useKeyboardNavigation(), { wrapper });
    const event = {
      key: 'ArrowRight',
      preventDefault: jest.fn(),
    } as unknown as React.KeyboardEvent;

    act(() => {
      result.current.handleKeyDown(event, 0);
    });

    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('handles ArrowDown key', () => {
    const { result } = renderHook(() => useKeyboardNavigation(), { wrapper });
    const event = {
      key: 'ArrowDown',
      preventDefault: jest.fn(),
    } as unknown as React.KeyboardEvent;

    act(() => {
      result.current.handleKeyDown(event, 0);
    });

    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('handles ArrowLeft key', () => {
    const { result } = renderHook(() => useKeyboardNavigation(), { wrapper });
    const event = {
      key: 'ArrowLeft',
      preventDefault: jest.fn(),
    } as unknown as React.KeyboardEvent;

    act(() => {
      result.current.handleKeyDown(event, 1);
    });

    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('handles ArrowUp key', () => {
    const { result } = renderHook(() => useKeyboardNavigation(), { wrapper });
    const event = {
      key: 'ArrowUp',
      preventDefault: jest.fn(),
    } as unknown as React.KeyboardEvent;

    act(() => {
      result.current.handleKeyDown(event, 1);
    });

    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('handles Home key', () => {
    const { result } = renderHook(() => useKeyboardNavigation(), { wrapper });
    const event = {
      key: 'Home',
      preventDefault: jest.fn(),
    } as unknown as React.KeyboardEvent;

    act(() => {
      result.current.handleKeyDown(event, 2);
    });

    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('handles End key', () => {
    const { result } = renderHook(() => useKeyboardNavigation(), { wrapper });
    const event = {
      key: 'End',
      preventDefault: jest.fn(),
    } as unknown as React.KeyboardEvent;

    act(() => {
      result.current.handleKeyDown(event, 0);
    });

    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('handles Enter key', () => {
    const { result } = renderHook(() => useKeyboardNavigation(), { wrapper });
    const event = {
      key: 'Enter',
      preventDefault: jest.fn(),
    } as unknown as React.KeyboardEvent;

    act(() => {
      result.current.handleKeyDown(event, 0);
    });

    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('handles Space key', () => {
    const { result } = renderHook(() => useKeyboardNavigation(), { wrapper });
    const event = {
      key: ' ',
      preventDefault: jest.fn(),
    } as unknown as React.KeyboardEvent;

    act(() => {
      result.current.handleKeyDown(event, 0);
    });

    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('ignores other keys', () => {
    const { result } = renderHook(() => useKeyboardNavigation(), { wrapper });
    const event = {
      key: 'a',
      preventDefault: jest.fn(),
    } as unknown as React.KeyboardEvent;

    act(() => {
      result.current.handleKeyDown(event, 0);
    });

    expect(event.preventDefault).not.toHaveBeenCalled();
  });
});
