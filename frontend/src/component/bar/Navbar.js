import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Right from "./Rightnav";
import "./bar.scss";
import Searchbar from "./Searchbar";

function Navbar() {
  const small = useMediaQuery({
    query: "(max-width:879px)",
  });

  if (small) {
    return (
      <div>
        <div
          style={{
            height: "67px",
            position: "relative",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#B2B2B2",
            borderBottom: "1px solid #8C8C8C",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 10,
              marginLeft: "20px",
              fontFamily: "notoBold",
              fontSize: "46px",
              fontWeight: 900,
              textShadow:
                "-2px 0 white, 2px 0 white, 0 2px white,  0 -2px white",
              letterSpacing: "-3px",
              paddingBottom: 5,
            }}
          >
            <Link to={{ pathname: "/" }}>Paper</Link>
          </div>

          <div style={{ position: "absolute", right: 20, marginRight: "10px" }}>
            <Right small={true} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#aaaaaa",
          }}
        >
          <Searchbar small={true} />
        </div>
        {/* 한줄데코 */}
        <div
          style={{
            backgroundColor: "#EEEEEE",
            height: "4px",
            borderBottom: "2px solid #747474",
          }}
        ></div>
      </div>
    );
  } else {
    return (
      <div>
        <div
          style={{
            height: "67px",
            position: "relative",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#B2B2B2",
            borderBottom: "1px solid black",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 10,
              marginLeft: "20px",
              fontFamily: "notoBold",
              fontSize: "46px",
              fontWeight: 900,
              textShadow:
                "-2px 0 white, 2px 0 white, 0 2px white,  0 -2px white",
              letterSpacing: "-3px",
              paddingBottom: 5,
            }}
          >
            <Link to={{ pathname: "/" }}>Paper</Link>
          </div>
          <div>
            <Searchbar small={false} />
          </div>
          <div style={{ position: "absolute", right: 20, marginRight: "10px" }}>
            <Right small={false} />
          </div>
        </div>

        {/* 한줄데코 */}
        <div
          style={{
            backgroundColor: "#EEEEEE",
            height: "4px",
            borderBottom: "2px solid black",
          }}
        ></div>
      </div>
    );
  }
}

export default Navbar;
