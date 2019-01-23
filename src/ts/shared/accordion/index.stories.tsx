import React from "react";
import { storiesOf } from "@storybook/react";
import Accordion from ".";

const stories = storiesOf("Accordion", module);

stories.add("some text", () => (
    <Accordion>
      <p>This is the collapsible content. It can be any element or React component you like.</p>
      <p>It can even be another Collapsible component. Check out the next section!</p>
    </Accordion>
  ));

stories.add("some image", () => (
  <Accordion>
    <p>This is the collapsible content. It can be any element or React component you like.</p>
    <img src="http://lorempixel.com/400/400/cats/" />
  </Accordion>
));
