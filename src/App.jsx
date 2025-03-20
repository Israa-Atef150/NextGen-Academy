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
import AddUsers from './Modules/Dashboard/Pages/AddStudents'
import Students from './Modules/Dashboard/Pages/Students'
import AddStudents from './Modules/Dashboard/Pages/AddStudents'
import Docters from './Modules/Dashboard/Pages/Docters'
import AddDocters from './Modules/Dashboard/Pages/AddDocters'

import AddAdmin from './Modules/Dashboard/Pages/AddAdmin'
import Exams from './Modules/Dashboard/Pages/Exams'
import AddExams from './Modules/Dashboard/Pages/AddExams'
import ChangePassword from './Modules/Dashboard/Pages/ChangePassword'
import Admin from './Modules/Dashboard/Pages/Admin'
import { DataProvider } from "./Modules/Dashboard/DataContext/DataContext ";
import Assistant from './Modules/Dashboard/Pages/Assistant'
import AddAssistant from './Modules/Dashboard/Pages/AddAssistant'

export default function App() {
  const routes=createBrowserRouter([
    {
    path:"/",
    element:<AuthLayout/>,
    errorElement:<NotFound/>,
    children:[{
      path:"",
      element:<Guide/>
    },
    {
      path:"login",
      element:<Login/>
    },
    {
      path:"AdmissionRequirements",
      element:<AdmissionRequirements/>
    },
    {
      path:"AboutUs",
      element:<AboutUs/>
    },
    {
      path:"CallUS",
      element:<CallUs/>
    },
    {
      path:"Edusystem",
      element:<Edusystem/>
    },

    {
      path:"forgetpass",
      element:<Forgetpass/>
    },
  ]
    },

    // إذا كنت بحاجة إلى MasterLayout، تأكد من استيراده
    {
      path: "/dashboard",
      element: <MasterLayout/>,
      errorElement: <NotFound />,
      children: [
        {
          path:"/dashboard",
          element:<Home/>
        },
        {
          path:"/dashboard/courses",
          element:<DashboardCourses/>
        },
        {
          path:"/dashboard/Courses/add-Courses",
          element:<AddCourses/>
          
        },
        {
          path:"/dashboard/students",
          element:<Students/>
        },
        {
          path:"/dashboard/Students/AddStudents",
          element:<AddStudents/>
        },
        {
          path:"/dashboard/Docters",
          element:<Docters/>
        },
        {
          path:"/dashboard/Docters/AddDocters",
          element:<AddDocters/>
        },
        {
          path:"/dashboard/Admin",
          element:<Admin/>
        },
        {
          path:"/dashboard/Exams",
          element:<Exams/>
        },
        {
          path:"/dashboard/Exams/AddExams",
          element:<AddExams/>
        },
        {
          path:"/dashboard/Admin/AddAdmin",
          element:<AddAdmin/>
        },
        {
          path:"/dashboard/ChangePassword",
          element:<ChangePassword/>
        },
        {
          path:"/dashboard/users/add-users",
          element:<AddUsers/>
        },
        {
          path:"/dashboard/Assistant",
          element:<Assistant/>
        },
        {
          path:"/dashboard/Assistant/AddAssistant",
          element:<AddAssistant/>
        },
      ],
    },
  ]);

  return (
  <DataProvider> {/* Wrap RouterProvider with DataProvider */}
    <RouterProvider router={routes} />
  </DataProvider>
)
}
