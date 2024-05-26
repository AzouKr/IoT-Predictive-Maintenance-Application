import { AreaTop } from "../../components";
import React, { useContext, useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import { deleteUser, getUsers } from "../../Hooks/Users";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Users = () => {
  const { theme } = useContext(ThemeContext); // Accessing theme from ThemeContext
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [data, setdata] = useState([]);
  const fetchData = async () => {
    await getUsers().then((response) => {
      setdata(response.data);
      console.log(response.data);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleRowSelection = (id) => {
    if (selectedRowIds.includes(id)) {
      setSelectedRowIds(selectedRowIds.filter((rowId) => rowId !== id));
    } else {
      setSelectedRowIds([...selectedRowIds, id]);
    }
  };

  const handleDelete = async () => {
    const id = selectedRowIds;
    await deleteUser(id)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const textColor = theme === LIGHT_THEME ? "text-black" : "text-white";

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
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
      field: "team",
      headerName: "Team",
      flex: 1,
    },
    {
      field: "active",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row: { active } }) => {
        return (
          <Box
            width="60%"
            m="5px 0 0 0"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={active === 0 ? "#82AFEB" : "#EB8282"}
            borderRadius="4px"
          >
            <Typography
              sx={{ p: "5px" }}
              className={`MuiTypography-root MuiTypography-body1 ${textColor}`}
            >
              {active === 0 ? "Active" : "Inactive"}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "role",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            width="fit-content"
            m="5px"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              role === "admin"
                ? "#4cceac"
                : role === "manager"
                ? "#3da58a"
                : "#2e7c67"
            }
            borderRadius="4px"
          >
            {role === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {role === "manager" && <SecurityOutlinedIcon />}
            {role === "user" && <LockOpenOutlinedIcon />}
            <Typography
              sx={{ pl: "5px", pr: "5px" }}
              className={`MuiTypography-root MuiTypography-body1 ${textColor}`}
            >
              {role}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 100,
      renderCell: ({ row }) => {
        return (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <EditIcon
              sx={{ cursor: "pointer" }}
              onClick={() => navigate(`/form/${row.id}`)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="content-area">
      {data !== undefined ? (
        <>
          <AreaTop />
          <Box m="5px" className={theme === LIGHT_THEME ? "" : "dark-mode"}>
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
                  backgroundColor:
                    theme === LIGHT_THEME ? "#6b7bf2" : "#475be8",
                  color: theme === LIGHT_THEME ? "#000000" : "#ffffff",
                  fontWeight: "bold",
                  borderBottom: "none",
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor:
                    theme === LIGHT_THEME ? "#6b7bf2" : "#475be8",
                  color: theme === LIGHT_THEME ? "#000000" : "#ffffff",
                  borderRadius: "0px 0px 15px 15px",
                },
                "& .MuiCheckbox-root": {
                  color: theme === LIGHT_THEME ? "#3da58a" : " #70d8bd",
                },
                "& .menu": {
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "flex-end",
                  paddingRight: "10px",
                  marginBottom: "2px",
                },
                "& .menu li": {
                  listStyle: "none",
                  margin: "0 3px",
                },
                "& .menu a": {
                  textDecoration: "none",
                  color: theme === LIGHT_THEME ? "#000000" : "#ffffff",
                  backgroundColor:
                    theme === LIGHT_THEME ? "#6b7bf2" : "#475be8",
                },
              }}
            >
              <div className="menu">
                <Button
                  startIcon={<DeleteIcon />}
                  variant="contained"
                  onClick={handleDelete}
                  sx={{ cursor: "pointer" }}
                  disabled={selectedRowIds.length === 0}
                >
                  {t("label_btn_delete")}
                </Button>
              </div>
              <div style={{ height: "fit-content", width: "100%" }}>
                <DataGrid
                  checkboxSelection
                  rows={data}
                  columns={columns}
                  getRowId={(row) => row.id}
                  onCellClick={(row) => {
                    handleRowSelection(row.id);
                  }}
                  //disableRowSelectionOnClick
                />
              </div>
            </Box>
          </Box>
        </>
      ) : null}
    </div>
  );
};

export default Users;
