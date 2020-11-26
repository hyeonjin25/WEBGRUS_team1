import React from "react";
import { Link } from "react-router-dom";
import "./bar.scss";

function Leftnav() {
  return (
    <div className='nav homename'>
      <Link to={{ pathname: "/" }}>사이트이름</Link>
    </div>
  );
}

export default Leftnav;
