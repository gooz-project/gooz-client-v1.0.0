import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "../../styles/BarChart.css";
import { CgClose } from "react-icons/cg";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["January", "February", "March"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [50, 100, 150],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: [100, 200, 300],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export default function BarChart({ deleteWidget }) {
  return (
    <div className="bar-chart-container">
      <Bar className="bar-chart" options={options} data={data} />
      <IoClose size={24} className="widget-close" onClick={deleteWidget} />
    </div>
  );
}
