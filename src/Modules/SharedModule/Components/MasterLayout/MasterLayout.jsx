import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../Sidebar/Sidebar'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function MasterLayout() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // حالة التحميل
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // جلب التوكن من التخزين المحلي
  
  useEffect(() => {
    if (!token) {
      navigate("/login"); // التوجيه إذا لم يكن هناك توكن
      return;
    }

    axios
      .get("https://ishraaq.up.railway.app/api/user", {
        headers: {
          Authorization: `Bearer ${token}`, // إرسال التوكن في الهيدر
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const userData = response.data;
        if (userData.role !== "Super Admin" && userData.role !== "Admin") {
          navigate("/login"); // منع الطالب من رؤية أي شيء
        } else {
          setUser(userData); // تخزين بيانات المستخدم
        }
      })
      .catch((error) => {
        console.error("خطأ في جلب بيانات المستخدم:", error);
        navigate("/login");
      })
      .finally(() => {
        setLoading(false); // إنهاء التحميل بعد الجلب
      });
  }, [token, navigate]);

  if (loading) {
    return <p>جاري التحقق من الصلاحيات...</p>; // عرض رسالة تحميل بدل إظهار أي شيء
  }
  return (
    <div className='flex'>
      <SideBar />
      <div className='p-4 w-full'>
        <Outlet />
      </div>
    </div>
  )
}
