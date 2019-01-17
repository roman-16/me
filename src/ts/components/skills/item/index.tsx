import React from "react";

interface Props extends React.HTMLProps<HTMLDivElement> {
  name: string;
  percentage: number;
}

export default (props: Props) => {
  const { name, percentage, ...newProps } = props;

  return (
    <div {...newProps}>
      <div className="columns is-vcentered">
        <div className="column is-3">
          <p className="title">{name}</p>
        </div>
        <div className="column">
          <div className="tooltip is-tooltip-right is-tooltip-top-touch" data-tooltip={percentage + "%"}>
            <progress className="progress is-large is-primary" value={percentage} max="100" />
          </div>
        </div>
      </div>
    </div>
  );
}
