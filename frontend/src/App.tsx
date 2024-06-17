import React, { useEffect, useState } from "react";
import ChartComponent from "./components/ChartComponent";
import { getChartData } from "./services/api";

const App: React.FC = () => {
  const [chartType, setChartType] = useState<"line" | "pie">("line");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-12-31");

  const fetchData = async () => {
    try {
      const response = await getChartData(chartType, startDate, endDate);
      setChartData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [chartType, startDate, endDate]);

  return (
    <div>
      <div>
        <label>
          Data de Início:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          Data de Fim:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <button onClick={fetchData}>Buscar Dados</button>
      </div>
      <button onClick={() => setChartType("line")}>Gráfico de Linhas</button>
      <button onClick={() => setChartType("pie")}>Gráfico de Pizza</button>
      <ChartComponent chartType={chartType} chartData={chartData} />
    </div>
  );
};

export default App;
