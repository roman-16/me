import * as React from "react";
import * as styledComponents from "styled-components";
import theme from "./theme";

const {
  default: styled,
  ThemeProvider: StyledTheme,
  css,
  keyframes
} = styledComponents as styledComponents.ThemedStyledComponentsModule<typeof theme>;

const ThemeProvider: React.StatelessComponent = props => (
    <StyledTheme theme={theme}>
      <>{props.children}</>
    </StyledTheme>
);

export default styled;
export { ThemeProvider, css, keyframes, theme };
