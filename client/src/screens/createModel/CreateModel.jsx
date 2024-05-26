import { AreaTop, FormManuel, PopupManuel, PopupAuto } from "../../components";
import React, { useRef, useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import "./CreateModel.scss";

const Creation = () => {
  const { theme } = useContext(ThemeContext);
  const backgroundColor = theme === LIGHT_THEME ? "#F3F4F6" : "#2e2e48";
  const color = theme === LIGHT_THEME ? "black" : "white";

  return (
    <div className={`content-area ${theme === LIGHT_THEME ? "" : "dark-mode"}`}>
      {/* <FormManuel /> */}
      {/* <div className="h-[80vh] w-[185vh]"> */}
      <div className="main-container">
        <h2 className={theme === LIGHT_THEME ? "text-black" : "text-white"}>
          ML Model Creation Options
        </h2>
        <p className={theme === LIGHT_THEME ? "text-black" : "text-white"}>
          Welcome to Your ML Workspace! Choose how you'd like to create your
          model.
        </p>
        <div className=" flex gap-12 items-center h-[80vh]">
          <div className="post" style={{ backgroundColor, color }}>
            <h2>Option 1: Automated Machine Learning (AutoML)</h2>
            <h3>Let Us Do the Work for You</h3>
            <p>
              Automated machine learning (AutoML) is perfect for those who want
              to leverage the power of machine learning without getting into the
              complexities of model creation. Our AutoML solution will:
              <br /> - Select the best algorithms
              <br /> - Optimize hyperparameters
              <br /> - Provide you with the best performing model
            </p>
            <br />
            <h3>Best for:</h3>
            <p>
              - Users with limited ML experience <br />
              - Rapid prototyping <br />- Saving time and effort
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
            <h2>Option 2: Custom ML Model</h2>
            <h3>Build Your Custom Model</h3>
            <p>
              For those who want full control and customization, creating your
              own machine learning model is the way to go. This option allows
              you to:
              <br /> - Choose your own algorithms .
              <br /> - Fine-tune model parameters .
              <br /> - Experiment with different data preprocessing techniques .
            </p>
            <br />
            <h3>Best for:</h3>
            <p>
              {" "}
              - Experienced ML practitioners <br />
              - Custom solutions tailored to specific needs <br />- Learning and
              experimentation
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
