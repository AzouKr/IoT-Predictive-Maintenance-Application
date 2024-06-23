import React from "react";
import { CircularCharts, Nav } from "../../components";
import HM from "../../assets/images/HM.png";
import MT from "../../assets/images/MT.png";
import RM from "../../assets/images/RM.jpg";
import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import { useParams } from "react-router-dom";
import { getData } from "../../Hooks/GetData";
import { useTranslation } from "react-i18next";

const MachineD = () => {
  const { id } = useParams();
  const { theme } = useContext(ThemeContext);
  const color = theme === LIGHT_THEME ? "black" : "white";
  const [state, setstate] = useState();
  const fetchData = async () => {
    const data = await getData(id);
    setstate(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { t } = useTranslation();

  return (
    <div className={`content-area ${theme === LIGHT_THEME ? "" : "dark-mode"}`}>
      <Nav id={id} />
      {state !== undefined ? (
        <div className="flex ">
          <div className="flex items-start w-[70vw]">
            <img
              src={
                state.id.slice(0, 2) === "HM"
                  ? HM
                  : state.id.slice(0, 2) === "RM"
                  ? RM
                  : MT
              }
              alt="Machine Image"
              className="h-[50vh] w-[40vh] aspect-square object-cover rounded-xl"
            />
            <div className="flex flex-col items-start gap-1 ml-[5vh] mt-10">
              <h1 className="text-md font-bold text-gray-500">
                {t("Description")}
              </h1>
              <h1 className="text-md text-black font-normal">
                {state.id.slice(0, 2) === "HM"
                  ? t("HM desc")
                  : state.id.slice(0, 2) === "RM"
                  ? t("RM desc")
                  : t("MT desc")}
              </h1>
              <div className="flex items-center gap-1">
                <h1 className="text-md font-bold text-gray-500">
                  {t("Machine ID:")}
                </h1>
                <h1 className="text-md font-bold" style={{ color }}>
                  {state.id}
                </h1>
              </div>
              <div className="flex items-center gap-1">
                <h1 className="text-md font-bold text-gray-500">
                  {t("Machine Model:")}
                </h1>
                <h1 className="text-md font-bold" style={{ color }}>
                  {state.id.slice(0, 2) === "HM"
                    ? t("Hydrolic Machine")
                    : state.id.slice(0, 2) === "RM"
                    ? t("Rotational Machine")
                    : t("Machine Tool")}
                </h1>
              </div>
              <div className="flex items-center gap-1">
                <h1 className="text-md font-bold text-gray-500">
                  {t("Etat machine:")}
                </h1>
                <h1 className="text-md font-bold" style={{ color }}>
                  {state.failure === 0
                    ? t("working")
                    : state.failure === 1
                    ? t("broken-down")
                    : t("In Danger")}
                </h1>
              </div>
              <div className="flex items-center gap-1">
                <h1 className="text-md font-bold text-gray-500">
                  {t("Temp Sensor:")}
                </h1>
                <h1 className="text-md font-bold" style={{ color }}>
                  {Number(state.airTemperature).toFixed(2)}
                </h1>
              </div>
              <div className="flex items-center gap-1">
                <h1 className="text-md font-bold text-gray-500">
                  {t("Rotation speed Sensor:")}
                </h1>
                <h1 className="text-md font-bold" style={{ color }}>
                  {Number(state.currentRotatinalSpeed)}
                </h1>
              </div>
              <div className="flex items-center gap-1">
                <h1 className="text-md font-bold text-gray-500">
                  {t("Torque Sensor:")}
                </h1>
                <h1 className="text-md font-bold" style={{ color }}>
                  {Number(state.torque).toFixed(2)}
                </h1>
              </div>
            </div>
          </div>
          <div className="flex items-start justify-start w-[30vw]  px-10  pt-5">
            <CircularCharts state={state} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MachineD;
