import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../instagram-font-png-1.png";
import { UserContext } from "../App";

const NavBar = () => {
  const { state, dispatch } = useContext(UserContext);

  return (
    <nav>
      <div className="nav-wrapper white ">
        <Link to={state ? "/" : "/login"} className="brand-logo">
          <img alt="instagram logo" src={logo} width="100" height="50" />
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {!state && (
            <React.Fragment>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </React.Fragment>
          )}
          {state && (
            <React.Fragment>
              <li>
                <Link to="/explore">Explore</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/createpost">Create Post</Link>
              </li>
              <li>
                <Link to="/logout">Log Out</Link>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
