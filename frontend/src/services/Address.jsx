import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/address",
});

const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

export const addressInsert = (data) => {
  const token = getAuthToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return api.post("/addressInsert", data, { headers });
};
export const address = () => {
  const token = getAuthToken();
  console.log(token);

  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return api.get("/getaddress", { headers });
};
export const addressDelete = (data) => {
  const token = getAuthToken();
  console.log(token);
  console.log(data);
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return api.post("/addressDelete", data, { headers });
};
export const addressUpdate = (data) => {
  const token = getAuthToken();
  console.log(token);
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return api.post("/addressUpdate", data, { headers });
};
