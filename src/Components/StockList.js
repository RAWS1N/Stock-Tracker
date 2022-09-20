import React, { useState, useEffect, useContext } from "react";
import Server from "../APIS/Finhub";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { WatchListContext } from "../contexts/watchListContext";
import { useNavigate } from "react-router-dom";

function StockList() {
  const { watchList, deleteStock } = useContext(WatchListContext);
  const [stock, setStock] = useState([]);
  const navigate = useNavigate();

  function goto(symbol) {
    navigate(`/details/${symbol}`);
  }

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const Responses = await Promise.all(
          watchList.map((stock) => {
            return Server.get("/quote", {
              params: {
                symbol: stock,
              },
            });
          })
        );
        const data = Responses.map((response) => ({
          data: response.data,
          symbol: response.config.params.symbol,
        }));
        console.log(data);
        if (isMounted) {
          setStock(data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
    return () => (isMounted = false);
  }, [watchList]);

  function changeColor(value) {
    return value > 0 ? "success" : "danger";
  }

  function renderIcon(value) {
    return value > 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />;
  }

  return (
    <div>
      <table className="table hover mt-5">
        <thead style={{ color: "rgba(79,89,102)" }}>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Last</th>
            <th scope="col">Chg</th>
            <th scope="col">Chg%</th>
            <th scope="col">High</th>
            <th scope="col">Low</th>
            <th scope="col">Open</th>
            <th scope="col">Close</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((data, idx) => (
            <tr
              style={{ cursor: "pointer" }}
              className="table-row"
              onClick={() => goto(data.symbol)}
              key={idx}
            >
              <th scope="row">{data.symbol}</th>
              <td>{data.data.c}</td>
              <td className={`text-${changeColor(data.data.d)}`}>
                {data.data.d} {renderIcon(data.data.d)}{" "}
              </td>
              <td className={`text-${changeColor(data.data.dp)}`}>
                {data.data.dp} {renderIcon(data.data.dp)}
              </td>
              <td>{data.data.h}</td>
              <td>{data.data.l}</td>
              <td>{data.data.o}</td>
              <td>
                {data.data.pc}
                <button
                  className="btn btn-danger btn-sm mx-2 ml-3 d-inline-block delete-button"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteStock(data.symbol);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StockList;
