import React, { useRef, useState } from "react";
import "./FileUpload.scss";
import axios from "axios";
import {
  MdUploadFile,
  MdOutlineInsertDriveFile,
  MdClose,
} from "react-icons/md";
import { useTranslation } from "react-i18next";

const FileUpload = () => {
  const inputRef = useRef();
  const { t } = useTranslation();

  const [file, setfile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("select");
  const [error, seterror] = useState(false);
  const [alert, setalert] = useState(false);
  const [alertmsg, setalertmsg] = useState("");
  const [errormsg, seterrormsg] = useState("");

  const onChooseFile = () => {
    inputRef.current.click();
  };

  const clearFileInput = () => {
    inputRef.current.value = "";
    setfile(null);
    setProgress(0);
    setUploadStatus("select");
  };

  const handleUpload = async () => {
    if (uploadStatus === "done") {
      clearFileInput();
      window.location.reload();
      return;
    }

    try {
      setUploadStatus("uploading");

      seterror(false);
      setalert(false);
      const formData = new FormData();
      formData.append("file", file);

      axios
        .post("http://127.0.0.1:8080/upload", formData)
        .then((response) => {
          runProgress().then((res) => {
            if (response.data.bool) {
              setUploadStatus("done");
            } else {
              alert("Upload Failed");
            }
          });
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    } catch (error) {
      setUploadStatus("select");
    }
  };

  async function runProgress() {
    for (let index = 0; index < 100; index++) {
      await new Promise((resolve) => {
        setTimeout(() => {
          setProgress(index);
          resolve();
        }, 30); // Delay each iteration by 30 milliseconds
      });
    }
  }

  const handleFileChange = (e) => {
    setfile(e.target.files[0]);
  };

  return (
    <div className="flex items-start justify-center">
      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {!file && (
        <button className="file-btn" onClick={onChooseFile}>
          <span className="material-icons">
            <MdUploadFile size={30} />
          </span>{" "}
          {t("Upload File")}
        </button>
      )}

      {file && (
        <div className="file-card">
          <span className="material-symbols-outlined icon">
            <MdOutlineInsertDriveFile size={30} />
          </span>

          <div className="file-info">
            <div style={{ flex: 1 }}>
              <h6>{file?.name}</h6>

              <div className="progress-bg">
                <div className="progress" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {uploadStatus === "select" ? (
              <button onClick={clearFileInput}>
                <span className="material-symbols-outlined close-icon">
                  <MdClose size={25} />
                </span>
              </button>
            ) : (
              <div className="check-circle">
                {uploadStatus === "uploading" ? (
                  `${progress}%`
                ) : uploadStatus === "done" ? (
                  <svg
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    className="h-[3vh] w-[3vh]"
                  >
                    <path d="M414.25 225.36c-6.52-41.18-24.05-76.4-51.11-102.46A153.57 153.57 0 00256 80c-35.5 0-68.24 11.69-94.68 33.8a156.42 156.42 0 00-45.22 63.61c-30.26 4.81-57.45 17.18-77.38 35.37C13.39 235.88 0 267.42 0 304c0 36 14.38 68.88 40.49 92.59C65.64 419.43 99.56 432 136 432h260c32.37 0 60.23-8.57 80.59-24.77C499.76 388.78 512 361.39 512 328c0-61.85-48.44-95.34-97.75-102.64zm-204.63 135l-69.22-76.7 23.76-21.44 44.62 49.46 106.29-126.2 24.47 20.61z" />
                  </svg>
                ) : null}
              </div>
            )}
          </div>
          <button className="upload-btn" onClick={handleUpload}>
            {uploadStatus === "select" || uploadStatus === "uploading"
              ? t("Upload")
              : t("Done")}
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
