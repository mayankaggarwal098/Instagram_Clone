import React, { useState, useContext } from "react";
import logo from "../instagram-font-png-1.png";
import { Link, useHistory, useParams } from "react-router-dom";
import auth from "../services/authService";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { UserContext } from "../App";
import http from "./../services/httpService";

export default function UpdatePassword() {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const schema = {
    password: Joi.string().required().min(5).label("Password"),
  };

  const validate = () => {
    const data = { password };
    const { error } = Joi.validate(data, schema);
    if (error) toast.error(error.details[0].message);
    return error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevents application reloading
    if (validate()) return;
    try {
      const { data } = await http.post("/updatePassword", { token, password });
      toast(data);
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
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="waves-effect waves-light btn btn-block #42a5f5 blue lighten-1">
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
}
