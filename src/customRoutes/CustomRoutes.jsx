
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SalesPage from '../pages/SalesPage'
import Navbar1 from '../components/Navbars/Navbar1'
import CreateInvoicePage from '../pages/CreateInvoicePage'
import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/LoginPage'

const CustomRoutes = () => {
  return (
    <>
        <Navbar1 />
        <Routes>
            <Route path="/" element={<SalesPage />} />
            <Route path="/createinvoice" element={<CreateInvoicePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    </>
  )
}

export default CustomRoutes