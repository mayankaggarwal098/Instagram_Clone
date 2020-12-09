import React, { useEffect, createContext, useReducer, useContext } from "react";
import "./App.css";
import NavBar from "./components/navBar";
import { Route, Switch, useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./components/home";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Profile from "./components/myProfile";
import CreatePost from "./components/createPost";

import "react-toastify/dist/ReactToastify.css";
import { initialState, reducer } from "./reducers/userResducer";
import auth from "./services/authService";
import Logout from "./components/logout";
import UserProfile from "./components/userProfile";

export const UserContext = createContext();

const Routes = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  //excutes only once when application loads
  useEffect(() => {
    const user = auth.getCurrentUser();
    if (user) {
      dispatch({ type: "USER", payload: user });
      // history.push("/");
    } else {
      history.push("/login");
    }
  }, []);
  return (
    <div>
      <Switch>
        <Route path="/profile/:userId" component={UserProfile} />
        <Route path="/login" component={LoginForm} />
        <Route path="/logout" component={Logout} />
        <Route path="/signup" component={RegisterForm} />
        <Route path="/profile" component={Profile} />
        <Route path="/createpost" component={CreatePost} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <React.Fragment>
      <UserContext.Provider value={{ state, dispatch }}>
        <ToastContainer />
        <NavBar></NavBar>
        <Routes />
      </UserContext.Provider>
    </React.Fragment>
  );
}

export default App;
