import React, { createContext } from "react";
import { theme } from "../../Utilities/Utilities";

export const GlobalContext = createContext({
  theme,
  rooms: [],
  setRooms: () => {}
});
