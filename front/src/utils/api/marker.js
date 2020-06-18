import { axios } from "../../core";

export default {
  //   signIn: (postData) => axios.post("/user/signin", postData),
  //   signUp: (postData) => axios.post("/user/signup", postData),
  //   getMe: () => axios.get("/user/me"),
  createMarker: (postData) => axios.post("/marker/create", postData),
  getAll: () => axios.get("/marker/getall"),
};
