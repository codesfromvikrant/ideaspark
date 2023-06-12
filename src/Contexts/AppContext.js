import React, { createContext, useReducer } from "react";
import reducer from "../Reducers/AppReducer";
import { globalState } from "../Reducers/globalState";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, globalState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};