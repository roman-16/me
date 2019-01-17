import React from "react";
import Navbar from "./navbar";
import Hero from "./hero";
import Skills from "./skills";

interface Props extends React.HTMLProps<HTMLDivElement> { }

export default (props: Props) => {
  return (
    <div {...props}>
      {/* <Navbar /> */}
      <Hero />
      <Skills />
    </div>
  );
}
