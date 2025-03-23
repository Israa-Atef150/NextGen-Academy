import { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from "chart.js";
import "./Home.css";
import { FaBookOpen, FaUserGraduate, FaChalkboardTeacher, FaUserTie } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import{useData} from '../DataContext/DataContext '

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function Home() {
  const { doctorsCount, assistantsCount, adminsCount } = useData();
  const [stats, setStats] = useState([]);

  useEffect(() => {
    setStats([
      { icon: <FaUserGraduate />, label: "الطلاب", value: "30", color: "text-pink-500" },
      { icon: <FaChalkboardTeacher />, label: "الأساتذة", value: doctorsCount, color: "text-yellow-500" },
      { icon: <GiTeacher />, label: "المعدين", value: assistantsCount, color: "text-yellow-500" },
      { icon: <FaBookOpen />, label: "الدورات", value: "50", color: "text-green-500" },
      { icon: <FaUserTie />, label: "المشرفين", value: adminsCount, color: "text-blue-500" },
    ]);
  }, [doctorsCount, assistantsCount, adminsCount]);

  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [{ label: "Sales", data: [1000, 1200, 1800, 2200, 1500, 900, 1700, 2600], backgroundColor: "#6366F1" }],
  };

  const doughnutData = {
    labels: ["Search Engine", "Social Post", "Paid Ads", "Referral Link", "Direct Link", "Other Source"],
    datasets: [{ data: [40, 15, 10, 10, 15, 10], backgroundColor: ["#22C55E", "#6366F1", "#FBBF24", "#EC4899", "#F97316", "#A855F7"] }],
  };

  return (
    <div className="containerDashbord">
      <div className="grid-container">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className={`icon ${stat.color}`}>{stat.icon}</div>
            <div>
              <p className="text-gray-500">{stat.label}</p>
              <h2 className="text-xl font-bold">{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6" style={{ height: "fit-content", display: "flex", gap: "4px" }}>
        <div className="chart-container" style={{ width: "50%" }}>
          <h3 className="text-lg font-semibold">Monthly</h3>
          <Bar data={barData} />
        </div>
        <div className="chart-container" style={{ width: "38%" }}>
          <h3 className="text-lg font-semibold">Traffic Source</h3>
          <Doughnut data={doughnutData} />
        </div>
      </div>
    </div>
  );
}