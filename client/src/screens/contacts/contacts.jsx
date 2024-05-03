import { AreaTop } from "../../components";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { mockDataContacts } from "../../data/mockData";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import React, { useContext, useEffect, useState } from "react";
import { getUsers } from "../../Hooks/Users";
const Contacts = () => {
  const { theme } = useContext(ThemeContext); // Accessing theme from ThemeContext
  const [data, setdata] = useState([]);
  const fetchData = async () => {
    await getUsers().then((response) => {
      setdata(response.data);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const columns = [
    { field: "id", headerName: "Registrar ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
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
            "& .name-column--cell": {
              color: "#3da58a",
            },
            "& .MuiDataGrid-columnHeader, .MuiDataGrid-columnHeaderTitle": {
              //backgroundColor: "#b3e5fc",
              backgroundColor: theme === LIGHT_THEME ? "#6b7bf2" : "#475be8",
              color: theme === LIGHT_THEME ? "#000000" : "#ffffff",
              fontWeight: "bold",
              borderBottom: "none",
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
          <DataGrid
            rows={data}
            columns={columns}
            slots={{
              toolbar: GridToolbar,
            }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default Contacts;
