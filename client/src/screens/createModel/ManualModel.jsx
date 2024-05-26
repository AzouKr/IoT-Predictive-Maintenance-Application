import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import {
  createManualModel,
  deleteModel,
  getDatasets,
} from "../../Hooks/Python";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function ManualModel() {
  const { theme } = useContext(ThemeContext); // Accessing theme from ThemeContext
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [datasets, setdatasets] = useState([]);
  const [selectedDataset, setselectedDataset] = useState("");
  const [selectedAlgo, setselectedAlgo] = useState("");
  const [name, setname] = useState("");
  const [type, settype] = useState(0);
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);
  const [validation, setvalidation] = useState(false);
  const [values, setvalues] = useState();

  const [n_neighbors, setn_neighbors] = useState(0);
  const [c, setc] = useState(0);
  const [gamma, setgamma] = useState(0);
  const [n_estimators, setn_estimators] = useState(0);
  const [max_depth, setmax_depth] = useState(0);
  const [learning_rate, setlearning_rate] = useState(0);

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
    if (
      name !== "" &&
      selectedDataset !== "" &&
      type !== "" &&
      selectedAlgo !== ""
    ) {
      let params;
      switch (selectedAlgo) {
        case "knn":
          params = `{'n_neighbors':[${n_neighbors}]}`;
          break;
        case "svc":
          params = `{'C': [${c}], 'gamma': [${gamma}], 'kernel': ['rbf'], 'probability': [True], 'random_state': [0]}`;
          break;
        case "rfc":
          params = `{'n_estimators':[${n_estimators}],'max_depth':[${max_depth}],'random_state':[0]}`;
          break;
        case "xgb":
          if (newtype === 0) {
            params = `{'n_estimators':[${n_estimators}],'max_depth':[${max_depth}],'learning_rate':[${learning_rate}],'random_state':[0],'objective':['binary:logistic']}`;
          } else {
            params = `{'n_estimators':[${n_estimators}],'max_depth':[${max_depth}],'learning_rate':[${learning_rate}],'random_state':[0],'objective':['multi:softprob']}`;
          }
          break;
      }
      createManualModel(name, selectedDataset, newtype, selectedAlgo, params)
        .then((res) => {
          setvalidation(true);
          var jsonData = JSON.parse(res);
          const combinedData = [
            {
              metric: "ACC",
              file1: jsonData.metrics_val.key.ACC,
              file2: jsonData.metrics_test.key.ACC,
            },
            {
              metric: "AUC",
              file1: jsonData.metrics_val.key.AUC,
              file2: jsonData.metrics_test.key.AUC,
            },
            {
              metric: "F1",
              file1: jsonData.metrics_val.key.F1,
              file2: jsonData.metrics_test.key.F1,
            },
            {
              metric: "F2",
              file1: jsonData.metrics_val.key.F2,
              file2: jsonData.metrics_test.key.F2,
            },
          ];
          setvalues(combinedData);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      seterror(true);
    }
  };

  const handleCreationCancle = async () => {
    const data = {
      name: selectedAlgo.toUpperCase() + "_" + name + ".joblib",
    };
    await deleteModel(data)
      .then((res) => {
        setTimeout(() => {
          navigate("/createmodel");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="h-[80vh] w-full ">
      {!loading ? (
        <>
          <div
            className={
              theme === LIGHT_THEME
                ? "min-h-min min-w-min p-[2vh]  flex "
                : "min-h-min min-w-min p-[2vh] flex"
            }
          >
            <div>
              <div className="h-[15vh] w-[74vh] flex items-center justify-center">
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
                className={`text-[3vh] ml-[14vh] ${
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
                className={`text-[3vh] ml-[14vh] ${
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
            <div>
              <div className="h-[15vh] w-[74vh] flex items-center justify-center">
                <select
                  className="select select-bordered w-full max-w-xs m-4 bg-white text-black"
                  onChange={(e) => {
                    setselectedAlgo(e.target.value);
                  }}
                >
                  <option disabled selected>
                    {t("label_creation_model_select_algo")}
                  </option>
                  <option value="knn">KNN</option>
                  <option value="svc">SVC</option>
                  <option value="rfc">Random Forest Classifier</option>
                  <option value="xgb">XGB Classifier</option>
                </select>
              </div>
              {selectedAlgo === "" ? null : selectedAlgo === "knn" ? (
                <>
                  <h1
                    className={`text-[3vh] ml-[14vh] ${
                      theme === LIGHT_THEME ? `text-black` : `text-white`
                    }`}
                  >
                    N neighbors :
                  </h1>
                  <div className="min-h-min w-full flex items-center justify-center mb-[3vh]">
                    <input
                      type="Number"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs bg-white text-black"
                      onChange={(e) => {
                        setn_neighbors(e.target.value);
                      }}
                    />
                  </div>
                </>
              ) : selectedAlgo === "svc" ? (
                <>
                  <h1
                    className={`text-[3vh] ml-[14vh] ${
                      theme === LIGHT_THEME ? `text-black` : `text-white`
                    }`}
                  >
                    C :
                  </h1>
                  <div className="min-h-min w-full flex items-center justify-center mb-[3vh]">
                    <input
                      type="Number"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs bg-white text-black"
                      onChange={(e) => {
                        setc(e.target.value);
                      }}
                    />
                  </div>
                  <h1
                    className={`text-[3vh] ml-[14vh] ${
                      theme === LIGHT_THEME ? `text-black` : `text-white`
                    }`}
                  >
                    Gamma :
                  </h1>
                  <div className="min-h-min w-full flex items-center justify-center mb-[3vh]">
                    <input
                      type="Number"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs bg-white text-black"
                      onChange={(e) => {
                        setgamma(e.target.value);
                      }}
                    />
                  </div>
                </>
              ) : selectedAlgo === "rfc" ? (
                <>
                  <h1
                    className={`text-[3vh] ml-[14vh] ${
                      theme === LIGHT_THEME ? `text-black` : `text-white`
                    }`}
                  >
                    N Estimators :
                  </h1>
                  <div className="min-h-min w-full flex items-center justify-center mb-[3vh]">
                    <input
                      type="Number"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs bg-white text-black"
                      onChange={(e) => {
                        setn_estimators(e.target.value);
                      }}
                    />
                  </div>
                  <h1
                    className={`text-[3vh] ml-[14vh] ${
                      theme === LIGHT_THEME ? `text-black` : `text-white`
                    }`}
                  >
                    Max Depth :
                  </h1>
                  <div className="min-h-min w-full flex items-center justify-center mb-[3vh]">
                    <input
                      type="Number"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs bg-white text-black"
                      onChange={(e) => {
                        setmax_depth(e.target.value);
                      }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <h1
                    className={`text-[3vh] ml-[14vh] ${
                      theme === LIGHT_THEME ? `text-black` : `text-white`
                    }`}
                  >
                    N Estimators :
                  </h1>
                  <div className="min-h-min w-full flex items-center justify-center mb-[3vh]">
                    <input
                      type="Number"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs bg-white text-black"
                      onChange={(e) => {
                        setn_estimators(e.target.value);
                      }}
                    />
                  </div>
                  <h1
                    className={`text-[3vh] ml-[14vh] ${
                      theme === LIGHT_THEME ? `text-black` : `text-white`
                    }`}
                  >
                    Max Depth :
                  </h1>
                  <div className="min-h-min w-full flex items-center justify-center mb-[3vh]">
                    <input
                      type="Number"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs bg-white text-black"
                      onChange={(e) => {
                        setmax_depth(e.target.value);
                      }}
                    />
                  </div>
                  <h1
                    className={`text-[3vh] ml-[14vh] ${
                      theme === LIGHT_THEME ? `text-black` : `text-white`
                    }`}
                  >
                    Learning rate :
                  </h1>
                  <div className="min-h-min w-full flex items-center justify-center mb-[3vh]">
                    <input
                      type="Number"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs bg-white text-black"
                      onChange={(e) => {
                        setlearning_rate(e.target.value);
                      }}
                    />
                  </div>
                </>
              )}
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
          </div>
          <div className="h-[15vh] w-full flex items-center justify-center">
            <button
              onClick={handleCreate}
              className="btn btn-wide bg-blue-600 dark:bg-blue-600 text-white hover:bg-blue-700"
            >
              {t("label_createModel_autoML_create")}
            </button>
          </div>
        </>
      ) : validation ? (
        <>
          <div className="h-[100vh] w-full">
            <div className="min-h-min w-full flex items-center">
              <h1
                className={`text-center text-[3vh] mb-[4vh] mr-[1vh] ${
                  theme === LIGHT_THEME ? `text-black` : `text-white`
                }`}
              >
                {t("label_createModel_manual_Mode_score")}
              </h1>
            </div>
            <div className="min-h-min w-full flex items-center justify-center">
              <div className="overflow-x-auto">
                <table
                  className={`table border-[0.3vh] ${
                    theme === LIGHT_THEME ? "border-black" : "border-white"
                  } ${theme === LIGHT_THEME ? `text-black` : `text-white`}`}
                >
                  {/* head */}
                  <thead
                    className={`${
                      theme === LIGHT_THEME ? `text-black` : `text-white`
                    }`}
                  >
                    <tr>
                      <th>Metrics</th>
                      <th>Validation scores:</th>
                      <th>Test scores:</th>
                    </tr>
                  </thead>
                  <tbody>
                    {values.map((item, index) => (
                      <tr key={index}>
                        <td className="text-center">{item.metric}</td>
                        <td className="text-center">{item.file1}</td>
                        <td className="text-center">{item.file2}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="h-[10vh] w-full mt-[3vh] flex items-center justify-center">
              <h1
                className={`text-center text-[3vh] mr-[1vh] ${
                  theme === LIGHT_THEME ? `text-black` : `text-white`
                }`}
              >
                {t("label_createModel_manual_Mode_question")}
              </h1>
            </div>
            <div className="min-h-min w-full flex items-center justify-center">
              <a href="/models">
                <button className="btn w-[10vh] bg-blue-600 dark:bg-blue-600 text-white hover:bg-blue-700 m-4">
                  {t("label_createModel_manual_Mode_yes")}
                </button>
              </a>
              <button
                onClick={handleCreationCancle}
                className="btn w-[10vh] bg-blue-600 dark:bg-blue-600 text-white hover:bg-blue-700 m-4"
              >
                {t("label_createModel_manual_Mode_no")}
              </button>
            </div>
          </div>
        </>
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

export default ManualModel;
