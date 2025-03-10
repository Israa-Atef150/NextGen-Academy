import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (

    <>
      {/* شريط التنقل */}
      <nav dir="rtl" className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          
          {/* شعار الموقع */}
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="src/assets/imgs/logo.jpg" className="h-12 w-12 rounded-full" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              إشراق
            </span>

          </Link>

          {/* أزرار التسجيل وتسجيل الدخول */}
          <div className="flex md:order-2 space-x-2 rtl:space-x-reverse">
            <Link to="/register">
              <button className="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">
                إنشاء حساب
              </button>
            </Link>
            <Link to="/login">
              <button className="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">
                تسجيل دخول
              </button>
            </Link>

            {/* زر القائمة الجانبية (للهواتف) */}
            <button
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-controls="navbar-menu"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">فتح القائمة</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>

          {/* روابط القائمة (الهيدر) */}
          <div className={`${menuOpen ? "block" : "hidden"} md:flex md:items-center md:w-auto md:order-1`} id="navbar-menu">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link to="/" className="block py-2 px-3 text-orange-600 rounded-sm md:bg-transparent md:p-0 hover:text-orange-500 transition-colors duration-200">
                  الصفحة الرئيسة
                </Link>
              </li>
              <li>
                <Link to="/Edusystem" className="block py-2 px-3 text-gray-900 rounded-sm md:p-0 hover:text-orange-500 transition-colors duration-200 dark:text-white">
                  النظام الدراسي
                </Link>
              </li>
              <li>
                <Link to="/CallUs" className="block py-2 px-3 text-gray-900 rounded-sm md:p-0 hover:text-orange-500 transition-colors duration-200 dark:text-white">
                  اتصل بنا
                </Link>
              </li>
              <li>
                <Link to="/AboutUs" className="block py-2 px-3 text-gray-900 rounded-sm md:p-0 hover:text-orange-500 transition-colors duration-200 dark:text-white">
                  عن المعهد
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </nav>

      {/* محتوى الصفحة مع إضافة `padding-top` لتجنب التداخل مع النافبار */}
      <div className="pt-20">
        {/* باقي محتوى الصفحة */}
      </div>
    </>
  );
}
