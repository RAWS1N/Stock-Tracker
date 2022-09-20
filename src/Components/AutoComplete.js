import React, { useState, useEffect, useContext } from "react";
import Server from "../APIS/Finhub";
import { WatchListContext } from "../contexts/watchListContext";

function AutoComplete() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const { addStock} = useContext(WatchListContext);

  function toggleStock(value){
    addStock(value)
    setResult([])
    setSearch('')
  }

  const styles = {
    backgroundColor: "rgba(145,158,171,0.04)",
  };

  const listStyle = {
    height: "100px",
    overflowX: "hidden",
    overflowY: "scroll",
    cursor: "pointer",
    width: "100%",
  };

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      try {
        const request = await Server.get("/search", {
          params: {
            q: search,
          },
        });
        // console.log(request)
        if (isMounted) {
          setResult(request.data.result);
        }
      } catch (e) {
        console.log(e.message);
      }
    }
    {
      if (search.length > 0) {
        fetchData();
      } else {
        setResult([]);
      }
    }
    console.log(result);
    return () => (isMounted = false);
  }, [search]);

  function handleChange(event) {
    setSearch(event.target.value);
  }
  return (
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input
          style={styles}
          type="text"
          id="search"
          className="form-control"
          placeholder="Search"
          autoComplete="off"
          onChange={handleChange}
          value={search}
        />
        <label htmlFor="search">Search</label>
        <ul
          className={`dropdown-menu ${result.length && "show"}`}
          style={listStyle}
        >
          {result.map((stock, idx) => {
            return (
              <li key={idx} onClick={() => toggleStock(stock.symbol)}className="dropdown-item">
                {stock.description} ({stock.symbol})
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default AutoComplete;
