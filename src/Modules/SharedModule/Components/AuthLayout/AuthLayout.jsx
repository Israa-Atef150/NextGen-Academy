import React from 'react'
import NavBar from '../NavBar/NavBar'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <> 
      <NavBar/>
      <Outlet/>
    </>
  )
}
