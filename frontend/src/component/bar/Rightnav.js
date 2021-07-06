import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./bar.scss";
import Menubar from "./menubar";

function Rightnav(props) {
  // jwt가 있으면 로그인 된걸로 간주
  if (props.auth.isAuth) {
    return (
      <div className='nav' style={{ fontSize: props.small ? "2.5vw" : "1.6vw" }}>
        <div>
          <Menubar />
        </div>
      </div>
    );
  } else {
    return (
      <div className='nav' style={{ fontSize: props.small ? "2.5vw" : "1.6vw" }}>
        <ul>
          <li>
            <Link to={{ pathname: "/login" }}>로그인</Link>
          </li>
          <li>
            <Link to={{ pathname: "/register" }}>회원가입</Link>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Rightnav);
