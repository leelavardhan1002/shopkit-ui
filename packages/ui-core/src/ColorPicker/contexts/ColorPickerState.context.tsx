import React, { createContext, PropsWithChildren, useContext, useReducer } from 'react';
import { Color } from '../types';
import { useColorPickerPropsContext } from './ColorPickerProps.context';

export type ColorPickerState = {
  focusedIndex: number;
  selectedColor?: Color;
};

export type ColorPickerAction =
  | { type: 'SET_FOCUSED_INDEX'; payload: number }
  | { type: 'SET_SELECTED_COLOR'; payload?: Color };

export const colorPickerReducer = (
  state: ColorPickerState,
  action: ColorPickerAction
): ColorPickerState => {
  switch (action.type) {
    case 'SET_FOCUSED_INDEX':
      return { ...state, focusedIndex: action.payload };
    case 'SET_SELECTED_COLOR':
      return { ...state, selectedColor: action.payload };
    default:
      return state;
  }
};

type ColorPickerContextProps = {
  state: ColorPickerState;
  dispatch: React.Dispatch<ColorPickerAction>;
};

const ColorPickerStateContext = createContext<ColorPickerContextProps | undefined>(undefined);

export const useColorPickerState = () => {
  const context = useContext(ColorPickerStateContext);
  if (!context) {
    throw new Error('useColorPickerState must be used within a ColorPickerStateProvider');
  }
  return context;
};

export const ColorPickerStateProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { colorValue, defaultColorValue } = useColorPickerPropsContext();
  const [state, dispatch] = useReducer(colorPickerReducer, {
    focusedIndex: -1,
    selectedColor: colorValue || defaultColorValue,
  });

  return (
    <ColorPickerStateContext.Provider value={{ state, dispatch }}>
      {children}
    </ColorPickerStateContext.Provider>
  );
};
