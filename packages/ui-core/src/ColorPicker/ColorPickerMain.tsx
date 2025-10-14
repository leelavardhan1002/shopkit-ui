import React, { useState } from 'react';
import {
  ExpandLabel,
  StyledColorPicker,
  StyledColorWrapper,
  StyledLabel,
} from './ColorPicker.style';
import { ColorBlock } from './components/ColorBlock';
import { useColorPickerRefRegistry } from './contexts/ColorPickerRefRegistry.context';
import { ColorPickerProps } from './types';

export const ColorPickerMain: React.FC<ColorPickerProps> = (props) => {
  const {
    colors,
    disabled,
    showLabels,
    className,
    maxVisible,
    'aria-label': ariaLabel = 'Color picker',
    maxVisibleLabel,
  } = props;
  const [expanded, setExpanded] = useState(false);

  const { containerRef } = useColorPickerRefRegistry();

  const shouldLimit = maxVisible && maxVisible > 0 && colors.length > maxVisible;
  const visibleColors = shouldLimit && !expanded ? colors.slice(0, maxVisible) : colors;
  const hiddenCount = shouldLimit && !expanded ? colors.length - maxVisible : 0;

  return (
    <StyledColorPicker
      ref={containerRef}
      className={className}
      role="radiogroup"
      aria-label={ariaLabel}
      aria-disabled={disabled}
    >
      {visibleColors.map((color, index) => {
        return (
          <StyledColorWrapper key={color.id}>
            <ColorBlock color={color} index={index} />
            {showLabels && <StyledLabel>{color.label}</StyledLabel>}
          </StyledColorWrapper>
        );
      })}
      {hiddenCount > 0 && (
        <StyledColorWrapper>
          <ExpandLabel
            onClick={() => setExpanded(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setExpanded(true)}
          >
            {maxVisibleLabel || `+${hiddenCount} more`}
          </ExpandLabel>
        </StyledColorWrapper>
      )}
    </StyledColorPicker>
  );
};
