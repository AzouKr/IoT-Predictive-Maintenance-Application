import {
  LoadingData,
  Metadata,
  Target,
  FailureType,
  Anomalies,
  FeaturesScaling,
} from "../../components";

import { AreaTop } from "../../components";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import fig1 from "../../assets/figures/fig1.png";
import fig2 from "../../assets/figures/fig2.png";
import fig3 from "../../assets/figures/fig3.png";
import fig4 from "../../assets/figures/fig4.png";
import fig5 from "../../assets/figures/fig5.png";
import fig6 from "../../assets/figures/fig6.png";
import fig7 from "../../assets/figures/fig7.png";
import fig8 from "../../assets/figures/fig8.png";
import fig9 from "../../assets/figures/fig9.png";
import fig10 from "../../assets/figures/fig10.png";
import fig11 from "../../assets/figures/fig11.png";
import fig12 from "../../assets/figures/fig12.png";
import fig13 from "../../assets/figures/fig13.png";
import fig14 from "../../assets/figures/fig14.png";
import fig15 from "../../assets/figures/fig15.png";
import fig16 from "../../assets/figures/fig16.png";
import { getDatasets, getProfiling } from "../../Hooks/Python";
import Table from "../../components/Table";
import Loading from "../../components/Loading";
import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import { useTranslation } from "react-i18next";

const Profiling = () => {
  const { theme } = useContext(ThemeContext);
  const backgroundColor = theme === LIGHT_THEME ? "#F3F4F6" : "#2e2e48";
  const color = theme === LIGHT_THEME ? "black" : "white";

  const [data, setdata] = useState([]);
  const [datasets, setdatasets] = useState([]);
  const [selectedDataset, setselectedDataset] = useState("");
  const [loading, setloading] = useState(false);
  const { t } = useTranslation();

  const startHnadler = async (event) => {
    event.preventDefault();
    setloading(true);
    getProfiling(selectedDataset).then((response) => {
      // console.log(response);
      setdata(response);
      setloading(false);
      // localStorage.setItem("profiling", JSON.stringify(response));
    });
    // setdata(JSON.parse(localStorage.getItem("profiling")));
    // setloading(false);
  };

  const fetchData = async () => {
    getDatasets().then((response) => {
      setdatasets(response);
    });
  };
  // console.log(
  //   JSON.parse(JSON.parse(localStorage.getItem("profiling"))[1]).dataframe_info
  // );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="content-area">
      <div className="main-container">
        <h2 className={theme === LIGHT_THEME ? "text-black" : "text-white"}>
          {t("Data Preparation")}
        </h2>
        <p className={theme === LIGHT_THEME ? "text-black" : "text-white"}>
          {t("Transforming Raw Data into Actionable Insights.")}
        </p>
      </div>
      <div className="flex items-center justify-items-center  m-4 gap-10 ">
        <FormControl
          fullWidth
          style={{
            width: "200px", // Adjust width to account for border
          }}
        >
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
        <Button
          style={{
            backgroundColor: "#475be8",
            color: "#fff",
            width: "200px",
            height: "52px",
          }}
          onClick={startHnadler}
        >
          {t("Start profiling")}
        </Button>
      </div>
      {loading ? (
        <div className="h-[90vh] w-full flex items-center justify-center">
          <Loading />
        </div>
      ) : data.length !== 0 ? (
        <div>
          <h1
            className={`text-xl font-medium mb-3 ${
              theme === LIGHT_THEME ? "text-black" : "text-white"
            }`}
          >
            {t("Data description")}
          </h1>
          {/* This is a comment */}
          <p
            className={`text-xl opacity-75 ${
              theme === LIGHT_THEME ? "text-black" : "text-white"
            }`}
          >
            {t(
              "The dataset consists of 10,000 data points stored as rows with 14 features in columns"
            )}
          </p>
          <Accordion
            className="m-10 text-xl font-medium"
            style={{ backgroundColor, color }}
          >
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>{t("Features description")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                className={`text-xl font-medium mb-5 opacity-50 ${
                  theme === LIGHT_THEME ? "text-black" : "text-white"
                }`}
              >
                {t("UID: unique identifier;")}
                <br />
                {t(
                  "Product ID: consisting of a letter L, M, or H variants and a variant-specific serial number;"
                )}
                <br />
                {t(
                  "Air temperature [K]: generated using a random walk process later normalized to a standard deviation of 2 K around 300 K;"
                )}
                <br />
                {t(
                  "Process temperature [K]: generated using a random walk process normalized to a standard deviation of 1 K, added to the air temperature plus 10 K;"
                )}
                <br />
                {t(
                  "Rotational speed [rpm]: calculated from a power of 2860 W, overlaid with a normally distributed noise;"
                )}
                <br />
                {t(
                  "Torque [Nm]: torque values are normally distributed around 40 Nm with a standard deviation of 10 Nm and no negative values;"
                )}
                <br />
                {t(
                  "Tool wear [min]: The quality variants H/M/L add 5/3/2 minutes of tool wear to the used tool in the process;"
                )}
                <br />
                {t(
                  "Machine failure: label that indicates, whether the machine has failed in this particular data point for any of the following failure modes are true. The machine failure consists of five independent failure modes: tool wear failure (TWF): the tool will be replaced of fail at a randomly selected tool wear time between 200 - 240 mins;"
                )}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <h1
            className={`text-xl font-medium mb-3 ${
              theme === LIGHT_THEME ? "text-black" : "text-white"
            }`}
          >
            {t("Loading data")}
          </h1>
          <LoadingData TABLE_DATA={JSON.parse(data[0])} />
          <Accordion className="mb-5 mt-5" style={{ backgroundColor, color }}>
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>{t("Metadata of The dataset :")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Metadata
                row1={JSON.parse(data[1]).dataframe_info.split("\n")[5]}
                row2={JSON.parse(data[1]).dataframe_info.split("\n")[6]}
              />
              <Typography>
                <h1>
                  {
                    JSON.parse(data[1]).dataframe_info.split("\n")[
                      JSON.parse(data[1]).dataframe_info.split("\n").length - 3
                    ]
                  }
                </h1>
                <h1>
                  {
                    JSON.parse(data[1]).dataframe_info.split("\n")[
                      JSON.parse(data[1]).dataframe_info.split("\n").length - 2
                    ]
                  }
                </h1>
                <h1>
                  {t("Check for duplicate values: ")}
                  {JSON.stringify(JSON.parse(data[1]).duplicate_check)}
                </h1>
              </Typography>

              <Typography>
                {t("The following histogram shows the number sequences:")}
              </Typography>
              <div className="min-h-min w-full flex items-center justify-center">
                <img src={fig1} alt="Image" className="h-[50vh] w-[90vh]" />
              </div>
            </AccordionDetails>
          </Accordion>
          <div className="mt-5" style={{ backgroundColor, color }}>
            <Accordion style={{ backgroundColor, color }}>
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>{t("EDA(Exploratory Data Analysis)")}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {t(
                    "It is an approach to perform initial investigations on data to discover patterns, spot anomalies, test hypothesis and check assumptions with the help of statistics and graphical representations"
                  )}
                </Typography>
                <Accordion style={{ backgroundColor, color }}>
                  <AccordionSummary
                    expandIcon={<ArrowDownwardIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography>{t("Target , Failure type ...")}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div
                      className="flex justify-center "
                      style={{ width: "100%" }}
                    >
                      <Target TABLE_DATA={JSON.parse(data[3])} />
                      <FailureType TABLE_DATA={JSON.parse(data[2])} />
                    </div>
                  </AccordionDetails>
                </Accordion>
                <Accordion style={{ backgroundColor, color }}>
                  <AccordionSummary
                    expandIcon={<ArrowDownwardIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography>{t("Target anomalies :")}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {t(
                        "In this section we observe the distribution of the target to find any imbalances and correct them before dividing the dataset."
                      )}
                    </Typography>
                    <div
                      className="flex justify-center "
                      style={{ width: "100%" }}
                    >
                      <Anomalies data={JSON.parse(data[6])} />
                    </div>
                  </AccordionDetails>
                </Accordion>
                <Accordion style={{ backgroundColor, color }}>
                  <AccordionSummary
                    expandIcon={<ArrowDownwardIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography>{t("Data Visualisation")}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {t(
                        "Data Visualisation is also a part of EDA to represent categorical data with graphical representation."
                      )}
                    </Typography>
                    <Accordion style={{ backgroundColor, color }}>
                      <AccordionSummary
                        expandIcon={<ArrowDownwardIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography>{t("Product types")}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          {t(
                            "The following pie chart shows the percentages of machines by Type:"
                          )}
                        </Typography>
                        <div className="min-h-min w-full flex items-center justify-center">
                          <img
                            src={fig2}
                            alt="Image"
                            className="h-[50vh] w-[120vh]"
                          />
                        </div>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion style={{ backgroundColor, color }}>
                      <AccordionSummary
                        expandIcon={<ArrowDownwardIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography>{t("Percentage of failure")}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="min-h-min w-full flex items-center justify-center">
                          <img
                            src={fig3}
                            alt="Image"
                            className="h-[40vh] w-[50vh]"
                          />
                        </div>
                        <Typography>
                          {t(
                            "The dataset is highly imbalanced where the machine failure consist only 3.5% of the whole dataset."
                          )}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion style={{ backgroundColor, color }}>
                      <AccordionSummary
                        expandIcon={<ArrowDownwardIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography>
                          {t("Percentage of failure wrt product type")}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="min-h-min w-full flex items-center justify-center">
                          <img
                            src={fig4}
                            alt="Image"
                            className="h-[50vh] w-[120vh]"
                          />
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </AccordionDetails>
                </Accordion>
                <Accordion style={{ backgroundColor, color }}>
                  <AccordionSummary
                    expandIcon={<ArrowDownwardIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography>{t("Correlation")}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="min-h-min w-full flex items-center justify-center">
                      <img
                        src={fig5}
                        alt="Image"
                        className="h-[90vh] w-[140vh]"
                      />
                    </div>
                    <Typography>
                      {t(
                        "Insights: -Torque and rotational speed are highly correlated. -Process temperature and air temperature are also highly correlated. We immediately see that failures occur for extreme values of some features, i.e., the machinery fails either for the lowest or largest values of torque and rotational speed. This is easily spotted in the graph since the green dots are far apart for those features. So, there is a range for normal conditions in which the machines operate, and above or under this range, they tend to fail."
                      )}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion style={{ backgroundColor, color }}>
                  <AccordionSummary
                    expandIcon={<ArrowDownwardIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography>
                      {t(
                        "violin chart to see how torque and rotational speed behave:"
                      )}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="min-h-min w-full flex items-center justify-center">
                      <img
                        src={fig6}
                        alt="Image"
                        className="h-[50vh] w-[140vh]"
                      />
                    </div>
                    <Typography>
                      {t(
                        "Insight: Regarding torque and rotational speed, it can be seen again that most failures are triggered for much lower or much higher values than the mean when not failing."
                      )}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion style={{ backgroundColor, color }}>
                  <AccordionSummary
                    expandIcon={<ArrowDownwardIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography>{t("Correllation Heatmap:")}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="min-h-min w-full flex items-center justify-center">
                      <img
                        src={fig7}
                        alt="Image"
                        className="h-[80vh] w-[110vh]"
                      />
                    </div>
                    <Typography>
                      {t(
                        "As mentioned before, there is high correlation between process temperature and air temperature, and between rotational speed and torque."
                      )}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion style={{ backgroundColor, color }}>
                  <AccordionSummary
                    expandIcon={<ArrowDownwardIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography>
                      {t("Exploring features for each type of failure:")}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="min-h-min w-full flex items-center justify-center">
                      <img
                        src={fig8}
                        alt="Image"
                        className="h-[50vh] w-[140vh]"
                      />
                    </div>
                    <Typography>
                      {t(
                        "Some insights: Power failure happens both for lower and higher rotational speed/torque. It is the type of failure with the highest rotational speed (over 2500rpm) and lowest torque (below around 15Nm). In other others, above and below these thresholds only power failures occur. Between torques 16Nm and 41Nm all failures are tool wear. Overstrain failures take place with torques ranging from around 47 and 68Nm) and rotational speeds from 1200 to 1500rpm approximately. For heat dissipation failures, the torque range is smaller and the rotational speed range is bigger compared to overstrain failures."
                      )}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion style={{ backgroundColor, color }}>
                  <AccordionSummary
                    expandIcon={<ArrowDownwardIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography>{t("Outliers inspection:")}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {t(
                        "The goal of this section is to check if the dataset contains any outlier, which are usually misleading for machine learning algorithms. We begin by looking at a statistical report of the numerical features."
                      )}
                    </Typography>
                    <div className="min-h-min w-full flex items-center justify-center">
                      <img
                        src={fig9}
                        alt="Image"
                        className="h-[50vh] w-[140vh]"
                      />
                    </div>
                    <Typography>
                      {t(
                        "From the boxplots we can see that 'Rotational speed' and 'Torque' have outliers."
                      )}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                {JSON.parse(data[5]).ratio * 100 < 10 && (
                  <>
                    <Accordion style={{ backgroundColor, color }}>
                      <AccordionSummary
                        expandIcon={<ArrowDownwardIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography>{t("Resampling with SMOTE:")}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          {t(
                            "Another important consideration regards the extremely low occurrence of machine failures among the entire dataset, which percentage is equal only to 3.31%. Moreover, a pie plot showing the occurrence of the causes involved for each failure reveals a further degree of imbalance."
                          )}
                        </Typography>
                        <div className="min-h-min w-full flex items-center justify-center">
                          <img
                            src={fig10}
                            alt="Image"
                            className="h-[60vh] w-[70vh]"
                          />
                        </div>
                        <Typography>
                          {t(
                            "we use the SMOTE procedure to generate new samples, which is very much like slightly moving the data point in the direction of its neighbors. This way, the synthetic data point is not an exact copy of an existing data point but we can also be sure that it is also not too different from the known observations in the minority class."
                          )}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion style={{ backgroundColor, color }}>
                      <AccordionSummary
                        expandIcon={<ArrowDownwardIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography>
                          {t("Comparison after resampling:")}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          {t(
                            "The result is described in the following pie charts."
                          )}
                        </Typography>
                        <div className="min-h-min w-full flex items-center justify-center">
                          <img
                            src={fig11}
                            alt="Image"
                            className="h-[60vh] w-[140vh]"
                          />
                        </div>
                        <div className="min-h-min w-full flex items-center justify-center mb-[1vh] mt-[1vh]">
                          <img
                            src={fig12}
                            alt="Image"
                            className="h-[60vh] w-[140vh]"
                          />
                        </div>
                        <Typography>
                          {t(
                            "Finally, let’s look at how the distribution of features has changed."
                          )}
                        </Typography>
                        <div className="min-h-min w-full flex items-center justify-center mb-[1vh] mt-[1vh]">
                          <img
                            src={fig13}
                            alt="Image"
                            className="h-[60vh] w-[140vh]"
                          />
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </>
                )}
                <Accordion style={{ backgroundColor, color }}>
                  <AccordionSummary
                    expandIcon={<ArrowDownwardIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography>
                      {t("Features scaling and Encoding:")}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {t(
                        "In order to make data exploitable for the algorithms we will run, we apply two transformations: First, we apply a label encoding to the categorical columns, since Type is an ordinal feature and Cause must be represented in one column. The mapping follows this scheme: Type: L=0, M=1, H=2 Cause: Working=0, PWF=1, OSF=2, HDF=3, TWF=4 Secondly we perform the scaling of the columns with StandardScaler. This is particularly useful for the good working of methods that rely on the metric space, such as PCA and KNN. It has been also verified that using StandardScaler leads to slightly better performances than using MinMaxScaler."
                      )}
                    </Typography>
                    <FeaturesScaling TABLE_DATA={JSON.parse(data[4])} />
                  </AccordionDetails>
                </Accordion>
                <Accordion style={{ backgroundColor, color }}>
                  <AccordionSummary
                    expandIcon={<ArrowDownwardIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography>
                      {t("PCA (Principal Component Analysis)")}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {t(
                        "We run PCA to have a further way of displaying the data instead of making feature selection."
                      )}
                    </Typography>
                    <div className="min-h-min w-full flex items-center justify-center mb-[1vh] mt-[1vh]">
                      <img src={fig15} alt="Image" className=" w-[140vh] " />
                    </div>
                    <div className="min-h-min w-full flex items-center justify-center mb-[1vh] mt-[1vh]">
                      <img src={fig14} alt="Image" className=" w-[140vh] " />
                    </div>
                  </AccordionDetails>
                  <Typography>
                    {t(
                      "The bar plot of Principal Components weights makes easy to understand what they represent: PC1 is closely related to the two temperature data; PC2 can be identified with the machine power, which is the product of Rotational Speed and Torque; PC3 is identifiable with Tool Wear."
                    )}
                  </Typography>
                </Accordion>
                <Accordion style={{ backgroundColor, color }}>
                  <AccordionSummary
                    expandIcon={<ArrowDownwardIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography>
                      {t("Correlation heatmap after data preprocessing :")}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="min-h-min w-full flex items-center justify-center mb-[1vh] mt-[1vh]">
                      <img
                        src={fig16}
                        alt="Image"
                        className="h-[60vh] w-[90vh]"
                      />
                    </div>
                  </AccordionDetails>
                </Accordion>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Profiling;
