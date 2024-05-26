import { AreaTop } from "../../components";
import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import { deleteModel, getModel, getModels, useModel } from "../../Hooks/Python";
import "./Models.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Models = () => {
  const { theme } = useContext(ThemeContext);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeType, setActiveType] = useState("all");
  const backgroundColor = theme === LIGHT_THEME ? "#F3F4F6" : "#2e2e48";
  const categoryTitleClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const typeTitleClick = (typeId) => {
    setActiveType(typeId);
  };

  const [data, setdata] = useState([]);
  const [usedModel, setusedModel] = useState();
  const { t, i18n } = useTranslation();

  const fetchData = async () => {
    await getModels().then((response) => {
      const models = [];
      response.forEach((element) => {
        if (element.slice(-6) === "joblib") {
          models.push(element);
        }
      });
      setdata(models);
    });
    await getModel().then((response) => {
      const models = [];
      response.forEach((element) => {
        if (element.slice(-6) === "joblib") {
          models.push(element);
        }
      });
      setusedModel(models[0]);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const useModelHandler = async (modelname) => {
    const data = {
      name: modelname,
    };
    await useModel(data)
      .then((res) => {
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const posts = [
    {
      id: 1,
      category: "KNN",
      date: "January 01, 2XXX",
      Dataset: "JJJJJ",
      title: "Lorem ipsum dolor sit amet",
      type: "Binary",
      Acc: 55,
      Auc: 55,
      F1: 55,
      F2: 55,
    },
    {
      id: 1,
      category: "KNN",
      date: "January 01, 2XXX",
      Dataset: "JJJJJ",
      title: "Lorem ipsum dolor sit amet",
      type: "Binary",
      Acc: 55,
      Auc: 55,
      F1: 55,
      F2: 55,
    },
    {
      id: 1,
      category: "KNN",
      date: "January 01, 2XXX",
      Dataset: "JJJJJ",
      title: "Lorem ipsum dolor sit amet",
      type: "Binary",
      Acc: 55,
      Auc: 55,
      F1: 55,
      F2: 55,
    },
    {
      id: 1,
      category: "KNN",
      date: "January 01, 2XXX",
      Dataset: "JJJJJ",
      title: "Lorem ipsum dolor sit amet",
      type: "Multi",
      Acc: 55,
      Auc: 55,
      F1: 55,
      F2: 55,
    },
  ];

  const navigate = useNavigate();

  const handleShowInfo = (name) => {
    navigate("/models/metrics", { state: name.slice(0, -7) });
  };
  const handleDelete = async (name) => {
    const data = {
      name: name.slice(0, -7),
    };
    await deleteModel(data)
      .then((res) => {
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={`content-area ${theme === LIGHT_THEME ? "" : "dark-mode"}`}>
      <div className="main-container">
        {/* <h2>Browse Our Collection of ML Algorithms</h2> */}
        <h2 className={theme === LIGHT_THEME ? "text-black" : "text-white"}>
          Machine Learning Models Showcase
        </h2>
        <p className={theme === LIGHT_THEME ? "text-black" : "text-white"}>
          Filter models based on their application areas and algorithm types.
        </p>
        <div className="filter-container">
          {/* Type Filter */}
          <div className="type-head">
            <ul>
              <div
                className={`type-title ${activeType === "all" ? "active" : ""}`}
                id="all"
                onClick={() => typeTitleClick("all")}
              >
                <li>All Types</li>
              </div>
              <div
                className={`type-title ${
                  activeType === "Binary" ? "active" : ""
                }`}
                id="Binary"
                onClick={() => typeTitleClick("Binary")}
              >
                <li>Binary</li>
              </div>
              <div
                className={`type-title ${
                  activeType === "Multi" ? "active" : ""
                }`}
                id="Multi"
                onClick={() => typeTitleClick("Multi")}
              >
                <li>Multi</li>
              </div>
            </ul>
          </div>
          {/* Category Filter */}
          <div>
            <ul className="w-full flex items-center justify-center ">
              <div
                className={`category-title ${
                  activeCategory === "all" ? "active" : ""
                }`}
                id="all"
                onClick={() => categoryTitleClick("all")}
              >
                <li>All</li>
                <span>
                  <i className="fas fa-border-all"></i>
                </span>
              </div>
              <div
                className={`category-title ${
                  activeCategory === "KNN" ? "active" : ""
                }`}
                id="KNN"
                onClick={() => categoryTitleClick("KNN")}
              >
                <li>KNN</li>
                <span>
                  <i className="fas fa-theater-masks"></i>
                </span>
              </div>
              <div
                className={`category-title ${
                  activeCategory === "RNC" ? "active" : ""
                }`}
                id="RNC"
                onClick={() => categoryTitleClick("RNC")}
              >
                <li>RNC</li>
                <span>
                  <i className="fas fa-landmark"></i>
                </span>
              </div>
              <div
                className={`category-title ${
                  activeCategory === "XGB" ? "active" : ""
                }`}
                id="XGB"
                onClick={() => categoryTitleClick("XGB")}
              >
                <li>XGB</li>
                <span>
                  <i className="fas fa-coins"></i>
                </span>
              </div>
              <div
                className={`category-title ${
                  activeCategory === "SVM" ? "active" : ""
                }`}
                id="SVM"
                onClick={() => categoryTitleClick("SVM")}
              >
                <li>SVM</li>
                <span>
                  <i className="fas fa-running"></i>
                </span>
              </div>
            </ul>
          </div>
          <div className="posts-collect">
            <div className="posts-main-container">
              {data.map((modelName, index) => (
                <div
                  key={index}
                  className={`relative model_box rounded-md min-h-min w-[30vh]  
                  ${
                    (activeType === "all" ||
                      activeType === modelName.slice(0, -7).split("_")[0]) &&
                    (activeCategory === "all" ||
                      activeCategory === modelName.slice(0, -7).split("_")[1])
                      ? ""
                      : "hidden"
                  }
                  m-4 ${theme === LIGHT_THEME ? "bg-white" : "bg-black"} ${
                    usedModel === modelName
                      ? "border-[0.5vh] border-green-700"
                      : ""
                  }`}
                >
                  {modelName === usedModel ? (
                    <svg
                      viewBox="0 0 1024 1024"
                      fill="currentColor"
                      className="absolute top-[0.5vh] right-[0.5vh] h-8 w-8 text-green-700"
                    >
                      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="cursor-pointer absolute top-[0.5vh] right-[0.5vh] h-8 w-8 text-red-700"
                      onClick={() => {
                        handleDelete(modelName);
                      }}
                    >
                      <path d="M12 2c5.53 0 10 4.47 10 10s-4.47 10-10 10S2 17.53 2 12 6.47 2 12 2m5 5h-2.5l-1-1h-3l-1 1H7v2h10V7M9 18h6a1 1 0 001-1v-7H8v7a1 1 0 001 1z" />
                    </svg>
                  )}

                  <svg
                    viewBox="0 0 1024 1024"
                    fill="currentColor"
                    onClick={() => {
                      handleShowInfo(modelName);
                    }}
                    className={`cursor-pointer absolute top-[0.5vh] left-[0.5vh] h-8 w-8 ${
                      theme === LIGHT_THEME ? "text-black" : "text-white"
                    }`}
                  >
                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" />
                  </svg>
                  <div className="w-full h-[20vh] flex items-center justify-center">
                    <svg
                      viewBox="0 0 1024 1024"
                      fill="currentColor"
                      className={`h-[15vh] w-[15vh] ${
                        theme === LIGHT_THEME ? `text-black` : `text-white`
                      }`}
                    >
                      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm243.7 589.2L512 794 268.3 653.2V371.8l110-63.6-.4-.2h.2L512 231l134 77h-.2l-.3.2 110.1 63.6v281.4zM307.9 536.7l87.6 49.9V681l96.7 55.9V524.8L307.9 418.4zm203.9-151.8L418 331l-91.1 52.6 185.2 107 185.2-106.9-91.4-52.8zm20 352l97.3-56.2v-94.1l87-49.5V418.5L531.8 525z" />
                    </svg>
                  </div>
                  <div className="w-full h-[5vh] flex items-center p-4">
                    <h1
                      className={`text-[1.7vh] ${
                        theme === LIGHT_THEME ? `text-black` : `text-white`
                      }`}
                    >
                      Name: {modelName.slice(0, -7).split("_")[2]}
                    </h1>
                  </div>
                  <div className="w-full h-[5vh] flex items-center p-4">
                    <h1
                      className={`text-[1.7vh] ${
                        theme === LIGHT_THEME ? `text-black` : `text-white`
                      }`}
                    >
                      Type : {modelName.slice(0, -7).split("_")[0]}
                    </h1>
                  </div>
                  <div className="w-full h-[5vh] flex items-center p-4">
                    <h1
                      className={`text-[1.7vh] ${
                        theme === LIGHT_THEME ? `text-black` : `text-white`
                      }`}
                    >
                      Algo : {modelName.slice(0, -7).split("_")[1]}
                    </h1>
                  </div>
                  {modelName !== usedModel ? (
                    <div className="w-full h-[10vh] flex items-center justify-center">
                      <button
                        onClick={(e) => {
                          useModelHandler(modelName);
                        }}
                        className="btn btn-success text-white btn-md"
                      >
                        {t("label_models_btn")}
                      </button>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Models;
