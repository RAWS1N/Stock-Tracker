import React,{useState,useEffect} from 'react'
import {WatchListContext} from '../contexts/watchListContext'


function WatchListContextProvider({children}){
    const data = JSON.parse(localStorage.getItem('watchList')) 
    const [watchList, setWatchList] = useState(data || ["GOOGL", "MSFT", "AMZN"]);
    

    useEffect(() => {
        localStorage.setItem('watchList',JSON.stringify(watchList))
    },[watchList])

    function addStock(stock){
        if(!watchList.includes(stock)){
            setWatchList(prevState => [...prevState,stock])
        }
    }

    function deleteStock(stock){
        const filteredStock = watchList.filter(el => el !== stock)
        setWatchList(filteredStock)
    }

    return (
        <WatchListContext.Provider value={{watchList,addStock,deleteStock}}>
            {children}
        </WatchListContext.Provider>
    )
}


export default WatchListContextProvider