import React, { useState } from "react";
import { GlobalContext } from "./Context";
import { theme } from "../../Utilities/Utilities";

export const ContextWrapper = (props) => {
  const [rooms, setRooms] = useState([]);

  return (
    <GlobalContext.Provider
      value={{ theme, rooms, setRooms, unfilteredRooms, setUnfilteredRooms }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
