import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 rtl">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          
          {/* القسم الأول - معلومات عن الموقع */}
          <div className="flex flex-col items-center">
            <p className="text-gray-400 text-sm">تابعنا على منصات التواصل</p>
            <img
              src="src/assets/imgs/logo.jpg"
              alt="شعار الموقع"
              className="w-24 h-24 rounded-full mx-auto mt-2"
            />
            <div className="flex space-x-4 mt-3">
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
                <Link to="/" className="text-gray-300 hover:text-orange-400">
                  الصفحة الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/Edusystem" className="text-gray-300 hover:text-orange-400">
                  النظام الدراسي
                </Link>
              </li>
              <li>
                <Link to="/CallUs" className="text-gray-300 hover:text-orange-400">
                  اتصل بنا
                </Link>
              </li>
              <li>
                <Link to="/AboutUs" className="text-gray-300 hover:text-orange-400">
                  عن المعهد
                </Link>
              </li>
            </ul>
          </div>

          {/* القسم الثالث - معلومات التواصل */}
          <div>
            <h3 className="text-lg font-bold text-orange-500 mb-4">معلومات التواصل</h3>
            <p className="text-gray-300">        العنوان: القاهرة، مصر 📍</p>
            <p className="text-gray-300">          الهاتف: 01000000000  📞</p>
            <p className="text-gray-300">israaatef150@gmail.com :البريد 📧</p>
          </div>

        </div>
        <hr className="border-gray-700 my-6" />
        <p className="text-center text-gray-400">© 2025 إشراق جميع الحقوق محفوظة </p>
      </div>
    </footer>
  );
}
