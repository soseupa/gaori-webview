import axios from "axios";

export const server = axios.create({
  baseURL: process.env.SERVER_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

server.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      console.log(error.response);
    } else {
      // alert(error.response.data.message);
    }
    return Promise.reject(error);
  }
);

server.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
