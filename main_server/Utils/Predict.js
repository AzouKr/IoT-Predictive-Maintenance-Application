const axios = require("axios");

const Prediction = async (data) => {
  const requestData = {
    data: data,
  };
  // Make an HTTP POST request to the Flask server
  return axios
    .post("http://localhost:8080/predict", requestData)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error); // Log any errors that occur during the request
      throw error; // Propagate the error to the caller
    });
};

module.exports = Prediction;
