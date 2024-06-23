import React from "react";
import { Nav } from "../../components";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMachineAlertByMachine } from "../../Hooks/Machine";
import HeatMapChart from "../../components/Charts/HeatMapChart";

const AlarmMachine = () => {
  const { id } = useParams();
  const [state, setstate] = useState();
  const [broken, setbroken] = useState(0);
  const [danger, setdanger] = useState(0);
  const [cause1, setcause1] = useState(0);
  const [cause2, setcause2] = useState(0);
  const [cause3, setcause3] = useState(0);
  const [cause4, setcause4] = useState(0);
  const [rapport, setrapport] = useState("");
  const [mach, setmach] = useState("");
  const [cau, setcau] = useState("");
  const [deg, setdeg] = useState("");
  const [emp, setemp] = useState("");
  const [date, setdate] = useState("");
  const { t } = useTranslation();

  const fetchData = async () => {
    const data = await getMachineAlertByMachine(id);
    setstate(data.data);
    let i = 0;
    let j = 0;
    let OF = 0;
    let HDF = 0;
    let PF = 0;
    let TWF = 0;
    data.data.forEach((element) => {
      if (element.degree === "Risque") {
        i++;
      } else {
        j++;
      }
      switch (element.cause) {
        case "Overstrain Failure":
          OF++;
          break;
        case "Heat Dissipation Failure":
          HDF++;
          break;
        case "Power Failure":
          PF++;
          break;
        case "Tool Wear Failure":
          TWF++;
          break;
      }
    });
    setbroken(j);
    setdanger(i);
    setcause1(OF);
    setcause2(HDF);
    setcause3(PF);
    setcause4(TWF);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { theme } = useContext(ThemeContext); // Accessing theme from ThemeContext
  const columns = [
    {
      field: "id",
      headerName: "Alarm ID",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "machine",
      headerName: "Machine",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "degree",
      headerName: "Degree of gravity",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "cause",
      headerName: "Probable cause",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "rapport",
      headerName: "Rapport",
      headerAlign: "center",
      align: "center",
      renderCell: ({
        row: { machine, degree, cause, date, rapport, employee, status },
      }) => {
        return status === "done" ? (
          <button
            onClick={() => {
              setrapport(rapport);
              setmach(machine);
              setcau(cause);
              setdeg(degree);
              setdate(date);
              setemp(employee);
              document.getElementById("my_modal_3").showModal();
            }}
            className="cursor-pointer"
          >
            View
          </button>
        ) : (
          <>In process</>
        );
      },
    },
  ];

  return (
    <div>
      <Nav id={id} />

      <div className="h-[53vh] w-full flex mb-[10vh]">
        <div className="h-full w-[60%]">
          {state !== undefined ? <HeatMapChart state={state} /> : null}
        </div>
        <div className="h-full w-[40%] flex items-center justify-center">
          <div className="stats stats-vertical bg-transparent">
            <div className="stat">
              <div
                className={`stat-title ${
                  theme === LIGHT_THEME ? "text-black" : "text-white"
                }`}
              >
                {t("Broken")}
              </div>
              <div
                className={`stat-value ${
                  theme === LIGHT_THEME ? "text-black" : "text-white"
                }`}
              >
                {broken}
              </div>
            </div>

            <div className="stat">
              <div
                className={`stat-title ${
                  theme === LIGHT_THEME ? "text-black" : "text-white"
                }`}
              >
                {t("In danger")}
              </div>
              <div
                className={`stat-value ${
                  theme === LIGHT_THEME ? "text-black" : "text-white"
                }`}
              >
                {danger}
              </div>
            </div>
            <div className="stat">
              <div
                className={`stat-title ${
                  theme === LIGHT_THEME ? "text-black" : "text-white"
                }`}
              >
                Overstrain Failure
              </div>
              <div
                className={`stat-value ${
                  theme === LIGHT_THEME ? "text-black" : "text-white"
                }`}
              >
                {cause1}
              </div>
            </div>
          </div>
          <div className="stats stats-vertical bg-transparent">
            <div className="stat">
              <div
                className={`stat-title ${
                  theme === LIGHT_THEME ? "text-black" : "text-white"
                }`}
              >
                Heat Dissipation Failure
              </div>
              <div
                className={`stat-value ${
                  theme === LIGHT_THEME ? "text-black" : "text-white"
                }`}
              >
                {cause2}
              </div>
            </div>
            <div className="stat">
              <div
                className={`stat-title ${
                  theme === LIGHT_THEME ? "text-black" : "text-white"
                }`}
              >
                Power Failure
              </div>
              <div
                className={`stat-value ${
                  theme === LIGHT_THEME ? "text-black" : "text-white"
                }`}
              >
                {cause3}
              </div>
            </div>
            <div className="stat">
              <div
                className={`stat-title ${
                  theme === LIGHT_THEME ? "text-black" : "text-white"
                }`}
              >
                Tool Wear Failure
              </div>
              <div
                className={`stat-value ${
                  theme === LIGHT_THEME ? "text-black" : "text-white"
                }`}
              >
                {cause4}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Box
        m="2px"
        className={`min-h-min ${theme === LIGHT_THEME ? "" : "dark-mode"}`}
      >
        <Box
          m="30px 0 0 0"
          height="70vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              color: theme === LIGHT_THEME ? "#000000" : "#ffffff",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .machine-column--cell": {
              color: "#3da58a",
            },
            "& .MuiDataGrid-columnHeader, .MuiDataGrid-columnHeaderTitle": {
              backgroundColor: theme === LIGHT_THEME ? "#6b7bf2" : "#475be8",
              color: theme === LIGHT_THEME ? "#000000" : "#ffffff",
              fontWeight: "bold",
              borderBottom: "none",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: theme === LIGHT_THEME ? "#6b7bf2" : "#475be8",
              color: theme === LIGHT_THEME ? "#000000" : "#ffffff",
              borderRadius: "0px 0px 15px 15px",
            },
            "& .MuiCheckbox-root": {
              color: theme === LIGHT_THEME ? "#3da58a" : " #70d8bd",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: theme === LIGHT_THEME ? "#000000" : "#ffffff",
            },
          }}
        >
          {state !== undefined ? (
            <DataGrid
              rows={state}
              columns={columns}
              slots={{
                toolbar: GridToolbar,
              }}
            />
          ) : null}
        </Box>
      </Box>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Rapport:</h3>
          <div className="flex">
            <p className="py-4">
              <b>Machine :</b> {mach}
            </p>
            <p className="py-4 pl-[15vh]">
              <b>Date :</b> {date}
            </p>
          </div>
          <div className="flex">
            <p className="py-4">
              <b>Degree :</b> {deg}
            </p>
            <p className="py-4 pl-[14vh]">
              <b>Cause :</b> {cau}
            </p>
          </div>
          <p className="py-4">
            <b>Technicien :</b> {emp}
          </p>
          <p className="py-4">
            <b>Description :</b>
          </p>
          <p className="py-4">{rapport}</p>
        </div>
      </dialog>
    </div>
  );
};

export default AlarmMachine;
