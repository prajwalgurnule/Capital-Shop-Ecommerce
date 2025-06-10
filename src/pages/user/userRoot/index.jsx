import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../layout/navbar/Navbar'
import Header from '../layout/header/Header'
import Footer from '../layout/footer/Footer'

function UserRoot() {
    return (
        <div>
            <Navbar />
            <Header />
            <Outlet />
            <Footer /> 
        </div>
    )
}
export default UserRoot