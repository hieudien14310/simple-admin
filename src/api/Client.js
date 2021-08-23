import axios from "axios";
function Client() {
  const instance = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return instance;
}
export default Client();
