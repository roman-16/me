import React from "react";
import Item from "./item";
import Context from "./../../store";

interface Props extends React.HTMLProps<HTMLDivElement> { }

export default (props: Props) => {
  return (
    <div {...props}>
      <Context.Consumer>
        {data => (
          <div>
            {data.skills.map((skill, i) => <Item key={i} name={skill.name} percentage={skill.knowledgeInPercentage} projects={skill.projects} />)}
          </div>
        )}
      </Context.Consumer>
    </div>
  );
}
