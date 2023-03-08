import React from "react";
import { GlobalContext } from "./Context";
import { theme } from "../../Utilities/Utilities";

export const ContextWrapper = (props) => {
  return (
    <GlobalContext.Provider value={{ theme }}>
      {props.children}
    </GlobalContext.Provider>
  );
}
