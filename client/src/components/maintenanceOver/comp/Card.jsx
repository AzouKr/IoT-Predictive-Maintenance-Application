import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { LIGHT_THEME } from "../../../constants/themeConstants";

const Card = ({ img, id, color, temp, type }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <section
        className={`card w-[46%] ${theme === LIGHT_THEME ? "" : "dark-mode"}`}
      >
        <img src={img} alt={id} className="card-img" />
        <div className="card-details w-full mt-[1vh]">
          <section className="card-price">
            <h3 className="text-sm" style={{ color: "grey" }}>
              Machine ID :
            </h3>
            <h3
              className={
                theme === LIGHT_THEME
                  ? "text-black text-sm"
                  : "text-white text-sm"
              }
            >
              {id}
            </h3>
          </section>
          <section className="card-price">
            <h3 className="text-sm" style={{ color: "grey" }}>
              Machine Modele :
            </h3>
            <h3
              className={
                theme === LIGHT_THEME
                  ? "text-black text-sm"
                  : "text-white text-sm"
              }
            >
              {type}
            </h3>
          </section>
          <section className="card-price">
            <p
              className={
                theme === LIGHT_THEME
                  ? "text-black text-sm"
                  : "text-white text-sm"
              }
            >
              {temp}
            </p>
            {/* <p >{color}</p> */}
            <div className="dt-status">
              <span className={`dt-status-dot dot-${color}`}></span>
            </div>
          </section>
          <div className="w-full min-h-min flex justify-center items-center">
            <Link to={`/machine-overview/${id}`}>
              <div className="h-[5vh] min-w-min pl-[3vh] pr-[3vh] bg-blue-500 flex justify-center items-center rounded-md text-white">
                Details
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Card;
