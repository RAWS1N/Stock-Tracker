import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Server from "../APIS/Finhub";
import { StockChart, StockData, Loader } from "../Components";

function formatData(data) {
  const Response = data.t.map((value, idx) => {
    return {
      x: value * 1000,
      y: Math.floor(data.c[idx]),
    };
  });
  return Response;
}

function StockDetails() {
  const [chartData, setChartData] = useState([]);
  const { symbol } = useParams();

  useEffect(() => {
    async function fetchData() {
      const date = new Date();
      const currentTime = Math.floor(date.getTime() / 1000);
      let oneDayAgo;
      const oneWeekAgo = currentTime - 7 * (60 * 60 * 24);
      const oneYearAgo = currentTime - 365 * (60 * 60 * 24);
      const day = date.getDay();
      if (day === 6) {
        oneDayAgo = currentTime - 2 * (60 * 60 * 60);
      } else if (day === 0) {
        oneDayAgo = currentTime - 3 * (60 * 60 * 60);
      } else {
        oneDayAgo = currentTime - 60 * 60 * 24;
      }
      try {
        const allResponses = await Promise.all([
          Server.get("/stock/candle", {
            params: {
              symbol: symbol,
              from: oneDayAgo,
              to: currentTime,
              resolution: 30,
            },
          }),
          Server.get("/stock/candle", {
            params: {
              symbol: symbol,
              from: oneWeekAgo,
              to: currentTime,
              resolution: 60,
            },
          }),
          Server.get("/stock/candle", {
            params: {
              symbol: symbol,
              from: oneYearAgo,
              to: currentTime,
              resolution: "W",
            },
          }),
        ]);
        setChartData({
          day: formatData(allResponses[0].data),
          week: formatData(allResponses[1].data),
          year: formatData(allResponses[2].data),
        });
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [symbol]);

  const renderComponent =
    chartData.length !== 0 ? (
      <StockChart chartData={chartData} symbol={symbol} />
    ) : (
      <Loader />
    );

  return (
    <div>
      {renderComponent}
      <StockData symbol={symbol} />
    </div>
  );
}

export default StockDetails;
