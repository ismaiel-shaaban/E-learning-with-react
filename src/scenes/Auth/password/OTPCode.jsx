import React, { useEffect, useState } from 'react'
import "../Auth.css"
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { sendOtp } from '../../../store/slices/userSlice'
import { constrainPoint } from '@fullcalendar/core/internal'
import Swal from 'sweetalert2'
import { otpCode } from '../../../store/slices/passwordSlice'


const OTPCode = () => {

  const passwordPhone = (sessionStorage.getItem('passwordPhone') ) ?
  JSON.parse(sessionStorage.getItem('passwordPhone')) : "01010673076"

  const [otp, setOtp] = useState('') ;
  const [change , setChange] = useState(false)
  const  OTPCodeResponse = useSelector((state) => state.passwordData.OTPCodeResponse ) 

  useEffect(() => {
    if (OTPCodeResponse.status) {
      Swal.fire({
        icon: 'success',
        title: 'تم ادخال  رمز التعيين بنجاح',
        showConfirmButton: false,
        timer: 2000
      })
      setTimeout(() => {
        window.location.href = "/student/setPassword"
      }
      , 2300)
    }
    else if (change){
      Swal.fire({
        icon: 'error',
        text:OTPCodeResponse.message,
        showConfirmButton: false,
        timer: 2000
      })
    }
  }, [OTPCodeResponse])



  const dispatch = useDispatch()
  
  const handleSubmit = (e) => { 

    e.preventDefault()
    dispatch(otpCode({phone:passwordPhone , otp :otp}))
    setChange(true)
  }



  return (
    <>
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title"> التحقق من رمز ال OTP  </h3>
            <p className = "DontWorry"> لقد تم ارسال كود مكون من اربع ارقام الي رقم الهاتف الذي تم ادخاله  </p>
            <div className="form-group mt-3">
              <label> رمز ال OTP</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="أدخل  رمز ال OTP  "
                onChange={(e)=>setOtp(e.target.value)}
                name='otp'
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary submitButton w-100" 
              onClick={(e)=>handleSubmit(e)}
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

export default OTPCode