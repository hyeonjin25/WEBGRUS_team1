import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { loginUser } from "../_actions/authAction";
import Container from "@material-ui/core/Container";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function SignIn() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onId = (e) => {
    setId(e.currentTarget.value);
  };
  const onPassword = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onSubmitpress = (e) => {
    if (e.key === "Enter") onSubmit(e);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let body = {
      userid: id,
      password: password,
    };

    //액션
    await dispatch(loginUser(body)).then((res) => {
      //로그인 성공시 홈으로 이동
      if (res) {
        history.push("/");
      } else {
        alert("로그인에 실패했습니다.");
        setId("");
        setPassword("");
      }
    });
  };

  return (
    <>
      <Container
        component='main' maxWidth='sm'
        style={{
          border: "2px solid black",
          width: "100%",
          padding: "0",
          marginTop: "90px",
          marginBottom: "80px",
        }}
      >
        <h3
          style={{
            backgroundColor: "#B2B2B2",
            width: "100%",
            margin: "0",
            height: "60px",
            lineHeight: "60px",
            textAlign: "center",
            color: "white",
            fontFamily: "noto",
            fontSize: "20px",
            fontWeight: "700",
            textShadow: "-2px 0 black, 2px 0 black, 0 2px black, 0 -2px black",
          }}
        >로그인</h3>
        <div
          style={{
            borderTop: "2px solid black",
            borderBottom: "2px solid black",
            height: "7px",
            width: "100%",
          }}
        ></div>
        <form
          onSubmit={onSubmit}
          style={{
            backgroundColor: "white",
            padding: "30px 10% 30px 10%",
          }}
        >
          <input
            type='text'
            value={id}
            placeholder='ID'
            autoFocus
            onChange={onId}
            style={{
              display: "block",
              width: "100%",
              border: "2px solid black",
              borderRadius: "3px",
              fontSize: "1.5em",
              boxSizing: "border-box",
              padding: "10px 5% 10px 5%",
              marginBottom: "20px",
              fontFamily: "notoBold",
            }}
          />
          <input
            type='password'
            value={password}
            label='비밀번호'
            placeholder='Password'
            onChange={onPassword}
            onKeyPress={onSubmitpress}
            style={{
              display: "block",
              width: "100%",
              border: "2px solid black",
              borderRadius: "3px",
              fontSize: "1.5em",
              boxSizing: "border-box",
              padding: "10px 5% 10px 5%",
              marginBottom: "40px",
              fontFamily: "notoBold",
            }}
          />
          <button
            type='submit'
            style={{
              display: "block",
              width: "100%",
              backgroundColor: "#B2B2B2",
              color: "white",
              fontFamily: "noto",
              fontSize: "20px",
              fontWeight: "700",
              textShadow: "-2px 0 black, 2px 0 black, 0 2px black, 0 -2px black",
              border: "2px solid black",
              borderRadius: "3px",
              marginBottom: "20px",
              padding: "10px 0 10px 0",
              boxShadow: "0 5px 2px lightgray",
            }}
          >확인</button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link
                href='/register'
                style={{
                  color: "gray",
                  textDecoration: "none",
                }}
              >{"계정이 없나요? 회원가입"}</Link>
            </Grid>
          </Grid>
        </form>
        <div
          style={{
            borderTop: "2px solid black",
            height: "7px",
            width: "100%",
          }}
        ></div>
      </Container>
    </>
  );
}

export default SignIn;
