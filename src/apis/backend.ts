import axios from "axios";

const BackendApi = () =>
  axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    timeout: 3000,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });

export default BackendApi;
