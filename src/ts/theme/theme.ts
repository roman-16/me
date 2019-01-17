const initialVariables = {
  colors: {
    black: "#0a0a0a",
    blackBis: "#111111",
    blackTer: "#232323",

    greyDarker: "#353535",
    greyDark: "#494949",
    grey: "#7a7a7a",
    greyLight: "#b5b5b5",
    greyLighter: "#dbdbdb",

    whiteTer: "#f4f4f4",
    whiteBis: "#f9f9f9",
    white: "#ffffff",

    orange: "#F87D1C",
    yellow: "#aa8800",
    green: "#237a6d",
    turquoise: "#006858",
    cyan: "#125887",
    blue: "#274b87",
    purple: "#5d00b5",
    red: "#9b001f"
  },
  transition: {
    time: "400ms"
  }
}

const theme = {
  colors: {
    primary: initialVariables.colors.orange,
    info: initialVariables.colors.cyan,
    success: initialVariables.colors.green,
    warning: initialVariables.colors.yellow,
    danger: initialVariables.colors.red,

    light: initialVariables.colors.whiteTer,
    dark: initialVariables.colors.greyDarker,

    ...initialVariables.colors
  }
};

export default theme;
