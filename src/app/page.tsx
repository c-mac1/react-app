"use client";
import React from "react";
import SearchBar from "./components/SearchBar";
import useSWR from "swr";
import DataTable from "./components/DataTable";
import { useEffect, useState } from "react";
import { StockData } from "./types/priceData";
import { useDataContext } from "./context/DataContext";
import LineChart from "./components/charts/LineChart";
import BarChart from "./components/charts/BarChart";
import Tabs from "./components/Tabs";
import PieChart from "./components/charts/PieChart";
import { tableStyles } from "./styles/tableStyles";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_URL = "https://c4rm9elh30.execute-api.us-east-1.amazonaws.com/default/cachedPriceData?ticker=C ";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`API error: ${response.statusText}`);
  return response.json();
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [activeTab, setActiveTab] = useState("table"); // Manage active tab
  const { data, error, mutate, isValidating } = useSWR(API_URL, fetcher);
  const { setData } = useDataContext();

  useEffect(() => {
    if (data) {
      const stockData: StockData = {
        ticker: data.ticker,
        price_data: data.price_data,
      };
      setData(stockData.price_data);
    }
  }, [data, setData]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const handleRetry = () => {
    // refetches data 
    mutate();
  };

  if (error) {
    return (
      <div style={{ textAlign: "center", color: "red", marginTop: "20px" }}>
        <p>Error: {error.message}</p>
        <button onClick={handleRetry} style={{ padding: "8px 12px", cursor: "pointer" }}>
          Retry
        </button>
      </div>
    );
  }

  if (!data || isValidating) return <p>Loading...</p>;

  // handle empty data
  if (!data) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p>No data available. Please try again later.</p>
        <button onClick={handleRetry} style={{ padding: "8px 12px", cursor: "pointer" }}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Tabs */}
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Conditionally render the active tab */}
      {activeTab === "table" && (
        <div style={{ padding: "20px" }}>
          <SearchBar search={search} setSearch={setSearch} />
          <DataTable search={debouncedSearch} styles={tableStyles} />
        </div>
      )}
      {activeTab === "chart" && (
        <div style={{ padding: "20px" }}>
          <LineChart data={data.price_data} style={{ marginBottom: "5%" }} />
          <BarChart data={data.price_data} />
          <PieChart data={data.price_data} />
        </div>
      )}
    </div>
  );
}


