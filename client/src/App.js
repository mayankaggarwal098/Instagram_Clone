import React, { useEffect, createContext, useReducer, useContext } from "react";
import "./App.css";
import NavBar from "./components/navBar";
import { Route, Switch, useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Explore from "./components/explore";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Profile from "./components/myProfile";
import CreatePost from "./components/createPost";
import "react-toastify/dist/ReactToastify.css";
import { initialState, reducer } from "./reducers/userReducer";
import Logout from "./components/logout";
import UserProfile from "./components/userProfile";
import Home from "./components/home";
import ResetPassword from "./components/resetPassword";
import UpdatePassword from "./components/updatePassword";

export const UserContext = createContext();

const Routes = () => {
  const history = useHistory();
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else if (
      !history.location.pathname.startsWith("/reset") &&
      !history.location.pathname.startsWith("/signup")
    ) {
      history.push("/login");
    }
  }, []);
  return (
    <div>
      <Switch>
        <Route path="/user/:userId" component={UserProfile} />
        <Route path="/reset/:token" component={UpdatePassword} />
        <Route path="/reset" component={ResetPassword} />
        <Route path="/login" component={LoginForm} />
        <Route path="/logout" component={Logout} />
        <Route path="/signup" component={RegisterForm} />
        <Route path="/profile" component={Profile} />
        <Route path="/createpost" component={CreatePost} />
        <Route path="/explore" component={Explore} />
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
        <ToastContainer autoClose={2000} />
        <NavBar></NavBar>
        <Routes />
      </UserContext.Provider>
    </React.Fragment>
  );
}

export default App;
