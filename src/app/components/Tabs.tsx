interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Tabs = ({ activeTab, setActiveTab }: TabsProps) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
      <button
        onClick={() => setActiveTab("table")}
        style={{
          padding: "10px",
          cursor: "pointer", 
          backgroundColor: activeTab === "table" ? "#ddd" : "transparent",
          border: "1px solid #ccc",
          borderRadius: "4px",
          color: activeTab === "table" ? "black" : "white"
        }}
      >
        Table
      </button>
      <button
        onClick={() => setActiveTab("chart")} 
        style={{
          padding: "10px",
          cursor: "pointer",
          backgroundColor: activeTab === "chart" ? "#ddd" : "transparent", 
          border: "1px solid #ccc",
          borderRadius: "4px",
          marginLeft: "10px",
          color: activeTab === "chart" ? "black" : "white"
        }}
      >
        Charts
      </button>
    </div>
  );
};

export default Tabs;
