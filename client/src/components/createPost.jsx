import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreatePost() {
  const history = useHistory();
  const [caption, setcaption] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

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
            //    M.toast({html: data.error,classes:"#c62828 red darken-3"})
          } else {
            //     M.toast({html:"Created post Successfully",classes:"#43a047 green darken-1"})
            toast("Successfully Posted");
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);

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
    console.log(data);
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
          <span>File</span>

          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="waves-effect waves-light btn btn-block #42a5f5 blue lighten-1"
      >
        Post
      </button>
    </div>
  );
}
