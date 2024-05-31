import { createContext, useContext, useState } from "react";
import { States } from "../Utils";

const GlobalStateContext = createContext();

export const useGlobalStateContext = () => useContext(GlobalStateContext);

export const GlobalStateProvider = ({ children }) => {
  const [activeState, setActiveState] = useState({
    pdfName: "",
    state: States.WAITING_FOR_PDF,
    lastMessage: "",
  });

  const handleGlobalStateChange = (globalState) => {
    setActiveState(globalState);
  };

  return (
    <GlobalStateContext.Provider
      value={{ activeState, handleGlobalStateChange }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
