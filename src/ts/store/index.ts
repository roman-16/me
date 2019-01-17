import React from "react";
import store from "./data.json";

const context = React.createContext(store);

export default context;
