import React from "react";
import { Nav } from "../../components";
import hyd from "../../assets/figures/fig1.png";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LIGHT_THEME } from "../../constants/themeConstants";
import { ThemeContext } from "../../context/ThemeContext";
import HM from "../../assets/images/HM.png";
import MT from "../../assets/images/MT.png";
import RM from "../../assets/images/RM.jpg";
import { useTranslation } from "react-i18next";

const ReferenceSystem = () => {
  const { theme } = useContext(ThemeContext);
  const color = theme === LIGHT_THEME ? "black" : "white";

  const { id } = useParams();
  const { t } = useTranslation();

  return (
    <div>
      <Nav id={id} />

      <div
        className={`flex flex-col items-center justify-start h-screen mt-20 ${
          theme === LIGHT_THEME ? "" : "dark-mode"
        }`}
      >
        <h1
          className="text-3xl font-bold mb-4"
          style={{ color, opacity: "0.7" }}
        >
          {id.slice(0, 2) === "HM"
            ? t("Hydrolic Machine")
            : id.slice(0, 2) === "RM"
            ? t("Rotational Machine")
            : t("Machine Tool")}
        </h1>
        <div className="flex items-center justify-center">
          <img
            src={
              id.slice(0, 2) === "HM" ? HM : id.slice(0, 2) === "RM" ? RM : MT
            }
            alt="Machine Image"
            className="h-80 w-80 object-cover rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ReferenceSystem;
