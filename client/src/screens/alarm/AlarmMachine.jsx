import React from "react";
import { Nav } from "../../components";
import hyd from "../../assets/figures/fig1.png";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { mockDataContacts } from "../../data/mockData";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMachineAlertByMachine } from "../../Hooks/Machine";

const AlarmMachine = () => {
  const { id } = useParams();
  const [state, setstate] = useState();

  const fetchData = async () => {
    const data = await getMachineAlertByMachine(id);
    console.log(data.data);
    setstate(data.data);
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
      flex: 1,
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
      field: "date",
      headerName: "Date",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
  ];

  return (
    <div>
      <Nav id={id} />

      <Box
        m="2px"
        height="calc(10vh - 10px)"
        className={theme === LIGHT_THEME ? "" : "dark-mode"}
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
    </div>
  );
};

export default AlarmMachine;
