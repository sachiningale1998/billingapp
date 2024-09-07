import React from 'react'
import SalesHeader from '../components/Sales/SalesHeader'
import SalesTable from '../components/Sales/SalesTable'
import Pagination1 from '../components/Paginations/Pagination1'
import { useStore } from '../context/store'
import { useNavigate } from 'react-router-dom'

const SalesPage = () => {
    let auth = localStorage.getItem("token")
    if (!auth) {
        setTimeout(()=>{
            window.location.href = '/login'
        }, 3000)
        return <h1>Unauthorized Access.. returnig you to login page </h1>
    }
  return (
    <div>
        <SalesHeader />
        <SalesTable />
    </div>
  )
}

export default SalesPage