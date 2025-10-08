import { createTheme } from "@mui/system";
import { baseTheme } from "../baseTheme";
import { ShopkitSysThemeOptions } from "../types";

export function createShopKitTheme<T extends ShopkitSysThemeOptions>(overrides?: T) {
    const deepMergeTokens = {
        ...baseTheme,
        ...overrides
    }
    return createTheme(deepMergeTokens)
}
