import http from "./httpService";
import jwtDecode from "jwt-decode";
const apiEndpoint = "/signin";
const tokenKey = "token";

http.setJwt(getJwt()); //to get rid of bidirectional dependencies

export async function login(email, password) {
  const { data } = await http.post(apiEndpoint, { email, password });
  //localStorage.setItem(tokenKey, jwt);
  localStorage.setItem(tokenKey, data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  console.log(data);
}

export async function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.clear();
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

const auth = {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
export default auth;
