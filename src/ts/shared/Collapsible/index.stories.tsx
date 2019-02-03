import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean } from "@storybook/addon-knobs";
import Collapsible from ".";

const stories = storiesOf("Collapsible", module);

stories.add("some text", () => (
  <Collapsible isOpen={boolean("is open", true)}>
    <p>This is the collapsible content. It can be any element or React component you like.</p>
    <p>It can even be another Collapsible component. Check out the next section!</p>
  </Collapsible>
));

stories.add("some image", () => (
  <Collapsible isOpen={boolean("is open", true)}>
    <p>This is the collapsible content. It can be any element or React component you like.</p>
    <img src="http://lorempixel.com/400/400/cats/" />
  </Collapsible>
));
