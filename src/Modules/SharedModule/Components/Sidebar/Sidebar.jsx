import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaSignOutAlt, FaUserGraduate, FaChalkboardTeacher, FaUserTie, FaBookOpen, FaBars, FaTimes } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { AiOutlineFileDone } from "react-icons/ai";
import { PiExamLight } from "react-icons/pi";
import Logo from "../../../../assets/imgs/logo.jpg";
import './Sidebar.css'
const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  function cleartoken() {
    localStorage.clear();
    navigate("/"); // إعادة التوجيه بعد تسجيل الخروج
  }

  // ✅ تعريف القائمة بعد تعريف cleartoken
  const menuItems = [
    { path: "/dashboard", label: "الرئيسية", icon: FaHome },
    { path: "/dashboard/students", label: "الطلاب", icon: FaUserGraduate },
    { path: "/dashboard/Docters", label: "الأساتذة", icon: FaChalkboardTeacher },
    { path: "/dashboard/Assistant", label: "معيد", icon: GiTeacher },
    { path: "/dashboard/courses", label: "الدورات", icon: FaBookOpen },
    { path: "/dashboard/Exams", label: "الامتحانات", icon: PiExamLight },
    { path: "/dashboard/Questions", label: "الاسئله", icon: AiOutlineFileDone },
    { path: "/dashboard/Admin", label: "المشرفين", icon: FaUserTie },
  ];

  return (
    <div className={`top-0 right-0 h-screen bg-gray-900 text-white transition-all shadow-lg border-l-4 border-orange-500 ${collapsed ? "w-20" : "w-64"}`}>
      {/* اللوجو + زر الفتح والإغلاق */}
      <div className="flex items-center p-4 border-b border-gray-700 justify-between">
        {!collapsed && <img src={Logo} alt="شعار" className="h-10 w-10 rounded-full" />}
        <button onClick={() => setCollapsed(!collapsed)} className="text-white text-2xl ms-2">
          {collapsed ? <FaBars /> : <FaTimes />}
        </button>
      </div>
      <div className="content">
      {/* القائمة */}
      <nav>
        {menuItems.map(({ path, label, icon: IconComponent }) => (
          <NavLink key={label} to={path} className={`flex items-center gap-2 p-3 rounded-md transition-all text-right group ${collapsed && "justify-center"}`}>
            <IconComponent className="text-xl text-orange-500 ml-2" />
            {!collapsed && <span className="group-hover:bg-orange-500 px-2 py-1 rounded-md">{label}</span>}
          </NavLink>
        ))}

      </nav>
        {/* زر تسجيل الخروج خارج القائمة */}
        <button onClick={cleartoken} className="logout">
          <FaSignOutAlt className="text-xl" />
          {!collapsed && <span>تسجيل الخروج</span>}
        </button>
    </div>
    </div>
  );
};

export default SideBar;
