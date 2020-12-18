import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
import http from "../services/httpService";
import { Link } from "react-router-dom";

export default function Suggestions() {
  const { state } = useContext(UserContext);
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    const searchUser = async (query) => {
      const { data } = await http.post(
        "/searchUser",
        { query },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      // console.log(data);
      setSearchResult(data);
    };
    searchUser("");
  }, []);
  return (
    <div>
      <h4>Suggestions for you</h4>
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
            >
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
  );
}
