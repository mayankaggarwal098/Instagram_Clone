import React, { useState, useContext } from "react";
import logo from "../instagram-font-png-1.png";
import { Link, useHistory } from "react-router-dom";
import auth from "../services/authService";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { UserContext } from "../App";
import http from "./../services/httpService";

export default function ResetPassword() {
  const history = useHistory();
  const [email, setEmail] = useState("");

  const schema = {
    email: Joi.string().required().email().label("Email"),
  };

  const validate = () => {
    const data = { email };
    const { error } = Joi.validate(data, schema);
    if (error) toast.error(error.details[0].message);
    return error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevents application reloading
    if (validate()) return;
    try {
      const { data } = await http.post("/resetPassword", { email });
      console.log(data);
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
          <h5>Trouble Logging In?</h5>
          <p>
            Enter your email, we'll send you a link to get back into your
            account.
          </p>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="waves-effect waves-light btn btn-block #42a5f5 blue lighten-1">
            Send Login Link
          </button>
        </div>
      </form>
    </div>
  );
}
