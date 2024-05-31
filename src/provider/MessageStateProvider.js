import { createContext, useContext, useState } from "react";

const MessagesContext = createContext();

export const useMessageContext = () => useContext(MessagesContext);

export const MessageStateProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const handleMessagesChange = (messages) => {
    setMessages(messages);
  };

  return (
    <MessagesContext.Provider value={{ messages, handleMessagesChange }}>
      {children}
    </MessagesContext.Provider>
  );
};
