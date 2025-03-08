import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from './Modules/SharedModule/Components/NotFound/NotFound'
import AuthLayout from './Modules/SharedModule/Components/AuthLayout/AuthLayout'
import Login from './Modules/AuthenticationModule/Components/Login/Login'
import Forgetpass from './Modules/AuthenticationModule/Components/ForgetPass/Forgetpass'
import Guide from './Modules/GuideModule/Components/Guide';
import AboutUs from './Modules/GuideModule/Components/AboutUs/AboutUs';
import CallUs from './Modules/GuideModule/Components/CallUs/CallUs';
import Edusystem from './Modules/GuideModule/Components/EduSystem/Edusystem';
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

  //  {
  //   path:"MyAccount",
  //   element:<MasterLayout/>,
  //   errorElement:<NotFound/>,
  //   children:[{
    


  //   }]
  //  }
 

  ])
  return (
    <RouterProvider router={routes} />
  )
}
