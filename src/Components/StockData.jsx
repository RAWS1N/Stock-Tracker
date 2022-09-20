import React, { useState, useEffect } from "react";
import Server from "../APIS/Finhub";
import {useNavigate} from 'react-router-dom'

function StockData({ symbol }) {
  const [stockData, setStockData] = useState([]);
    const Navigate = useNavigate()

function goBack(){
    Navigate('/')
}
  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      try {
        const response = await Server.get("/stock/profile2", {
          params: {
            symbol: symbol,
          },
        });
        if (isMounted) {
          setStockData(response.data);
        }
        
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchData();
    return () => (isMounted = false);
  }, [symbol]);


  const ImgStyle = {
    height:'132px',
    width : '132px'
  }
  return (
    <div>
      {stockData && (
        <div className="row border bg-white shadow-sm p-4 my-5">
          <div className="col p-4">
            <img style={ImgStyle}src={stockData.logo} alt="logo"/>
          </div>
          <div className="col p-4">
            <div>
              <span className="fw-bold">Name: </span>
              {stockData.name}
            </div>
            <div>
              <span className="fw-bold">Country: </span>
              {stockData.country}
            </div>
            <div>
              <span className="fw-bold">Ticker: </span>
              {stockData.ticker}
            </div>
            <div>
              <span className="fw-bold">Currency: </span>
              {stockData.currency}
            </div>
          </div>
          <div className="col p-4">
            <div>
              <span className="fw-bold">Exchange: </span>
              {stockData.exchange}
            </div>
            <div>
              <span className="fw-bold">Industry: </span>
              {stockData.finnhubIndustry
}
            </div>
            <div>
              <span className="fw-bold">IPO : </span>
              {stockData.ipo}
            </div>
          </div>
          <div className="col p-4">
            <div>
              <span className="fw-bold">Market Cap: </span>
              {stockData.marketCapitalization}
            </div>
            <div>
              <span className="fw-bold">Shares Outstanding: </span>
              {stockData.shareOutstanding}
            </div>
            <div>
              <span className="fw-bold">Url: </span>
              <a href={stockData.weburl} rel="noreferrer" target="_blank">
                {stockData.weburl}
              </a>
            </div>
          </div>
        </div>
      )}

      <div style={{ textAlign: "right","margin":'20px 0px' }}>
        <button
          className="btn btn-outline-primary"
          onClick={goBack}
          
        >
          Go back
        </button>
      </div>
    </div>
  );
}

export default StockData;
