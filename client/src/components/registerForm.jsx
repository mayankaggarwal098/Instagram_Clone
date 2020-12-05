import React, { useState } from "react";
import logo from "../instagram-font-png-1.png";
import { Link, useHistory } from "react-router-dom";
import { register } from "../services/userService";
import auth from "../services/authService";
import Joi from "joi-browser";
import { toast } from "react-toastify";

export default function RegisterForm() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  const validate = () => {
    const data = { name, email, password };
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
      const response = await register({ name, email, password });
      auth.loginWithJwt(response.headers["x-auth-token"]);
      history.push("/login");
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
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            Signup
          </button>
        </div>
      </form>

      <div className=" card docenter">
        <p>
          Have an account?
          <Link className="link" to="/login">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
