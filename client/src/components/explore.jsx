import React, { useState, useEffect, useContext } from "react";
import http from "../services/httpService";
import { UserContext } from "../App";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Explore() {
  const [post, setPost] = useState([]);
  const { state, dispatch } = useContext(UserContext);
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

  const likePost = async (postId) => {
    const { data } = await http.put(
      "/like",
      { postId },
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
    const newPost = post.map((item) => {
      if (item._id === data._id) return data;
      else return item;
    });
    setPost(newPost);
  };
  const unlikePost = async (postId) => {
    const { data } = await http.put(
      "/unlike",
      { postId },
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
    const newPost = post.map((item) => {
      if (item._id === data._id) return data;
      else return item;
    });
    setPost(newPost);
  };

  const postComment = async (text, postId) => {
    const { data } = await http.put(
      "/comment",
      { text, postId },
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
    const newPost = post.map((item) => {
      if (item._id === data._id) return data;
      else return item;
    });
    setPost(newPost);
  };
  const deletePost = async (postId) => {
    const originalPost = post;
    const newPost = originalPost.filter((item) => {
      return item._id !== postId;
    });
    setPost(newPost);
    try {
      await http.delete(`/deletepost/${postId}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      console.log("abc");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error("Invalid Request");
      }
      setPost(originalPost);
    }
  };
  return (
    <div className="home">
      {post.map((item) => {
        return (
          <div className="card" key={item._id}>
            <h5>
              <Link
                to={
                  item.postedBy._id !== state._id
                    ? `/user/${item.postedBy._id}`
                    : "/profile"
                }
              >
                <img
                  src={item.postedBy.profilePic}
                  alt="profile pic"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "20px",
                    cursor: "pointer",
                    margin: "10px",
                  }}
                />
                {item.postedBy.name}
              </Link>
              {item.postedBy._id === state._id && (
                <i
                  className="material-icons"
                  style={{
                    float: "right",
                  }}
                  onClick={() => deletePost(item._id)}
                >
                  delete
                </i>
              )}
            </h5>
            <div className="card-image">
              <img src={item.photo} alt={item.title} />
            </div>
            <div className="card-content">
              {item.likes.includes(state._id) ? (
                <i
                  className="material-icons"
                  style={{ color: "red" }}
                  onClick={() => {
                    unlikePost(item._id);
                  }}
                >
                  favorite
                </i>
              ) : (
                <i
                  className="material-icons"
                  onClick={() => {
                    likePost(item._id);
                  }}
                >
                  favorite_border
                </i>
              )}

              <h6>{item.likes.length} likes</h6>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              {item.comments.map((comment) => {
                return (
                  <p key={comment._id}>
                    <b>{comment.postedBy.name}&nbsp;</b>
                    {comment.text}
                  </p>
                );
              })}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                postComment(e.target[0].value, item._id);
              }}
            >
              <div className="card-action">
                <input type="text" placeholder="Add a comment" />
              </div>
            </form>
          </div>
        );
      })}
    </div>
  );
}
