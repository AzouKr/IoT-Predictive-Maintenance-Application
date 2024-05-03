import axios from "axios";

export const getProfiling = async (dataset) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8080/profiling",
      { data: dataset },
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

export const getDatasets = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8080/files", {
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

export const getCsvFile = async (name) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8080/download_csv",
      { name: name },
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

export const createAutoModel = async (modelName, datasetName, type) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8080/auto/create",
      { name: modelName, dataset: datasetName, type: type },
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

export const createManualModel = async (
  modelName,
  datasetName,
  type,
  model,
  params
) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8080/auto/create",
      {
        name: modelName,
        dataset: datasetName,
        type: type,
        model: model,
        params: params,
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

export const getModels = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8080/models", {
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
