import React from 'react'

import "../Auth.css"
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { forgetPassword } from '../../../store/slices/passwordSlice'
import { useEffect } from 'react'
import Swal from 'sweetalert2'
const Login = () => {

  const [phone , setPhone] = useState('')
  const [change , setChange] = useState(false)
  const forgetPasswordResponse = useSelector((state) => state.passwordData.forgetPasswordResponse )
  
  useEffect(() => {
    if (forgetPasswordResponse.status) {
      sessionStorage.setItem('passwordPhone', JSON.stringify(phone))
      Swal.fire({
        icon: 'success',
        title: 'تم ارسال رمز التعيين بنجاح',
        text: 'سيتم تحويلك لصفحة   ادخال الرمز',
        showConfirmButton: false,
        timer: 2000
      })
      setTimeout(() => {
        window.location.href = "/student/OTP"
      }
      , 2300)
    }
    else if (change){
      Swal.fire({
        icon: 'error',
        text:forgetPasswordResponse.message,
        showConfirmButton: false,
        timer: 2000
      })
    }
  }, [forgetPasswordResponse])



  const dispatch = useDispatch()
  
  const handleSubmit = (e) => { 
    e.preventDefault()
    dispatch(forgetPassword({phone:phone}))
    setChange(true)
  }
  return (
    <>
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title"> نسيت كلمة المرور ؟؟ </h3>
            <p className = "DontWorry">    لا تقلق سوف نرسل لك رمز التعيين على البريد الالكتروني  </p>
            <div className="form-group mt-3">
              <label> رقم الهاتف</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="أدخل  رقم الهاتف "
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button  className="btn btn-primary submitButton"
                onClick={handleSubmit}
              >اعادة تعيين كلمة المرور </button>
            </div>
          </div>
        </form>
    </div>
    </>
  )
}

export default Login