import http from "./httpService";

const url = "https://api.cloudinary.com/v1_1/cloud098/image/upload";

// const headers = {
//   "content-type": "multipart/form-data",
//   "Access-Control-Allow-Headers": "*",
//   "x-auth-token": "*",
// };
// const headers = {
//   "Content-Type": "application/json",
//   "x-auth-token": "",
// };
// let axiosConfig = {
//   headers: {
//     "Content-Type": "application/json;charset=UTF-8",
//     "Access-Control-Allow-Origin": "*",
//   },
// };
// export function savePost(post) {
//   return http.post(url, {
//     body: post,
//   });
// }

export function savePost(data) {
  return fetch(url, {
    method: "post",
    body: data,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
