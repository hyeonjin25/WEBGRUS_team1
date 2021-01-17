import React from "react";
import { Link } from "react-router-dom";
import Right from "./Rightnav";
import "./bar.scss";

function Navbar() {
  return (
    <div
      className='nav'
      style={{
        backgroundColor: "pink",
        height: "60px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ marginLeft: "10px" }}>
        <Link to={{ pathname: "/" }}>사이트이름</Link>
      </div>
      <div style={{ marginRight: "10px" }}>
        <Right />
      </div>
    </div>
  );
}

export default Navbar;
