import React, { useEffect, useContext } from "react";
import auth from "../services/authService";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";

export default function Logout() {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    if (state) {
      auth.logout();
      dispatch({ type: "DELETE" });
      toast("Successfully Logged Out");
    }
    history.push("/login");
  });
  return null;
}
