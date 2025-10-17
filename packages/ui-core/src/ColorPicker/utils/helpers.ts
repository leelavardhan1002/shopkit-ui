import { DEFAULT_COLOR_PICKER_PROPS } from '../constants/defaults';
import { ColorPickerProps } from '../types';

export const isLightColor = (hex?: string): boolean => {
  if (!hex) return false;
  const rgb = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!rgb || !rgb[1] || !rgb[2] || !rgb[3]) return false;
  const r = parseInt(rgb[1], 16);
  const g = parseInt(rgb[2], 16);
  const b = parseInt(rgb[3], 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
};

export const mergeWithDefaults = (props: ColorPickerProps): ColorPickerProps => {
  return {
    ...DEFAULT_COLOR_PICKER_PROPS,
    ...props,
  };
};

export const sizeMap = {
  small: 24,
  medium: 32,
  large: 40,
};
