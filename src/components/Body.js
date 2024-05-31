import React from "react";
import Chat from "./Chat";
import InputInterface from "./InputInterface";

import "./../css/Body.css";

function Body() {
  return (
    <div
      className="body-container"
    >
      <Chat />
      <InputInterface />
    </div>
  );
}

export default Body;
