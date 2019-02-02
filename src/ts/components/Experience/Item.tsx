import React from "react";
import { ExternalLink } from "react-feather";
import { Link } from "./../../shared";

interface Props extends React.HTMLProps<HTMLDivElement> {
  name: string;
  imageUrl: string;
  duration: {
    start: string;
    end?: string;
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
          {duration.end ? `${duration.start} ... ${duration.end}`: duration.start}
        </div>
        <div className="column is-narrow">
          <Link href={url}>
            <span className="icon">
              <ExternalLink />
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
