import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://192.168.8.104:3000/api",
  timeout: 10000, 
  headers: {
    "Content-Type": "application/json",
  },
});
export default apiClient;
