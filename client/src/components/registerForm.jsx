import React from "react";
import logo from "../instagram-font-png-1.png";
import { Link } from "react-router-dom";
export default function RegisterForm() {
  return (
    <div>
      <form className="card docenter">
        <div className="input-field">
          <img alt="instagram logo" src={logo} width="100" height="50" />
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <a className="waves-effect waves-light btn btn-block #42a5f5 blue lighten-2">
            Signup
          </a>
        </div>
      </form>

      <div className=" card docenter">
        <p>
          Have an account?
          <Link className="link" to="/login" style={{ "text-color": "blue" }}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
