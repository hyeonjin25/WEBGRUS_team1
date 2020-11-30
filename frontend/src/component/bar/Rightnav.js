import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./bar.scss";
import Menubar from "./menubar";

function Rightnav() {
  // id가 있으면 로그인 된걸로 간주
  const user = useSelector((state) => state.user);

  if (user.userData && user.userData.isAuth) {
    return (
      <div className='nav'>
        <ul>
          <li>
            <div>
              <Link to={{ pathname: "/newpost" }}>디자인올리기</Link>
            </div>
          </li>
          <li>
            <div>
              <Menubar />
            </div>
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div className='nav'>
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

export default Rightnav;
