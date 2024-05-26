import React from "react";
import PropTypes from "prop-types";
import ReactApexChart from "react-apexcharts";
import "./CircularCharts.scss";

const CircularM = ({ percentFillValue, cardInfo }) => {
  const filledValue = percentFillValue;
  const remainedValue = 100 - filledValue;

  //const series = [filledValue, remainedValue];
  const series = [filledValue];

  const options = {
    chart: {
      height: 160,
      type: "radialBar",
    },
    labels: ["Achieved"],
    colors: ["#20E647"],
    plotOptions: {
      radialBar: {
        hollow: {
          size: "60%", // Adjust the inner radius of the radial bar
        },
        startAngle: -135,
        endAngle: 135,
        track: {
          background: "#333",
          startAngle: -135,
          endAngle: 135,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "20px",
            show: true,
            color: "#20E647", // Correctly set the text color here
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        gradientToColors: ["#87D4F9"],
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "butt",
    },
  };

  return (
    <div className="area-chart">
      <div className="area-card-chart">
        <ReactApexChart
          options={options}
          series={series}
          type="radialBar"
          height={150}
          width={160}
        />
      </div>
      <div className="area-card-info">
        <h5 className="info-title text-center">{cardInfo.title}</h5>
        <div className="info-value text-center">{cardInfo.value}</div>
      </div>
    </div>
  );
};

CircularM.propTypes = {
  percentFillValue: PropTypes.number.isRequired,
  cardInfo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export default CircularM;
