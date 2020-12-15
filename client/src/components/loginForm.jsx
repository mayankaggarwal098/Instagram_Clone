import React, { useState, useContext } from "react";
import logo from "../instagram-font-png-1.png";
import sideimg from "../loginimg.jpg";
import { Link, useHistory } from "react-router-dom";
import auth from "../services/authService";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { UserContext } from "../App";

export default function LoginForm() {
  const { dispatch } = useContext(UserContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
  };

  const validate = () => {
    const data = { email, password };
    const { error } = Joi.validate(data, schema);
    if (error) toast.error(error.details[0].message);
    return error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevents application reloading
    if (validate()) return;
    try {
      await auth.login(email, password);
      const user = JSON.parse(localStorage.getItem("user"));
      //  console.log(user);
      dispatch({ type: "USER", payload: user });
      toast("Successfully Signedin");
      history.push("/");
      //window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
    }
  };

  return (
    <div className="container">
      <img src={sideimg} alt="instagram" className="sidescreen"></img>
      <div className="rightscreen">
        <form className="card  docenter" onSubmit={handleSubmit}>
          <div className="input-field">
            <img alt="instagram logo" src={logo} width="100" height="50" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="waves-effect waves-light btn btn-block #42a5f5 blue lighten-1">
              Login
            </button>
          </div>
        </form>

        <div className=" card docenter">
          <Link className="link" to="/reset">
            Forgot password ?
          </Link>

          <p>
            Don't have an account?
            <Link className="link" to="/signup">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
