import {
  ComponentStyleConfig,
  extendTheme,
  theme as themeChakra,
  useColorMode,
  withDefaultColorScheme,
  withDefaultProps,
} from "@chakra-ui/react";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
  pink: {
    200: "#00b358",
    300: "#00803e",
    400: "#00803e",
    500: "#00803e",
  },
  gray: {
    50: "#f0f1f8",
    100: "#ebebec",
    200: "#d6d8da",
    300: "#adb0b4",
    400: "#85898f",
    500: "#5c6169",
    600: "#333a44",
    650: "#2e343d",
    700: "#292e36",
    750: "#242930",
    800: "#1a1d22",
    900: "#0f1114",
    1000: "#0a0c0e",
    1100: "#020305",
  },
  primary: {
    50: "#FFFAE4",
    100: "#F2EBCE",
    200: "#f0d09d",
    300: "#e9bd75",
    400: "#e6b361",
    500: "#e0a03a",
    600: "#B36F28",
    700: "#9d7029",
    800: "#866023",
    900: "#5a4017",
    1000: "#433011",
  },
  secondary: {
    50: "#eceaec",
    100: "#d9d6da",
    200: "#9f98a2",
    300: "#796e7c",
    400: "#524557",
    500: "#3f3044",
    600: "#392b3d",
    700: "#322636",
    800: "#2c2230",
    900: "#201822",
    1000: "#130e14",
  },
  darken: {
    50: "rgba(0,0,0,.1)",
    100: "rgba(0,0,0,.2)",
    200: "rgba(0,0,0,.3)",
    300: "rgba(0,0,0,.4)",
    400: "rgba(0,0,0,.5)",
    500: "rgba(0,0,0,.6)",
    600: "rgba(0,0,0,.7)",
    700: "rgba(0,0,0,.8)",
    800: "rgba(0,0,0,.9)",
    900: "rgba(0,0,0,1)",
  },
  lighten: {
    50: "rgba(255,255,255,.05)",
    100: "rgba(255,255,255,.1)",
    200: "rgba(255,255,255,.3)",
    300: "rgba(255,255,255,.4)",
    400: "rgba(255,255,255,.5)",
    500: "rgba(255,255,255,.6)",
    600: "rgba(255,255,255,.7)",
    700: "rgba(255,255,255,.8)",
    800: "rgba(255,255,255,.9)",
    900: "rgba(255,255,255,1)",
  },
  linkedin: {
    50: "#e1f3ff",
    100: "#bdd7f6",
    200: "#95bceb",
    300: "#6ba1df",
    400: "#4486d5",
    500: "#2a6cbb",
    600: "#1e5493",
    700: "#123c6a",
    800: "#052442",
    900: "#000d1c",
  },
  facebook: {
    50: "#e7f0ff",
    100: "#c4d3ef",
    200: "#a0b5e0",
    300: "#7c98d0",
    400: "#587ac1",
    500: "#3e61a7",
    600: "#2f4b83",
    700: "#20365f",
    800: "#11203c",
    900: "#020b1b",
  },
  google: {
    50: "#ffe8e4",
    100: "#f8c0bc",
    200: "#ee9992",
    300: "#e57167",
    400: "#dc493d",
    500: "#c23023",
    600: "#98241a",
    700: "#6d1812",
    800: "#440d09",
    900: "#1e0100",
  },
  green: {
    50: "#ddffea",
    100: "#afffca",
    200: "#7effa9",
    300: "#4dff88",
    400: "#21ff67",
    500: "#0ce64e",
    600: "#00b33c",
    700: "#00802a",
    800: "#004d18",
    900: "#001c03",
  },
  blue: {
    50: "#b4aeff",
    100: "#938bff",
    200: "#786efc",
    300: "#6c62f0",
    400: "#6057df",
    500: "#5349d1",
    600: "#4a40c1",
    700: "#3a31ac",
    800: "#2f2798",
    900: "#1e177a",
  },
  yellow: {
    50: "#fcf6eb",
    100: "#f6e3c4",
    200: "#f3d9b0",
    300: "#ecc689",
    400: "#e6b361",
    500: "#e0a03a",
    600: "#ca9034",
    700: "#b3802e",
    800: "#866023",
    900: "#5a4017",
  },
  instagram: {
    100: "#f9d6e2",
    200: "#f3acc4",
    300: "#ea6e98",
    400: "#e4457b",
    500: "#e1306c",
    600: "#b42656",
    700: "#871d41",
    800: "#430e20",
    900: "#16050b",
  },
  red: {
    ...themeChakra.colors.red,
    900: "#504454",
  },
};

// console.log({ themeChakra, table: themeChakra.components.Table });

const Table: ComponentStyleConfig = {
  variants: {
    default: (props: any) => {
      const { colorMode } = useColorMode();
      // const isDark = colorMode === "dark";
      const isDark = true;

      const extended = themeChakra.components.Table.variants.striped(props);
      return {
        ...extended,
        tbody: {
          tr: {
            color: "primary.100",
            "&:hover": {
              color: "primary.500",
            },
            "&:nth-of-type(odd)": {
              td: {
                // @ts-ignore
                ...extended.tbody.tr?.["&:nth-of-type(odd)"]?.td,
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderStyle: "solid",
                borderColor: "white",
                bg: isDark ? "#212A37" : "white",
                "&:last-child": {
                  // roundedRight: "lg",
                },
                "&:first-child": {
                  // roundedLeft: "lg",
                },
              },
            },
          },
        },
        tr: {
          ...extended.tr,
          _dark: { bg: "transparent" },
          // bg: isDark ? "transparent" : "white",
        },
        td: {
          border: 0,
          // bg: isDark ? "transparent" : "white",
        },
        th: {
          border: 0,
          // bg: isDark ? "transparent" : "white",
        },
      };
    },
  },
};

const theme = extendTheme(
  {
    fonts: {
      body: '"Neutraface Text"',
      heading: '"Benzin"',
      fantasy: '"Neutraface"',
    },
    fontSizes: {
      ...themeChakra.fontSizes,
      md: "14px",
    },
    colors,
    components: {
      ...themeChakra.components,
      Table,
    },
  },
  withDefaultProps({
    defaultProps: {
      variant: "default",
      size: "sm",
    },
    components: ["Table"],
  }),
  withDefaultProps({
    defaultProps: {
      variant: "opa",
    },
    components: ["Tr"],
  })
);

export { theme };
