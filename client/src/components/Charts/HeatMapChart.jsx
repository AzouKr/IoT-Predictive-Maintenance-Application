import React, { useContext } from "react";
import ReactApexChart from "react-apexcharts";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";

const generateData = (count, months) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      x: `${i + 1}`,
      y: months[i],
    });
  }
  return data;
};

const HeatMapChart = ({ state }) => {
  const { theme } = useContext(ThemeContext); // Accessing theme from ThemeContext
  // console.log(state);
  const months = [];
  const today = new Date();
  for (let index = 0; index < 9; index++) {
    if (today.getMonth() > index) {
      const arrayOfZeros = Array(31).fill(0);
      state.forEach((element) => {
        const date = new Date(element.date);
        if (date.getMonth() === index) {
          let degree =
            element.degree === "Risque"
              ? 2
              : element.degree === "Panne"
              ? 1
              : 0;
          arrayOfZeros[date.getDate() - 1] = degree;
        }
      });
      months.push(arrayOfZeros);
    } else {
      if (today.getMonth() === index) {
        const arrayOfZeros = Array(31).fill(0);
        state.forEach((element) => {
          const date = new Date(element.date);
          if (date.getMonth() === index) {
            let degree =
              element.degree === "Risque"
                ? 2
                : element.degree === "Panne"
                ? 1
                : 0;
            arrayOfZeros[date.getDate() - 1] = degree;
          }
        });
        for (let j = today.getDate(); j < 31; j++) {
          arrayOfZeros[j] = 3;
        }
        months.push(arrayOfZeros);
      } else {
        const arrayOfZeros = Array(31).fill(3);
        months.push(arrayOfZeros);
      }
    }
  }
  const options = {
    series: [
      {
        name: "Jan",
        data: generateData(31, months[0]),
      },
      {
        name: "Feb",
        data: generateData(29, months[1]),
      },
      {
        name: "Mar",
        data: generateData(31, months[2]),
      },
      {
        name: "Apr",
        data: generateData(30, months[3]),
      },
      {
        name: "May",
        data: generateData(31, months[4]),
      },
      {
        name: "Jun",
        data: generateData(30, months[5]),
      },
      {
        name: "Jul",
        data: generateData(31, months[6]),
      },
      {
        name: "Aug",
        data: generateData(30, months[7]),
      },
      {
        name: "Sep",
        data: generateData(31, months[8]),
      },
    ],
    chart: {
      height: 350,
      type: "heatmap",
    },
    legend: {
      labels: {
        colors: theme === LIGHT_THEME ? "black" : "white",
      },
    },
    xaxis: {
      labels: {
        style: {
          colors: theme === LIGHT_THEME ? "black" : "white",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: theme === LIGHT_THEME ? "black" : "white",
        },
      },
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        radius: 0,
        useFillColorAsStroke: true,
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 0,
              name: "Marche",
              color: "#00A100",
            },
            {
              from: 2,
              to: 2,
              name: "Danger",
              color: "#FFB200",
            },
            {
              from: 1,
              to: 1,
              name: "Panne",
              color: "#FF0000",
            },
            {
              from: 3,
              to: 3,
              name: "NaN",
              color: "#808080",
            },
          ],
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      curve: "straight",
      lineCap: "butt",
      width: 0,
      dashArray: 0,
    },
    title: {
      text: "HeatMap Chart",
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={options.series}
        type="heatmap"
        height={350}
      />
    </div>
  );
};

export default HeatMapChart;
