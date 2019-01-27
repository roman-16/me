import React from "react";
import Context from "./../../store";
import styled from "./../../theme";
import { CenterSection } from "./../../shared";

const Container = styled.div`
    @media screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
      padding-left: 15%;
      min-width: 100%;
    }
  `;

const Image = styled.img`
    display: block;

    @media screen and (max-width: calc(${props => props.theme.breakpoints.tablet} - 1px)) {
      height: 100vw;
      width: 100vw;
      background: linear-gradient(to top, rgba(255, 255, 255, 0) 75%, rgba(255, 255, 255, 1)),
                  url(/me.jpg);
      background-size: 100vw;
    }

    @media screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
      height: 100vh;
      width: 100vh;
      background: linear-gradient(to left, rgba(255, 255, 255, 0) 75%, rgba(255, 255, 255, 1)),
                  url(/me.jpg);
      background-size: 100vh;
      float: right;
    }
  `;

interface Props extends React.HTMLProps<HTMLDivElement> { }

export default (props: Props) => {
  return (
    <Context.Consumer>
      {value => (
        <div {...props}>
          <CenterSection isFullheight>
            <Container>
              <div className="columns is-vcentered">
                <div className="column is-narrow">
                  <p className="title">{value.hero.title}</p>
                  <p className="subtitle">{value.hero.subtitle}</p>
                </div>
                <div className="column">
                  <Image />
                </div>
              </div>
            </Container>
          </CenterSection>
        </div>
      )}
    </Context.Consumer>
  );
}
