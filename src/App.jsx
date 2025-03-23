import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Forgetpass from './Modules/AuthenticationModule/Components/ForgetPass/Forgetpass';
import Login from './Modules/AuthenticationModule/Components/Login/Login';
import Home from './Modules/Dashboard/Pages/Home';
import AboutUs from './Modules/GuideModule/Components/AboutUs/AboutUs';
import CallUs from './Modules/GuideModule/Components/CallUs/CallUs';
import Edusystem from './Modules/GuideModule/Components/EduSystem/Edusystem';
import Guide from './Modules/GuideModule/Components/Guide';
import AuthLayout from './Modules/SharedModule/Components/AuthLayout/AuthLayout';
import MasterLayout from './Modules/SharedModule/Components/MasterLayout/MasterLayout';
import NotFound from './Modules/SharedModule/Components/NotFound/NotFound';
import DashboardCourses from './Modules/Dashboard/Pages/DashboardCourses';
import AdmissionRequirements from './Modules/GuideModule/Components/AdmissionRequirements/AdmissionRequirements';
import AddCourses from './Modules/Dashboard/Pages/AddCourses';
import AddStudents from './Modules/Dashboard/Pages/AddStudents';
import Students from './Modules/Dashboard/Pages/Students';
import Docters from './Modules/Dashboard/Pages/Docters';
import AddDocters from './Modules/Dashboard/Pages/AddDocters';
import AddAdmin from './Modules/Dashboard/Pages/AddAdmin';
import Exams from './Modules/Dashboard/Pages/Exams';
import AddExams from './Modules/Dashboard/Pages/AddExams';
import ChangePassword from './Modules/Dashboard/Pages/ChangePassword';
import Admin from './Modules/Dashboard/Pages/Admin';
import { DataProvider } from './Modules/Dashboard/DataContext/DataContext ';
import Assistant from './Modules/Dashboard/Pages/Assistant';
import AddAssistant from './Modules/Dashboard/Pages/AddAssistant';
import EditCourse from './Modules/Dashboard/Pages/EditCourse';
import EditStudent from './Modules/Dashboard/Pages/EditStudent'; // ✅ استيراد EditStudent

export default function App() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { path: '', element: <Guide /> },
        { path: 'login', element: <Login /> },
        { path: 'admission-requirements', element: <AdmissionRequirements /> },
        { path: 'about-us', element: <AboutUs /> },
        { path: 'call-us', element: <CallUs /> },
        { path: 'edu-system', element: <Edusystem /> },
        { path: 'forgetpass', element: <Forgetpass /> },
      ],
    },
    {
      path: '/dashboard',
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        { path: '', element: <Home /> },
        { path: 'courses', element: <DashboardCourses /> },
        { path: 'courses/add', element: <AddCourses /> },
        { path: 'courses/edit/:id', element: <EditCourse /> }, 
        { path: 'students', element: <Students /> },
        { path: 'students/add', element: <AddStudents /> },
        { path: 'students/edit/:id', element: <EditStudent /> }, // ✅ مسار تعديل الطالب
        { path: 'docters', element: <Docters /> },
        { path: 'docters/add', element: <AddDocters /> },
        { path: 'admin', element: <Admin /> },
        { path: 'admin/add', element: <AddAdmin /> },
        { path: 'exams', element: <Exams /> },
        { path: 'exams/add', element: <AddExams /> },
        { path: 'change-password', element: <ChangePassword /> },
        { path: 'assistant', element: <Assistant /> },
        { path: 'assistant/add', element: <AddAssistant /> },
      ],
    },
  ]);

  return (
    <DataProvider>
      <RouterProvider router={routes} />
    </DataProvider>
  );
}
