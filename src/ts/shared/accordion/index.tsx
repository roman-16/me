import React from "react";
import styled from "./../../theme";
import Collapsible from "react-collapsible";

const Accordion = styled(Collapsible)`
  padding: 51px 0;
  margin: -1px 0;
  border-top: 1px solid ${props => props.theme.colors.greyLight};
  border-bottom: 1px solid ${props => props.theme.colors.greyLight};
  color: ${props => props.theme.colors.greyLight};
`;

interface Props extends React.HTMLProps<HTMLDivElement> { }

export default (props: Props) => {
  return (
    <div {...props}>
      <Accordion trigger="Start here">
        {props.children}
      </Accordion>
    </div>
  );
}
