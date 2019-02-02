import React from "react";
import styled from "./../theme";
import Hero from "./Hero";
import Skills from "./Skills";
import Experience from "./Experience";
import Footer from "./Footer";
import { CenterSection } from "./../shared";

const Section = styled((props: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div {...props}>
      <CenterSection isFullheight>
        <div className="container">{props.children}</div>
      </CenterSection>
    </div>
  );
})`
  padding: 0px 10%;
`;

const Title = styled((props: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div {...props}>
      <p className="title is-center">{props.children}</p>
    </div>
  );
})`
  margin: 10% 0px;
`;

interface Props extends React.HTMLProps<HTMLDivElement> { }

export default (props: Props) => {
  return (
    <div {...props}>
      <Hero />
      <Section id="about-me">
        <Title>About Me</Title>
        <Skills />
      </Section>
      <Section id="skills">
        <Title>My Skills</Title>
        <Skills />
      </Section>
      <Section>
        <Title>My Experience</Title>
        <Experience />
      </Section>
      <Footer />
    </div>
  );
}
