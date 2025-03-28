import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBarUser from '../NavBar/NavBarUser'

export default function UserLayout() {
    return (
    <> 
        <NavBarUser/>
        <Outlet/>
    </>
    )
}