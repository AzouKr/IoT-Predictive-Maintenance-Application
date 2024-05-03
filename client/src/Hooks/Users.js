import axios from "axios";
import { backend_url } from "./index";

export const getUsers = async () => {
  try {
    const response = await axios.get(backend_url + `api/user/getall`, {
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
export const getUserById = async (id) => {
  try {
    const response = await axios.get(
      backend_url + `api/user/getuser?id=${id}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
        credentials: "include",
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const createUser = async (data) => {
  try {
    const response = await axios.post(backend_url + `api/auth/register`, data, {
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
export const editUser = async (data) => {
  try {
    const response = await axios.post(backend_url + `api/user/edit`, data, {
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
export const deleteUser = async (id) => {
  try {
    const response = await axios.post(backend_url + `api/user/delete`, id, {
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
