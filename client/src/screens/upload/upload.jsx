import React, { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import axios from "axios";

function Upload() {
  const { theme } = useContext(ThemeContext); // Accessing theme from ThemeContext
  const [file, setFile] = useState(null);
  const [error, seterror] = useState(false);
  const [alert, setalert] = useState(false);
  const [alertmsg, setalertmsg] = useState("");
  const [errormsg, seterrormsg] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    seterror(false);
    setalert(false);
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://127.0.0.1:8080/upload", formData)
      .then((response) => {
        if (response.data.bool) {
          setalertmsg("File uploaded successfully");
          setalert(true);
        } else {
          seterrormsg("File uploaded failed");
          seterror(true);
        }
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  return (
    <div className="min-h-min w-full">
      <h1
        className={
          theme === LIGHT_THEME
            ? "text-center text-black text-[4vh] mt-[10vh]"
            : "text-center text-white text-[4vh] mt-[10vh]"
        }
      >
        Télécharger une Dataset
      </h1>
      <div className="min-h-min w-full flex items-center justify-center mt-[5vh]">
        <div
          className={
            theme === LIGHT_THEME
              ? "min-h-min w-[100vh] border-[0.4vh] rounded-[2vh] border-black"
              : "min-h-min w-[100vh] border-[0.4vh] rounded-[2vh] border-white"
          }
        >
          <div className="h-[13vh] w-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className={
                theme === LIGHT_THEME
                  ? "h-[8vh] w-[8vh] text-black"
                  : "h-[8vh] w-[8vh] text-white"
              }
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
          </div>
          <div className="h-[13vh] w-full flex items-center">
            <input
              type="file"
              className={
                theme === LIGHT_THEME
                  ? "text-black  ml-[36vh]"
                  : "text-white ml-[36vh]"
              }
              onChange={handleFileChange}
            />
          </div>
          <div className="h-[13vh] w-full flex items-center justify-center">
            <button
              onClick={handleUpload}
              className="btn bg-blue-600 dark:bg-blue-600 text-white hover:bg-blue-700 m-4"
            >
              Télécharger
            </button>
          </div>
        </div>
      </div>
      <div className="min-h-min w-full flex items-center justify-center mt-[5vh]">
        <div className="min-h-min w-[100vh]">
          {alert ? (
            <div role="alert" className="alert alert-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{alertmsg}</span>
            </div>
          ) : null}
          {error ? (
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{errormsg}</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Upload;
