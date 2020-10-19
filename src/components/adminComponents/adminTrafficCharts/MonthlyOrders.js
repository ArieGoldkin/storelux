import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// import * as orderSelectors from "../selectors/AllOrdersSelectors";
import { Bar as BarChart } from "react-chartjs-2";

// import LoadingSpinner from "../../common/UIElements/LoadingSpinner";
// import ErrorModal from "../../common/UIElements/ErrorModal";
// import { makeStyles } from "@material-ui/core/styles";

// import Card from "../../common/UIElements/Card";

require("./RoundedBars.js");

// const styles = makeStyles({
//   root: {
//     width: "80%",
//     margin: "1rem auto",
//   },
// });

const MonthlyOrders = ({ datasets, orders }) => {
  // const classes = styles();
  const [chartData, setChartData] = useState(datasets);
  // const [isLoading, setIsLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState(null);

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
      fontSize: 18,
      fontColor: "#1E1E1E",
    },
    maintainAspectRatio: false,
    cornerRadius: 4,
  };

  return (
    // <Card>
    <BarChart data={chartData} width={600} height={400} options={options} />
    // </Card>
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
