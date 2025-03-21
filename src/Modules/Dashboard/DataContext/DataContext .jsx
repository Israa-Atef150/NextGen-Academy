    import { createContext, useContext, useEffect, useState } from "react";
    import axios from "axios"; // ✅ استيراد Axios

    const DataContext = createContext();

    export function DataProvider({ children }) {
    const [doctors, setDoctors] = useState([]);
    const [assistants, Setassistants] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


/////// doctors/////////////////////////////////////////////////////////////////////////////////////////
    // ✅ رابط الـ API
    const API_URL = "https://ishraaq.up.railway.app/api";
    const token = localStorage.getItem("token");

    // ✅ جلب قائمة دكتور باستخدام Axios
    const getDoctors = async () => {
    setLoading(true);
    try {
        const response = await axios.get(`${API_URL}/doctors`, {
        headers: {
            Authorization: `Bearer ${token}`,
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
    const handleDeleteDoctor = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/doctor/${id}/delete`, {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            if (response.status === 200) {
                setDoctors(prev => prev.filter(doctor => doctor.id !== id)); // تحديث القائمة
                console.log(`✅ تم حذف الطبيب ID: ${id}`);
            }
        } catch (error) {
            console.error("❌ خطأ في حذف الطبيب:", error);
        }
    };
    
/////////// doctors///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////admins/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const getAdmins = async () => {
    setLoading(true);
    try {
        const response = await axios.get(`${API_URL}/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
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

const handleDeleteAdmin = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/user/${id}/delete`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200) {
            setAdmins(prev => prev.filter(admin => admin.id !== id));
            console.log(`✅ تم حذف الأدمن ID: ${id}`);
        }
    } catch (error) {
        console.error("❌ خطأ في حذف الأدمن:", error);
    }
};

// admins////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Exams////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const getExams = async () => {
    setLoading(true);
    try {
        const response = await axios.get(`${API_URL}/exams`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        // console.log("📢 البيانات المستلمة من API:", response.data);

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
        // alert("حدث خطأ أثناء إضافة الامتحان، يرجى التحقق من البيانات.");
        throw error;
    }
};

const handleDeleteExam = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/exam/${id}/delete`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200) {
            setExams(prev => prev.filter(exam => exam.id !== id));
            console.log(`✅ تم حذف الامتحان ID: ${id}`);
        }
    } catch (error) {
        console.error("❌ خطأ في حذف الامتحان:", error);
    }
};


const updateExam = async (id, examsData) => {
    try {
        const formattedData = {
            name: examsData.exam_name,
            course_id: Number(examsData.course_id),
            student_year: examsData.year
        };

        if (examsData.students.length > 0) {
            formattedData.students = examsData.students.map(Number);
        }

        const response = await axios.put(`${API_URL}/exam/${id}/edit`, formattedData, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        console.log("✅ تم تحديث الامتحان:", response.data);
        getExams(); 
        return response.data;
    } catch (error) {
        console.error("❌ خطأ في تحديث الامتحان:", error.response?.data || error);
        throw error;
    }
};




// Exams////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Assistant////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const getAssistant = async () => {
    setLoading(true);
    try {
        const response = await axios.get(`${API_URL}/assistants`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        console.log("📢 البيانات المستلمة من API:", response.data);

        // استخراج المصفوفة فقط
        if (response.data && Array.isArray(response.data.assistants)) {
            Setassistants(response.data.assistants); // ✅ تخزين المصفوفة فقط
        } else {
            console.error("❌ البيانات المستلمة غير صحيحة!", response.data);
            Setassistants([]); // تجنب الأخطاء بمصفوفة فارغة
        }
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
};

const createAssistant = async (assistantData) => {
    try {
        const response = await axios.post(`${API_URL}/assistant/create`, assistantData, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        console.log("✅ تمت إضافة المشرف:", response.data);
        getAssistant(); // ✅ تحديث القائمة فورًا بعد الإضافة
        return response.data;
    } catch (error) {
        console.error("❌ خطأ في إنشاء المشرف:", error);
        throw error;
    }
};

const handleDeleteAssistant = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/assistant/${id}/delete`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200) {
            Setassistants(prev => prev.filter(assistant => assistant.id !== id));
            console.log(`✅ تم حذف المساعد ID: ${id}`);
        }
    } catch (error) {
        console.error("❌ خطأ في حذف المساعد:", error);
    }
};

// Assistant////////////////////////////////////////////////////////////////////////////////////////////////////////////////
















    // ✅ تحميل الأطباء عند فتح التطبيق
    useEffect(() => {
    getDoctors();
    getAdmins();
    getExams();
    getAssistant()
    }, []);

    return (
    <DataContext.Provider value={{ doctors, admins, loading, error,exams,assistants, getDoctors, createDoctor, getAdmins,createAdmin,getExams,createExams,getAssistant,createAssistant,handleDeleteExam,handleDeleteAssistant,handleDeleteAdmin,handleDeleteDoctor,updateExam }}>
        {children}
    </DataContext.Provider>
    );
    }

    export function useData() {
    return useContext(DataContext);
    }
