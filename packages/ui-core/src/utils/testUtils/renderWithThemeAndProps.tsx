import { render } from "@testing-library/react";
import { ShopKitThemeProvider } from "@shopkit/ui-theme";
import React from "react";

export const renderWithTheme = (component: React.ReactElement) => {
    return render(
        <ShopKitThemeProvider>
            {component}
        </ShopKitThemeProvider>
    );
};
