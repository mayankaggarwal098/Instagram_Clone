import React, { useContext, useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../instagram-font-png-1.png";
import { UserContext } from "../App";
import M from "materialize-css";
import http from "./../services/httpService";

const NavBar = () => {
  const { state, dispatch } = useContext(UserContext);
  const elements = useRef(null);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    M.Modal.init(elements.current, {
      opacity: 0,
      startingTop: 0,
      preventScrolling: false,
    });
  }, []);

  const searchUser = async (query) => {
    setSearch(query);
    const { data } = await http.post(
      "/searchUser",
      { query },
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
    console.log(data);
    setSearchResult(data);
  };

  return (
    <nav>
      <div className="nav-wrapper white ">
        <Link to={state ? "/" : "/login"} className="brand-logo left">
          <img alt="instagram logo" src={logo} width="100" height="50" />
        </Link>
        <ul id="nav-mobile" className="right ">
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
                <i
                  data-target="modal1"
                  className="large material-icons modal-trigger"
                  style={{ color: "black" }}
                >
                  search
                </i>
              </li>

              <li>
                <Link to="/">
                  <i className=" large material-icons">home</i>
                </Link>
              </li>
              <li>
                <Link to="/explore">
                  <i className=" large material-icons">explore</i>
                </Link>
              </li>
              <li>
                <Link to="/profile">
                  <i className=" large material-icons">person</i>
                </Link>
              </li>
              <li>
                <Link to="/createpost">
                  <i className=" large material-icons">add_box</i>
                </Link>
              </li>
              <li>
                <Link to="/logout">Log Out</Link>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
      <div
        id="modal1"
        className="modal"
        ref={elements}
        style={{ color: "black" }}
      >
        <div className="modal-content">
          <div className="input-field ">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => searchUser(e.target.value)}
            />
          </div>
          <ul className="collection">
            {searchResult.map((user) => {
              return (
                <Link
                  key={user._id}
                  to={
                    state && user._id === state._id
                      ? "/profile"
                      : "/user/" + user._id
                  }
                  onClick={() => {
                    M.Modal.getInstance(elements.current).close();
                    setSearch("");
                  }}
                >
                  {/* <li className="collection-item" style={{ width: "100%" }}>
                    {user.email}
                  </li> */}
                  {
                    <li
                      className="collection-item avatar"
                      style={{ width: "100%" }}
                    >
                      <img
                        src={user.profilePic}
                        alt="profile pic"
                        className="circle"
                      />
                      <span className="title">{user.name}</span>
                      <p>{user.email}</p>
                    </li>
                  }
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="modal-footer">
          <button
            className="modal-close waves-effect  btn-flat"
            onClick={() => setSearch("")}
          >
            Close
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
