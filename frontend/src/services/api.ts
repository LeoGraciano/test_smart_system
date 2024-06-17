import axios from "axios";

const apiBaseURL =
  import.meta.env.VITE_BACKEND_BASE_API_URL ||
  "http://localhost:3000/api/charts";

const api = axios.create({
  baseURL: "http://localhost:3000/api/charts",
});

export const getChartData = async (
  chartType: string,
  startDate: string,
  endDate: string
) => {
  console.log(apiBaseURL);
  console.log(chartType, startDate, endDate);
  const response = await api.get(`/${chartType}`, {
    params: { startDate, endDate },
  });
  return response.data;
};
