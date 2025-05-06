import axios from "axios";
import Cookies from "js-cookie"; 

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 10000,
  headers: {
    accesstoken: Cookies.get("accesstoken"),
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accesstoken = Cookies.get("accesstoken");
    if (accesstoken) {
      config.headers.Authorization = `Bearer ${accesstoken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      console.error("Response error:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
