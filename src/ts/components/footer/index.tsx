import React from "react";
import Context from "./../../store";

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
                <h3>Made with ❤️ by <a href="mailto:rl00@gmx.at">me</a>.</h3>
                I know developers are curious creatures, so here's the <a target="_blanks" href="https://github.com/wa4-fearless-otter/me">source code</a>.<br />
              </div>
            </footer>
          )}
        </Context.Consumer>
      </div>
    );
  }
}
