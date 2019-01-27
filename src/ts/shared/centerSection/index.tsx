import React from "react";
import styled from "./../../theme";

const Section = styled.div<Props>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ${props => props.isFullheight ? "min-height: 100vh;" : null}
  `;

interface Props extends React.HTMLProps<HTMLDivElement> {
  isFullheight?: boolean;
}

export default (props: Props) => {
  const { isFullheight, ...newProps } = props;

  return (
    <div {...newProps}>
      <Section isFullheight={isFullheight}>
        {props.children}
      </Section>
    </div>
  );
}
