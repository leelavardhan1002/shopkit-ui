export interface Color {
  id: string;
  label: string;
  value: string;
  borderColor?: string;
  selectedBorderColor?: string;
  disabled?: boolean;
}

export interface CoreProps {
  colors: Array<Color>;
  colorValue?: Color;
  defaultColorValue?: Color;
  onColorChange?: (color?: Color) => void;
  disabled?: boolean;
}

export interface AppearanceProps {
  variant?: 'square' | 'pill';
  size?: 'small' | 'medium' | 'large';
  showTooltip?: boolean;
  showLabels?: boolean;
  borderRadius?: number;
  maxVisible?: number;
  maxVisibleLabel?: string;
}

export interface ColorPickerProps extends CoreProps, AppearanceProps {
  className?: string;
  'aria-label'?: string;
}
