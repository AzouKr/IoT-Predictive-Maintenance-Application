import React, { useRef, useState } from "react";
import "./FileUpload.scss";
import axios from "axios";
import {
  MdUploadFile,
  MdOutlineInsertDriveFile,
  MdClose,
  MdDataset,
} from "react-icons/md";

const FileUpload = () => {
  const inputRef = useRef();

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
    // <div className="flex items-start justify-center h-screen">
    <div className="flex items-start justify-center">
      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {/* Button to trigger the file input dialog */}
      {!file && (
        <button className="file-btn" onClick={onChooseFile}>
          {/* <span className="material-symbols-outlined">upload</span> Upload File */}
          <span className="material-icons">
            <MdUploadFile size={30} />
          </span>{" "}
          Upload File
        </button>
      )}

      {file && (
        <>
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
                  <span class="material-symbols-outlined close-icon">
                    <MdClose size={25} />
                  </span>
                </button>
              ) : (
                <div className="check-circle">
                  {uploadStatus === "uploading" ? (
                    `${progress}%`
                  ) : uploadStatus === "done" ? (
                    <span
                      class="material-symbols-outlined"
                      style={{ fontSize: "20px" }}
                    >
                      check
                    </span>
                  ) : null}
                </div>
              )}
            </div>
            <button className="upload-btn" onClick={handleUpload}>
              {uploadStatus === "select" || uploadStatus === "uploading"
                ? "Upload"
                : "Done"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FileUpload;
