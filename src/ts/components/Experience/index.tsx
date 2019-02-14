import React from "react";
import Item from "./Item";
import { Context } from "./../../store";

interface Props extends React.HTMLProps<HTMLDivElement> { }

export default (props: Props) => {
  return (
    <div {...props}>
      <Context.Consumer>
        {data => (
          <div {...props}>
            {data.experience.map((exp, i) => <Item key={i} imageUrl={exp.imageUrl} name={exp.name} duration={exp.duration} url={exp.url} />)}
          </div>
        )}
      </Context.Consumer>
    </div>
  );
}
