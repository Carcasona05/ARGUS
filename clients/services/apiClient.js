import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://172.20.10.2:3000/api",
  timeout: 10000, 
  headers: {
    "Content-Type": "application/json",
  },
});
export default apiClient;