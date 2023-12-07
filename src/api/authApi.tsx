import axios from "axios";

const baseURL = "http://127.0.0.1:3000/api/v1";

export const authApi = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

authApi.defaults.headers.common["Content-Type"] = "application/json";