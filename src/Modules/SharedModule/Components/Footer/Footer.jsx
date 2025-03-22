import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
// image
import logo from '../../../../assets/imgs/logo.jpg'
export default function Footer() {
  const handleNavigation = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-10 rtl">
      <div className=" mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          
          {/* القسم الأول - معلومات عن الموقع */}
          <div className="flex flex-col items-center">
            <p className="text-gray-400 text-sm">تابعنا على منصات التواصل</p>
            <img
              src={logo}
              alt="شعار الموقع"
              className="w-24 h-24 rounded-full mx-auto mt-2"
            />
            <div className="flex space-x-4 space-x-reverse mt-3">
              <a href="#" className="text-orange-500 hover:text-orange-400 text-2xl">
                <FaFacebookF />
              </a>
              <a href="#" className="text-orange-500 hover:text-orange-400 text-2xl">
                <FaInstagram />
              </a>
              <a href="#" className="text-orange-500 hover:text-orange-400 text-2xl">
                <FaTwitter />
              </a>
            </div>
          </div>

          {/* القسم الثاني - روابط سريعة */}
          <div>
            <h3 className="text-lg font-bold text-orange-500 mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <NavLink
              to="/"
              onClick={(e) => handleNavigation(e, "hero-container")}
              className="block py-2 px-3 rounded-sm md:p-0 transition-colors duration-200 text-gray-400 hover:text-orange-500"
                >
                  الصفحة الرئيسة
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  onClick={(e) => handleNavigation(e, "Courses")}
                  className="block py-2 px-3 rounded-sm md:p-0 transition-colors duration-200 text-gray-400 hover:text-orange-500"
                >
                  النظام الدراسي
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  onClick={(e) => handleNavigation(e, "ContactUs")}
                  className="block py-2 px-3 rounded-sm md:p-0 transition-colors duration-200 text-gray-400 hover:text-orange-500"
                >
                  اتصل بنا
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  onClick={(e) => handleNavigation(e, "instituteSection")}
                  className="block py-2 px-3 rounded-sm md:p-0 transition-colors duration-200 text-gray-400 hover:text-orange-500"
                >
                  عن المعهد
                </NavLink>
              </li>
            </ul>
          </div>

          {/* القسم الثالث - معلومات التواصل */}
          <div>
            <h3 className="text-lg font-bold text-orange-500 mb-4">معلومات التواصل</h3>
            <p className="text-gray-300">📍 العنوان: القاهرة، مصر</p>
            <p className="text-gray-300">📞 الهاتف: 01000000000</p>
            <p className="text-gray-300">📧 البريد: israaatef150@gmail.com</p>
          </div>

        </div>
        <hr className="border-gray-700 my-6" />
        <p className="text-center text-gray-400">© 2025 إشراق جميع الحقوق محفوظة</p>
      </div>
    </footer>
  );
}
