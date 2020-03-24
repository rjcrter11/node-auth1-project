import axios from "axios";

export const cookieAuth = () => {
  return axios.create({
    baseURL: "https://localhost:5000/api/users",
    headers: {
      Authorization: `Bearer ${Cookie_joke}`
    }
  });
};
