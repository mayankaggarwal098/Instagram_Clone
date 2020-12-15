import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import http from "../services/httpService";
import { UserContext } from "./../App";
import { toast } from "react-toastify";
import Loading from "./loading";

export default function UserProfile() {
  const { userId } = useParams();
  const { state, dispatch } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  //const user = JSON.parse(localStorage.getItem("user"));
  //console.log(state);
  useEffect(() => {
    async function getProfile() {
      try {
        const { data } = await http.get(`/user/${userId}`, {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        });
        //console.log(data);
        setProfile(data);
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
          toast.error(ex.response.data);
          console.log(ex);
        }
      }
    }
    getProfile();
  }, []);

  const followUser = async () => {
    const { data } = await http.put(
      "/follow",
      { otherUserId: userId },
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
    // console.log(data);
    dispatch({
      type: "UPDATE",
      payload: { following: data.following, followers: data.followers },
    });
    localStorage.setItem("user", JSON.stringify(data));
    setProfile((prevState) => {
      return {
        ...prevState,
        user: {
          ...prevState.user,
          followers: [...prevState.user.followers, data._id],
        },
      };
    });
  };
  const unfollowUser = async () => {
    const { data } = await http.put(
      "/unfollow",
      { otherUserId: userId },
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
    // console.log(data);
    dispatch({
      type: "UPDATE",
      payload: { following: data.following, followers: data.followers },
    });
    localStorage.setItem("user", JSON.stringify(data));
    setProfile((prevState) => {
      const followers = prevState.user.followers.filter(
        (id) => id !== data._id
      );
      return {
        ...prevState,
        user: {
          ...prevState.user,
          followers,
        },
      };
    });
  };

  return (
    <React.Fragment>
      {profile ? (
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
                src={profile.user.profilePic}
                alt="profile img"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "75px",
                }}
              />
            </div>
            <div>
              <h4>
                {profile.user.name}&nbsp;&nbsp;
                {state && state.following.includes(userId) ? (
                  <button
                    onClick={unfollowUser}
                    className="waves-effect waves-light btn-small #42a5f5 blue lighten-1"
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={followUser}
                    className="waves-effect waves-light btn-small #42a5f5 blue lighten-1"
                  >
                    follow
                  </button>
                )}
              </h4>
              <h5>{profile.user.email}</h5>
              <div
                style={{
                  display: "flex",
                  margin: "20px 0px",
                  justifyContent: "space-between",
                  width: "130%",
                }}
              >
                <h6>{profile.posts.length} posts</h6>
                <h6>{profile.user.followers.length} followers</h6>
                <h6>{profile.user.following.length} following</h6>
              </div>
            </div>
          </div>
          <div className="mypost">
            {profile.posts.map((item) => {
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
        </div>
      ) : (
        <Loading></Loading>
      )}
    </React.Fragment>
  );
}
