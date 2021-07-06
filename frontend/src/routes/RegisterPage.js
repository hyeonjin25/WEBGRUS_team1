import React, { useState } from "react";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import { registerUser } from "../_actions/authAction";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

function SignUp(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordcheck, setPasswordcheck] = useState("");
  const [passwordchecking, setPasswordchecking] = useState(true);

  const onId = (e) => {
    setId(e.target.value);
  };
  const onEmail = (e) => {
    setEmail(e.target.value);
  };
  const onPassword = (e) => {
    setPassword(e.target.value);
  };
  const onPasswordcheck = async (e) => {
    await setPasswordcheck(e.target.value);
    if (e.target.value !== password) setPasswordchecking(false);
    else setPasswordchecking(true);
  };

  const onSubmitpress = (e) => {
    if (e.key === "Enter") onSubmit(e);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let body = {
      userid: id,
      useremail: email,
      password: password,
    };

    //액션
    await dispatch(registerUser(body)).then((res) => {
      if (res) {
        alert("회원가입을 축하합니다! 사이트를 이용하시려면 로그인해주세요.");
        history.push("/login");
      } else {
        alert("회원가입에 실패했습니다");
        setId("");
        setEmail("");
        setPassword("");
        setPasswordcheck("");
      }
    });
  };

  return (
    <>
      <Container
        component='main'
        maxWidth='sm'
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
        >
          회원가입
        </h3>
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
            type='email'
            value={email}
            placeholder='Email'
            onChange={onEmail}
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
            placeholder='Password'
            onChange={onPassword}
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
            error={!passwordchecking}
            helperText={
              !passwordchecking ? "비밀번호와 일치하지 않습니다." : ""
            }
            type='password'
            value={passwordcheck}
            placeholder='Confirm Password'
            onChange={onPasswordcheck}
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
              textShadow:
                "-2px 0 black, 2px 0 black, 0 2px black, 0 -2px black",
              border: "2px solid black",
              borderRadius: "3px",
              marginBottom: "20px",
              padding: "10px 0 10px 0",
              boxShadow: "0 5px 2px lightgray",
            }}
          >
            확인
          </button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link
                href='/login'
                style={{
                  color: "gray",
                  textDecoration: "none",
                }}
              >
                이미 계정이 있나요? 로그인
              </Link>
            </Grid>
          </Grid>
        </form>
        <div
          style={{
            borderTop: "2px solid black",
            height: "7px",
            width: "100%",
          }}
        />
      </Container>
    </>
  );
}

export default SignUp;
