import { ColorPickerMain } from './ColorPickerMain';
import { ColorPickerPropsProvider } from './contexts/ColorPickerProps.context';
import { ColorPickerRefRegistryProvider } from './contexts/ColorPickerRefRegistry.context';
import { ColorPickerStateProvider } from './contexts/ColorPickerState.context';
import { ColorPickerProps } from './types';

export const ColorPicker: React.FC<ColorPickerProps> = (props) => {
  return (
    <ColorPickerPropsProvider props={props}>
      <ColorPickerStateProvider>
        <ColorPickerRefRegistryProvider>
          <ColorPickerMain {...props} />
        </ColorPickerRefRegistryProvider>
      </ColorPickerStateProvider>
    </ColorPickerPropsProvider>
  );
};
