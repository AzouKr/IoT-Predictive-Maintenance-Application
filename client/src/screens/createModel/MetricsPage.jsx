import React, { useContext, useState, useEffect } from "react";
import { Metrics } from "../../components";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import Chart from "react-apexcharts";
import { useNavigate } from "react-router-dom";
import { getMetrics } from "../../Hooks/Python";
import { useLocation } from "react-router-dom";

const MetricsPage = () => {
  const { theme } = useContext(ThemeContext);
  const backgroundColor = theme === LIGHT_THEME ? "#F3F4F6" : "#2e2e48";
  const color = theme === LIGHT_THEME ? "black" : "white";
  const navigate = useNavigate();
  const [values, setvalues] = useState();
  const [series, setseries] = useState([]);
  const location = useLocation();
  const { state } = location;

  if (state === null) {
    navigate("/models");
  }

  const fetchData = async () => {
    const data = {
      name: state,
    };
    getMetrics(data)
      .then((response) => {
        //setdatasets(response);
        const combinedData = [
          {
            algo: "file1",
            ACC: Object.values(response)[0].key.ACC,
            AUC: Object.values(response)[0].key.AUC,
            F1: Object.values(response)[0].key.F1,
            F2: Object.values(response)[0].key.F2,
          },
          {
            algo: "file2",
            ACC: Object.values(response)[1].key.ACC,
            AUC: Object.values(response)[1].key.AUC,
            F1: Object.values(response)[1].key.F1,
            F2: Object.values(response)[1].key.F2,
          },
        ];
        setvalues(combinedData);
        series.push({
          name: "Validation score",
          data: [
            combinedData[0].ACC,
            combinedData[0].AUC,
            combinedData[0].F1,
            combinedData[0].F2,
          ],
        });
        series.push({
          name: "Test score",
          data: [
            combinedData[1].ACC,
            combinedData[1].AUC,
            combinedData[1].F1,
            combinedData[1].F2,
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const colors = ["#008FFB", "#00E396"];

  const options = {
    series: series,
    chart: {
      height: 300,
      type: "bar",
      events: {
        click: function (chart, w, e) {
          // Handle chart click event
        },
      },
    },
    colors: colors,
    plotOptions: {
      bar: {
        columnWidth: "35%",
        distributed: false, // Ensure each series has a single color
      },
    },
    dataLabels: {
      enabled: true,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: [["Acc"], ["AUC"], ["F1"], ["F2"]],
      labels: {
        style: {
          colors: ["#000000"], // Set a single color for x-axis labels
          fontSize: "12px",
        },
      },
    },
  };

  return (
    <div className={`content-area ${theme === LIGHT_THEME ? "" : "dark-mode"}`}>
      <h1
        style={{
          color,
          fontSize: "25px",
          opacity: "0.7",
          borderBottom: "1px solid #3210b9",
        }}
      >
        Results
      </h1>
      <div
        className="flex items-center justify-center m-6 h-[60px]"
        style={{
          backgroundColor: theme === LIGHT_THEME ? "#e8f4ea" : "#b8d8be",
          boxShadow: "2px 3px 17px -3px #b8d8be",
          padding: "15px",
        }}
      >
        <h2 className={theme === LIGHT_THEME ? "text-black" : "text-white"}>
          Evaluating the Model's Performance Metrics
        </h2>
      </div>
      <Metrics values={values} />
      <Chart
        options={options}
        series={options.series}
        type="bar"
        height={options.chart.height}
        width="100%"
      />
    </div>
  );
};

export default MetricsPage;
