import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ChartData {
  labels: string[];
  datasets: { id: number; label: string; data: number[] }[];
}

export const getChartDataService = async (
  chartType: string,
  startDate: Date,
  endDate: Date
): Promise<ChartData> => {
  const dataPoints = await prisma.dataPoint.findMany({
    where: {
      timestamp: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  switch (chartType) {
    case "pie":
      const pieData = dataPoints.reduce((acc, dataPoint) => {
        acc[dataPoint.category] =
          (acc[dataPoint.category] || 0) + dataPoint.value;
        return acc;
      }, {} as Record<string, number>);

      return {
        labels: Object.keys(pieData),
        datasets: [{ id: 1, label: "", data: Object.values(pieData) }],
      };

    case "line":
      const dateSet = new Set<string>();
      const categoryMap = new Map<string, { [date: string]: number }>();

      dataPoints.forEach((dataPoint) => {
        const date = dataPoint.timestamp.toISOString().split("T")[0];
        dateSet.add(date);

        if (!categoryMap.has(dataPoint.category)) {
          categoryMap.set(dataPoint.category, {});
        }

        const categoryData = categoryMap.get(dataPoint.category)!;
        categoryData[date] = (categoryData[date] || 0) + dataPoint.value;
      });

      const dates = Array.from(dateSet).sort();
      const datasets = Array.from(categoryMap.entries()).map(
        ([category, data], index) => ({
          id: index + 1,
          label: category,
          data: dates.map((date) => data[date] || 0),
        })
      );

      return {
        labels: dates,
        datasets,
      };

    default:
      throw new Error("Unsupported chart type");
  }
};
