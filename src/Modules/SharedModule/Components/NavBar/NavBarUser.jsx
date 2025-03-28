import React from 'react'
import { Link } from "react-router-dom";
export default function NavBarUser() {
    const list=[
        {
        name:"الرئيسية",
        link:"/homeSection"
        },
        {
        name:"الدورات",
        link:"homeSection/coures"
        },
        {
        name:"الامتحانات",
        link:"homeSection"
        },
        {
        name:"اتصل بنا",
        link:"homeSection"
        },
    ]
    return (
    <>
{/* ✅ Navbar ثابت فوق الـ Swiper */}
<nav className="fixed top-0 left-0 w-full bg-black/50 backdrop-blur-md text-white py-4 px-8 flex justify-between items-center z-50">
{/* ✅ اللوجو + اسم الموقع */}
    <div className="flex items-center gap-3">
        <img
        src="/src/assets/imgs/logo.jpg"
        alt="Logo"
        className="w-12 h-12 rounded-full"
        />
        <h1 className="text-2xl font-bold">إشراق</h1>
    </div>

    {/* ✅ القائمة */}
    <ul className="flex gap-6 text-lg">
        {list.map(
        (item, index) => (
            <li key={index} className="relative">
            <Link to={item.link} className="hover:text-orange-400 transition duration-300">
                {item.name}
            </Link>
            <div className="absolute left-0 bottom-0 w-0 h-[3px] bg-orange-400 transition-all duration-300 hover:w-full"></div>
            </li>
        )
        )}
    </ul>
    </nav>
</>
)   
}
