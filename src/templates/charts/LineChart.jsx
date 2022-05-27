import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

export default function LineChart({ data, deleteWidget }) {
  return (
    <motion.div
      initial={{ scale: 0.7 }}
      animate={{ scale: 1 }}
      className="line-chart-container"
    >
      <Line className="line-chart" options={options} data={data} />
      <IoClose size={24} className="widget-close" onClick={deleteWidget} />
    </motion.div>
  );
}
