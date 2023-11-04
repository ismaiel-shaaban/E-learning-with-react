import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectPayment = ({children}) => {
    const registerData = JSON.parse(localStorage.getItem('registerData'));
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData) {
        return <Navigate to ="/student/dashboard" />
    }
    else if (!registerData) {
        return <Navigate to ="/student/register" />
    }
    return children
}
export default ProtectPayment

