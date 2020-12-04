import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./component/bar/Navbar";
import Footer from "./component/bar/Footer";
import Main from "./component/Main";
import LoginPage from "./component/LoginPage";
import RegisterPage from "./component/RegisterPage";
import Mypage from "./component/Mypage";
import Newpost from "./component/Newpost";
import Auth from './hoc/auth'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div
          style={{ minHeight: "calc(100vh-80px)", padding: "20px 0 20px 0" }}
        >
          <Switch>
            <Route exact path='/' component={Auth(Main,null)} />
            <Route exact path='/login' component={Auth(LoginPage,false)} />
            <Route exact path='/register' component={Auth(RegisterPage,false)} />
            <Route exact path='/mypage' component={Auth(Mypage,true)} />
            <Route exact path='/newpost' component={Auth(Newpost,true)} />
          </Switch>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
