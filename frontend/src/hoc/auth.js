import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authenticationCheck } from "../_actions/authAction";
import { connect } from "react-redux";

export default function (SpecificComponent, option) {
  //option
  //null  =>  아무나 출입이 가능한 페이지
  //true   =>  로그인한 유저만 출입이 가능한 페이지
  //false   =>  로그인한 유저는 출입이 불가능한 페이지

  function AuthenticationCheck(props) {
    const disptch = useDispatch();
    const auth = props.auth;

    useEffect(() => {
      //서버에서 토큰 검증하기
      disptch(authenticationCheck());

      if (auth.status.auth === "FAILURE") {
        //로그인 하지 않은 상태에서
        //로그인 해야하는 페이지에 들어가려 할 떄
        if (option) {
          //로그인 페이지로 보내기
          alert("로그인 후 이용 가능합니다.");
          props.history.push("/login");
        }
      }
      //로그인 한 상태에서
      else if(auth.status.auth === "SUCCESS"){
        //로그인한 유저가 출입할 수 없는 페이지에 가려고 할 떄 (로그인페이지, 회원가입페이지)
        if (option === false) {
          props.history.push("/");
        }
      }
    }, []);

    return <SpecificComponent />;
  }

  const mapStateToProps = (state) => ({
    auth: state.auth,
  });

  return connect(mapStateToProps)(AuthenticationCheck);
}
