import React from "react";
import styled from "./../../theme";

const Section = styled.div<Props>`
    display: flex;
    flex-direction: column;
    justify-content: ${props => props.noHorizontal ? "flex-start" : "center"};
    align-items: ${props => props.noVertical ? "flex-start" : "center"};
    ${props => props.isFullheight ? "min-height: 100vh;" : null}
  `;

interface Props extends React.HTMLProps<HTMLDivElement> {
  isFullheight?: boolean;
  noVertical?: boolean;
  noHorizontal?: boolean;
}

export default (props: Props) => {
  const { isFullheight, noVertical, noHorizontal, ...newProps } = props;

  return (
    <div {...newProps}>
      <Section isFullheight={isFullheight} noVertical={noVertical} noHorizontal={noHorizontal}>
        {props.children}
      </Section>
    </div>
  );
}
