import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"; // ✅ استيراد Axios
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const DataContext = createContext();

export function DataProvider({ children }) {
    const [doctors, setDoctors] = useState([]);
    const [students, setStudents] = useState([]);
    const [assistants, Setassistants] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [exams, setExams] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // count//////////////////////////////////////////////////////
    const [doctorsCount, SetdoctorsCount] = useState(0);
    const [assistantsCount, SetAssistantsCount] = useState(0);
    const [adminsCount, SetAdminsCount] = useState(0);
    const [StudentCount, setStudentCount] = useState(0);
    const [CoursesCount, SetCoursesCount] = useState(0);
    //////////////////////
    // ✅ رابط الـ API
    const API_URL = "https://ishraaq.up.railway.app/api";
    const token = localStorage.getItem("token");
    /////////////////////////

    //// students/////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ✅ جلب قائمة طالب باستخدام Axios
    const getstudents = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/students`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            console.log(response.data)
            if (response.data && Array.isArray(response.data.students)) {
                setStudents(response.data.students); // ✅ استخدم المصفوفة فقط
                setStudentCount(response.data.student_count)
            } else {
                console.error("❌ البيانات المستلمة غير صحيحة!", response.data);
                setStudents([]); // تجنب الأخطاء بوضع مصفوفة فارغة
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const createstudents = async (studentsdata) => {
        try {
            const response = await axios.post(`${API_URL}/student/create`, studentsdata, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            console.log("تمت إضافة طالب:", response.data);
            //    تحديث القائمة مباشرة
            getstudents()
        } catch (error) {
            console.error("خطأ في إنشاء طالب:", error);
        }
    }

    const handleDeleteStudent = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/student/${id}/delete`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200) {
                // setDoctors(prev => prev.filter(student => student.id !== id)); // تحديث القائمة
                console.log(`✅ تم حذف طالب ID: ${id}`);
                toast.success("✅ تمت حذف طالب بنجاح   !", {
                    icon: false
                });
                getstudents()
            }
        } catch (error) {
            console.error("❌ خطأ في حذف طالب:", error);
            toast.error("❌ فشل في حذف طالب!", { icon: false });
        }
    };


    const updatestudents = async (id, studentsData) => {
        try {
            const formattedData = {
                name: studentsData.name,
                phone_number: studentsData.phone_number,
                birth_of_date: studentsData.birth_of_date,
                email: studentsData.email,
                gender: studentsData.gender,
                address: studentsData.address,
                year_study: studentsData.year_study
            };

            const response = await axios.put(`${API_URL}/student/${id}/edit`, formattedData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            console.log("✅ تم تحديث بيانات الطالب:", response.data);
            getstudents(); // تحديث القائمة بعد التعديل
            // ✅ ضع التوست هنا فقط
            toast.success("✅ تم تحديث بيانات الطالب بنجاح!", { icon: false });
        } catch (error) {
            console.error("❌ خطأ في تحديث بيانات الطالب:", error.response?.data || error);
            // throw error;
            toast.error("⚠️ حدث خطأ أثناء التحديث، تأكد من صحة البيانات!");
        }
    };





    ///////// students/////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////// couress/////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const getCouress = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/courses`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            console.log(response.data)
            if (response.data && Array.isArray(response.data.courses)) {
                setCourses(response.data.courses); // ✅ استخدم المصفوفة فقط
                SetCoursesCount(response.data.course_count)
            } else {
                console.error("❌ البيانات المستلمة غير صحيحة!", response.data);
                setCourses([]); // تجنب الأخطاء بوضع مصفوفة فارغة
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const createCouress = async (CouressData) => {
        console.log("📤 البيانات المُرسلة إلى السيرفر:", CouressData); // ✅ تحقق مما يتم إرساله

        try {
            const response = await axios.post(`${API_URL}/course/create`, CouressData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            console.log("✅ تم إنشاء الدورة:", response.data);
            getCouress()
        } catch (error) {
            console.error("❌ خطأ في إنشاء الدورة:", error.response?.data || error);
            throw error;
        }
    };


    const handleDeleteCouress = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/course/${id}/delete`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200) {
                // setDoctors(prev => prev.filter(student => student.id !== id)); // تحديث القائمة
                console.log(`✅ تم حذف الماده ID: ${id}`);
                toast.success("✅ تمت حذف طالب الماده   !", {
                    icon: false
                });
                getCouress()
            }
        } catch (error) {
            console.error("❌ خطأ في حذف الماده:", error);
            toast.error("❌ فشل في حذف الماده!", { icon: false });
        }
    };


    const updateCouressCouress = async (id, CouressData) => {
        try {
            console.log("🔍 ID الدورة:", id);
            console.log("🔍 بيانات الدورة المُرسلة إلى updateCouressCouress:", CouressData);
            const formattedData = {
                name: CouressData.name,
                doctor_id: CouressData.doctor_id,
                year_study: CouressData.year_study,
                Path_of_video: CouressData.Path_of_video,
                student_st_year: CouressData.student_st_year,
                code_of_course:CouressData.code_of_course,
            };

            const response = await axios.put(`${API_URL}/course/${id}/edit`, formattedData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            console.log("✅ تم تحديث بيانات الطالب:", response.data);
            getCouress(); // تحديث القائمة بعد التعديل
            // ✅ ضع التوست هنا فقط
            toast.success("✅ تم تحديث بيانات الطالب بنجاح!", { icon: false });
        } catch (error) {
            console.error("❌ خطأ في تحديث بيانات الطالب:", error.response?.data || error);
            // throw error;
            toast.error("⚠️ حدث خطأ أثناء التحديث، تأكد من صحة البيانات!");
        }
    };







    ///////// couress/////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////// doctors/////////////////////////////////////////////////////////////////////////////////////////


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
                SetdoctorsCount(response.data.doctor_count)
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
                console.log(`✅ تم حذف الاستاذ ID: ${id}`);
                toast.success("✅ تمت حذف الاستاذ بنجاح   !", {
                    icon: false
                });
            }
        } catch (error) {
            console.error("❌ خطأ في حذف الاستاذ:", error);
            toast.error("❌ فشل في حذف الاستاذ!", { icon: false });
        }
    };

    const updateDoctor = async (id, DoctorData) => {
        try {
            const formattedData = {
                name: DoctorData.name,
                phone_number: DoctorData.phone_number,
                birth_of_date: DoctorData.birth_of_date,
                email: DoctorData.email,
                salary: Number(DoctorData.salary),
                specialist: DoctorData.specialist,
                gender: DoctorData.gender,
                address: DoctorData.address,
                assistant_ids: DoctorData.assistant_ids ? DoctorData.assistant_ids.map(Number) : []
            };

            const response = await axios.put(`${API_URL}/doctor/${id}/edit`, formattedData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            console.log("✅ تم تحديث بيانات الطبيب:", response.data);
            getDoctors(); // تحديث قائمة الأطباء بعد التعديل
            return response.data;
        } catch (error) {
            console.error("❌ خطأ في تحديث الطبيب:", error.response?.data || error);
            throw error;
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
                SetAdminsCount(response.data.user_count)
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
                toast.success("✅ تمت حذف الأدمن بنجاح   !", {
                    icon: false
                });
            }
        } catch (error) {
            console.error("❌ خطأ في حذف الأدمن:", error);
            toast.error("❌ فشل في حذف الأدمن!", { icon: false });
        }
    };
    const updateAdmin = async (id, AdminData) => {
        try {
            const formattedData = {
                name: AdminData.name,
                email: AdminData.email,
                role: AdminData.role
            };

            const response = await axios.put(`${API_URL}/user/${id}/edit`, formattedData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            console.log("✅ تم تحديث بيانات المسؤول:", response.data);
            getAdmins()
            return response.data;
        } catch (error) {
            console.error("❌ خطأ في تحديث المسؤول:", error.response?.data || error);
            throw error;
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
                toast.success("✅ تمت حذف الامتحان بنجاح   !", {
                    icon: false
                });
            }
        } catch (error) {
            console.error("❌ خطأ في حذف الامتحان:", error);
            toast.error("❌ فشل في حذف الامتحان!", { icon: false });
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

    // questions////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const getquestions = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/questions`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            // console.log("📢 البيانات المستلمة من API:", response.data);

            if (response.data && Array.isArray(response.data.questions)) {
                setQuestions(response.data.questions);
            } else {
                console.error("❌ البيانات المستلمة غير صحيحة!", response.data);
                setQuestions([]); // تجنب الأخطاء بمصفوفة فارغة
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    const handleDeletegetQuestions = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/question/${id}/delete`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200) {
                setQuestions(prev => prev.filter(exam => exam.id !== id));
                console.log(`✅ تم حذف الامتحان ID: ${id}`);
                toast.success("✅ تمت حذف الامتحان بنجاح   !", {
                    icon: false
                });
            }
        } catch (error) {
            console.error("❌ خطأ في حذف الامتحان:", error);
            toast.error("❌ فشل في حذف الامتحان!", { icon: false });
        }
    };




    const createQuestion = async (QuestionData) => {
        try {
            const formattedData = {
                content: QuestionData.content, // ✅ تأكد من إرسال هذا الحقل
                answers: QuestionData.answers.map(answer => ({ content: answer.content })),
                correct_answer_content: QuestionData.correct_answer_content
            };
            const response = await axios.post(`${API_URL}/question/create`, formattedData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            console.log("✅ تمت إضافة سؤال:", response.data);
            getquestions()
        } catch (error) {
            console.error("❌ خطأ في إنشاء سؤال:", error.response?.data || error);
            throw error;
        }
    };

    const updateQuestion = async (id, QuestionData) => {
        try {
            const formattedData = {
                content: QuestionData.content, // ✅ تأكد من إرسال هذا الحقل
                answers: QuestionData.answers.map(answer => ({ content: answer.content })),
                correct_answer_content: QuestionData.correct_answer_content
            };
            const response = await axios.put(`${API_URL}/question/${id}/edit`, formattedData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            console.log("✅ تم تحديث الامتحان:", response.data);
            getquestions()
        } catch (error) {
            console.error("❌ خطأ في تحديث الامتحان:", error.response?.data || error);
            throw error;
        }
    };








    // questions////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

            // console.log("📢 البيانات المستلمة من API:", response.data);

            // استخراج المصفوفة فقط
            if (response.data && Array.isArray(response.data.assistants)) {
                Setassistants(response.data.assistants); // ✅ تخزين المصفوفة فقط
                SetAssistantsCount(response.data.assistant_count)
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
                toast.success("✅ تمت حذف معيد بنجاح   !", {
                    icon: false
                });
            }
        } catch (error) {
            console.error("❌ خطأ في حذف المساعد:", error);
            toast.error("❌ فشل في حذف معيد!", { icon: false });
        }
    };

    const updateAssistant = async (id, assistantData) => {
        try {
            const formattedData = {
                name: assistantData.name?.trim() || "غير محدد",
                phone_number: assistantData.phone_number?.trim() || null,
                birth_of_date: assistantData.birth_of_date?.trim() || null,
                email: assistantData.email?.trim() || null,
                salary: assistantData.salary ? Number(assistantData.salary) : 0,
                specialist: assistantData.specialist?.trim() || null,
                gender: assistantData.gender || "male",
                address: assistantData.address?.trim() || null,
                doctor_id: assistantData.doctor_id ? Number(assistantData.doctor_id) : null,
                student_ids: Array.isArray(assistantData.student_ids)
                    ? assistantData.student_ids
                    : assistantData.student_ids
                        ? assistantData.student_ids.split(",").map(Number)
                        : [],
                course_ids: Array.isArray(assistantData.course_ids)
                    ? assistantData.course_ids
                    : assistantData.course_ids
                        ? assistantData.course_ids.split(",").map(Number)
                        : [],
            };

            console.log("📢 البيانات المرسلة إلى API:", formattedData);

            // ✅ التحقق من أن students مصفوفة قبل الوصول إلى length
            if (Array.isArray(assistantData.students) && assistantData.students.length > 0) {
                formattedData.students = assistantData.students.map(Number);
            }

            const response = await axios.put(`${API_URL}/assistant/${id}/edit`, formattedData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            console.log("✅ تم تحديث المعيد:", response.data);
            getAssistant()
            return response.data;
        } catch (error) {
            console.error("❌ خطأ في تحديث المعيد:", error.response?.data || error);
            throw error;
        }
    };




    // Assistant////////////////////////////////////////////////////////////////////////////////////////////////////////////////





    useEffect(() => {
        getDoctors();
        getAdmins();
        getExams();
        getAssistant();
        getstudents()
        getCouress()
        getquestions()
    }, []);

    return (
        <DataContext.Provider value={{ doctors, courses, admins, students, loading, error, exams, questions, assistants, doctorsCount, assistantsCount, adminsCount, StudentCount, CoursesCount, getDoctors, createCouress, createDoctor, getAdmins, getCouress, createAdmin, getExams, createExams, createQuestion, getAssistant, createAssistant, createstudents, handleDeleteExam, handleDeleteCouress, handleDeleteStudent, handleDeleteAssistant, handleDeleteAdmin, handleDeleteDoctor, handleDeletegetQuestions, updateExam, updateQuestion, updateAssistant, updateAdmin, updateDoctor, updatestudents, updateCouressCouress }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    return useContext(DataContext);
}
