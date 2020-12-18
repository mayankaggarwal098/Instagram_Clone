import React, { useState, useEffect, useContext } from "react";
import http from "../services/httpService";
import { UserContext } from "../App";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Suggestions from "./suggestions";

export default function CommonHome(props) {
  const [post, setPost] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAllPost() {
      const { data } = await http.get(props.route, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });

      setPost(data);
      setLoading(false);
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
    setComment("");
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
    setComment("");
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
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error("Invalid Request");
      }
      setPost(originalPost);
    }
  };

  const bookmark = async (id) => {
    try {
      const { data } = await http.put(
        `/bookmarkPost`,
        { postId: id },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      dispatch({
        type: "BOOKMARK",
        payload: { bookmarks: data.bookmarks },
      });
      localStorage.setItem("user", JSON.stringify(data));
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
    }
  };
  const removeBookmark = async (id) => {
    try {
      const { data } = await http.put(
        `/removeBookmarkPost`,
        { postId: id },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      dispatch({
        type: "BOOKMARK",
        payload: { bookmarks: data.bookmarks },
      });
      localStorage.setItem("user", JSON.stringify(data));
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
    }
  };
  return (
    <div className="home">
      {!loading && post.length === 0 ? (
        <Suggestions />
      ) : (
        post.map((item) => {
          return (
            <div className="card" key={item._id} style={{ padding: "0.5px" }}>
              <h5>
                <Link
                  to={
                    item.postedBy._id !== state._id
                      ? `/user/${item.postedBy._id}`
                      : "/profile"
                  }
                  style={{ marginLeft: "10px" }}
                >
                  <img
                    src={item.postedBy.profilePic}
                    alt="profile pic"
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "15px",
                      cursor: "pointer",
                      marginLeft: "10px",
                      float: "left",
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
                <img
                  src={item.photo}
                  alt={item.caption}
                  style={{ maxHeight: "90vh" }}
                />
              </div>
              <div className="card-content">
                <span>
                  {item.likes.includes(state._id) ? (
                    <i
                      className="material-icons"
                      style={{ color: "red", float: "left" }}
                      onClick={() => {
                        unlikePost(item._id);
                      }}
                    >
                      favorite
                    </i>
                  ) : (
                    <i
                      className="material-icons"
                      style={{ float: "left" }}
                      onClick={() => {
                        likePost(item._id);
                      }}
                    >
                      favorite_border
                    </i>
                  )}

                  <a href={`#` + item._id}>
                    <i
                      className="fa fa-comment-o"
                      style={{ marginLeft: "15px", fontSize: "23px" }}
                      aria-hidden="true"
                    ></i>
                  </a>
                </span>
                {state && state.bookmarks.includes(item._id) ? (
                  <i
                    className="material-icons"
                    style={{
                      float: "right",
                    }}
                    onClick={() => removeBookmark(item._id)}
                  >
                    bookmark
                  </i>
                ) : (
                  <i
                    className="material-icons"
                    style={{
                      float: "right",
                    }}
                    onClick={() => bookmark(item._id)}
                  >
                    bookmark_border
                  </i>
                )}
                <h6>{item.likes.length} likes</h6>
                <h6>{item.caption}</h6>
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
                  <input
                    type="text"
                    placeholder="Add a comment"
                    id={item._id}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
              </form>
            </div>
          );
        })
      )}
    </div>
  );
}
