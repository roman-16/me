import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";

import { Accordion } from "./../shared";

storiesOf("Accordion", module)
  .add("some entrys", () => (
      <Accordion>
        <p>This is the collapsible content. It can be any element or React component you like.</p>
        <p>It can even be another Collapsible component. Check out the next section!</p>
      </Accordion>
    )
  );
