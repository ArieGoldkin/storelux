import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { createRandomColors } from "../../common/util/randomColorsArray";
import { Pie } from "react-chartjs-2";

const ProductsSalesChart = ({ data, products }) => {
  const [chartData, setChartData] = useState();
  const productsTitleArray = products.map((product) => product.title);
  let quantityArray = new Array(products.length).fill(0);

  useEffect(() => {
    const setData = () => {
      const colorsArray = createRandomColors(products);
      for (const key in products) {
        quantityArray[key] = products[key].soldUnits;
      }
      data.labels = productsTitleArray;
      data.datasets[0].backgroundColor = colorsArray;
      data.datasets[0].data = quantityArray;
    };
    setData();
  }, [data.datasets, data.labels, products, productsTitleArray, quantityArray]);

  useEffect(() => {
    !chartData && setChartData(data);
  }, [chartData, data]);

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
      text: "Products Sales",
      fontSize: 25,
      fontColor: "#1E1E1E",
    },
    maintainAspectRatio: false,
  };

  return <Pie data={chartData} width={700} height={500} options={options} />;
};

ProductsSalesChart.propTypes = {
  data: PropTypes.object,
  datasets: PropTypes.object,
};

ProductsSalesChart.defaultProps = {
  data: {
    labels: [],
    datasets: [
      {
        label: "Products Sales",
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

export default ProductsSalesChart;
