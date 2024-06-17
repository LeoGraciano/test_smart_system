import React from "react";
import { Line, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface ChartComponentProps {
  chartType: "line" | "pie";
  chartData: {
    labels: string[];
    datasets: { id: number; label: string; data: number[] }[];
  };
}

const ChartComponent: React.FC<ChartComponentProps> = ({
  chartType,
  chartData,
}) => {
  const chartConfig = {
    data: chartData,
    options: {
      responsive: true,
      scales: {
        x: {
          type: "category",
          title: {
            display: true,
            text: "Datas",
          },
        },
        y: {
          title: {
            display: true,
            text: "Valores",
          },
        },
      } as any,
    },
  };

  return (
    <>
      {chartType === "line" ? (
        <Line data={chartConfig.data} options={chartConfig.options} />
      ) : (
        <Pie data={chartConfig.data} options={chartConfig.options} />
      )}
    </>
  );
};

export default ChartComponent;
