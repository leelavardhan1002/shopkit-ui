import { ColorPicker, type Color, type ColorPickerProps } from '@shopkit/ui-core';
import type { ArgTypes, Meta, StoryObj } from '@storybook/react';

const argTypes: ArgTypes<Partial<ColorPickerProps>> = {
  colors: {
    control: 'object',
    description: 'Array of color objects to display in the picker',
    table: {
      type: { summary: 'Color[]' },
      defaultValue: { summary: '[]' },
    },
  },
  colorValue: {
    control: 'object',
    description: 'Controlled selected color value',
    table: {
      type: { summary: 'Color' },
      category: 'Core',
    },
  },
  defaultColorValue: {
    control: 'object',
    description: 'Default selected color for uncontrolled mode',
    table: {
      type: { summary: 'Color' },
      category: 'Core',
    },
  },
  onColorChange: {
    action: 'colorChanged',
    description: 'Callback fired when color selection changes',
    table: {
      type: { summary: '(color?: Color) => void' },
      category: 'Core',
    },
  },
  disabled: {
    control: 'boolean',
    description: 'Disables all color selections',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
      category: 'Core',
    },
  },
  variant: {
    control: 'select',
    options: ['square', 'pill'],
    description: 'Visual style variant of color blocks',
    table: {
      type: { summary: "'square' | 'pill'" },
      defaultValue: { summary: "'square'" },
      category: 'Appearance',
    },
  },
  size: {
    control: 'select',
    options: ['small', 'medium', 'large'],
    description: 'Size of color blocks',
    table: {
      type: { summary: "'small' | 'medium' | 'large'" },
      defaultValue: { summary: "'medium'" },
      category: 'Appearance',
    },
  },
  showTooltip: {
    control: 'boolean',
    description: 'Show tooltip with color label on hover',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
      category: 'Appearance',
    },
  },
  showLabels: {
    control: 'boolean',
    description: 'Display color labels below each color block',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
      category: 'Appearance',
    },
  },
  borderRadius: {
    control: 'number',
    description: 'Custom border radius for color blocks (in pixels)',
    table: {
      type: { summary: 'number' },
      category: 'Appearance',
    },
  },
  maxVisible: {
    control: 'number',
    description:
      'Maximum number of colors to show initially. Remaining colors shown with +n indicator',
    table: {
      type: { summary: 'number' },
      category: 'Appearance',
    },
  },
  maxVisibleLabel: {
    control: 'text',
    description: 'Custom label for the expand indicator (default: "+n more")',
    table: {
      type: { summary: 'string' },
      category: 'Appearance',
    },
  },
  className: {
    control: 'text',
    description: 'Additional CSS class name',
    table: {
      type: { summary: 'string' },
      category: 'Other',
    },
  },
  'aria-label': {
    control: 'text',
    description: 'Accessibility label for the color picker',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: "'Color picker'" },
      category: 'Accessibility',
    },
  },
};

const meta: Meta<typeof ColorPicker> = {
  title: 'UI/ColorPicker',
  component: ColorPicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A reusable UI component from the @shopkit/ui-core library.',
      },
    },
  },
  argTypes,
};

export default meta;
type Story = StoryObj<typeof meta>;

const solidColors: Color[] = [
  { id: '1', label: 'Red', value: '#ff0000' },
  { id: '2', label: 'Blue', value: '#0000ff' },
  { id: '3', label: 'Green', value: '#00ff00' },
  { id: '4', label: 'Yellow', value: '#ffff00' },
  { id: '5', label: 'Purple', value: '#800080' },
  { id: '6', label: 'Orange', value: '#ffa500' },
  { id: '7', label: 'Pink', value: '#ffc0cb' },
  { id: '8', label: 'Black', value: '#000000', borderColor: '#cccccc' },
  { id: '9', label: 'White', value: '#ffffff', borderColor: '#cccccc' },
  { id: '10', label: 'Cyan', value: '#00ffff' },
  { id: '11', label: 'Magenta', value: '#ff00ff' },
  { id: '12', label: 'Lime', value: '#00ff00' },
];

const colorsWithDisabled: Color[] = [
  { id: '1', label: 'Red', value: '#ff0000' },
  { id: '2', label: 'Blue (Disabled)', value: '#0000ff', disabled: true },
  { id: '3', label: 'Green', value: '#00ff00' },
  { id: '4', label: 'Yellow (Disabled)', value: '#ffff00', disabled: true },
  { id: '5', label: 'Purple', value: '#800080' },
];

const gradientColors: Color[] = [
  { id: 'g1', label: 'Sunset', value: 'linear-gradient(to right, #ff6b6b, #feca57)' },
  { id: 'g2', label: 'Ocean', value: 'linear-gradient(to right, #667eea, #764ba2)' },
  { id: 'g3', label: 'Forest', value: 'linear-gradient(to right, #56ab2f, #a8e063)' },
  { id: 'g4', label: 'Fire', value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
];

const imageColors: Color[] = [
  { id: 'i1', label: 'Pattern 1', value: 'url(https://via.placeholder.com/50/ff0000/ffffff)' },
  { id: 'i2', label: 'Pattern 2', value: 'url(https://via.placeholder.com/50/0000ff/ffffff)' },
];

export const Default: Story = {
  args: {
    colors: solidColors,
    variant: 'square',
    size: 'medium',
    showTooltip: true,
    maxVisible: 5,
  },
};

export const WithLabels: Story = {
  args: {
    colors: solidColors,
    variant: 'square',
    size: 'medium',
    showLabels: true,
  },
};

export const SquareVariant: Story = {
  args: {
    colors: solidColors,
    variant: 'square',
    size: 'medium',
    showTooltip: true,
  },
};

export const PillVariant: Story = {
  args: {
    colors: solidColors,
    variant: 'pill',
    size: 'medium',
    showTooltip: true,
  },
};

export const SmallSize: Story = {
  args: {
    colors: solidColors,
    variant: 'square',
    size: 'small',
    showTooltip: true,
  },
};

export const LargeSize: Story = {
  args: {
    colors: solidColors,
    variant: 'square',
    size: 'large',
    showTooltip: true,
  },
};

export const WithGradients: Story = {
  args: {
    colors: gradientColors,
    variant: 'square',
    size: 'large',
    showTooltip: true,
    showLabels: true,
  },
};

export const WithImages: Story = {
  args: {
    colors: imageColors,
    variant: 'square',
    size: 'large',
    showTooltip: true,
    showLabels: true,
  },
};

export const Disabled: Story = {
  args: {
    colors: solidColors,
    variant: 'square',
    size: 'medium',
    disabled: true,
    showTooltip: true,
  },
};

export const Controlled: Story = {
  args: {
    colors: solidColors,
    colorValue: solidColors[2],
    variant: 'square',
    size: 'medium',
    showTooltip: true,
    onColorChange: (color) => console.log('Selected:', color),
  },
};

export const Uncontrolled: Story = {
  args: {
    colors: solidColors,
    defaultColorValue: solidColors[0],
    variant: 'square',
    size: 'medium',
    showTooltip: true,
    onColorChange: (color) => console.log('Selected:', color),
  },
};

export const MaxVisible: Story = {
  args: {
    colors: solidColors,
    variant: 'square',
    size: 'medium',
    showTooltip: true,
    maxVisible: 5,
  },
};

export const MaxVisibleCustomLabel: Story = {
  args: {
    colors: solidColors,
    variant: 'square',
    size: 'medium',
    showTooltip: true,
    maxVisible: 6,
    maxVisibleLabel: 'Show all colors',
  },
};

export const IndividualDisabled: Story = {
  args: {
    colors: colorsWithDisabled,
    variant: 'square',
    size: 'medium',
    showTooltip: true,
    showLabels: false,
  },
};

export const CustomBorderRadius: Story = {
  args: {
    colors: solidColors.slice(0, 6),
    variant: 'square',
    size: 'medium',
    showTooltip: true,
    borderRadius: 8,
  },
};
