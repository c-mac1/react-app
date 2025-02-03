import { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface PieChartProps {
  data: Record<string, number[]>;  // This can handle any data with numeric arrays
  style?: React.CSSProperties;
}

const PieChart: React.FC<PieChartProps> = ({ data, style }) => {
  const [selectedVariable, setSelectedVariable] = useState<string>(""); // Default to the first label
  const chartRef = useRef<any>(null);
  const labels = Object.keys(data).filter(key => key !== "timestamp");

  useEffect(() => {
    setSelectedVariable(labels[0]);
  }, [labels]); 

  if (!data || !labels || labels.length === 0) {
    return <div>No data available</div>;
  }

  const handleVariableChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVariable(e.target.value);
  };

  console.log(data);
  console.log(labels);

  // Calculate averages instead of just using the most recent value
  const averages = labels.reduce((acc: { [key: string]: number }, label) => {
    const values = data[label];
    const sum = values.reduce((total, value) => total + value, 0);
    acc[label] = sum / values.length;  // Calculate average
    return acc;
  }, {});

  const totalValue = Object.values(averages).reduce((sum, value) => sum + value, 0);

  // Calculate the percentage for each variable using averages
  const percentages = labels.reduce((sum: { [key: string]: number }, label) => {
    sum[label] = (averages[label] / totalValue) * 100;
    return sum;
  }, {});

  // Prepare chart data
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Price Distribution",
        data: labels.map((label) => percentages[label]), 
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF5733", "#49d426"], 
        borderColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF5733", "#49d426" ], 
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Average Price Distribution (Percentages)'
      }
    }
  };

  return (
    <div style={{ width: "100%", height: "400px", color: "black", padding: "20px", ...style }}>
      <h1 style={{ color: "black", display: "flex", justifyContent: "center", alignItems: "center" }}>Pie Chart</h1>

      <select onChange={handleVariableChange} value={selectedVariable}>
        {labels.map((label) => (
          <option key={label} value={label}>
            {label.charAt(0).toUpperCase() + label.slice(1)} {/* Capitalize the key */}
          </option>
        ))}
      </select>

      <Pie ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
