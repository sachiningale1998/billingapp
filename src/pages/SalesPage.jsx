import React from 'react'
import SalesHeader from '../components/Sales/SalesHeader'
import SalesTable from '../components/Sales/SalesTable'
import { useNavigate } from 'react-router-dom'


const SalesPage = () => {
    const navigate = useNavigate()
    let auth = localStorage.getItem("token")
    if (!auth) {
        setTimeout(()=>{
            navigate("/login")
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