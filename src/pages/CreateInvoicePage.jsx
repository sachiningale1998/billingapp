import React from 'react'
import CreateInvoice from '../components/CreateInvoice/CreateInvoice'

const CreateInvoicePage = () => {
    let auth = localStorage.getItem("token")
    if (!auth) {
        setTimeout(()=>{
            window.location.href = '/login'
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