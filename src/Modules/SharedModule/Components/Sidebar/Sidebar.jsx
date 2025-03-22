import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome,FaLock, FaSignOutAlt, FaUser, FaBookOpen, FaBars, FaTimes,FaUserGraduate,FaChalkboardTeacher,FaUserTie  } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import Logo from "../../../../assets/imgs/logo.jpg";
import { AiOutlineFileDone } from "react-icons/ai";
const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={` top-0 right-0 h-screen bg-gray-900 text-white transition-all shadow-lg border-l-4 border-orange-500 ${collapsed ? "w-20" : "w-64"}`}>
      {/* اللوجو + زر الفتح والإغلاق */}
      <div className="flex items-center p-4 border-b border-gray-700 justify-between">
        {!collapsed && <img src={Logo} alt="شعار" className="h-10 w-10 rounded-full" />}
        <button onClick={() => setCollapsed(!collapsed)} className="text-white text-2xl ms-2">
          {collapsed ? <FaBars /> : <FaTimes />}
        </button>
      </div>
      
      {/* القائمة */}
      <nav className="mt-5 space-y-3">
        {menuItems.map(({ path, label, icon }) => {
          const IconComponent = icon;
          return (
            <NavLink to={path} key={label} className={`flex items-center  gap-2 p-3 rounded-md  transition-all  text-right group ${collapsed && 'justify-center'}`}>
              <IconComponent className="text-xl text-orange-500 ml-2" />
              {!collapsed && <span className="group-hover:bg-orange-500 px-2 py-1 rounded-md">{label}</span>}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

const menuItems = [
  { path: "/dashboard", label: "الرئيسية", icon: FaHome },
  { path: "/dashboard/students", label: "الطلاب", icon: FaUserGraduate },
  { path: "/dashboard/Docters", label: "الأساتذة", icon: FaChalkboardTeacher },
  { path: "/dashboard/Assistant", label: "معيد", icon: GiTeacher },
  { path: "/dashboard/courses", label: "الدورات", icon: FaBookOpen },
  { path: "/dashboard/Exams", label: "الامتحانات", icon: AiOutlineFileDone },

  { path: "/dashboard/Admin", label: "المشرفين", icon: FaUserTie },
  { path: "/dashboard/ChangePassword", label: "تغيير كلمة المرور", icon: FaLock },

  { path: "/", label: "تسجيل الخروج", icon: FaSignOutAlt },
];

export default SideBar;
