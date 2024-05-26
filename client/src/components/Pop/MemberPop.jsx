import {
  Button,
  Dialog,
  FormControl,
  InputLabel,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  IconButton,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import { Link } from "react-router-dom";
import { AddTeamMember, getAvailableUsers } from "../../Hooks/Teams";

const MemberPop = ({ name }) => {
  const { theme } = useContext(ThemeContext);
  const backgroundColor = theme === LIGHT_THEME ? "#F3F4F6" : "#2e2e48";
  const color = theme === LIGHT_THEME ? "black" : "white";

  const [users, setusers] = useState();
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

  const handleAddTeamMember = async () => {
    if (selectedUsers.length !== 0) {
      const data = {
        name: name,
        members: selectedUsers,
      };
      AddTeamMember(data)
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("You must add at least one member");
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
        Add new member
      </Button>

      <Dialog
        // fullScreen
        open={open}
        onClose={closepopup}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle style={{ textAlign: "center", backgroundColor, color }}>
          {" "}
          Add new member{" "}
          <IconButton onClick={closepopup} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>{" "}
        </DialogTitle>
        <DialogContent style={{ backgroundColor, color }}>
          <div className=" mb-10 border-solid border-2 border-[#475be8] pt-5">
            <Stack spacing={2} margin={2}>
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
              onClick={handleAddTeamMember}
              color="primary"
              variant="contained"
            >
              ADD
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MemberPop;
