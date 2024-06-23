import { AreaTop, FormManuel, PopupManuel, PopupAuto } from "../../components";
import React, { useRef, useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import "./CreateModel.scss";
import { useTranslation } from "react-i18next";

const Creation = () => {
  const { theme } = useContext(ThemeContext);
  const backgroundColor = theme === LIGHT_THEME ? "#F3F4F6" : "#2e2e48";
  const color = theme === LIGHT_THEME ? "black" : "white";
  const { t } = useTranslation();

  return (
    <div className={`content-area ${theme === LIGHT_THEME ? "" : "dark-mode"}`}>
      {/* <FormManuel /> */}
      {/* <div className="h-[80vh] w-[185vh]"> */}
      <div className="main-container">
        <h2 className={theme === LIGHT_THEME ? "text-black" : "text-white"}>
          {t("ML Model Creation Options")}
        </h2>
        <p className={theme === LIGHT_THEME ? "text-black" : "text-white"}>
          {t(
            "Welcome to Your ML Workspace! Choose how you'd like to create your model."
          )}
        </p>
        <div className="flex gap-12 items-center h-[80vh]">
          <div className="post" style={{ backgroundColor, color }}>
            <h2>{t("Option 1: Automated Machine Learning (AutoML)")}</h2>
            <h3>{t("Let Us Do the Work for You")}</h3>
            <p>
              {t(
                "Automated machine learning (AutoML) is perfect for those who want to leverage the power of machine learning without getting into the complexities of model creation. Our AutoML solution will:"
              )}
              <br /> - {t("Select the best algorithms")}
              <br /> - {t("Optimize hyperparameters")}
              <br /> - {t("Provide you with the best performing model")}
            </p>
            <br />
            <h3>{t("Best for:")}</h3>
            <p>
              - {t("Users with limited ML experience")} <br />-{" "}
              {t("Rapid prototyping")} <br />- {t("Saving time and effort")}
            </p>

            <div className="flex">
              {/* <button type="button"  className={`btn ${theme === LIGHT_THEME ? 'text-black' : 'text-white'}`}>
                      Start with AutoML
                      </button> */}
              <div className="btn">
                <PopupAuto />
              </div>
            </div>
          </div>

          <div className="post" style={{ backgroundColor, color }}>
            <h2>{t("Option 2: Custom ML Model")}</h2>
            <h3>{t("Build Your Custom Model")}</h3>
            <p>
              {t(
                "For those who want full control and customization, creating your own machine learning model is the way to go. This option allows you to:"
              )}
              <br /> - {t("Choose your own algorithms .")}
              <br /> - {t("Fine-tune model parameters .")}
              <br /> -{" "}
              {t("Experiment with different data preprocessing techniques .")}
            </p>
            <br />
            <h3>{t("Best for:")}</h3>
            <p>
              {" "}
              - {t("Experienced ML practitioners")} <br />-{" "}
              {t("Custom solutions tailored to specific needs")} <br />-{" "}
              {t("Learning and experimentation")}
            </p>

            <div className="flex mt-6">
              {/* <button type="button"  className={`btn ${theme === LIGHT_THEME ? 'text-black' : 'text-white'}`}>
                      Build Custom Model
                      </button> */}
              <div className="btn">
                <PopupManuel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creation;
