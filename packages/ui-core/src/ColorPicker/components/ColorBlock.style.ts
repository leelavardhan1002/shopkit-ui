import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useColorPickerPropsContext } from '../contexts/ColorPickerProps.context';
import { isLightColor, sizeMap } from '../utils/helpers';
import { ColorBlockProps } from './ColorBlock';

export const StyledColorBlock = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'colorData' && prop !== 'selected',
})<{
  selected?: boolean;
  colorData: ColorBlockProps['color'];
}>(({ theme, colorData, selected }) => {
  const { variant, size, disabled, borderRadius } = useColorPickerPropsContext();
  const { value, borderColor, selectedBorderColor } = colorData;
  const dimension = sizeMap[size || 'medium'];
  const borderWidth = selected && variant === 'pill' ? 3 : 2;
  const isLight = isLightColor(value);
  const focusRing = isLight ? '#000' : '#fff';

  return {
    width: variant === 'pill' ? dimension * 2 : dimension,
    height: dimension,
    background: value,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    border: `${borderWidth}px solid ${selected ? selectedBorderColor || theme.palette.primary.main : borderColor || theme.palette.divider}`,
    borderRadius: borderRadius,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'all 0.2s ease-in-out',
    position: 'relative',
    outline: 'none',
    '&:hover': !disabled && {
      transform: 'scale(1.1)',
    },
    '&:focus-visible': {
      boxShadow: `inset 0 0 0 2px ${focusRing}`,
      transform: 'scale(1.1)',
    },
  };
});
