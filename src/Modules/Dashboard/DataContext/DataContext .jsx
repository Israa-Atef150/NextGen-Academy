    import { createContext, useContext, useEffect, useState } from "react";
    import axios from "axios"; // ✅ استيراد Axios

    const DataContext = createContext();

    export function DataProvider({ children }) {
    const [doctors, setDoctors] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


/////// doctors/////////////////////////////////////////////////////////////////////////////////////////
    // ✅ رابط الـ API
    const API_URL = "https://ishraaq.up.railway.app/api";

    // ✅ جلب قائمة دكتور باستخدام Axios
    const getDoctors = async () => {
    setLoading(true);
    try {
        const response = await axios.get(`${API_URL}/doctors`, {
        headers: {
            Authorization: `Bearer 65|fa2rHOWvsLQa24oggXAopw7iIi49MZ9QriCaKZM14509aa7d`,
            "Content-Type": "application/json",
        },
        });

        // console.log("📢 البيانات المستلمة من API:", response.data); // ✅ تحقق من البيانات المستلمة

        if (response.data && Array.isArray(response.data.doctors)) {
        setDoctors(response.data.doctors); // ✅ استخدم المصفوفة فقط
        } else {
        console.error("❌ البيانات المستلمة غير صحيحة!", response.data);
        setDoctors([]); // تجنب الأخطاء بوضع مصفوفة فارغة
        }
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
    };
    // ✅ إنشاء دكتور جديد
    const createDoctor = async (doctorData) => {
        try {
            const token = "62|WxuenaUInagSwCwvMGQXb9DNh5t1nkQeiH7l5nnf7c1b6b9a"; // تأكد من صحة التوكن
            const response = await axios.post(`${API_URL}/doctor/create`, doctorData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
    
            // console.log("تمت إضافة الطبيب:", response.data);
            setDoctors((prev) => [...prev, response.data]); // تحديث القائمة مباشرة
            return response.data;
        } catch (error) {
            console.error("خطأ في إنشاء الطبيب:", error);
            throw error; // إعادة الخطأ لمعالجته في الواجهة
        }
    }
/////////// doctors///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////admins/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const getAdmins = async () => {
    setLoading(true);
    try {
        const response = await axios.get(`${API_URL}/users`, {
            headers: {
                Authorization: `Bearer 65|fa2rHOWvsLQa24oggXAopw7iIi49MZ9QriCaKZM14509aa7d`,
                "Content-Type": "application/json",
            },
        });

        // console.log("📢 البيانات المستلمة من API:", response.data);

        if (response.data && Array.isArray(response.data.users)) {
            setAdmins(response.data.users); // ✅ تصحيح الخطأ
        } else {
            console.error("❌ البيانات المستلمة غير صحيحة!", response.data);
            setAdmins([]); // تجنب الأخطاء بمصفوفة فارغة
        }
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
};

const createAdmin = async (adminData) => {
    try {
        const token = "62|WxuenaUInagSwCwvMGQXb9DNh5t1nkQeiH7l5nnf7c1b6b9a";
        const response = await axios.post(`${API_URL}/user/create`, adminData, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        console.log("✅ تمت إضافة المشرف:", response.data);
        getAdmins(); // ✅ تحديث القائمة فورًا بعد الإضافة
        return response.data;
    } catch (error) {
        console.error("❌ خطأ في إنشاء المشرف:", error);
        throw error;
    }
};

// admins////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const getExams = async () => {
    setLoading(true);
    try {
        const response = await axios.get(`${API_URL}/exams`, {
            headers: {
                Authorization: `Bearer 65|fa2rHOWvsLQa24oggXAopw7iIi49MZ9QriCaKZM14509aa7d`,
                "Content-Type": "application/json",
            },
        });

        console.log("📢 البيانات المستلمة من API:", response.data);

        // استخدام exams بدلًا من users
        if (response.data && Array.isArray(response.data.exams)) {
            setExams(response.data.exams); // ✅ تصحيح الخطأ
        } else {
            console.error("❌ البيانات المستلمة غير صحيحة!", response.data);
            setExams([]); // تجنب الأخطاء بمصفوفة فارغة
        }
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
};



const createExams = async (examsData) => {
    try {
        const token = "62|WxuenaUInagSwCwvMGQXb9DNh5t1nkQeiH7l5nnf7c1b6b9a";
        
        const formattedData = {
            name: examsData.exam_name,
            course_id: Number(examsData.course_id),
            student_year: examsData.year // يتم إرساله دائمًا لتجنب الخطأ
        };
        
        // فقط أضف الطلاب إذا كان هناك طلاب محددون
        if (examsData.students.length > 0) {
            formattedData.students = examsData.students.map(Number);
        }
        
        const response = await axios.post(`${API_URL}/exam/create`, formattedData, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        console.log("✅ تمت إضافة الامتحان:", response.data);
        getExams(); 
        return response.data;
    } catch (error) {
        console.error("❌ خطأ في إنشاء الامتحان:", error.response?.data || error);
        alert("حدث خطأ أثناء إضافة الامتحان، يرجى التحقق من البيانات.");
        throw error;
    }
};



















    // ✅ تحميل الأطباء عند فتح التطبيق
    useEffect(() => {
    getDoctors();
    getAdmins();
    getExams();
    }, []);

    return (
        <DataContext.Provider value={{ doctors, admins, loading, error,exams, getDoctors, createDoctor, getAdmins,createAdmin,getExams,createExams }}>
        {children}
    </DataContext.Provider>
    );
    }

    export function useData() {
    return useContext(DataContext);
    }
