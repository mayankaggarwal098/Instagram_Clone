import React, { useState, useEffect } from "react";
import http from "./../services/httpService";

export default function Home() {
  const [post, setPost] = useState([]);
  useEffect(() => {
    async function getAllPost() {
      const { data } = await http.get("/allpost", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      setPost(data);
    }
    getAllPost();
  }, []);
  return (
    <div className="home">
      {post.map((item) => {
        return (
          <div className="card" key={item._id}>
            <h5>{item.postedBy.name}</h5>
            <div className="card-image">
              <img src={item.photo} alt={item.title} />
            </div>
            <div className="card-content">
              <i className="material-icons">favorite_border</i>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
            </div>
            <div className="card-action">
              <input type="text" placeholder="Add a comment" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
