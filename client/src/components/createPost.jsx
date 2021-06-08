import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreatePost() {
  const history = useHistory();
  const [caption, setcaption] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    if (url) {
      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          caption,
          img: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          } else {
            //console.log(data);
            toast("Successfully Posted");
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);

  const imageValidation = (img) => {
    if (!img) {
      toast.error("Please select Image");
      setFlag(false);
      return;
    }
    if (!img.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      toast.error("Please select valid Image");
      setFlag(false);
      return;
    }
    setImage(img);
    setFlag(true);
  };

  const savePost = (data) => {
    return fetch("https://api.cloudinary.com/v1_1/cloud098/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("upload_preset", "insta-clone");
    data.append("file", image);

    data.append("cloud_name", "cloud098");
    // console.log(data);
    //const url="https://api.cloudinary.com/v1_1/cloud098/image/upload";
    try {
      await savePost(data);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
    }
  };
  return (
    <div className="card home insidecard">
      <div className="input-field">
        <input
          type="text"
          placeholder="caption"
          value={caption}
          onChange={(e) => setcaption(e.target.value)}
        />
      </div>

      <div className="file-field input-field">
        <div className="btn  #42a5f5 blue lighten-1">
          <span>Upload Image</span>

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
      {flag && (
        <button
          onClick={handleSubmit}
          className="waves-effect waves-light  btn btn-block #42a5f5 blue lighten-1"
        >
          Post
        </button>
      )}
      {!flag && (
        <button
          onClick={handleSubmit}
          className="waves-effect waves-light  disabled btn btn-block #42a5f5 blue lighten-1"
        >
          Post
        </button>
      )}
    </div>
  );
}
