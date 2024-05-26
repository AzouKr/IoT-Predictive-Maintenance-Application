import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import { createAutoModel, getDatasets } from "../../Hooks/Python";
import { useTranslation } from "react-i18next";

function AutoModel() {
  const { theme } = useContext(ThemeContext); // Accessing theme from ThemeContext
  const { t, i18n } = useTranslation();

  const [datasets, setdatasets] = useState([]);
  const [selectedDataset, setselectedDataset] = useState("");
  const [name, setname] = useState("");
  const [type, settype] = useState(0);
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);

  const fetchData = async () => {
    await getDatasets().then((response) => {
      setdatasets(response);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = () => {
    seterror(false);
    setloading(true);
    const newtype = Number(type);
    if (name !== "" && selectedDataset !== "") {
      createAutoModel(name, selectedDataset, newtype)
        .then((res) => {
          setloading(false);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      seterror(true);
    }
  };

  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      {!loading ? (
        <div
          className={
            theme === LIGHT_THEME
              ? "min-h-min w-[60vh] border-[0.4vh] rounded-[2vh] border-black"
              : "min-h-min w-[60vh] border-[0.4vh] rounded-[2vh] border-white"
          }
        >
          <div className="h-[15vh] w-full flex items-center justify-center">
            <select
              className="select select-bordered w-full max-w-xs m-4 bg-white text-black"
              onChange={(e) => {
                setselectedDataset(e.target.value);
              }}
            >
              <option disabled selected>
                {t("label_profiling_selectDataset")}
              </option>
              {datasets.map((dataset, index) => (
                <option key={index} value={dataset}>
                  {dataset}
                </option>
              ))}
            </select>
          </div>
          <h1
            className={`text-[3vh] ml-[6vh] ${
              theme === LIGHT_THEME ? `text-black` : `text-white`
            }`}
          >
            {t("label_createModel_autoML_Name")}
          </h1>
          <div className="min-h-min w-full flex items-center justify-center mb-[3vh]">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs bg-white text-black"
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
          </div>
          <h1
            className={`text-[3vh] ml-[6vh] ${
              theme === LIGHT_THEME ? `text-black` : `text-white`
            }`}
          >
            {t("label_createModel_autoML_Type")}
          </h1>
          <div className="min-h-min w-full flex items-center justify-center">
            <select
              onChange={(e) => {
                settype(e.target.value);
              }}
              className="select select-bordered w-full max-w-xs bg-white text-black"
            >
              <option disabled selected>
                {t("label_createModel_autoML_Type_Or")}
              </option>
              <option value={0}>Binary</option>
              <option value={1}>Multiclass</option>
            </select>
          </div>
          <div className="h-[15vh] w-full flex items-center justify-center">
            <button
              onClick={handleCreate}
              className="btn btn-wide bg-blue-600 dark:bg-blue-600 text-white hover:bg-blue-700"
            >
              {t("label_createModel_autoML_create")}
            </button>
          </div>
          {error ? (
            <div className="min-h-min w-full flex items-center justify-center">
              <div role="alert" className="alert alert-error m-4 ">
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
                <span>{t("label_empty_fields_error")}</span>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div>
          <h1
            className={`text-center text-[3vh] mr-[1vh] ${
              theme === LIGHT_THEME ? `text-black` : `text-white`
            }`}
          >
            {t("label_creation_model_wait_text")}
          </h1>
          <h1
            className={`text-center text-[3vh] mr-[1vh] ${
              theme === LIGHT_THEME ? `text-black` : `text-white`
            }`}
          >
            {t("label_creation_model_wait_text2")}
          </h1>
          <h1
            className={`text-center text-[3vh] mr-[1vh] ${
              theme === LIGHT_THEME ? `text-black` : `text-white`
            }`}
          >
            {t("label_creation_model_wait_text3")}
          </h1>
          <div className="flex items-center justify-center mt-[1vh]">
            <span
              className={`loading loading-dots loading-md ${
                theme === LIGHT_THEME ? `text-black` : `text-white`
              }`}
            ></span>
          </div>
        </div>
      )}
    </div>
  );
}

export default AutoModel;
