import React from "react";
import ReactDOM from "react-dom";
import SmoothScroll from "smooth-scroll";
import App from "./components";
import Store from "./store";
import { ThemeProvider } from "./theme";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render((
    <Store language="en">
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Store>
  ), document.getElementById("root"));

serviceWorker.unregister();

new SmoothScroll("[href*=\"#\"]", {
  speed: 400,
  updateURL: false
});
