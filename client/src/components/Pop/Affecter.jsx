import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import { getTeam } from "../../Hooks/Teams";
import { assignMachine } from "../../Hooks/Machine";

const Affecter = ({ machine }) => {
  const { theme } = useContext(ThemeContext);
  const backgroundColor = theme === LIGHT_THEME ? "#F3F4F6" : "#2e2e48";
  const color = theme === LIGHT_THEME ? "black" : "white";

  const [open, setOpen] = useState(false);
  const [selectedTechnicians, setSelectedTechnicians] = useState();
  const [technicians, settechnicians] = useState();

  const fetchData = async () => {
    const data = await getTeam();
    settechnicians(data.data);
    // console.log(data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenPopup = () => {
    setOpen(true);
  };

  const handleClosePopup = () => {
    setOpen(false);
  };

  const handleAffect = () => {
    const data = {
      employee: selectedTechnicians,
      machine: machine,
    };
    assignMachine(data);
    window.location.reload();
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      style={{ textAlign: "center" }}
      className={`content-area ${theme === LIGHT_THEME ? "" : "dark-mode"}`}
    >
      <Button
        onClick={() => {
          handleOpenPopup();
        }}
        style={{
          color: isHovered ? "#fff" : "#3d59a5",
          fontWeight: "bold",
          backgroundColor: "#87CEEB",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Affecter
      </Button>

      <Dialog open={open} onClose={handleClosePopup} fullWidth maxWidth="sm">
        <DialogTitle style={{ textAlign: "center", backgroundColor, color }}>
          Techniciens disponibles
          <IconButton onClick={handleClosePopup} style={{ float: "right" }}>
            <CloseIcon color="primary" />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ backgroundColor, color }}>
          <Stack spacing={2} margin={2}>
            {technicians !== undefined
              ? technicians.map((technician) => (
                  <Button
                    key={technician.id}
                    onClick={() => setSelectedTechnicians(technician)}
                    style={{
                      justifyContent: "flex-start",
                      color: theme === LIGHT_THEME ? "#000000" : "#ffffff",
                      backgroundColor:
                        selectedTechnicians === technician
                          ? "#d3d3d3"
                          : "transparent",
                      border: "1px solid #3d59a5",
                      padding: "10px",
                      minWidth: "150px",
                      minHeight: "40px",
                      boxSizing: "border-box",
                    }}
                    variant="outlined"
                    fullWidth
                  >
                    {technician.name}
                  </Button>
                ))
              : null}
          </Stack>
        </DialogContent>
        {selectedTechnicians !== undefined ? (
          <DialogActions style={{ backgroundColor, color }}>
            <Button onClick={handleAffect} color="primary" variant="contained">
              Affect
            </Button>
          </DialogActions>
        ) : null}
      </Dialog>
    </div>
  );
};

export default Affecter;
