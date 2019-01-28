import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean } from "@storybook/addon-knobs";
import Section from ".";

const stories = storiesOf("CenterSection", module);

stories.add("some text", () => (
  <Section
    isFullheight={boolean("is fullheight", true)}
    onlyHorizontal={boolean("only horizontal", false)}
  >
    <p>This is the collapsible content. It can be any element or React component you like.</p>
    <p>It can even be another Collapsible component. Check out the next section!</p>
  </Section>
));

stories.add("some image", () => (
  <Section
    isFullheight={boolean("is fullheight", true)}
    onlyHorizontal={boolean("only horizontal", false)}
  >
    <p>This is the collapsible content. It can be any element or React component you like.</p>
    <img src="http://lorempixel.com/400/400/cats/" />
  </Section>
));

stories.add("much content", () => (
  <Section
    isFullheight={boolean("is fullheight", true)}
    onlyHorizontal={boolean("only horizontal", false)}
  >
    <p>This is the collapsible content. It can be any element or React component you like.</p>
    <p>This is the collapsible content. It can be any element or React component you like.</p>
    <p>This is the collapsible content. It can be any element or React component you like.</p>
    <img src="http://lorempixel.com/400/400/cats/" />
    <p>This is the collapsible content. It can be any element or React component you like.</p>
    <p>This is the collapsible content. It can be any element or React component you like.</p>
    <p>This is the collapsible content. It can be any element or React component you like.</p>
    <p>This is the collapsible content. It can be any element or React component you like.</p>
    <p>This is the collapsible content. It can be any element or React component you like.</p>
    <p>This is the collapsible content. It can be any element or React component you like.</p>
    <p>This is the collapsible content. It can be any element or React component you like.</p>
    <img src="http://lorempixel.com/400/400/cats/" />
    <p>This is the collapsible content. It can be any element or React component you like.</p>
    <p>This is the collapsible content. It can be any element or React component you like.</p>
    <p>This is the collapsible content. It can be any element or React component you like.</p>
    <img src="http://lorempixel.com/400/400/cats/" />
    <p>This is the collapsible content. It can be any element or React component you like.</p>
    <p>This is the collapsible content. It can be any element or React component you like.</p>
    <p>This is the collapsible content. It can be any element or React component you like.</p>
    <p>This is the collapsible content. It can be any element or React component you like.</p>
    <p>This is the collapsible content. It can be any element or React component you like.</p>
    <p>This is the collapsible content. It can be any element or React component you like.</p>
  </Section>
));
