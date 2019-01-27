import React from "react";
import { ExternalLink } from "react-feather";
import styled from "./../../../theme";
import { Accordion } from "./../../../shared";

const Project = styled.div`
    padding: 32px;
  `;

interface Props extends React.HTMLProps<HTMLDivElement> {
  name: string;
  percentage: number;
  projects?: {
    name: string;
    description: string;
    url: string;
  }[];
}

export default (props: Props) => {
  const { name, percentage, projects, ...newProps } = props;

  return (
    <div {...newProps}>
      <Accordion header={(
        <div className="columns">
          <div className="column is-3">
            <p className="title">{name}</p>
          </div>
          <div className="column">
            <div className="tooltip is-tooltip-right is-tooltip-top-touch" data-tooltip={percentage + "%"}>
              <progress className="progress is-large is-primary" value={percentage} max="100" />
            </div>
          </div>
        </div>)}>
        {
          projects ?
            projects.map((project, i) => (
              <Project key={i}>
                <div className="columns">
                  <div className="column is-narrow">Image</div>
                  <div className="column">
                    <div className="content">
                      <strong>{project.name}</strong><br />
                      {project.description}
                    </div>
                  </div>
                  <div className="column is-narrow">
                    <a target="_blank" href={project.url}>
                      <span className="icon">
                        <ExternalLink />
                      </span>
                    </a>
                  </div>
                </div>
              </Project>
            )) :
            null
        }
      </Accordion>
    </div>
  )
}
