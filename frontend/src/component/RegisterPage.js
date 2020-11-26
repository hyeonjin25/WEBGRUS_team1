import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { useDispatch } from "react-redux";
import { registerUser } from "../_actions/userAction";

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

export default function SignUp(props) {
  const dispatch = useDispatch();

  const classes = useStyles();

  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [Id, setId] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Passwordcheck, setPasswordcheck] = useState("");
  const [Passwordchecking, setPasswordchecking] = useState(true);

  const onFirstname = (e) => {
    setFirstname(e.target.value);
  };
  const onLastname = (e) => {
    setLastname(e.target.value);
  };
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

  const onSubmit = (e) => {
    e.preventDefault();
    let body = {
      firstname: Firstname,
      lastname: Lastname,
      userid: Id,
      email: Email,
      password: Password,
    };
    //액션
    dispatch(registerUser(body)).then((res) => {
      if (res.payload.success) {
        props.history.push("/login");
      } else {
        alert(res.payload.err);
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
            <Grid item xs={6}>
              <TextField
                autoComplete='fname'
                name={Firstname}
                variant='outlined'
                required
                fullWidth
                id='firstname'
                label='이름'
                autoFocus
                onChange={onFirstname}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoComplete='fname'
                name={Lastname}
                variant='outlined'
                required
                fullWidth
                id='lastname'
                label='성'
                autoFocus
                onChange={onLastname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='id'
                name={Id}
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
                name={Email}
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
                name={Password}
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
                helperText={!Passwordchecking?"비밀번호와 일치하지 않습니다.":""}
                variant='outlined'
                required
                fullWidth
                name={Passwordcheck}
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
              <Link href='#' variant='body2'>
                이미 계정이 있나요? 로그인
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
