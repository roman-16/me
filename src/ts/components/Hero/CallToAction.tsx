import React from "react";
import * as Icons from "react-feather";
import styled from "./../../theme";

const Container = styled.div`
  float: left;
  background-color: ${props => props.theme.colors.greyLighter};
  border-radius: 24px;
`;

const IconContainer = styled.div`
  display: flex;
  padding: 0px 8px;
`;

const Icon = styled.div`
  margin: 8px;
`;

interface Props extends React.HTMLProps<HTMLDivElement> {
  text: string;
  socialLinks: {
    name: string;
    icon: string;
    url: string;
  }[];
}

export default (props: Props) => {
  const { text, socialLinks, ...newProps } = props;

  return (
    <div {...newProps}>
      <div className="columns is-gapless">
        <Container className="column is-narrow">
          <a className="button is-primary is-medium is-rounded" href="#skills">
            <span>{text}</span>
            <span className="icon">
              <Icons.ArrowRight />
            </span>
          </a>
          <IconContainer>
            {
              socialLinks.map((link, i) => {
                const SvgIcon = Icons[link.icon as keyof typeof Icons];

                return (
                  <Icon>
                    <div className="tooltip is-tooltip-bottom" data-tooltip={link.name}>
                      <a rel="noopener" target="_blank" href={link.url}>
                        <span className="icon">
                          <SvgIcon size="24px" />
                        </span>
                      </a>
                    </div>
                  </Icon>
                );
              })
            }
          </IconContainer>
        </Container>
      </div>
    </div>
  );
}
