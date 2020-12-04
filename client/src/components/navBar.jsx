import React from "react";
import { Link } from "react-router-dom";
import logo from "../instagram-font-png-1.png";
const NavBar = () => {
  return (
    <nav>
      <div className="nav-wrapper white ">
        <Link to="/" className="brand-logo">
          <img alt="instagram logo" src={logo} width="100" height="50" />
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/createpost">Create Post</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
