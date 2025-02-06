import React from "react";
import "../styles/tabs.css";


interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Tabs = ({ activeTab, setActiveTab }: TabsProps) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
      <button
        onClick={() => setActiveTab("table")}
        className={`tab-content ${activeTab === "table" ? "active" : "inactive"}`}
      >
        Table
      </button>
      <button
        onClick={() => setActiveTab("chart")} 
        className={`tab-content ${activeTab === "chart" ? "active" : "inactive"}`}      >
        Charts
      </button>
    </div>
  );
};

export default Tabs;
