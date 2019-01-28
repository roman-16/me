import React from "react";
import styled from "./../../theme";

const Section = styled.div<Props>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    ${props => props.onlyHorizontal ? null : "align-items: center;"}
    ${props => props.isFullheight ? "min-height: 100vh;" : null}
  `;

interface Props extends React.HTMLProps<HTMLDivElement> {
  isFullheight?: boolean;
  onlyHorizontal?: boolean;
}

export default (props: Props) => {
  const { isFullheight, onlyHorizontal, ...newProps } = props;

  return (
    <div {...newProps}>
      <Section isFullheight={isFullheight} onlyHorizontal={onlyHorizontal}>
        {props.children}
      </Section>
    </div>
  );
}
