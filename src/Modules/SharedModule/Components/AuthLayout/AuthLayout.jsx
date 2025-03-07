import React from 'react'
import NavBar from '../NavBar/NavBar'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div> 
      <NavBar/>
      <div className="mt-20">  <Outlet/></div>


   
    </div>
  )
}
