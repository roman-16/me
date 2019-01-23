import * as React from "react";
import { configure, addDecorator } from "@storybook/react";
import { withOptions } from "@storybook/addon-options";
import { withKnobs } from "@storybook/addon-knobs";
import { ThemeProvider } from "./../src/ts/theme";

function loadStories() {
  const req = require.context("./../src/ts", true, /\.stories\.tsx$/i);

  req.keys().forEach(req);
}

addDecorator(
  withOptions({
    name: "My Storybook",
    addonPanelInRight: true
  })
);
addDecorator(withKnobs);
addDecorator(children => (
    <ThemeProvider>
      {children()}
    </ThemeProvider>
  ));
configure(loadStories, module);
