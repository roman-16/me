import React from "react";
import ReactDOM from "react-dom";
import App from "./components";
import Context from "./store";
import { ThemeProvider } from "./theme";
import data from "./store/data.json";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render((
    <Context.Provider value={data}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Context.Provider>
  ), document.getElementById("root"));
serviceWorker.unregister();
