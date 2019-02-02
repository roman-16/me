import React from "react";
import { ArrowRight } from "react-feather";
import Context from "./../../store";
import styled from "./../../theme";
import { CenterSection } from "./../../shared";
import Me from "./../../../images/me.jpg";

const Columns = styled.div`
  width: 100%;
`;

const CallToAction = styled.div`
  @media screen and (max-width: calc(${props => props.theme.breakpoints.tablet} - 1px)) {
    padding: 10%;
  }

  @media screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
    padding-left: 15%;
    position: absolute;
  }
`;

const Image = styled.div`
  @media screen and (max-width: calc(${props => props.theme.breakpoints.tablet} - 1px)) {
    height: 100vw;
    width: 100vw;
    background: linear-gradient(to top, rgba(255, 255, 255, 0) 75%, rgba(255, 255, 255, 1)), url(${Me}) no-repeat;
    background-size: contain;
  }

  @media screen and (min-width: ${props => props.theme.breakpoints.tablet}) {
    height: 100vh;
    width: 100vh;
    float: right;
    background: linear-gradient(to left, rgba(255, 255, 255, 0) 75%, rgba(255, 255, 255, 1)), url(${Me}) no-repeat;
    background-size: contain;
  }
`;

interface Props extends React.HTMLProps<HTMLDivElement> { }

export default (props: Props) => {
  return (
    <Context.Consumer>
      {data => (
        <div {...props}>
          <CenterSection noHorizontal>
            <Columns className="columns is-gapless is-vcentered">
              <CallToAction>
                <p className="title">{data.hero.title}</p>
                <p className="subtitle">{data.hero.subtitle}</p>
                <a className="button is-primary is-medium is-rounded" href="#skills">
                  <span>{data.hero.callToAction}</span>
                  <span className="icon">
                    <ArrowRight />
                  </span>
                </a>
              </CallToAction>
              <div className="column">
                <Image />
              </div>
            </Columns>
          </CenterSection>
        </div>
      )}
    </Context.Consumer>
  );
}
