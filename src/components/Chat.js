import React, { useState } from "react";
import MessageBox from "./MessageBox";

import "./../css/Chat.css";
import { useMessageContext } from "../provider/MessageStateProvider";
import { useGlobalStateContext } from "../provider/GlobalStateProvider";
import { STATE_HINTS } from "../Utils";

function Chat() {
  const { activeState, handleGlobalStateChange } = useGlobalStateContext();

  const { messages, handleMessagesChange } = useMessageContext();

  console.log("activeState : ", activeState);
  console.log("hint : ", STATE_HINTS[activeState.state]);
  return (
    <div
      className="chat-container"
      style={{
        justifyContent: messages.length > 0 ? "flex-start" : "center",
      }}
    >
      {messages.length > 0 ? (
        messages.map((message, index) => (
          <MessageBox
            key={index}
            author={message.author}
            input_message={message.text}
          />
        ))
      ) : (
        <h2
          style={{
            alignSelf: "center",
            textAlign: "center",
            color: "gray",
          }}
        >
          {STATE_HINTS[activeState.state]}
        </h2>
      )}
    </div>
  );
}

export default Chat;
