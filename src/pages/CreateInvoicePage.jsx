import React from 'react'
import CreateInvoice from '../components/CreateInvoice/CreateInvoice'
import { useNavigate } from 'react-router-dom'

const CreateInvoicePage = () => {
    const navigate = useNavigate()
    let auth = localStorage.getItem("token")
    if (!auth) {
        setTimeout(()=>{
            navigate('/login')
        }, 3000)
        return <h1>Unauthorized Access.. returnig you to login page </h1>
    }
  return (
    <div>
        <CreateInvoice />
    </div>
  )
}

export default CreateInvoicePage