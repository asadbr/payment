import axios from "axios";

export const mainApi = axios.create({
  baseURL: process.env.VUE_APP_DB_API,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
