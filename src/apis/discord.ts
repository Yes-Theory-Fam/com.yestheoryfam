import axios from "axios";

const DiscordApi = (type = "user") => {
  const api = axios.create({
    baseURL: "https://discordapp.com/api/",
    timeout: 3000,
    headers: {
      Authorization: type === "user" ? `Bearer ${localStorage.getItem("access_token")}` : "",
    },
  });
  return api;
};

export default DiscordApi;
