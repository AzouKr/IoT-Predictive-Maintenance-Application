import { AreaTop } from "../../components";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { mockDataContacts } from "../../data/mockData";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import React, { useContext, useEffect, useState } from "react";
import { getTeams } from "../../Hooks/Teams";

const Teams = () => {
  const { theme } = useContext(ThemeContext); // Accessing theme from ThemeContext
  const [data, setdata] = useState([]);

  const fetchData = async () => {
    await getTeams().then((response) => {
      setdata(response.data);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "left",
      flex: 1,
      align: "left",
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
    },
  ];

  return (
    <div className="content-area min-h-min">
      <AreaTop />

      <Box
        m="5px"
        height="min-h-min"
        className={theme === LIGHT_THEME ? "" : "dark-mode"}
      >
        <Box
          m="30px 0 0 0"
          height="min-h-min"
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
          {data.map((team) => (
            <>
              <h1>{team.team}</h1>
              <DataGrid
                rows={team.users}
                columns={columns}
                className="mb-[2vh]"
                // slots={{
                //   toolbar: GridToolbar,
                // }}
              />
            </>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default Teams;
