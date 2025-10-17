import { useCallback, useEffect } from 'react';
import { useColorPickerPropsContext } from '../contexts/ColorPickerProps.context';
import { useColorPickerState } from '../contexts/ColorPickerState.context';
import { Color } from '../types';

export const useColorSelection = () => {
  const { disabled = false, onColorChange, colorValue } = useColorPickerPropsContext();
  const { dispatch, state } = useColorPickerState();
  const { selectedColor } = state;

  const isControlled = colorValue !== undefined;
  const currentColor = isControlled ? colorValue : selectedColor;

  useEffect(() => {
    if (isControlled) {
      dispatch({ type: 'SET_SELECTED_COLOR', payload: colorValue });
    }
  }, [colorValue, dispatch, isControlled]);

  const handleColorSelect = useCallback(
    (color?: Color) => {
      if (disabled) return;

      if (!isControlled) {
        dispatch({ type: 'SET_SELECTED_COLOR', payload: color });
      }
      onColorChange?.(color);
    },
    [disabled, dispatch, isControlled, onColorChange]
  );

  return { currentColor, handleColorSelect };
};
