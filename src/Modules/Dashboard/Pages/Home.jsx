import { useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from "chart.js";
import "./Home.css"; // استيراد ملف CSS
import { FaBookOpen } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function Home() {
  const [stats] = useState([
    { icon: <FaUserGraduate/>, label: "الطلاب", value: "30", change: "", color: "text-pink-500" },
    { icon: < FaChalkboardTeacher/>, label: "الأساتذة", value: "30", change: "", color: "text-yellow-500" },
    { icon: <FaBookOpen />, label: "couress", value: "50", change: "", color: "text-green-500" },
    { icon: <FaUserTie />, label: "موظفين", value: "40", change: "", color: "text-blue-500" },
  ]);

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
              <span className={stat.change.includes("-") ? "negative" : "positive"}>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="grid-container  mt-6">
        <div className="chart-container">
          <h3 className="text-lg font-semibold">Monthly Sales</h3>
          <Bar data={barData} />
        </div>
        <div className="chart-container">
          <h3 className="text-lg font-semibold">Traffic Source</h3>
          <Doughnut data={doughnutData} />
        </div>
      </div>
    </div>
  );
}
