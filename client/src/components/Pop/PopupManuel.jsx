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
  Box,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Select,
  IconButton,
  Stack,
  TextField,
  Typography,
  Slider,
} from "@mui/material";
//import FormControlContext from "@mui/material/FormControl/FormControlContext";
import CloseIcon from "@mui/icons-material/Close";
import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  createManualModel,
  deleteModel,
  getDatasets,
} from "../../Hooks/Python";
import { useTranslation } from "react-i18next";

const PopupManuel = () => {
  const { theme } = useContext(ThemeContext);
  const backgroundColor = theme === LIGHT_THEME ? "#F3F4F6" : "#2e2e48";
  const color = theme === LIGHT_THEME ? "black" : "white";
  const { t } = useTranslation();

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

  const marksC = [
    { value: 1, label: "1" },
    { value: 10, label: "10" },
    { value: 100, label: "100" },
    { value: 1000, label: "1000" },
  ];

  const marksGamma = [
    { value: Math.log10(0.1), label: "0.1" },
    { value: Math.log10(1), label: "1" },
    { value: Math.log10(10), label: "10" },
  ];

  const valuetext = (value) => {
    return `${10 ** value}`;
  };

  const navigate = useNavigate();

  const [datasets, setdatasets] = useState([]);
  const [selectedDataset, setselectedDataset] = useState("");
  const [selectedAlgo, setselectedAlgo] = useState("");
  const [name, setname] = useState("");
  const [type, settype] = useState(0);
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);

  const [n_neighbors, setn_neighbors] = useState(5);
  const [c, setc] = useState(10);
  const [gamma, setgamma] = useState(10);
  const [n_estimators, setn_estimators] = useState(300);
  const [max_depth, setmax_depth] = useState(7);
  const [learning_rate, setlearning_rate] = useState(0.1);

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
    if (
      name !== "" &&
      selectedDataset !== "" &&
      type !== "" &&
      selectedAlgo !== ""
    ) {
      let params;
      switch (selectedAlgo) {
        case "knn":
          params = `{'n_neighbors':[${n_neighbors}]}`;
          break;
        case "svc":
          params = `{'C': [${c}], 'gamma': [${gamma}], 'kernel': ['rbf'], 'probability': [True], 'random_state': [0]}`;
          break;
        case "rfc":
          params = `{'n_estimators':[${n_estimators}],'max_depth':[${max_depth}],'random_state':[0]}`;
          break;
        case "xgb":
          if (newtype === 0) {
            params = `{'n_estimators':[${n_estimators}],'max_depth':[${max_depth}],'learning_rate':[${learning_rate}],'random_state':[0],'objective':['binary:logistic']}`;
          } else {
            params = `{'n_estimators':[${n_estimators}],'max_depth':[${max_depth}],'learning_rate':[${learning_rate}],'random_state':[0],'objective':['multi:softprob']}`;
          }
          break;
      }
      createManualModel(name, selectedDataset, newtype, selectedAlgo, params)
        .then((res) => {
          const dataToPass = {
            type: type,
            selectedAlgo: selectedAlgo,
            name: name,
          };
          setTimeout(() => {
            navigate("/createmodel/results", { state: dataToPass });
          }, 2000);
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
        {t("Build Custom Model")}
      </Button>
      <Dialog
        open={open}
        onClose={closepopup}
        maxWidth="false"
        PaperProps={{
          className: "w-[100vh] h-[180vh]",
        }}
      >
        <DialogTitle style={{ textAlign: "center", backgroundColor, color }}>
          {t("Custom ML")}
          <IconButton onClick={closepopup} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ backgroundColor, color }}>
          {!loading ? (
            <>
              <div className="flex  mb-10 border-solid border-2 border-[#475be8] pt-5">
                {/* ************************************
                 ***************Left side ***********
                 ************************************ */}
                <Stack spacing={2} margin={2} className=" w-[50vh] h-[55vh] ">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {t("Select Dataset")}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label={t("Select Dataset")}
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
                    label={t("Name your model")}
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
                      {t("Type")}
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
                        label={t("Binary")}
                      />
                      <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label={t("MultiClass")}
                      />
                    </RadioGroup>
                  </FormControl>
                </Stack>

                {/* ************************************
                 ***************right side ***********
                 ************************************ */}
                <Stack spacing={2} margin={2} className=" w-[50vh] h-[55vh]">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {t("Select Algorithm")}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label={t("Select Algorithm")}
                      onChange={(e) => {
                        setselectedAlgo(e.target.value);
                      }}
                    >
                      <MenuItem value="knn">KNN</MenuItem>
                      <MenuItem value="svc">SVC</MenuItem>
                      <MenuItem value="rfc">RFC</MenuItem>
                      <MenuItem value="xgb">XGB</MenuItem>
                    </Select>
                  </FormControl>

                  {selectedAlgo === "knn" && (
                    <>
                      <Box sx={{ width: 300 }}>
                        <Typography gutterBottom>
                          {t("Number of Neighbors")}
                        </Typography>
                        <Slider
                          valueLabelDisplay="auto"
                          aria-label="knn-slider"
                          defaultValue={5}
                          min={1}
                          max={20}
                          step={1}
                          onChange={(e) => {
                            setn_neighbors(e.target.value);
                          }}
                        />
                      </Box>
                    </>
                  )}

                  {selectedAlgo === "svc" && (
                    <>
                      <Box sx={{ width: 300 }}>
                        <Typography gutterBottom>
                          {t("C: Regularization parameter.")}
                        </Typography>
                        <Slider
                          aria-label="SVC-slider"
                          defaultValue={10}
                          getAriaValueText={valuetext}
                          step={null}
                          marks={marksC}
                          onChange={(e) => {
                            setc(e.target.value);
                          }}
                        />
                      </Box>

                      <Box sx={{ width: 300 }}>
                        <Typography gutterBottom>
                          {t("gamma: Kernel coefficient for 'rbf'.")}
                        </Typography>
                        <Slider
                          aria-label="SVC-slider"
                          defaultValue={1}
                          getAriaValueText={valuetext}
                          step={null}
                          marks={marksGamma}
                          min={Math.log10(0.1)}
                          max={Math.log10(1000)}
                          onChange={(e) => {
                            setgamma(e.target.value);
                          }}
                        />
                      </Box>
                    </>
                  )}

                  {selectedAlgo === "rfc" && (
                    <>
                      <Box sx={{ width: 300 }}>
                        <Typography gutterBottom>
                          {t("Number of trees in the forest.")}
                        </Typography>
                        <Slider
                          valueLabelDisplay="auto"
                          aria-label="RFC-slider"
                          defaultValue={300}
                          min={100}
                          max={1000}
                          step={100}
                          onChange={(e) => {
                            setn_estimators(e.target.value);
                          }}
                        />
                      </Box>
                      <Box sx={{ width: 300 }}>
                        <Typography gutterBottom>
                          {t("Maximum depth ofthe tree.")}
                        </Typography>
                        <Slider
                          valueLabelDisplay="auto"
                          aria-label="RFC-slider"
                          defaultValue={7}
                          min={5}
                          max={15}
                          step={1}
                          onChange={(e) => {
                            setmax_depth(e.target.value);
                          }}
                        />
                      </Box>
                    </>
                  )}
                  {selectedAlgo === "xgb" && (
                    <>
                      <Box sx={{ width: 300 }}>
                        <Typography gutterBottom>
                          {t("Number of gradient-boosted trees.")}
                        </Typography>
                        <Slider
                          valueLabelDisplay="auto"
                          aria-label="RFC-slider"
                          defaultValue={300}
                          min={100}
                          max={1000}
                          step={100}
                          onChange={(e) => {
                            setn_estimators(e.target.value);
                          }}
                        />
                      </Box>
                      <Box sx={{ width: 300 }}>
                        <Typography gutterBottom>
                          {t("Maximum depth of the tree.")}
                        </Typography>
                        <Slider
                          valueLabelDisplay="auto"
                          aria-label="RFC-slider"
                          defaultValue={7}
                          min={3}
                          max={15}
                          step={1}
                          onChange={(e) => {
                            setmax_depth(e.target.value);
                          }}
                        />
                      </Box>
                      <Box sx={{ width: 300 }}>
                        <Typography gutterBottom>
                          {t("Boosting learning rate .")}
                        </Typography>
                        <Slider
                          valueLabelDisplay="auto"
                          aria-label="RFC-slider"
                          defaultValue={0.1}
                          min={0.01}
                          max={0.5}
                          step={0.05}
                          onChange={(e) => {
                            setlearning_rate(e.target.value);
                          }}
                        />
                      </Box>
                    </>
                  )}
                </Stack>
              </div>

              {/* ************************************
               ***************Button ***********
               ************************************ */}
              <Stack>
                <Button
                  onClick={handleCreate}
                  color="primary"
                  variant="contained"
                >
                  {t("Create")}
                </Button>
              </Stack>
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
                    <span>{t("Empty Fields error")}</span>
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
                {t("Please wait")}
              </h1>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PopupManuel;
