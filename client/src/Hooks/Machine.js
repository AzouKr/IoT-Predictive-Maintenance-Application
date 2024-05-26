import axios from "axios";
import { backend_url } from "./index";

export const assignMachine = async (data) => {
  try {
    const response = await axios.post(
      backend_url + `api/machinealert/assign`,
      data,
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

export const updateMachineAlert = async (data) => {
  try {
    const response = await axios.post(
      backend_url + `api/machinealert/update`,
      data,
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

export const getMachineAlertByMachine = async (id) => {
  try {
    const response = await axios.get(backend_url + `api/machinealert/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
