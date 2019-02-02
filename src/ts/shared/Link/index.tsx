import React from "react";

interface Props extends React.HTMLProps<HTMLAnchorElement> { }

export default (props: Props) => {
  return (
    <a rel="noopener" target="_blank" {...props} />
  );
}
