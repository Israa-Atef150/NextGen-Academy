import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Guide from './Modules/HomeModules/Components/Guide'
import NotFound from './Modules/SharedModule/Components/NotFound/NotFound'
import AuthLayout from './Modules/SharedModule/Components/AuthLayout/AuthLayout'
import Login from './Modules/AuthenticationModule/Components/Login/Login'
import AboutUs from './Modules/HomeModules/Components/AboutUs/AboutUs'
import CallUs from './Modules/HomeModules/Components/CallUs/CallUs'
import Edusystem from './Modules/HomeModules/Components/EduSystem/Edusystem'
import Forgetpass from './Modules/AuthenticationModule/Components/ForgetPass/Forgetpass'
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
