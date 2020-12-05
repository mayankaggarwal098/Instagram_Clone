import React from "react";
import "./App.css";
import NavBar from "./components/navBar";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./components/home";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Profile from "./components/profile";
import CreatePost from "./components/createPost";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <NavBar></NavBar>
      <div>
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/signup" component={RegisterForm} />
          <Route path="/profile" component={Profile} />
          <Route path="/createpost" component={CreatePost} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;
