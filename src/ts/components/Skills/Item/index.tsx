import React from "react";
import * as Icons from "react-feather";
import styled, { css, theme } from "./../../../theme";
import Header from "./Header";
import { Accordion, Link } from "./../../../shared";

const color = theme.colors.greyLighter;

const box = css`
  border-top: 1px solid ${color};
  border-bottom: 1px solid ${color};
  margin: -1px 0px;
`;

const header = css`
  padding: 32px 0px;
  margin-bottom: -1px;
  border-bottom: 1px solid ${color};
`;

const StyledAccordion = styled(Accordion)`
    ${box}

    .arrow {
      color: ${color};
    }

    .header {
      ${header}
    }
`;

const StyledHeader = styled.div`
  ${box}

  .header {
    ${header}
    margin-left: 50px;
  }
`;

const Project = styled.div`
  padding: 32px;
`;

interface Props extends React.HTMLProps<HTMLDivElement> {
  name: string;
  percentage: number;
  projects?: {
    icon: string;
    name: string;
    description: string;
    url: string;
  }[];
}

export default (props: Props) => {
  const { name, percentage, projects, ...newProps } = props;

  return (
    <div {...newProps}>
      {
        projects ? (
          <StyledAccordion header={<Header name={name} percentage={percentage} />}>
            {
              projects.map((project, i) => {
                const Icon = Icons[project.icon as keyof typeof Icons];

                return (
                  <Project key={i}>
                    <div className="columns">
                      <div className="column is-narrow">
                        <span className="icon">
                          <Icon size="40px" />
                        </span>
                      </div>
                      <div className="column">
                        <div className="content">
                          <strong>{project.name}</strong><br />
                          {project.description}
                        </div>
                      </div>
                      <div className="column is-narrow">
                        <Link href={project.url}>
                          <span className="icon">
                            <Icons.ExternalLink />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </Project>
                );
              })
            }
          </StyledAccordion>
        ) : (
          <StyledHeader>
            <Header className="header" name={name} percentage={percentage} />
          </StyledHeader>
        )
      }
    </div>
  )
}
