import axios from "axios";
import { backend_url } from "./index";

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      backend_url + `api/auth/login`,
      {
        email: email,
        password: password,
      },
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

export const resetPass = async (email, password) => {
  try {
    const response = await axios.post(
      backend_url + `api/auth/reset`,
      {
        email: email,
        password: password,
      },
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

export const sendLink = async (email) => {
  try {
    const response = await axios.post(
      backend_url + `api/auth/link/genreate`,
      {
        email: email,
      },
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

export const logout = async () => {
  try {
    const response = await axios.delete(backend_url + `api/auth/logout`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
      credentials: "include",
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
