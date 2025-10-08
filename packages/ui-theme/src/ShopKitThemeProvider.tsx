import { useMemo } from "react";
import { ShopkitThemeProviderProps } from "./types";
import { createShopKitTheme } from "./utils/createShopKitTheme";
import { ThemeProvider } from "@emotion/react";

export const ShopKitThemeProvider: React.FC<ShopkitThemeProviderProps> = ({ children, themeOverrides }) => {
    const theme = useMemo(() => createShopKitTheme(themeOverrides), [themeOverrides]);
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
}
