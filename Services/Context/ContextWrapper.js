import React, { useState } from "react";
import { GlobalContext } from "./Context";
import { theme } from "../../Utilities/Utilities";

export const ContextWrapper = (props) => {
  const [rooms, setRooms] = useState([]);
  const [unfilteredRooms, setUnfilteredRooms] = useState([]);

  return (
    <GlobalContext.Provider
      value={{ theme, rooms, setRooms, unfilteredRooms, setUnfilteredRooms }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
