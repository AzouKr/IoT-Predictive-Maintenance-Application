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

export const getOneTeam = async () => {
  try {
    const response = await axios.get(backend_url + `api/team/one`, {
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

export const getTeam = async () => {
  try {
    const response = await axios.get(backend_url + `api/team/availableworker`, {
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

export const getAvailableUsers = async () => {
  try {
    const response = await axios.get(backend_url + `api/team/availableuser`, {
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

export const createTeam = async (data) => {
  try {
    const response = await axios.post(
      backend_url + `api/team/createteam`,
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

export const AddTeamMember = async (data) => {
  try {
    const response = await axios.post(backend_url + `api/team/add`, data, {
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

export const deleteMember = async (data) => {
  try {
    const response = await axios.post(backend_url + `api/team/delete`, data, {
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

// export const editUser = async (data) => {
//   try {
//     const response = await axios.post(backend_url + `api/user/edit`, data, {
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       withCredentials: true,
//       credentials: "include",
//     });
//     return response.data;
//   } catch (error) {
//     return error;
//   }
// };
// export const deleteUser = async (id) => {
//   try {
//     const response = await axios.post(backend_url + `api/user/delete`, id, {
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       withCredentials: true,
//       credentials: "include",
//     });
//     return response.data;
//   } catch (error) {
//     return error;
//   }
// };
