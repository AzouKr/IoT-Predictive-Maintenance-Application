import axios from "axios";
import { backend_url } from "./index";

export const getTeams = async () => {
  try {
    const response = await axios.get(backend_url + `api/team/`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
      credentials: "include",
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
