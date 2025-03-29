import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBarUser from "../NavBar/NavBarUser";

export default function UserLayout() {
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState(""); 
    const [role, setRole] = useState(""); // تخزين الدور
    const navigate = useNavigate();
    
    const token = localStorage.getItem("token"); 

    useEffect(() => {
        console.log("🔑 التوكن المخزن:", token); 

        if (!token) {
            console.log("🚫 لا يوجد توكن مخزن! التوجيه إلى تسجيل الدخول...");
            navigate("/login"); 
            return;
        }

        fetch("https://ishraaq.up.railway.app/api/student", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            if (data.student) {
                setEmail(data.student.email);
                setRole(data.student.role);
                if (data.student.role !== "student") {
                    console.log("🚫 ليس طالبًا! إعادة التوجيه إلى تسجيل الدخول...");
                    navigate("/login"); 
                }
            } else {
                console.log("❌ البيانات غير صحيحة! إعادة التوجيه إلى تسجيل الدخول...");
                navigate("/login");
            }
        })
        .catch(err => {
            console.error("❌ خطأ في جلب البيانات:", err);
            navigate("/login"); 
        })
        .finally(() => setLoading(false));
    }, [token, navigate]);

    if (loading) return <p>جارِ التحميل...</p>;

    return (
        <>
            <NavBarUser />
            <Outlet />
        </>
    );
}
