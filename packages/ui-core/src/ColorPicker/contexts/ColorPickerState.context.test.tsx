import { renderHook } from '@testing-library/react';
import { colorPickerReducer, useColorPickerState, ColorPickerStateProvider } from './ColorPickerState.context';
import { ColorPickerPropsProvider } from './ColorPickerProps.context';
import { Color } from '../types';

const mockColor: Color = { id: '1', label: 'Red', value: '#ff0000' };

describe('ColorPickerState', () => {
  describe('colorPickerReducer', () => {
    it('handles SET_FOCUSED_INDEX action', () => {
      const state = { focusedIndex: -1, selectedColor: undefined };
      const action = { type: 'SET_FOCUSED_INDEX' as const, payload: 2 };
      const newState = colorPickerReducer(state, action);
      expect(newState.focusedIndex).toBe(2);
    });

    it('handles SET_SELECTED_COLOR action', () => {
      const state = { focusedIndex: -1, selectedColor: undefined };
      const action = { type: 'SET_SELECTED_COLOR' as const, payload: mockColor };
      const newState = colorPickerReducer(state, action);
      expect(newState.selectedColor).toEqual(mockColor);
    });

    it('handles SET_SELECTED_COLOR with undefined', () => {
      const state = { focusedIndex: -1, selectedColor: mockColor };
      const action = { type: 'SET_SELECTED_COLOR' as const, payload: undefined };
      const newState = colorPickerReducer(state, action);
      expect(newState.selectedColor).toBeUndefined();
    });
  });

  describe('useColorPickerState', () => {
    it('throws error when used outside provider', () => {
      expect(() => {
        renderHook(() => useColorPickerState());
      }).toThrow('useColorPickerState must be used within a ColorPickerStateProvider');
    });

    it('initializes with defaultColorValue', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ColorPickerPropsProvider props={{ colors: [], defaultColorValue: mockColor }}>
          <ColorPickerStateProvider>{children}</ColorPickerStateProvider>
        </ColorPickerPropsProvider>
      );

      const { result } = renderHook(() => useColorPickerState(), { wrapper });
      expect(result.current.state.selectedColor).toEqual(mockColor);
    });

    it('initializes with colorValue', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ColorPickerPropsProvider props={{ colors: [], colorValue: mockColor }}>
          <ColorPickerStateProvider>{children}</ColorPickerStateProvider>
        </ColorPickerPropsProvider>
      );

      const { result } = renderHook(() => useColorPickerState(), { wrapper });
      expect(result.current.state.selectedColor).toEqual(mockColor);
    });
  });
});
