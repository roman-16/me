import * as React from "react";
import { configure, addDecorator } from "@storybook/react";
import { ThemeProvider } from "./../src/ts/theme";

function loadStories() {
  require("../src/ts/stories");
}

addDecorator(children => (
    <ThemeProvider>
      {children()}
    </ThemeProvider>
  )
)
configure(loadStories, module);
