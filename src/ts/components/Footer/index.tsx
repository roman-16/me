import React from "react";
import Context from "./../../store";
import { Link } from "./../../shared";

interface Props extends React.HTMLProps<HTMLDivElement> { }

interface State {
  isOpen: boolean;
}

export default class extends React.Component<Props, State> {
  public state = {
    isOpen: false
  };

  public render() {
    return (
      <div {...this.props}>
        <Context.Consumer>
          {data => (
            <footer className="footer">
              <div className="content has-text-centered">
                <h3>Made with ❤️ by <Link href="mailto:rl00@gmx.at">me</Link>.</h3>
                I know developers are curious creatures, so here's the <Link href="https://github.com/wa4-fearless-otter/me">source code</Link>.<br />
              </div>
            </footer>
          )}
        </Context.Consumer>
      </div>
    );
  }
}
