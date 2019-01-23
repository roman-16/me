import * as React from "react";
import { configure, addDecorator } from "@storybook/react";
import { withOptions } from "@storybook/addon-options";
import { withKnobs } from "@storybook/addon-knobs";
import { ThemeProvider } from "./../src/ts/theme";
import "./../src/scss/index.scss";

function loadStories() {
  const req = require.context("./../src/ts", true, /\.stories\.tsx$/i);

  req.keys().forEach(req);
}

addDecorator(
  withOptions({
    name: "My Storybook",
    addonPanelInRight: true
  }));
addDecorator(withKnobs);
addDecorator(children => (
  <div style={{ margin: "10px" }}>
    <ThemeProvider>
      {children()}
    </ThemeProvider>
  </div>
  ));
configure(loadStories, module);
