import { AreaTop, Affecter } from "../../components";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import React, { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { backend_url_socket } from "../../Hooks";
import secureLocalStorage from "react-secure-storage";

const Alarms = () => {
  const { theme } = useContext(ThemeContext); // Accessing theme from ThemeContext
  const textColor = theme === LIGHT_THEME ? "text-black" : "text-white";
  const [rows, setRows] = useState([]);

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
        if (element.supervisor === secureLocalStorage.getItem("email")) {
          filtredData.push(element);
        }
      });
      setRows(filtredData);
    });
  }, []);

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
      headerName: "Machine ID",
      flex: 0.5,
      cellClassName: "machine-column--cell",
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
      field: "degree",
      headerName: "Degree of gravity",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "date",
      headerName: "Date",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "Status",
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
      headerName: "Affectation",
      flex: 0.5,

      renderCell: ({ row: { machine, employee } }) => {
        return (
          <div>
            {employee === "none" ? <Affecter machine={machine} /> : null}
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
          ) : null}
        </Box>
      </Box>
    </div>
  );
};

export default Alarms;
