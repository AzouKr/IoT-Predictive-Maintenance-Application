import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  FormControl,
  Radio,
  RadioGroup,
  InputLabel,
  FormLabel,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Select,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import { Link } from "react-router-dom";
import { createTeam, getAvailableUsers } from "../../Hooks/Teams";

const TeamPop = () => {
  const { theme } = useContext(ThemeContext);
  const backgroundColor = theme === LIGHT_THEME ? "#F3F4F6" : "#2e2e48";
  const color = theme === LIGHT_THEME ? "black" : "white";

  const [users, setusers] = useState();
  const [name, setname] = useState("");
  const [prod, setprod] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSelectionChange = (event) => {
    setSelectedUsers(event.target.value);
  };

  const fetchData = async () => {
    const data = await getAvailableUsers();
    setusers(data.data);
    console.log(data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [open, openchange] = useState(false);
  const functionopenpopup = () => {
    openchange(true);
  };
  const closepopup = () => {
    openchange(false);
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleCreateTeam = async () => {
    if (name !== "" && prod !== "" && selectedUsers.length !== 0) {
      const data = {
        name: name,
        prodLine: prod,
        members: selectedUsers,
      };
      createTeam(data)
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Input Fields must be filled");
    }
  };

  return (
    <div
      style={{ textAlign: "center" }}
      className={`content-area ${theme === LIGHT_THEME ? "" : "dark-mode"}`}
    >
      <Button
        onClick={functionopenpopup}
        style={{
          color: isHovered ? "#fff" : "#3d59a5",
          fontWeight: "bold",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Create New Team
      </Button>

      <Dialog
        // fullScreen
        open={open}
        onClose={closepopup}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle style={{ textAlign: "center", backgroundColor, color }}>
          Create New Team{" "}
          <IconButton onClick={closepopup} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>{" "}
        </DialogTitle>
        <DialogContent style={{ backgroundColor, color }}>
          <div className=" mb-10 border-solid border-2 border-[#475be8] pt-5">
            <Stack spacing={2} margin={2}>
              <TextField
                variant="outlined"
                label="Name your team"
                onChange={(e) => {
                  setname(e.target.value);
                }}
                InputLabelProps={{
                  sx: {
                    color: theme === LIGHT_THEME ? "#000000" : "#ffffff",
                  },
                }}
                InputProps={{
                  sx: {
                    color: theme === LIGHT_THEME ? "#000000" : "#ffffff",
                  },
                }}
              ></TextField>
              <TextField
                variant="outlined"
                label="Production line"
                onChange={(e) => {
                  setprod(e.target.value);
                }}
                InputLabelProps={{
                  sx: {
                    color: theme === LIGHT_THEME ? "#000000" : "#ffffff",
                  },
                }}
                InputProps={{
                  sx: {
                    color: theme === LIGHT_THEME ? "#000000" : "#ffffff",
                  },
                }}
              ></TextField>
              <FormControl fullWidth>
                <InputLabel id="demo-multiple-select-label">
                  Select Available Member
                </InputLabel>
                {users !== undefined ? (
                  <Select
                    labelId="demo-multiple-select-label"
                    id="demo-multiple-select"
                    multiple
                    value={selectedUsers}
                    label="Select Available Member"
                    onChange={handleSelectionChange}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {users.map((user, index) => (
                      <MenuItem key={index} value={user.email}>
                        {user.name}
                      </MenuItem>
                    ))}
                  </Select>
                ) : null}
              </FormControl>
            </Stack>
          </div>
          <Stack>
            <Button
              onClick={handleCreateTeam}
              color="primary"
              variant="contained"
            >
              Create
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamPop;
