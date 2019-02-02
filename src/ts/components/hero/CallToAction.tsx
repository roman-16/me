import React from "react";
import { ArrowRight, GitHub } from "react-feather";

interface Props extends React.HTMLProps<HTMLDivElement> {
  text: string;
}

export default (props: Props) => {
  const { text, ...newProps } = props;

  return (
    <div {...newProps}>
      <a className="button is-primary is-medium is-rounded" href="#skills">
        <span>{text}</span>
        <span className="icon">
          <ArrowRight />
        </span>
      </a>
      <a className="button is-rounded">
        <span className="icon">
          <GitHub size="20px" />
        </span>
      </a>
    </div>
  );
}
