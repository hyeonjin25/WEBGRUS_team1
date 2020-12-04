import Axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import SERVER_API from "../_actions/config";
import { auth } from "../_actions/userAction";

export default function (SpecificComponent, option) {
  //option
  //null  =>  아무나 출입이 가능한 페이지
  //true   =>  로그인한 유저만 출입이 가능한 페이지
  //false   =>  로그인한 유저는 출입이 불가능한 페이지

  function AuthenticationCheck(props) {
    const disptch = useDispatch();
    useEffect(() => {
      disptch(auth()).then((response) => {
        //로그인 하지 않은 상태에서
        if (!response.payload.isAuth) {
          //로그인 해야하는 페이지에 들어가려 할 떄
          if (option) {
            //로그인 페이지로 보내기
            alert("로그인이 필요합니다.");
            props.history.push("/login");
          }
        }
        //로그인 한 상태에서
        else {
          //로그인한 유저가 출입할 수 없는 페이지에 가려고 할 떄 (로그인페이지, 회원가입페이지)
          if (option === false) {
            props.history.push("/");
          }
        }
      });
    }, []);

    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
