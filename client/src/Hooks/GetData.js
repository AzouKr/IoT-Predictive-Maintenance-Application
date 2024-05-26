import axios from "axios";
import { backend_url } from "./index";

export const getData = async (id) => {
  try {
    const response = await axios.get(backend_url + `api/data/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
