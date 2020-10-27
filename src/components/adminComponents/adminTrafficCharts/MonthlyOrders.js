import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Bar as BarChart } from "react-chartjs-2";

require("./RoundedBars.js");

const MonthlyOrders = ({ datasets, orders }) => {
  const [chartData, setChartData] = useState();

  let monthsArray = new Array(12).fill(0);

  useEffect(() => {
    const setMonths = () => {
      for (let month = 0; month < monthsArray.length; month++) {
        let count = 0;
        for (let item = 0; item < orders.length; item++) {
          if (orders[item].month === month) {
            count++;
          }
        }
        monthsArray[month] = count;
      }
      datasets.datasets[0].data = monthsArray;
    };
    setMonths();
  }, [datasets.datasets, monthsArray, orders]);

  useEffect(() => {
    setChartData(datasets);
  }, [datasets]);

  const options = {
    title: {
      display: true,
      text: "Orders chart for year 2020",
      fontSize: 25,
      fontColor: "#1E1E1E",
    },
    maintainAspectRatio: false,
    cornerRadius: 4,
  };

  return (
    <BarChart data={chartData} width={600} height={400} options={options} />
  );
};

MonthlyOrders.propTypes = {
  datasets: PropTypes.object,
};

MonthlyOrders.defaultProps = {
  datasets: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "YEARLY ORDERS CHART",
        data: [],
        backgroundColor: "#36A2EB",
        borderColor: "#36404D",
        borderWidth: 1,
        hoverBackgroundColor: "#75D9FD",
        hoverBorderColor: "#75D9FD",
      },
    ],
  },
};

export default MonthlyOrders;
