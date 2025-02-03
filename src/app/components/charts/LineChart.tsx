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
  data: any;
  style?: React.CSSProperties;
}

const LineChart: React.FC<LineChartProps> = ({ data, style }) => {
  const chartRef = useRef<any>(null);
  const [selectedVariable, setSelectedVariable] = useState<string>("close");

  if (!data || !data.timestamp || !data.close) {
    return <div>No data available</div>;
  }

  const handleVariableChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVariable(e.target.value);
  };

  const chartData = {
    labels: data.timestamp.map((timestamp: number) => new Date(timestamp).toLocaleDateString()),
    datasets: [
      {
        label: "Stock Price",
        data: data[selectedVariable],
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
    <h1 style={{ color: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>Line Chart</h1>

    {/* Dropdown to select the variable */}
    <select onChange={handleVariableChange} value={selectedVariable}>
      {variableOptions.map((key) => (
        <option key={key} value={key}>
          {key.charAt(0).toUpperCase() + key.slice(1)} {/* Capitalize the key */}
        </option>
      ))}
    </select>

    <Line ref={chartRef} data={chartData} options={options} />
  </div>
  );
};

export default LineChart;
