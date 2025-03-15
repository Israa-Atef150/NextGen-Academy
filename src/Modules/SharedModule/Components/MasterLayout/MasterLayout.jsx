import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../Sidebar/Sidebar'

export default function MasterLayout() {
  return (
    <div className='flex'>
      <SideBar />
      <div className='p-4 w-full'>
        <Outlet />
      </div>
    </div>
  )
}
