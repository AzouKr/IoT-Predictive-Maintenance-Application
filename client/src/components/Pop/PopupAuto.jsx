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
//import FormControlContext from "@mui/material/FormControl/FormControlContext";
import CloseIcon from "@mui/icons-material/Close";
import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import { Link } from "react-router-dom";
import { createAutoModel, getDatasets } from "../../Hooks/Python";
import { useNavigate } from "react-router-dom";

const PopupAuto = () => {
  const { theme } = useContext(ThemeContext);
  const backgroundColor = theme === LIGHT_THEME ? "#F3F4F6" : "#2e2e48";
  const color = theme === LIGHT_THEME ? "black" : "white";
  const navigate = useNavigate();

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

  // const { t, i18n } = useTranslation();

  const [datasets, setdatasets] = useState([]);
  const [selectedDataset, setselectedDataset] = useState("");
  const [name, setname] = useState("");
  const [type, settype] = useState(0);
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);

  const fetchData = async () => {
    await getDatasets().then((response) => {
      setdatasets(response);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = () => {
    seterror(false);
    setloading(true);
    const newtype = Number(type);
    if (name !== "" && selectedDataset !== "") {
      createAutoModel(name, selectedDataset, newtype)
        .then((res) => {
          navigate("/createmodel");
          setloading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      seterror(true);
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
        Start with AutoML
      </Button>

      <Dialog
        // fullScreen
        open={open}
        onClose={closepopup}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle style={{ textAlign: "center", backgroundColor, color }}>
          AutoML{" "}
          <IconButton onClick={closepopup} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>{" "}
        </DialogTitle>
        <DialogContent style={{ backgroundColor, color }}>
          {!loading ? (
            <>
              <div className=" mb-10 border-solid border-2 border-[#475be8] pt-5">
                <Stack spacing={2} margin={2}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select Dataset
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Select Dataset"
                      onChange={(e) => {
                        setselectedDataset(e.target.value);
                      }}
                    >
                      {datasets.map((dataset, index) => (
                        <MenuItem key={index} value={dataset}>
                          {dataset}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    variant="outlined"
                    label="Name your model"
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
                    onChange={(e) => {
                      setname(e.target.value);
                    }}
                  ></TextField>

                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Type
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      onChange={(e) => {
                        settype(e.target.value);
                      }}
                    >
                      <FormControlLabel
                        value={0}
                        control={<Radio />}
                        label="Binary"
                      />
                      <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label="MultiClass"
                      />
                    </RadioGroup>
                  </FormControl>
                </Stack>
              </div>
              {/* <Link to="/results"> */}
              <Stack>
                <Button
                  onClick={handleCreate}
                  color="primary"
                  variant="contained"
                >
                  Create
                </Button>
              </Stack>
              {/* </Link> */}
              {error ? (
                <div className="min-h-min w-full flex items-center justify-center">
                  <div role="alert" className="alert alert-error m-4 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>empty Fields error</span>
                  </div>
                </div>
              ) : null}
            </>
          ) : (
            <div>
              <h1
                className={`text-center text-[3vh] mr-[1vh] ${
                  theme === LIGHT_THEME ? `text-black` : `text-white`
                }`}
              >
                Please wait
              </h1>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PopupAuto;
