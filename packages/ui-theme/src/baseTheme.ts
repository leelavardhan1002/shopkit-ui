import { coreTokens } from './data/coreThemeTokens';
import { ShopkitSysThemeOptions } from './types';

export const baseTheme: ShopkitSysThemeOptions = {
    palette: {
        ...coreTokens.palette
    },
    sys: {
        ...coreTokens.sys
    }
};
