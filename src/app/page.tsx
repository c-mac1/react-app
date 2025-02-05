"use client";
import React from "react";
import SearchBar from "./components/SearchBar";
import DataTable from "./components/DataTable";
import { useEffect, useState } from "react";
import { useDataContext } from "./context/DataContext";
import LineChart from "./components/charts/LineChart";
import BarChart from "./components/charts/BarChart";
import Tabs from "./components/Tabs";
// import PieChart from "./components/charts/PieChart";
import { tableStyles } from "./styles/tableStyles";
import { usePriceData } from "./hooks/api";
import "./styles/pageStyles.css";
export default function Home() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [activeTab, setActiveTab] = useState("table");
  const { priceData, error, mutate, isValidating } = usePriceData();
  const { setData } = useDataContext();

  useEffect(() => {
    if (priceData) {
      setData(priceData);
    }
  }, [priceData, setData]);

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
      <div className="error-message">
        <p>Error: {error.message}</p>
        <button onClick={handleRetry} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  if (!priceData || isValidating) return <p>Loading...</p>;

  // handle empty data
  if (!priceData) {
    return (
      <div className="error-message">
        <p>No data available. Please try again later.</p>
        <button onClick={handleRetry} className="retry-button">
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
        <div className="tab-content">
          <SearchBar search={search} setSearch={setSearch} />
          <DataTable search={debouncedSearch} styles={tableStyles} />
        </div>
      )}
      {activeTab === "chart" && (
        <div className="tab-content">
          <LineChart data={priceData} style={{ marginBottom: "5%" }} />
          <BarChart data={priceData} />
          {/* <PieChart data={data.price_data} /> */}
        </div>
      )}
    </div>
  );
}


