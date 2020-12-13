import React, { useState, useContext } from "react";
import logo from "../instagram-font-png-1.png";
import { Link, useHistory } from "react-router-dom";
import auth from "../services/authService";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { UserContext } from "../App";

export default function LoginForm() {
  const { state, dispatch } = useContext(UserContext);
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
    // const errors = {};
    // for (let item of error.details) {
    //   // errors[item.path[0]] = item.message;
    //   toast.error(item.message);
    // }
    return error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevents application reloading
    if (validate()) return;
    try {
      await auth.login(email, password);
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user);
      dispatch({ type: "USER", payload: user });
      toast("Successfully Signedin");
      history.push("/");
      //window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        // const errors = { ...this.state.errors };
        // errors.username = ex.response.data;
        // this.setState({ errors });
        toast.error(ex.response.data);
      }
    }
  };

  return (
    <div>
      <form className="card docenter" onSubmit={handleSubmit}>
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
  );
}
