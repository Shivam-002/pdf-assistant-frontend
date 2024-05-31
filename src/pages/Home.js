import React from "react";
import Header from "../components/Header";
import Body from "../components/Body";

function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Header />
      <Body />
    </div>
  );
}

export default Home;
