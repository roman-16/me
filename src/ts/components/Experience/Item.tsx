import React from "react";
import { ExternalLink } from "react-feather";
import dayjs from "dayjs";
import { Link } from "./../../shared";

function calculateTimeRange(start: string, end?: string) {
  return dayjs(start, "MM.YYYY").to(dayjs(end || dayjs(), "MM.YYYY"), true);
}

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
      <div className="columns is-centered is-vcentered">
        <div className="column is-narrow">
          <div className="image is-128x128">
            <img src={imageUrl} alt={name} />
          </div>
        </div>
        <div className="column">
          <div className="content">
            <strong>{name}</strong>
          </div>
          <div className="tooltip is-tooltip-bottom is-inline" data-tooltip={calculateTimeRange(duration.start, duration.end)}>
            {`${duration.start} ... ${duration.end || "present"}`}
          </div>
        </div>
        <div className="column is-narrow">
          <Link href={url}>
            <span className="icon is-pulled-right1">
              <ExternalLink />
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
