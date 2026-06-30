import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  totalStaff: number;
  totalAdmins: number;
};

export default function DonutChart({ totalStaff, totalAdmins }: Props) {
  const roleData = {
    labels: ["Staff", "Admins"],
    datasets: [
      {
        label: "Users",
        data: [totalStaff, totalAdmins],
        backgroundColor: ["#3B82F6", "#F59E0B"],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={roleData} />;
}