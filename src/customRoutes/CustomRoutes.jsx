import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SalesPage from '../pages/SalesPage'
import Navbar1 from '../components/Navbars/Navbar1'
import CreateInvoicePage from '../pages/CreateInvoicePage'

const CustomRoutes = () => {
  return (
    <>
        <Navbar1 />
        <Routes>
            <Route path="/" element={<SalesPage />} />
            <Route path="/createInvoice" element={<CreateInvoicePage />} />
        </Routes>
    </>
  )
}

export default CustomRoutes