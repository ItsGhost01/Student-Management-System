import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { useMemo } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type Props = {
  data: {
    course: string;
    students: number;
  }[];
};

export default function BarChart({ data }: Props) {
  const chartData = useMemo(() => {
    return {
      labels: data?.map((item) => item.course) || [],
      datasets: [
        {
          label: "Students per Course",
          data: data?.map((item) => item.students) || [],
          backgroundColor: "rgba(59, 130, 246, 0.6)",
          borderColor: "#3B82F6",
          borderWidth: 1,
          borderRadius: 6,
        },
      ],
    };
  }, [data]);

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 12,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 0,
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
    <div
      className="
        w-full 
        h-65 sm:h-80 md:h-95 lg:h-112.5
        bg-white 
        p-3 sm:p-4 
        rounded-xl 
        shadow-sm
      "
    >
      <Bar data={chartData} options={options} />
    </div>
  );
}