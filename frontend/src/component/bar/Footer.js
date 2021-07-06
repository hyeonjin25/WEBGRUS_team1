import React from "react";

function Footer() {
  return (
    <div
      style={{
        height: "50px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "notoBold",
        fontSize: "1vw",
        margin: "2vh 0",
      }}
    >
      <div style={{ marginBottom: "2vh" }}>Works by INHA University</div>
      <div style={{ marginBottom: "2vh" }}>Webgrus Team1</div>
    </div>
  );
}

export default Footer;
