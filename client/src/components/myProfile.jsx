import React, { useEffect, useState, useContext } from "react";
import http from "../services/httpService";
import { toast } from "react-toastify";
import { UserContext } from "./../App";

export default function Profile() {
  const [post, setPost] = useState([]);
  const [profileImage, setProfileImage] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  const [leftTab, setLeftTab] = useState(true);
  const { state, dispatch } = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(state);
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

    async function getBookmarks() {
      const { data } = await http.get("/bookmarks", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });

      setBookmarks(data);
    }
    getBookmarks();
  }, []);

  useEffect(() => {
    const updateProfilePic = async () => {
      if (profileImage) {
        const data = new FormData();
        data.append("upload_preset", "insta-clone");
        data.append("file", profileImage);

        data.append("cloud_name", "cloud098");
        //console.log(data);

        try {
          await saveProfileImage(data);
        } catch (ex) {
          if (ex.response && ex.response.status === 400) {
            toast.error(ex.response.data);
          }
        }
      }
    };
    updateProfilePic();
  }, [profileImage]);

  const imageValidation = (img) => {
    if (!img) {
      toast.error("Please select Image");
      return;
    }
    if (!img.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      toast.error("Please select valid Image");
      return;
    }
    setProfileImage(img);
  };

  const saveProfileImage = (data) => {
    return fetch("https://api.cloudinary.com/v1_1/cloud098/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        fetch("/updateProfilePic", {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            profilePic: data.url,
          }),
        })
          .then((res) => res.json())
          .then((result) => {
            // console.log(result);
            localStorage.setItem(
              "user",
              JSON.stringify({ ...state, profilePic: result.profilePic })
            );
            dispatch({ type: "UPDATEPROFILEPIC", payload: result.profilePic });
          })
          .catch((err) => {
            //    console.log(err);
          });
      });
  };

  return (
    <div className="home">
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
            src={state && state.profilePic}
            alt="profile img"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "75px",
            }}
          />
          <div className="file-field input-field">
            <div
              className="btn-small  #42a5f5 blue lighten-1 "
              style={{ marginLeft: "15px", marginBottom: "15px" }}
            >
              <span>Upload Img</span>
              <input
                type="file"
                onChange={(e) => imageValidation(e.target.files[0])}
                accept="image/*"
              />
            </div>
            {
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
              </div>
            }
          </div>
        </div>
        <div>
          <h4>{user.name}</h4>
          <h5>{user.email}</h5>
          <div
            style={{
              display: "flex",
              margin: "20px 0px",
              justifyContent: "space-between",
              width: "130%",
            }}
          >
            <h6>{post.length} posts</h6>

            <h6>{state ? state.followers.length : 0} followers</h6>
            <h6>{state ? state.following.length : 0} following</h6>
          </div>
        </div>
      </div>
      <div className="card-tabs">
        <ul className="tabs tabs-fixed-width">
          <li className="tab">
            <a
              href="#mypost"
              className="active"
              onClick={() => setLeftTab(true)}
            >
              <i className="material-icons" style={{ verticalAlign: "sub" }}>
                grid_on
              </i>{" "}
              POSTS
            </a>
          </li>
          <li className="tab">
            <a href="#mybookmarks" onClick={() => setLeftTab(false)}>
              <i className="material-icons" style={{ verticalAlign: "sub" }}>
                bookmark_border
              </i>{" "}
              SAVED
            </a>
          </li>
        </ul>
      </div>

      {leftTab && (
        <div className="mypost">
          {post.map((item) => {
            return (
              <img
                src={item.photo}
                alt={item.caption}
                key={item._id}
                className="mypic"
              />
            );
          })}
        </div>
      )}
      {!leftTab && (
        <div className="mypost">
          {bookmarks.map((item) => {
            return (
              <img
                src={item.photo}
                alt={item.caption}
                key={item._id}
                className="mypic"
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
