import React from "react";

interface Props extends React.HTMLProps<HTMLDivElement> { }

interface State {
  isExpanded: boolean;
}

export default class Navbar extends React.Component<Props, State> {
  state = {
    isExpanded: false
  }

  render() {
    const expandedClass = this.state.isExpanded ? "is-active" : "";

    return (
      <div {...this.props}>
        <nav className="navbar is-fixed-top has-background-white-ter">
          <div className="container">
            <div className="navbar-brand">
              <a className="navbar-item" href="https://bulma.io">
                <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
              </a>

              <a className={"navbar-burger burger " + expandedClass} onClick={this.burgerClick}>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            </div>

            <div className={"navbar-menu " + expandedClass}>
              <div className="navbar-start">
                <a className="navbar-item">
                  Home
                </a>

                <a className="navbar-item">
                  Documentation
                </a>
              </div>

              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                    <a className="button is-primary">
                      <strong>Sign up</strong>
                    </a>
                    <a className="button is-light">
                      Log in
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }

  private burgerClick = () => {
    this.setState({ isExpanded: !this.state.isExpanded })
  }
}
