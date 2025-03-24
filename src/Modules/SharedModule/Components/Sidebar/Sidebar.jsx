import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaLock,
  FaSignOutAlt,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBookOpen,
  FaBars,
  FaTimes,
  FaUserTie,
} from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { AiOutlineFileDone } from "react-icons/ai";
import Logo from "../../../../assets/imgs/logo.jpg";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* زر فتح القائمة في الجوال */}
      <button
        className="md:hidden fixed top-4 right-4 bg-orange-500 text-white p-2 rounded-md text-2xl z-50"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* القائمة الجانبية */}
      <div
        className={`fixed top-0 right-0 h-full bg-gray-900 text-white shadow-lg border-l-4 border-orange-500 transition-all duration-300 overflow-y-auto 
        ${collapsed ? "w-20" : "w-64"}
        ${isMobileOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
        md:relative md:translate-x-0`}
      >
        {/* اللوجو + زر الفتح والإغلاق */}
        <div className="flex items-center p-4 border-b border-gray-700 justify-between">
          {!collapsed && <img src={Logo} alt="شعار" className="h-10 w-10 rounded-full" />}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-white text-2xl ms-2"
          >
            {collapsed ? <FaBars /> : <FaTimes />}
          </button>
        </div>

        {/* القائمة */}
        <nav className="mt-5 space-y-3">
          {menuItems.map(({ path, label, icon }) => {
            const IconComponent = icon;
            return (
              <NavLink
                to={path}
                key={label}
                className={`flex items-center gap-2 p-3 rounded-md text-right transition-all hover:bg-orange-500 group 
                ${collapsed ? "justify-center" : "pl-4"}`}
                onClick={() => setIsMobileOpen(false)} // إغلاق القائمة بعد الاختيار في الجوال
              >
                <IconComponent className="text-xl text-orange-500" />
                {!collapsed && (
                  <span className="group-hover:bg-orange-500 px-2 py-1 rounded-md">
                    {label}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </>
  );
};

// القوائم
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
