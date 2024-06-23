import "./Colors.css";
import { useState, useContext } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";
import { LIGHT_THEME } from "../../../../constants/themeConstants";
import { useTranslation } from "react-i18next";

const Colors = ({ setSelectedColor }) => {
  const { theme } = useContext(ThemeContext);
  const color = theme === LIGHT_THEME ? "black" : "white";
  const { t } = useTranslation();

  return (
    <>
      <div
        className={` h-[30vh] w-full ${
          theme === LIGHT_THEME ? "" : "dark-mode"
        }`}
      >
        <h1
          className={`p-[2vh] text-3xl ${
            theme === LIGHT_THEME ? "text-black" : "text-white"
          }`}
        >
          {t("Status")}
        </h1>
        <div className="h-[5vh] w-full flex items-center">
          <input
            onChange={() => {
              setSelectedColor("");
            }}
            type="radio"
            name="radio"
            className="radio radio-primary bg-gray-200 h-[6vh] scale-50"
          />
          <span
            className={` ${
              theme === LIGHT_THEME ? "text-black" : "text-white"
            }`}
          >
            {t("All")}
          </span>
        </div>
        <div className="h-[5vh] w-full flex items-center">
          <input
            onChange={() => {
              setSelectedColor("red");
            }}
            type="radio"
            name="radio"
            className="radio radio-error h-[6vh] bg-gray-200 scale-50"
          />
          <span
            className={` ${
              theme === LIGHT_THEME ? "text-black" : "text-white"
            }`}
          >
            {t("Broken")}
          </span>
        </div>
        <div className="h-[5vh] w-full flex items-center">
          <input
            onChange={() => {
              setSelectedColor("green");
            }}
            type="radio"
            name="radio"
            className="radio radio-success bg-gray-200 h-[6vh] scale-50"
          />
          <span
            className={` ${
              theme === LIGHT_THEME ? "text-black" : "text-white"
            }`}
          >
            {t("Running")}
          </span>
        </div>
        <div className="h-[5vh] w-full flex items-center">
          <input
            onChange={() => {
              setSelectedColor("orange");
            }}
            type="radio"
            name="radio"
            className="radio radio-warning bg-gray-200 h-[6vh] scale-50"
          />
          <span
            className={` ${
              theme === LIGHT_THEME ? "text-black" : "text-white"
            }`}
          >
            {t("In danger")}
          </span>
        </div>
      </div>
    </>
  );
};

export default Colors;
