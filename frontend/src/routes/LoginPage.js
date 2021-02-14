import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { loginUser } from "../_actions/authAction";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn() {
  const dispatch = useDispatch()
  const history = useHistory();
  const classes = useStyles();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onId = (e) => {
    setId(e.currentTarget.value);
  };
  const onPassword = (e) => {
    setPassword(e.currentTarget.value);
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
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          로그인
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='id'
            label='아이디'
            value={id}
            autoComplete='id'
            autoFocus
            onChange={onId}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            value={password}
            label='비밀번호'
            type='password'
            id='password'
            autoComplete='current-password'
            onChange={onPassword}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            로그인
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                비밀번호를 잊어버렸나요?
              </Link>
            </Grid>
            <Grid item>
              <Link href='/register' variant='body2'>
                {"계정이 없나요? 회원가입"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}


export default SignIn;
