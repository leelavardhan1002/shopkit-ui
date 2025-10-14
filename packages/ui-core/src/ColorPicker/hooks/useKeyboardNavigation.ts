import { useCallback } from 'react';
import { useColorPickerPropsContext } from '../contexts/ColorPickerProps.context';
import { useColorPickerRefRegistry } from '../contexts/ColorPickerRefRegistry.context';
import { useColorPickerState } from '../contexts/ColorPickerState.context';
import { useColorSelection } from './useColorSelection';

export const useKeyboardNavigation = () => {
  const { colors } = useColorPickerPropsContext();
  const { dispatch } = useColorPickerState();
  const { containerRef } = useColorPickerRefRegistry();
  const { handleColorSelect } = useColorSelection();

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      const { key } = e;
      let newIndex = index;

      switch (key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          newIndex = (index + 1) % colors?.length;
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          newIndex = (index - 1 + colors?.length) % colors?.length;
          break;
        case 'Home':
          e.preventDefault();
          newIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          newIndex = colors && colors.length - 1;
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          handleColorSelect(colors?.[index]);
          return;
        default:
          return;
      }

      dispatch({ type: 'SET_FOCUSED_INDEX', payload: newIndex });
      const colorBlocks = containerRef.current?.querySelectorAll('[role="radio"]');
      (colorBlocks?.[newIndex] as HTMLElement)?.focus();
    },
    [dispatch, containerRef, colors, handleColorSelect]
  );

  return { handleKeyDown };
};
