import http from "./httpService";
const apiEndpoint = "/signin";
const tokenKey = "token";

export async function login(email, password) {
  const { data } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
}

export async function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.clear();
}

const auth = {
  login,
  loginWithJwt,
  logout,
};
export default auth;
