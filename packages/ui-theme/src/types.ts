import { coreTokens } from './data/coreThemeTokens';

declare module '@mui/material/styles' {
    interface Theme {
        sys: typeof coreTokens.sys;
    }
}

export interface ShopkitSysThemeOptions {
    palette?: typeof coreTokens.palette;
    sys: typeof coreTokens.sys;
}

export interface ShopkitThemeProviderProps {
    children: React.ReactNode;
    themeOverrides?: ShopkitSysThemeOptions;
}
