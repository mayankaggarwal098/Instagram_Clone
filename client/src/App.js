import React from "react";
import "./App.css";
import NavBar from "./components/navBar";
import { Route, Switch } from "react-router-dom";
import Home from "./components/home";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Profile from "./components/profile";

function App() {
  return (
    <React.Fragment>
      <NavBar></NavBar>
      <div>
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/signup" component={RegisterForm} />
          <Route path="/profile" component={Profile} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;
