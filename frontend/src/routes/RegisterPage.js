import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { registerUser } from "../_actions/authAction";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const classes = useStyles();

  const [Id, setId] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Passwordcheck, setPasswordcheck] = useState("");
  const [Passwordchecking, setPasswordchecking] = useState(true);

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
    if (e.target.value !== Password) setPasswordchecking(false);
    else setPasswordchecking(true);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    let body = {
      userid: Id,
      useremail: Email,
      password: Password,
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
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          회원가입
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='id'
                value={Id}
                label='아이디'
                autoComplete='id'
                onChange={onId}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                type='email'
                value={Email}
                label='이메일'
                autoComplete='email'
                onChange={onEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                value={Password}
                type='password'
                id='password'
                label='비밀번호'
                autoComplete='current-password'
                onChange={onPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!Passwordchecking}
                helperText={
                  !Passwordchecking ? "비밀번호와 일치하지 않습니다." : ""
                }
                variant='outlined'
                required
                fullWidth
                value={Passwordcheck}
                type='password'
                id='passwordcheck'
                label='비밀번호 확인'
                autoComplete='current-password'
                onChange={onPasswordcheck}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            회원가입
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link href='/login' variant='body2'>
                이미 계정이 있나요? 로그인
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default SignUp;
