import React from 'react'
import { Button } from 'react-bootstrap';
import {useNavigate} from "react-router-dom"

const Button1 = () => {
    let navigate = useNavigate()
    
    const handleClick=()=>{
        navigate("/createinvoice")
    }

  return (
    <Button onClick={handleClick} variant="primary">Create Invoice +</Button>
  )
}

export default Button1