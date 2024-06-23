import { AreaTop, Affecter } from "../../components";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import React, { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { backend_url_socket } from "../../Hooks";
import secureLocalStorage from "react-secure-storage";
import { updateMachineAlert } from "../../Hooks/Machine";
import { useTranslation } from "react-i18next";

const AlarmTech = () => {
  const { theme } = useContext(ThemeContext); // Accessing theme from ThemeContext
  const textColor = theme === LIGHT_THEME ? "text-black" : "text-white";
  const [rows, setRows] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const socket = io(backend_url_socket, {
      withCredentials: true,
      extraHeaders: {
        Authorization: `Bearer ${secureLocalStorage.getItem("authToken")}`,
        "Another-Header": "HeaderValue",
      },
    });

    socket.on("connect", () => {});

    socket.on("getMachineAlerts", (data) => {
      const filtredData = [];
      data.data.forEach((element) => {
        if (element.employee === secureLocalStorage.getItem("email")) {
          filtredData.push(element);
        }
      });
      setRows(filtredData);
    });
  }, []);

  const handleDone = (id, machine) => {
    const rapport = prompt(
      "Please enter a quick description of the maintenance"
    );
    if (rapport) {
      const data = {
        machine: machine,
        id: id,
        rapport: rapport,
      };
      updateMachineAlert(data)
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const columns = [
    {
      field: "id",
      headerName: t("Alarm ID"),
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "machine",
      headerName: t("Machine ID"),
      flex: 0.5,
      cellClassName: "machine-column--cell",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "cause",
      headerName: t("Probable cause"),
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "degree",
      headerName: t("Degree of gravity"),
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "date",
      headerName: t("Date"),
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: t("Status"),
      flex: 0.5,
      renderCell: ({ row: { status } }) => {
        return (
          <Box
            width="70%"
            m="5px 0 0 0"
            p="6px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              status === "Terminated"
                ? "#7CCA7A"
                : status === "Pending"
                ? "#F3DE73"
                : "#DADCCF"
            }
            borderRadius="4px"
          >
            <Typography
              sx={{ ml: "5px" }}
              className={`MuiTypography-root MuiTypography-body1 ${textColor}`}
            >
              {status}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "Select",
      headerName: t("Affectation"),
      flex: 0.5,
      headerAlign: "center",

      renderCell: ({ row: { machine, id, status } }) => {
        return (
          <div className="flex items-center justify-center">
            {status !== "done" ? (
              <h1
                onClick={() => {
                  handleDone(id, machine);
                }}
                className="text-sky-700 cursor-pointer"
              >
                {t("Done")}
              </h1>
            ) : null}
          </div>
        );
      },
    },
  ];

  return (
    <div className="content-area">
      <AreaTop />
      <Box
        m="5px"
        height="calc(100vh - 100px)"
        className={theme === LIGHT_THEME ? "" : "dark-mode"}
      >
        <Box
          m="30px 0 0 0"
          height="80vh"
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center", // Center the text horizontally
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              textAlign: "center", // Center the text
              flexGrow: 1,
            },
            "& .MuiDataGrid-virtualScroller": {
              // backgroundColor: colors.primary[400],
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
          {rows.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              slots={{
                toolbar: GridToolbar,
              }}
            />
          ) : (
            <div className="w-full h-[50vh] flex items-center justify-center">
              <h1
                className={`${
                  theme === LIGHT_THEME ? "text-black" : "text-white"
                } text-2xl`}
              >
                There is No Alarms
              </h1>
            </div>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default AlarmTech;
