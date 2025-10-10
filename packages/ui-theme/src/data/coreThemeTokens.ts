export const coreTokens = {
    palette: {
        mode: "light" as const,
        primary: {
            main: "#1976D2",
            light: "#42A5F5",
            dark: "#1565C0",
            contrastText: "#FFFFFF"
        },
        secondary: {
            main: "#9C27B0",
            light: "#BA68C8",
            dark: "#7B1FA2",
            contrastText: "#FFFFFF"
        },
        error: {
            main: "#D32F2F",
            light: "#E57373",
            dark: "#C62828",
            contrastText: "#FFFFFF"
        },
        warning: {
            main: "#ED6C02",
            light: "#FF9800",
            dark: "#E65100",
            contrastText: "#FFFFFF"
        },
        info: {
            main: "#0288D1",
            light: "#03A9F4",
            dark: "#01579B",
            contrastText: "#FFFFFF"
        },
        success: {
            main: "#2E7D32",
            light: "#4CAF50",
            dark: "#1B5E20",
            contrastText: "#FFFFFF"
        },
        background: {
            default: "#F9FAFB",
            paper: "#FFFFFF"
        },
        text: {
            primary: "#1A1A1A",
            secondary: "#4B5563",
            disabled: "#9CA3AF"
        },
        divider: "#E5E7EB",
        common: {
            black: "#000000",
            white: "#FFFFFF"
        },
        action: {
            active: "rgba(0, 0, 0, 0.54)",
            hover: "rgba(0, 0, 0, 0.04)",
            selected: "rgba(0, 0, 0, 0.08)",
            disabled: "rgba(0, 0, 0, 0.26)",
            disabledBackground: "rgba(0, 0, 0, 0.12)",
            focus: "rgba(0, 0, 0, 0.12)"
        }
    } as const,
    sys: {
        typography: {
            fontFamily: "Inter, Roboto, Helvetica, Arial, sans-serif",
            fontSize: 14,
            htmlFontSize: 16,
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightMedium: 500,
            fontWeightBold: 700,
            h1: {
                fontSize: "2.5rem",
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: "-0.01562em"
            },
            h2: {
                fontSize: "2rem",
                fontWeight: 600,
                lineHeight: 1.3,
                letterSpacing: "0em"
            },
            h3: {
                fontSize: "1.75rem",
                fontWeight: 600,
                lineHeight: 1.35,
                letterSpacing: "0em"
            },
            h4: {
                fontSize: "1.5rem",
                fontWeight: 600,
                lineHeight: 1.4,
                letterSpacing: "0em"
            },
            h5: {
                fontSize: "1.25rem",
                fontWeight: 500,
                lineHeight: 1.5,
                letterSpacing: "0em"
            },
            h6: {
                fontSize: "1rem",
                fontWeight: 500,
                lineHeight: 1.6,
                letterSpacing: "0em"
            },
            subtitle1: {
                fontSize: "1rem",
                fontWeight: 400,
                lineHeight: 1.6,
                letterSpacing: "0em"
            },
            subtitle2: {
                fontSize: "0.875rem",
                fontWeight: 500,
                lineHeight: 1.57,
                letterSpacing: "0em"
            },
            body1: {
                fontSize: "1rem",
                fontWeight: 400,
                lineHeight: 1.6,
                letterSpacing: "0em"
            },
            body2: {
                fontSize: "0.875rem",
                fontWeight: 400,
                lineHeight: 1.43,
                letterSpacing: "0em"
            },
            caption: {
                fontSize: "0.75rem",
                fontWeight: 400,
                lineHeight: 1.66,
                letterSpacing: "0em"
            },
            overline: {
                fontSize: "0.75rem",
                fontWeight: 500,
                lineHeight: 2.66,
                textTransform: "uppercase",
                letterSpacing: "0.1em"
            }
        } as const,
        shape: {
            borderRadiusNone: "0rem",
            borderRadiusXs: "0.125rem",
            borderRadiusSm: "0.25rem",
            borderRadiusMd: "0.5rem",
            borderRadiusLg: "0.75rem",
            borderRadiusXl: "1rem",
            borderRadius2xl: "1.5rem",
            borderRadius3xl: "2rem",
            borderRadius4xl: "3rem",
            borderRadiusFull: "9999px"
        } as const,
        spacing: {
            space4xs: "0.125rem",
            space3xs: "0.25rem",
            space2xs: "0.375rem",
            spaceXs: "0.5rem",
            spaceSm: "0.75rem",
            spaceMd: "1rem",
            spaceLg: "1.25rem",
            spaceXl: "1.5rem",
            space2xl: "2rem",
            space3xl: "2.5rem",
            space4xl: "3rem",
            space5xl: "4rem",
            space6xl: "5rem",
            space7xl: "6rem",
            space8xl: "8rem"
        } as const,
        elevations: {
            level0: "none",
            level1: "0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)",
            level2: "0px 3px 6px rgba(0,0,0,0.16), 0px 3px 6px rgba(0,0,0,0.23)",
            level3: "0px 10px 20px rgba(0,0,0,0.19), 0px 6px 6px rgba(0,0,0,0.23)"
        } as const,
        breakpoints: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536
        } as const,
        zIndex: {
            mobileStepper: 1000,
            fab: 1050,
            speedDial: 1050,
            appBar: 1100,
            drawer: 1200,
            modal: 1300,
            snackbar: 1400,
            tooltip: 1500
        } as const
    } as const
}
