import { useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { PriceData } from "@/app/types/priceData";
import "../../styles/chartStyle.css";
import React from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: PriceData;
  style?: React.CSSProperties;
}

const BarChart: React.FC<BarChartProps> = ({ data, style }) => {
  const [selectedVariable, setSelectedVariable] = useState("close"); // Default to 'close'
  const chartRef = useRef<ChartJS<"bar", unknown, string>>(null);

  if (!data || !data.timestamp) {
    return <div>No data available</div>;
  }

  // Handle changes in the dropdown
  const handleVariableChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVariable(e.target.value);
  };

  const chartData = {
    labels: data.timestamp.map((timestamp: Date | number) =>  
        new Date(timestamp).toLocaleDateString()
      ),
    datasets: [
      {
        label: `${selectedVariable.charAt(0).toUpperCase() + selectedVariable.slice(1)} Price`,
        data: data[selectedVariable as keyof PriceData],
        backgroundColor: "rgba(75, 192, 192, 0.5)", // Bar color
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Stock Price Bar Chart'
      }
    },
    scales: {
      y: {
        type: 'linear' as const,
        beginAtZero: false,
        ticks: {
            callback: function(tickValue: number | string) {
                return `$${Number(tickValue).toFixed(2)}`;
            }        
        }
      }
    }
  };

  // Dynamically generate options for the dropdown based on the data keys
  const variableOptions = Object.keys(data).filter((key) => key !== "timestamp");

  return (
    
    <div style={{ width: "100%", height: "400px", color: "black", padding: "20px", ...style }}>
    <h1 className="chart-title">Bar Chart</h1>


      {/* Dropdown to select the variable */}
      <select onChange={handleVariableChange} value={selectedVariable}>
        {variableOptions.map((key) => (
          <option key={key} value={key}>
            {key.charAt(0).toUpperCase() + key.slice(1)} {/* Capitalize the key */}
          </option>
        ))}
      </select>

      <Bar ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
