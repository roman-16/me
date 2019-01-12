import React, { Component } from "react";
import Navbar from "./navbar";
import Hero from "./hero";

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Hero />
      </div>
    );
  }
}
