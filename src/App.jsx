import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Forgetpass from './Modules/AuthenticationModule/Components/ForgetPass/Forgetpass'
import Login from './Modules/AuthenticationModule/Components/Login/Login'
import Home from './Modules/Dashboard/Pages/Home'
import AboutUs from './Modules/GuideModule/Components/AboutUs/AboutUs'
import CallUs from './Modules/GuideModule/Components/CallUs/CallUs'
import Edusystem from './Modules/GuideModule/Components/EduSystem/Edusystem'
import Guide from './Modules/GuideModule/Components/Guide'
import AuthLayout from './Modules/SharedModule/Components/AuthLayout/AuthLayout'
import MasterLayout from './Modules/SharedModule/Components/MasterLayout/MasterLayout'
import NotFound from './Modules/SharedModule/Components/NotFound/NotFound'
import DashboardCourses from './Modules/Dashboard/Pages/DashboardCourses'
import AdmissionRequirements from './Modules/GuideModule/Components/AdmissionRequirements/AdmissionRequirements'
import AddCourses from './Modules/Dashboard/Pages/AddCourses'
import AddStudents from './Modules/Dashboard/Pages/AddStudents'
import Students from './Modules/Dashboard/Pages/Students'
import Docters from './Modules/Dashboard/Pages/Docters'
import AddDocters from './Modules/Dashboard/Pages/AddDocters'
import Employees from './Modules/Dashboard/Pages/Employees'
import AddEmployees from './Modules/Dashboard/Pages/AddEmployees'
import Exams from './Modules/Dashboard/Pages/Exams'
import AddExams from './Modules/Dashboard/Pages/AddExams'
import ChangePassword from './Modules/Dashboard/Pages/ChangePassword'

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { path: "", element: <Guide /> },
        { path: "login", element: <Login /> },
        { path: "admission-requirements", element: <AdmissionRequirements /> },
        { path: "about-us", element: <AboutUs /> },
        { path: "call-us", element: <CallUs /> },
        { path: "edu-system", element: <Edusystem /> },
        { path: "forgetpass", element: <Forgetpass /> },
      ],
    },

    {
      path: "/dashboard",
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        { path: "/dashboard", element: <Home /> },
        { path: "/dashboard/courses", element: <DashboardCourses /> },
        { path: "/dashboard/courses/add", element: <AddCourses /> },
        { path: "/dashboard/students", element: <Students /> },
        { path: "/dashboard/students/add", element: <AddStudents /> },  
        { path: "/dashboard/docters", element: <Docters /> },
        { path: "/dashboard/docters/add", element: <AddDocters /> },  
        { path: "/dashboard/employees", element: <Employees /> },
        { path: "/dashboard/employees/add", element: <AddEmployees /> },
        { path: "/dashboard/exams", element: <Exams /> },
        { path: "/dashboard/exams/add", element: <AddExams /> },
        { path: "/dashboard/change-password", element: <ChangePassword /> },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}
