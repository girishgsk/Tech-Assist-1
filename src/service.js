import axios from "axios";

const axiosObj = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosObj.interceptors.request.use((config) => {
  const useremail = localStorage.getItem("regestration");
  if (useremail) {
    config.headers = {
      ...config.headers,
      email: useremail,
    };
  }
  return config;
});

export const login = (data) => {
  return axiosObj.post("/login", data);
};

export const signup = (data) => {
  return axiosObj.post("/signup", data);
};