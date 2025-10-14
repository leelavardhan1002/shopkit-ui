import { render, RenderOptions } from "@testing-library/react";
import { ShopKitThemeProvider } from "@shopkit/ui-theme";
import React from "react";

export const renderWithTheme = (component: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'> & { wrapper?: React.ComponentType<{ children: React.ReactNode }> }) => {
    const Wrapper = ({ children }: { children: React.ReactNode }) => {
        const CustomWrapper = options?.wrapper;
        return (
            <ShopKitThemeProvider>
                {CustomWrapper ? <CustomWrapper>{children}</CustomWrapper> : children}
            </ShopKitThemeProvider>
        );
    };
    
    return render(component, { ...options, wrapper: Wrapper });
};
