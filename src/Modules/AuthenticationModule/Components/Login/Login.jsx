import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState("student"); // افتراضيًا الطالب

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const apiUrl =
      userType === "student"
        ? "https://ishraaq.up.railway.app/api/student/login"
        : "https://ishraaq.up.railway.app/api/login";

    try {
      const response = await axios.post(apiUrl, {
        email,
        password,
      });

      console.log("تم تسجيل الدخول بنجاح:", response.data);
      alert("تم تسجيل الدخول بنجاح!");
      localStorage.setItem("token", response.data.token);

      // التوجيه بناءً على نوع المستخدم
      if (userType === "student") {
        navigate("/"); // الطالب يذهب إلى صفحة home
      } else {
        navigate("/dashboard"); // الأدمن يذهب إلى لوحة التحكم
      }
    } catch (err) {
      console.error("خطأ أثناء تسجيل الدخول:", err);
      setError(err.response?.data?.message || "حدث خطأ أثناء تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 background">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 text-right" dir="rtl" style={{ width: "50%" }}>
        <div className="w-full bg-gray-900 rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-900 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              تسجيل الدخول إلى حسابك
            </h1>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">البريد الإلكتروني</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">كلمة المرور</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex items-center justify-between flex-row-reverse">
                <div className="flex items-start">
                  <input id="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600" />
                  <label htmlFor="remember" className="mr-3 text-sm text-gray-500 dark:text-gray-300">تذكرني</label>
                </div>
                <a href="forgetpass" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                  هل نسيت كلمة السر؟
                </a>
              </div>

              {/* زر تسجيل الدخول */}
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                disabled={loading}
              >
                {loading ? "جاري تسجيل الدخول..." : "تسجيل دخول"}
              </button>

              {/* اختيار نوع المستخدم */}
              <div className="flex justify-center space-x-4">
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg ${userType === "student" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
                  onClick={() => setUserType("student")}
                >
                  طالب
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg ${userType === "admin" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
                  onClick={() => setUserType("admin")}
                >
                  أدمن
                </button>
              </div>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                ليس لديك حساب حتى الآن؟ <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">إنشاء حساب</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
