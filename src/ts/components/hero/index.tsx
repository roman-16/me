import React from "react";
import Context from "./../../store";

interface Props extends React.HTMLProps<HTMLDivElement> { }

export default (props: Props) => {
  return (
    <Context.Consumer>
      {value => (
        <div {...props}>
          <section className="hero is-fullheight has-background-white-ter">
            <div className="hero-body">
              <div className="container">
                <p className="title">{value.hero.title}</p>
                <p className="subtitle">{value.hero.subtitle}</p>
              </div>
            </div>
          </section>
        </div>
      )}
    </Context.Consumer>
  );
}
