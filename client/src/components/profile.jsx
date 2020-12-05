import React from "react";

export default function Profile() {
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
          <h4>Mayank Aggarwal</h4>
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
        <img
          src="https://www.sapiens.org/wp-content/uploads/2019/07/01-5484600746_a29869fd35_o_compressed-1076x588.jpg"
          alt="profile img"
          className="mypic"
        />
        <img
          src="https://www.sapiens.org/wp-content/uploads/2019/07/01-5484600746_a29869fd35_o_compressed-1076x588.jpg"
          alt="profile img"
          className="mypic"
        />
        <img
          src="https://www.sapiens.org/wp-content/uploads/2019/07/01-5484600746_a29869fd35_o_compressed-1076x588.jpg"
          alt="profile img"
          className="mypic"
        />
        <img
          src="https://www.sapiens.org/wp-content/uploads/2019/07/01-5484600746_a29869fd35_o_compressed-1076x588.jpg"
          alt="profile img"
          className="mypic"
        />
        <img
          src="https://www.sapiens.org/wp-content/uploads/2019/07/01-5484600746_a29869fd35_o_compressed-1076x588.jpg"
          alt="profile img"
          className="mypic"
        />
        <img
          src="https://www.sapiens.org/wp-content/uploads/2019/07/01-5484600746_a29869fd35_o_compressed-1076x588.jpg"
          alt="profile img"
          className="mypic"
        />
        <img
          src="https://www.sapiens.org/wp-content/uploads/2019/07/01-5484600746_a29869fd35_o_compressed-1076x588.jpg"
          alt="profile img"
          className="mypic"
        />
      </div>
    </div>
  );
}
