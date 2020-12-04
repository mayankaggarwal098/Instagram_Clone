import React from "react";

export default function CreatePost() {
  return (
    <div className="card home">
      <div class="input-field">
        <input type="text" placeholder="title" />
      </div>
      <div class="input-field ">
        <input type="text" />
      </div>
      <div class="file-field input-field">
        <div class="btn">
          <span>File</span>
          <input type="file" />
        </div>
        <div class="file-path-wrapper">
          <input class="file-path validate" type="text" />
        </div>
      </div>
    </div>
  );
}
