import React from "react";

interface Props extends React.HTMLProps<HTMLAnchorElement> { }

export default (props: Props) => {
  let target = props.href && props.href.startsWith("http") ? "_blanks" : "";

  return (
    <a rel="noopener" target={target} {...props} />
  );
}
