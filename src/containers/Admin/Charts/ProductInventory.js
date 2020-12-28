import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { createRandomColors } from "../../../components/common/util/randomColorsArray";
import { Doughnut } from "react-chartjs-2";

require("./RoundedBars.js");

const ProductInventory = ({ categories, products, data }) => {
  const [chartData, setChartData] = useState();

  const categoriesArray = categories.map((category) => category.name);

  let counterCategory = new Array(categoriesArray.length).fill(0);

  useEffect(() => {
    const setData = () => {
      let colorsArray = createRandomColors(categoriesArray);
      for (let category = 0; category < categoriesArray.length; category++) {
        let count = 0;
        for (let item = 0; item < products.length; item++) {
          if (categoriesArray[category] === products[item].category) {
            count++;
          }
        }
        counterCategory[category] = count;
      }
      data.labels = categoriesArray;
      data.datasets[0].backgroundColor = colorsArray;
      data.datasets[0].data = counterCategory;
    };
    setData();
  }, [categoriesArray, counterCategory, data, data.datasets, data.labels, products]);

  useEffect(() => {
    setChartData(data);
  }, [data]);

  const options = {
    legend: {
      display: true,
      position: "left",
      align: "start",
      labels: {
        boxWidth: 60,
        fontSize: 16,
      },
    },
    title: {
      display: true,
      text: "Product inventory by categories",
      fontSize: 25,
      fontColor: "#1E1E1E",
    },
    maintainAspectRatio: false,
  };

  return (
    <Doughnut data={chartData} width={600} height={400} options={options} />
  );
};

ProductInventory.propTypes = {
  data: PropTypes.object,
  datasets: PropTypes.object,
};

ProductInventory.defaultProps = {
  data: {
    labels: [],
    datasets: [
      {
        label: "Sales by Categories",
        data: [],
        backgroundColor: [
          "rgba(255,99,132,1)",
          "rgba(255,205,86,1)",
          "rgba(54,162,235,1)",
          "rgba(255,159,64,1)",
          "rgba(153,102,255,1)",
          "rgba(255,101,30,1)",
        ],
        borderWidth: 2,
      },
    ],
  },
};

export default ProductInventory;
