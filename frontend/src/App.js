import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./component/bar/Navbar";
import Footer from "./component/bar/Footer";
import Main from "./routes/Main";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import Mypage from "./routes/Mypage";
import Newpost from "./routes/Newpost";
import PostDetail from "./routes/PostDetail";
import PostModify from "./routes/PostModify";
import UserDetail from "./routes/UserDetail";
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
            <Route exact path='/postDetail/:postid' component={Auth(PostDetail,null)} />
            <Route exact path='/postModify/:postid' component={Auth(PostModify,true)} />
            <Route exact path='/userDetail/:userid' component={Auth(UserDetail,null)} />
          </Switch>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
