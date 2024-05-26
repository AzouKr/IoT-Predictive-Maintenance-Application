import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import { deleteDataset, getDatasetsInfo } from "../../Hooks/Python";
import { useTranslation } from "react-i18next";

function ListCsv() {
  const { theme } = useContext(ThemeContext); // Accessing theme from ThemeContext
  const [datasets, setdatasets] = useState([]);
  const { t, i18n } = useTranslation();

  const fetchData = async () => {
    await getDatasetsInfo().then((response) => {
      setdatasets(response);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteDatasetHandler = async (name) => {
    const data = {
      name: name,
    };
    await deleteDataset(data)
      .then((res) => {
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="h-[100vh] w-full">
      {datasets !== undefined ? (
        <>
          <h3
            className={`text-[4vh] ${
              theme === LIGHT_THEME ? `text-black` : `text-white`
            } mb-[3vh]`}
          >
            {t("label_datasetList_title")}
          </h3>
          <div className="h-[30vh] w-full">
            <div
              className={`h-[7vh] mb-[1vh] w-full flex shadow-md ${
                theme === LIGHT_THEME ? `bg-white` : `bg-[#2e2e48]`
              }`}
            >
              <div className="h-full w-[15vh] flex items-center justify-center"></div>
              <div className="h-full w-[30vh] flex items-center">
                <h1
                  className={`text-[3vh] ${
                    theme === LIGHT_THEME ? `text-black` : `text-white`
                  }`}
                >
                  {t("label_datasetList_name")}
                </h1>
              </div>
              <div className="h-full w-[30vh] flex items-center">
                <h1
                  className={`text-[3vh] ${
                    theme === LIGHT_THEME ? `text-black` : `text-white`
                  }`}
                >
                  {t("label_datasetList_date")}
                </h1>
              </div>
            </div>
            {datasets.map((dataset, index) => (
              <div
                key={index}
                className={`h-[10vh] mb-[1vh] w-full flex shadow-md ${
                  theme === LIGHT_THEME ? `bg-white` : `bg-[#2e2e48]`
                }`}
              >
                <div className="h-full w-[15vh] flex items-center justify-center">
                  <svg
                    viewBox="0 0 384 512"
                    fill="currentColor"
                    className={`w-8 h-8 ${
                      theme === LIGHT_THEME ? `text-black` : `text-white`
                    }`}
                  >
                    <path d="M64 0C28.7 0 0 28.7 0 64v384c0 35.3 28.7 64 64 64h256c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zm192 0v128h128L256 0zM80 224h16c22.1 0 40 17.9 40 40v8c0 8.8-7.2 16-16 16s-16-7.2-16-16v-8c0-4.4-3.6-8-8-8H80c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8v-8c0-8.8 7.2-16 16-16s16 7.2 16 16v8c0 22.1-17.9 40-40 40H80c-22.1 0-40-17.9-40-40v-80c0-22.1 17.9-40 40-40zm72 46.4c0-25.6 20.8-46.4 46.4-46.4H216c8.8 0 16 7.2 16 16s-7.2 16-16 16h-17.6c-7.9 0-14.4 6.4-14.4 14.4 0 5.2 2.8 9.9 7.2 12.5l25.4 14.5C231 305.7 240 321 240 337.7c0 25.6-20.8 46.4-46.4 46.4H168c-8.8 0-16-7.2-16-16s7.2-16 16-16h25.6c7.9 0 14.4-6.4 14.4-14.4 0-5.2-2.8-9.9-7.2-12.5l-25.4-14.5c-14.5-8.3-23.4-23.7-23.4-40.3zM280 240v31.6c0 23 5.5 45.6 16 66 10.5-20.3 16-42.9 16-66V240c0-8.8 7.2-16 16-16s16 7.2 16 16v31.6c0 34.7-10.3 68.7-29.6 97.6l-5.1 7.7c-3 4.5-8 7.1-13.3 7.1s-10.3-2.7-13.3-7.1l-5.1-7.7c-19.3-28.9-29.6-62.9-29.6-97.6V240c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                  </svg>
                </div>
                <div className="h-full w-[30vh] flex items-center">
                  <h1
                    className={`text-[2vh] ${
                      theme === LIGHT_THEME ? `text-black` : `text-white`
                    }`}
                  >
                    {dataset.name}
                  </h1>
                </div>
                <div className="h-full w-[98vh] flex items-center">
                  <h1
                    className={`text-[2vh] ${
                      theme === LIGHT_THEME ? `text-black` : `text-white`
                    }`}
                  >
                    {dataset.creation_date}
                  </h1>
                </div>
                <div className="h-full min-w-min flex items-center">
                  <svg
                    viewBox="0 0 1024 1024"
                    fill="currentColor"
                    className="w-6 h-6 text-red-500 cursor-pointer"
                    onClick={(e) => {
                      deleteDatasetHandler(dataset.name);
                    }}
                  >
                    <path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default ListCsv;
