import { createContext, PropsWithChildren, useContext } from 'react';
import { ColorPickerProps } from '../types';
import { mergeWithDefaults } from '../utils/helpers';

type ColorPickerPropsContext = ColorPickerProps;

const ColorPickerPropsContext = createContext<ColorPickerPropsContext | undefined>(undefined);

type ColorPickerPropsProviderProps = PropsWithChildren<{
  props: ColorPickerProps;
}>;

export const useColorPickerPropsContext = () => {
  const context = useContext(ColorPickerPropsContext);
  if (!context) {
    throw new Error('useColorPickerPropsContext must be used within a ColorPickerPropsProvider');
  }
  return context;
};

export const ColorPickerPropsProvider: React.FC<ColorPickerPropsProviderProps> = ({
  props,
  children,
}) => {
  const propsWithDefaults = mergeWithDefaults(props);

  return (
    <ColorPickerPropsContext.Provider value={propsWithDefaults}>
      {children}
    </ColorPickerPropsContext.Provider>
  );
};
