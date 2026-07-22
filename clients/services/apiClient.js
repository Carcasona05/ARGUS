import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://192.168.8.104:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
export default apiClient;
