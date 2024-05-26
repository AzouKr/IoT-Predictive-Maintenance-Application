import { AreaTop, MemberPop, TeamPop } from "../../components";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import React, { useContext, useEffect, useState } from "react";
import "./team.scss";
import { io } from "socket.io-client";
import { backend_url_socket } from "../../Hooks";
import secureLocalStorage from "react-secure-storage";
import { deleteMember, getOneTeam, getTeam } from "../../Hooks/Teams";

const Team = () => {
  const [team, setteam] = useState();
  const [teamInfo, setteamInfo] = useState();

  const socket = io(backend_url_socket, {
    withCredentials: true,
    extraHeaders: {
      Authorization: `Bearer ${secureLocalStorage.getItem("authToken")}`,
      "Another-Header": "HeaderValue",
    },
  });
  socket.on("connect", () => {});

  const fetchData = async () => {
    const data = await getTeam();
    setteam(data.data);
    const teamInfo = await getOneTeam();
    setteamInfo(teamInfo.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { theme } = useContext(ThemeContext);

  const handleDelete = (id) => {
    const data = {
      email: id,
    };
    deleteMember(data)
      .then(() => {
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.5,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0.5,
      renderCell: ({ row: { email } }) => (
        <Button
          onClick={() => handleDelete(email)}
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          sx={{
            backgroundColor: "#EB8282",
            color: "white",
            "&:hover": {
              backgroundColor: "darkred",
            },
          }}
        >
          Delete
        </Button>
      ),
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
        <Card
          sx={{
            margin: "10px 0",
            padding: "5px",
            backgroundColor: theme === LIGHT_THEME ? "#f5f5f5" : "#2e2e48",
            color: theme === LIGHT_THEME ? "#000" : "#fff",
          }}
        >
          {teamInfo !== undefined ? (
            <CardContent className="h-[30vh]">
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="h6" component="div">
                    Team Name:
                    {teamInfo.lenght === undefined
                      ? teamInfo.lenght !== 0
                        ? teamInfo.name
                        : "NaN"
                      : "NaN"}
                  </Typography>
                  <Typography variant="body1" component="div">
                    Supervisor:{" "}
                    {teamInfo.lenght === undefined
                      ? teamInfo.lenght !== 0
                        ? teamInfo.supervisor
                        : "NaN"
                      : "NaN"}
                  </Typography>
                  <Typography variant="body1" component="div">
                    Production Line:{" "}
                    {teamInfo.lenght === undefined
                      ? teamInfo.lenght !== 0
                        ? teamInfo.prod_line
                        : "NaN"
                      : "NaN"}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-end"
                >
                  {teamInfo.lenght !== undefined ? (
                    teamInfo.lenght === 0 ? (
                      <div className="btn">
                        <TeamPop />
                      </div>
                    ) : null
                  ) : null}
                  <div className="btn">
                    <MemberPop name={teamInfo.name} />
                  </div>
                </Box>
              </Box>
            </CardContent>
          ) : null}
        </Card>
        <Box
          m="30px 0 0 0"
          height="65vh"
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
              backgroundColor: theme === LIGHT_THEME ? "#6b7bf2" : "#475be8",
              color: theme === LIGHT_THEME ? "#000000" : "#ffffff",
              fontWeight: "bold",
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {},
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
          {team !== undefined ? (
            <DataGrid
              rows={team}
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

export default Team;
