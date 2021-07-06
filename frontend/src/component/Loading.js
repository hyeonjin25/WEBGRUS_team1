import React from "react";

function Loading() {
  return (
    <div
      style={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "notoBold",
        fontWeight: 900,
        color: "white",
        textShadow: "-1px 0 black, 1px 0 black, 0 1px black, 0 -1px black",
      }}
    >
      Loading...
    </div>
  );
}

export default Loading;
