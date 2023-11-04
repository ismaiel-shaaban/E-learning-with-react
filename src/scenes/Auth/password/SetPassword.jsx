import React from 'react'
import "../Auth.css"
import {Link} from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changePassword } from '../../../store/slices/passwordSlice'
import Swal from 'sweetalert2'
import { useEffect } from 'react'
const SetPassword = () => {

  const passwordPhone = (sessionStorage.getItem('passwordPhone') ) ? 
  JSON.parse(sessionStorage.getItem('passwordPhone')) : "01010673076"

  const [change , setChange] = useState(false)
  const [password , setPassword] = useState('')
  const [confirmPassword , setConfirmPassword] = useState('')
  const changePasswordResponse = useSelector((state) => state.passwordData.changePasswordResponse )
  
  useEffect(() => {
    if (changePasswordResponse.status) {
      Swal.fire({
        icon: 'success',
        title: 'تم تغيير كلمة المرور بنجاح',
        text: 'سيتم تحويلك لصفحة تسجيل الدخول',
        showConfirmButton: false,
        timer: 2000
      })
      setTimeout(() => {
        window.location.href = "/student/login"
      }
      , 2300)
    }
    else if (change) {
      Swal.fire({
        icon: 'error',
        text:changePasswordResponse.message,
        showConfirmButton: false,
        timer: 2000
      })
    }

  }, [changePasswordResponse])


  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password == confirmPassword){ 
      dispatch(changePassword({phone : passwordPhone , password : password }))
      setChange(true)
    }
    else{
      Swal.fire({
        icon: 'error',
        text:"كلمة المرور غير متطابقة",
        showConfirmButton: false,
        timer: 2000
      })
    }
  }

  return (
    <>
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title"> إعادة تعيين كلمة المرور  </h3>
            <div className="form-group mt-3">
              <label>كلمة المرور الجديدة </label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="أدخل كلمة المرور الجديدة "
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>تأكيد كلمة المرور  </label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="أكد كلمة المرور  "
                onChange={(e)=>setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary submitButton" 
              onClick={handleSubmit}
              >
                    تأكيد 
              </button>
            </div>
          </div>
        </form>
    </div>
    </>
  )
}

export default SetPassword