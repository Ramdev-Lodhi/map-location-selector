import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const signin = (post) => {
  return api.post("/signin", post);
};
export const signup = (post) => {
  return api.post("/signup", post);
};
