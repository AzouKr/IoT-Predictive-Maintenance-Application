import "./Type.css";
import { useContext } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";
import { LIGHT_THEME } from "../../../../constants/themeConstants";
import { useTranslation } from "react-i18next";

function Type({ setSelectedType }) {
  const { theme } = useContext(ThemeContext);
  const backgroundColor = theme === LIGHT_THEME ? "#F3F4F6" : "#2e2e48";
  const color = theme === LIGHT_THEME ? "black" : "white";
  const { t } = useTranslation();

  return (
    <div className={` ${theme === LIGHT_THEME ? "" : "dark-mode"}`}>
      <h2
        className="sidebar-title"
        style={{ color, fontSize: "25px", opacity: "0.7" }}
      >
        {t("Type de Machine")}
      </h2>

      <div>
        <label className="sidebar-label-container" style={{ color }}>
          <input
            onChange={() => {
              setSelectedType("");
            }}
            type="radio"
            value=""
            name="test"
          />
          <span className="checkmark"></span>
          {t("All")}
        </label>
        <label className="sidebar-label-container" style={{ color }}>
          <input
            onChange={() => {
              setSelectedType("HM");
            }}
            type="radio"
            value=""
            name="test"
          />
          <span className="checkmark"></span>HM
        </label>
        <label className="sidebar-label-container" style={{ color }}>
          <input
            onChange={() => {
              setSelectedType("RM");
            }}
            type="radio"
            value=""
            name="test"
          />
          <span className="checkmark"></span>RM
        </label>
        <label className="sidebar-label-container" style={{ color }}>
          <input
            onChange={() => {
              setSelectedType("MT");
            }}
            type="radio"
            value=""
            name="test"
          />
          <span className="checkmark"></span>MT
        </label>
      </div>
    </div>
  );
}

export default Type;
