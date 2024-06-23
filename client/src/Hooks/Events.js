import axios from "axios";
import { backend_url } from "./index";

export const addEvent = async (data) => {
  try {
    const response = await axios.post(backend_url + `api/events`, data, {
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

export const fetchEvents = async (data) => {
  try {
    const response = await axios.post(backend_url + `api/events/event`, data, {
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

export const deleteEvents = async (data) => {
  try {
    const response = await axios.post(backend_url + `api/events/delete`, data, {
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
