import React, { useState } from "react";
import Chart from "react-apexcharts";




function StockChart({ chartData, symbol }) {
  const { day, week, year } = chartData;
  const [selection, setSelection] = useState("24h");

  const dataString =
    selection === "1yr" ? year : selection === "7d" ? week : day;
  const color = dataString && dataString[0]['y'] < dataString[dataString.length-1]['y'] ? '#26C281' : '#ED3419'
  console.log(color)
  
  const options = {
    colors : [color],
    title: {
      text: symbol,
      align: "center",
      style: {
        fontSize: "24px",
      },
    },
    chart: {
      id: "Stock Data",
      animation: 1300,
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: "New Delhi",
      },
    },
    tooltip: {
      x: {
        format: "MMM dd HH:MM",
      },
    },
  };

  const series = [
    {
      name: symbol,
      data: dataString,
    },
  ];

  function renderButtonClass(button) {
    let Classes = "btn m-1 ";
    if (button === selection) {
      Classes += "btn-primary";
    } else {
      Classes += "btn-outline-primary";
    }
    return Classes;
  }

  return (
    <div
      style={{ backgroundColor: "rgba(145,158,171,0.04)" }}
      className=" m-4 p-4 shadow-sm bg-white"
    >
      <Chart options={options} series={series} width="100%" type="area" />
      <div className="mt-4">
        <button
          className={renderButtonClass("24h")}
          onClick={() => setSelection("24h")}
        >
          24h
        </button>
        <button
          className={renderButtonClass("7d")}
          onClick={() => setSelection("7d")}
        >
          7d
        </button>
        <button
          className={renderButtonClass("1yr")}
          onClick={() => setSelection("1yr")}
        >
          1yr
        </button>
      </div>
    </div>
  );
}

export default StockChart;
