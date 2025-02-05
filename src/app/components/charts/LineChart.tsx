import React from "react";
import { useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";
import { PriceData } from "../../types/priceData";
import "../../styles/chartStyle.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  data: PriceData;
  style?: React.CSSProperties;
}


const LineChart: React.FC<LineChartProps> = ({ data, style }) => {
  const chartRef = useRef<ChartJS<"line", unknown, string>>(null);
  const [selectedVariable, setSelectedVariable] = useState<string>("close");

  if (!data || !data.timestamp || !data.close) {
    return <div>No data available</div>;
  }

  const handleVariableChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as keyof PriceData;
    if (Object.keys(data).includes(value)) {
      setSelectedVariable(value);
    }

  };

  const chartData = {
    labels: data.timestamp.map((timestamp: Date | number) =>  
      new Date(timestamp).toLocaleDateString()
    ),
    datasets: [
      {
        label: `${selectedVariable.charAt(0).toUpperCase() + selectedVariable.slice(1)} Price`,
        data: data[selectedVariable as keyof PriceData],
        borderColor: "rgb(75, 192, 192)", 
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        tension: 0.1
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
        text: 'Price Chart'
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

  
  const variableOptions = Object.keys(data).filter((key) => key !== "timestamp");


  return (
    <div style={{ width: "100%", height: "400px", color: "black", ...style }}>
    <h1 className="chart-title">Line Chart</h1>


    {/* Dropdown to select the variable */}
    <select onChange={handleVariableChange} value={selectedVariable}>
      {variableOptions.map((key) => (
        <option key={key} value={key}>
          {key.charAt(0).toUpperCase() + key.slice(1)} {/* Capitalize the key */}
        </option>
      ))}
    </select>

    <Line ref={chartRef} data={chartData} options={options} data-testid="line-chart"/>
  </div>
  );
};

export default LineChart;
