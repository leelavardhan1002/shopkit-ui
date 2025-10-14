import Tooltip from '@mui/material/Tooltip';
import React from 'react';
import { useColorPickerPropsContext } from '../contexts/ColorPickerProps.context';
import { useColorPickerState } from '../contexts/ColorPickerState.context';

import { useColorSelection, useKeyboardNavigation } from '../hooks';
import { Color } from '../types';
import { StyledColorBlock } from './ColorBlock.style';

export interface ColorBlockProps {
  color: Color;
  index: number;
}

export const ColorBlock: React.FC<ColorBlockProps> = (props) => {
  const { state } = useColorPickerState();
  const { handleColorSelect, currentColor } = useColorSelection();
  const { handleKeyDown } = useKeyboardNavigation();
  const { focusedIndex } = state;
  const { color, index } = props;
  const { label, disabled: colorDisabled } = color || {};
  const isSelected = currentColor?.id === color.id;
  const tabIndex =
    isSelected || (!currentColor && index === 0) ? 0 : focusedIndex === index ? 0 : -1;
  const { showTooltip, disabled: globalDisabled } = useColorPickerPropsContext();
  const isDisabled = globalDisabled || colorDisabled;

  const block = (
    <StyledColorBlock
      colorData={color}
      selected={isSelected}
      onClick={isDisabled ? undefined : () => handleColorSelect(color)}
      onKeyDown={(e) => handleKeyDown(e, index)}
      tabIndex={isDisabled ? -1 : tabIndex}
      role="radio"
      aria-checked={isSelected}
      aria-label={label}
      aria-disabled={isDisabled}
      style={{ opacity: isDisabled ? 0.4 : 1, cursor: isDisabled ? 'not-allowed' : 'pointer' }}
    />
  );

  return showTooltip ? (
    <Tooltip title={label} arrow>
      {block}
    </Tooltip>
  ) : (
    block
  );
};
