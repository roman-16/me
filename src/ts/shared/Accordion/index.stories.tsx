import React from "react";
import { storiesOf } from "@storybook/react";
import Accordion from ".";

const stories = storiesOf("Accordion", module);

stories.add("some text", () => (
  <Accordion header="Head">
    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam</p>
  </Accordion>
));

stories.add("some image", () => (
  <Accordion header="Head">
    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam</p>
    <img src="http://lorempixel.com/400/400/cats/" />
  </Accordion>
));

stories.add("extensive header", () => (
  <Accordion header={(
      <>
        <h1>Head</h1>
        <button onClick={(ev) => {
            ev.stopPropagation();
            alert("Hi");
          }}>
          Say hi!
        </button>
      </>
    )}>
    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam</p>
    <img src="http://lorempixel.com/400/400/cats/" />
  </Accordion>
));

stories.add("multiple accordions", () => (
  <div>
    <Accordion header={"Head 1"}>
      <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam</p>
      <img src="http://lorempixel.com/400/400/cats/" />
    </Accordion>
    <Accordion header={"Head 2"}>
      <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam</p>
      <img src="http://lorempixel.com/400/400/cats/" />
    </Accordion>
  </div>
));
