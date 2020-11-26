import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./component/bar/Navbar";
import Footer from "./component/Footer";
import Main from "./component/Main";
import LoginPage from "./component/LoginPage";
import RegisterPage from "./component/RegisterPage";
import Mypage from "./component/Mypage";
import Newpost from "./component/fileUpload/Newpost";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div
          style={{ minHeight: "calc(100vh-80px)", padding: "20px 0 20px 0" }}
        >
          <Switch>
            <Route exact path='/' component={Main} />
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/register' component={RegisterPage} />
            <Route exact path='/mypage' component={Mypage} />
            <Route exact path='/newpost' component={Newpost} />
          </Switch>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
