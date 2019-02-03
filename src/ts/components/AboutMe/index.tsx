import React from "react";
import { Send } from "react-feather";
import { Link } from "./../../shared";

interface Props extends React.HTMLProps<HTMLDivElement> { }

export default (props: Props) => {
  return (
    <div {...props}>
      <div className="content is-medium">
        I grew up on a farm in the mountains of upper <Link href="https://en.wikipedia.org/wiki/Carinthia">carinthia</Link> (Austria).<br />
        <br />
        To the surprise of my parents, I always enjoyed spending more time learning about computers, than working at our farm.
        I never thought programming was something I would enjoy.
        At first I have always regarded programming as something very complicated and prehaps a little boring.
        In high school I came in contact, for the first time, with programming (HTML, CSS) and it suited me really well.
        I began an apprenticeship as a software developer at <Link href="https://itlabs.at">IT-L@B</Link> in <Link href="https://en.wikipedia.org/wiki/Villach">Villach</Link>.
        There I learned the basics of C# and web development.
        Since then I have been constantly learning new technologies.
        In my second year of apprenticeship, <Link href="https://strabag.com">Strabag</Link> in <Link href="https://en.wikipedia.org/wiki/Spittal_an_der_Drau">Spittal</Link> hired me, where I finished my apprenticeship and I am currently working at.
      </div>
      <Link className="button is-primary is-medium is-rounded" href="mailto:rl00@gmx.at">
        <span>Contact me</span>
        <span className="icon">
          <Send />
        </span>
      </Link>
    </div>
  );
}
