import React from "react";
import styled, { theme } from "./../../theme";
import Collapsible from "./../collapsible";

const color = theme.colors.greyLighter;

const Wrapper = styled.div`
    border-top: 1px solid ${color};
    border-bottom: 1px solid ${color};
  `;

const Header = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 32px 0px;
    margin-bottom: -1px;
    border-bottom: 1px solid ${color};
  `;

const HeaderContent = styled.div`
    width: 100%;
  `;

const Arrow = styled.div<State>`
    height: 16px;
    width: 16px;
    border-right: 2px solid ${color};
    border-bottom: 2px solid ${color};
    transform: ${props => props.isOpen ? "rotate(45deg)" : "rotate(-45deg)"};
    transition: transform ${props => props.theme.transition.speed};
    margin: 0px 16px 0px 4px;
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
        <Wrapper>
          <Header ref={this.headerRef} onClick={() => this.setState({ isOpen: !this.state.isOpen })}>
            <Arrow isOpen={this.state.isOpen} />
            <HeaderContent>{header}</HeaderContent>
          </Header>
          <Collapsible isActive={this.state.isOpen}>
            {newProps.children}
          </Collapsible>
        </Wrapper>
      </div>
    );
  }
}

const Container = styled.div`
    margin-top: -1px;
  `;

interface AccordionsProps extends React.HTMLProps<HTMLDivElement> { }

export const Accordions = (props: AccordionsProps) => {
  return (
    <div {...props}>
      {React.Children.map(props.children, (child, i) => {
          if (i > 0)
            return <Container>{child}</Container>;
          else
            return child;
        })}
    </div>
  );
}
