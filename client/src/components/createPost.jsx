import React, { useState } from "react";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");

  return (
    <div className="card home insidecard">
      <div className="input-field">
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="input-field ">
        <input
          type="text"
          placeholder="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
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
      <button className="waves-effect waves-light btn btn-block #42a5f5 blue lighten-1">
        Post
      </button>
    </div>
  );
}
