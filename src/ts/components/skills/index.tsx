import React from "react";
import Item from "./item";
import Context from "./../../store";
import { Accordions } from "./../../shared";

interface Props extends React.HTMLProps<HTMLDivElement> { }

export default (props: Props) => {
  return (
    <Context.Consumer>
      {data => (
        <div {...props}>
          <section className="section is-large">
            <div className="container">
              <Accordions>
                {data.skills.map((skill, i) => <Item key={i} name={skill.name} percentage={skill.knowledgeInPercentage} projects={skill.projects} />)}
              </Accordions>
            </div>
          </section>
        </div>
      )}
    </Context.Consumer>
  );
}
