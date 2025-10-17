import { createContext, createRef, PropsWithChildren, RefObject, useContext, useRef } from 'react';

type RegistryMap = {
  containerRef: HTMLDivElement | null;
};

type RefRegistry = {
  [K in keyof RegistryMap]: RefObject<RegistryMap[K]>;
};

const RefRegistryContext = createContext<RefRegistry | null>(null);

export const useColorPickerRefRegistry = () => {
  const context = useContext(RefRegistryContext);
  if (!context) {
    throw new Error('useRefRegistry must be used within a RefRegistryProvider');
  }
  return context;
};

export const ColorPickerRefRegistryProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const refRegistry = useRef<RefRegistry>({
    containerRef: createRef<HTMLDivElement>(),
  });

  return (
    <RefRegistryContext.Provider value={refRegistry.current}>
      {children}
    </RefRegistryContext.Provider>
  );
};
