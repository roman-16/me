import React from "react";
import styled, { theme } from "./../../theme";
import Collapsible from "./../collapsible";
import { ChevronRight } from "react-feather";

const Header = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const HeaderContent = styled.div`
  width: 100%;
`;

const Arrow = styled.div<State>`
  margin-left: -8px;
  transition: transform ${props => props.theme.transition.speed};
  ${props => props.isOpen ? "transform: rotate(90deg);" : null}
`;

interface Props extends React.HTMLProps<HTMLDivElement> {
  header: JSX.Element | string;
}

interface State {
  isOpen: boolean;
}

export default class extends React.Component<Props, State> {
  private headerRef = React.createRef<HTMLDivElement>();
  public state = {
    isOpen: false
  }

  public render() {
    const { header, ...newProps } = this.props;

    return (
      <div {...newProps}>
        <Header className="header" ref={this.headerRef} onClick={() => this.setState({ isOpen: !this.state.isOpen })}>
          <Arrow isOpen={this.state.isOpen}>
            <ChevronRight className="arrow" size="50px" strokeWidth="1" />
          </Arrow>
          <HeaderContent>{header}</HeaderContent>
        </Header>
        <Collapsible className="content" isOpen={this.state.isOpen}>
          {newProps.children}
        </Collapsible>
      </div>
    );
  }
}
