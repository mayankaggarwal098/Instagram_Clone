import React, { useState } from "react";
import logo from "../instagram-font-png-1.png";
import { Link, useHistory } from "react-router-dom";
import auth from "../services/authService";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import http from "../services/httpService";

export default function RegisterForm() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const apiEndpoint = "/signup";

  const schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  const validate = () => {
    const data = { name, email, password };
    const { error } = Joi.validate(data, schema);
    if (error) toast.error(error.details[0].message);

    return error;
  };

  const register = (user) => {
    return http.post(apiEndpoint, {
      email: user.email,
      password: user.password,
      name: user.name,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) return;
    try {
      const response = await register({ name, email, password });
      auth.loginWithJwt(response.headers["x-auth-token"]);
      toast("Successfully Signedup");
      history.push("/login");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
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
