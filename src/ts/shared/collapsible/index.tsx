import React from "react";
import styled from "./../../theme";

const Dropdown = styled.div<Props>`
    ${
      props => props.isActive ?
        `transition: font-size .25s, opacity .5s .25s;`
      :
        `font-size: 0;
         opacity: 0;
         transition: opacity .25s, font-size .5s .25s;`
    }
  `;

interface Props extends React.HTMLProps<HTMLDivElement> {
  isActive?: boolean;
}

export default (props: Props) => {
  const { isActive, ...newProps } = props;

  return (
    <div {...newProps}>
      <Dropdown isActive={isActive}>
        {props.children}
      </Dropdown>
    </div>
  );
}
