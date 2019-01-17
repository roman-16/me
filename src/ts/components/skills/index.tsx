import React from "react";
import styled from "styled-components";
import Item from "./item";
import Context from "./../../store";

const SkillItem = styled(Item)`
  padding: 51px 0;
  margin: -1px 0;
  border-top: 1px solid ${props => props.theme.colors.greyLight};
  border-bottom: 1px solid ${props => props.theme.colors.greyLight};
  color: ${props => props.theme.colors.greyLight};
`;

interface Props extends React.HTMLProps<HTMLDivElement> { }

export default (props: Props) => {
  return (
    <Context.Consumer>
      {value => (
        <div {...props}>
          <section className="section is-large">
            <div className="container">
              {value.skills.map((skill, i) => <SkillItem key={i} name={skill.name} percentage={skill.knowledgeInPercentage} />)}
            </div>
          </section>
        </div>
      )}
    </Context.Consumer>
  );
}
