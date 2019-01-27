import React from "react";
import Navbar from "./navbar";
import Hero from "./hero";
import Skills from "./skills";
import Experience from "./experience";
import { CenterSection } from "./../shared";

const Section = (props: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div {...props}>
      <CenterSection isFullheight>
        <div className="container">{props.children}</div>
      </CenterSection>
    </div>
  );
}

interface Props extends React.HTMLProps<HTMLDivElement> { }

export default (props: Props) => {
  return (
    <div {...props}>
      {/* <Navbar /> */}
      <Hero />
      <Section>
        <Skills />
      </Section>
      <Section>
        <Experience />
      </Section>
    </div>
  );
}
