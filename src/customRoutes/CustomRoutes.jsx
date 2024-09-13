
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SalesPage from '../pages/SalesPage'
import Navbar1 from '../components/Navbars/Navbar1'
import CreateInvoicePage from '../pages/CreateInvoicePage'
import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/LoginPage'
import ProfilePage from '../pages/ProfilePage'
import EditInvoiceForm from '../components/CreateInvoice/EditInvoiceForm'

const CustomRoutes = () => {
  return (
    <>
        <Navbar1 />
        <Routes>
            <Route path="/" element={<SalesPage />} />
            <Route path="/createinvoice" element={<CreateInvoicePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/invoice/:userId/:invoiceId" element={<EditInvoiceForm />} />
        </Routes>
    </>
  )
}

export default CustomRoutes