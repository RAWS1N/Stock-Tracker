import React from "react";
import { StockDetails, StockOverview } from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WatchListContextProvider } from "./Components";
import "./App.css";

function App() {
  return (
    <WatchListContextProvider>
      <div className="container  mx-6">
        <Router>
          <Routes>
            <Route path="/" element={<StockOverview />} />
            <Route exact path="/details/:symbol" element={<StockDetails />} />
          </Routes>
        </Router>
      </div>
    </WatchListContextProvider>
  );
}

export default App;
