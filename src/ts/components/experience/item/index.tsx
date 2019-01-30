import React from "react";
import { ExternalLink } from "react-feather";

interface Props extends React.HTMLProps<HTMLDivElement> {
  name: string;
  imageUrl: string;
  duration: {
    startDate: string;
    endDate?: string;
  };
  url: string;
}

export default (props: Props) => {
  const { name, imageUrl, duration, url, ...newProps } = props;

  return (
    <div {...newProps}>
      <div className="columns is-vcentered">
        <div className="column is-narrow">
          <div className="image is-128x128">
            <img src={imageUrl} alt={name} />
          </div>
        </div>
        <div className="column">
          <div className="content">
            <strong>{name}</strong>
          </div>
        </div>
        <div className="column">
          {duration.endDate ? `${duration.startDate} ... ${duration.endDate}`: duration.startDate}
        </div>
        <div className="column is-narrow">
          <a rel="noopener" target="_blank" href={url}>
            <span className="icon">
              <ExternalLink />
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}
