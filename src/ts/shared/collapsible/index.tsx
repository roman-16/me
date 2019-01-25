import React from "react";
import styled from "./../../theme";

const Collapsible = styled.div`
    overflow: hidden;
    height: auto;
    transition: height ${props => props.theme.transition.speed};
  `;

interface Props extends React.HTMLProps<HTMLDivElement> {
  isActive?: boolean;
}

export default class extends React.Component<Props> {
  private collapsibleRef = React.createRef<HTMLDivElement>();

  public render() {
    const { isActive, ...newProps } = this.props;

    if (this.collapsibleRef.current) {
      const ref = this.collapsibleRef.current;

      if (isActive) {
        ref.style.height = ref.scrollHeight + "px";
      } else {
        const elementTransition = ref.style.transition;

        ref.style.transition = "";

        requestAnimationFrame(() => {
          ref.style.height = ref.scrollHeight + "px";
          ref.style.transition = elementTransition;

          requestAnimationFrame(() => {
            ref.style.height = "0px";
          });
        });
      }
    }

    return (
      <div {...newProps}>
        <Collapsible ref={this.collapsibleRef} onTransitionEnd={(ev) => {
            if (ev.currentTarget.style.height !== "0px")
              ev.currentTarget.style.height = null;
          }}>
          {newProps.children}
        </Collapsible>
      </div>
    );
  }
}
