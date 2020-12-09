import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../services/httpService";

export default function UserProfile() {
  const [post, setPost] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    async function getMyPost() {
      const { data } = await http.get("/mypost", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      setPost(data);
    }
    getMyPost();
  });

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          margin: "20px 0px",
          justifyContent: "space-around",
          borderBottom: "1px solid grey",
        }}
      >
        <div>
          <img
            src="https://www.sapiens.org/wp-content/uploads/2019/07/01-5484600746_a29869fd35_o_compressed-1076x588.jpg"
            alt="profile img"
            style={{ width: "150px", height: "150px", borderRadius: "75px" }}
          />
        </div>
        <div>
          <h4>{user.name}</h4>
          <div
            style={{
              display: "flex",
              margin: "20px 0px",
              justifyContent: "space-between",
              width: "130%",
            }}
          >
            <h6>100 posts</h6>
            <h6>120 followers</h6>
            <h6>150 following</h6>
          </div>
        </div>
      </div>
      <div className="mypost">
        {post.map((item) => {
          return (
            <img
              src={item.photo}
              alt={item.title}
              key={item._id}
              className="mypic"
            />
          );
        })}
      </div>
    </div>
  );
}
