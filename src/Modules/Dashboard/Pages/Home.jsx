import { useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { FaShoppingCart, FaUsers, FaDollarSign, FaUserFriends } from "react-icons/fa";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function Home() {
  const [stats] = useState([
    { icon: <FaShoppingCart />, label: "Total Orders", value: "421", change: "+12%", color: "text-pink-500" },
    { icon: <FaDollarSign />, label: "Total Sales", value: "$31K", change: "+15%", color: "text-yellow-500" },
    { icon: <FaUserFriends />, label: "New Customers", value: "1.2K", change: "-5%", color: "text-green-500" },
    { icon: <FaUsers />, label: "Users Online", value: "602", change: "", color: "text-blue-500" },
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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow-lg flex items-center gap-4">
            <div className={`${stat.color} text-3xl`}>{stat.icon}</div>
            <div>
              <p className="text-gray-500">{stat.label}</p>
              <h2 className="text-xl font-bold">{stat.value}</h2>
              <span className={`text-sm ${stat.change.includes("-") ? "text-red-500" : "text-green-500"}`}>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold">Monthly Sales</h3>
          <Bar data={barData} />
        </div>
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold">Traffic Source</h3>
          <Doughnut data={doughnutData} />
        </div>
      </div>
    </div>
  );
};


