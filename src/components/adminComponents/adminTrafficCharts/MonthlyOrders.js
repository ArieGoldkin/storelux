import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Bar as BarChart } from "react-chartjs-2";

require("./RoundedBars.js");

const MonthlyOrders = ({ orders, datasets }) => {
  const [chartData, setChartData] = useState();
  console.log(orders);
  let monthsArray = new Array(12).fill(0);
  const lastYearOrders = orders.filter((order) => order.year === 2019);
  console.log(lastYearOrders);

  // const setMonths = (orders) => {
  //   let monthsArray = new Array(12).fill(0);
  //   for (let month = 0; month < monthsArray.length; month++) {
  //     let count = 0;
  //     for (let item = 0; item < orders.length; item++) {
  //       if (orders[item].month === month) {
  //         count++;
  //       }
  //     }
  //     monthsArray[month] = count;
  //   }
  //   return monthsArray;
  // };

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
      text: "Yearly orders chart",
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
  data: PropTypes.object,
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
        label: "Year 2020",
        data: [20, 10],
        backgroundColor: "#36A2EB",
        borderColor: "#36404D",
        borderWidth: 1,
        hoverBackgroundColor: "#75D9FD",
        hoverBorderColor: "#75D9FD",
      },
      {
        label: "Year 2019",
        data: [30, 50, 60, 10, 40, 15, 33, 55, 9, 43, 11, 60],
        backgroundColor: "#4E67ED",
        borderColor: "#36404D",
        borderWidth: 1,
        hoverBackgroundColor: "#3762A3",
        hoverBorderColor: "#3762A3",
      },
    ],
  },
};

export default MonthlyOrders;
