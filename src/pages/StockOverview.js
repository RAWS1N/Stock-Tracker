import React from "react";
import { StockList, AutoComplete} from "../Components";

function StockOverview() {
  const ImgStyle = {
    height: "132px",
    width: "132px",
    margin: "10px auto",
  };
  return (
    <div>
      <div className="text-center">
        <img src={"./Images/stock.png"} alt="icon" style={ImgStyle} />
      </div>
      <h2 className="text-center" style={{color:"#42AAC8"}}>Stock Tracker</h2>
      <AutoComplete />
      <StockList />
    </div>
  );
}

export default StockOverview;
