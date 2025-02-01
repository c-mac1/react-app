"use client";
import SearchBar from "./components/SearchBar";
import useSWR from "swr";
import DataTable from "./components/DataTable";
import { useEffect, useState } from "react";
import { StockData } from "./types/priceData";
import { useDataContext } from "./context/DataContext";


// const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_URL = "https://c4rm9elh30.execute-api.us-east-1.amazonaws.com/default/cachedPriceData?ticker=C";

const fetcher = (url: string) => fetch(url).then((res) => res.json());


export default function Home() {

  const [search, setSearch] = useState("");
  const { data, error } = useSWR(API_URL, fetcher);
  const { setData } = useDataContext();

  useEffect(() => {
    if (data) {
      const stockData: StockData = {
        ticker: data.ticker,
        price_data: data.price_data
      };
      setData(stockData.price_data);
    }
  }, [data, setData]);

  if (error) return <p>Error loading data...</p>;
  if (!data) return <p>Loading...</p>;

  console.log(data);



  return (
    <div>
    <SearchBar search={search} setSearch={setSearch} />
    <DataTable />
    {/* <Chart data={filteredData} /> */}
  </div>
  );
}

