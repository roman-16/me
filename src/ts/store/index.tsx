import React from "react";
import * as data from "./data";

let Context: React.Context<typeof data.en>;

interface Props extends React.HTMLProps<HTMLDivElement> {
  language: keyof typeof data;
}

export default (props: Props) => {
  const { language, ...newProps } = props;

  Context = React.createContext(data[language]);

  return (
    <div {...newProps}>
      <Context.Provider value={data[language]}>
        {newProps.children}
      </Context.Provider>
    </div>
  );
}

export { Context };
