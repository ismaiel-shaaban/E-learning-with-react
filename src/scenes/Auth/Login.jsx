import React, { useEffect, useState } from 'react'
import './Auth.css'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../store/slices/userSlice';
import Swal from 'sweetalert2';

const Login = () => {

  const [formData, setFormData] = useState({email: "",password: ""});

  const [change , setChange] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuth =useSelector((state) => state.userData.isAuth ) 
  const userData =useSelector((state) => state.userData.userData ) 
  const loginValidation =useSelector((state) => state.userData.loginValidation )
  const [renewable , setRenewable] = useState(false)



  useEffect(() => {
    // redirect user to login page if registration was successful
    if (isAuth) {
      if (userData.data.user.subScribes==0) {
        Swal.fire({
          icon: 'error',
          text: "لقد انتهت صلاحية الباقة الخاصة بك",
          showConfirmButton: false,
          timer: 2000
        })
        sessionStorage.setItem('token', JSON.stringify(userData.data.user.token))
        sessionStorage.setItem('order_id', JSON.stringify(userData.data.user.order_id))
        setTimeout(() => {
          navigate('/student/renewal')
        }, 2300);
      }
      else {
        sessionStorage.setItem('userData', JSON.stringify(userData.data.user))
        navigate('/student/dashboard')
      }
    }
    else if (!loginValidation.data && change) {
      Swal.fire({
        icon: 'error',
        text: loginValidation.message,
        showConfirmButton: false,
        timer: 2000
      })
    }
  }, [isAuth, loginValidation])


  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(userLogin(formData))
    setChange(true)
  };
  return (
    <>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">تسجيل الدخول</h3>
            <div className="form-group mt-3">
              <label> رقم الهاتف</label>
              <input
                type="number"
                name='email'
                className="form-control mt-1"
                placeholder="أدخل  رقم الهاتف "
                onChange={handleChange}
              />
            </div>
            <div className="form-group mt-3">
              <label>كلمة المرور</label>
              <input
                type="password"
                name='password'
           
                className="form-control mt-1"
                placeholder="أدخل كلمة المرور"
                onChange={handleChange}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary submitButton">
                تسجيل الدخول 
              </button>
            </div>
            <p className="signup text-right mt-2">
                 <Link to="/student/forgetPassword" className='RegisterLink' > نسيت كلمة المرور ؟ </Link>  
            </p>
            <p className="signup text-right mt-2">
            ليس لديك حساب ؟  <Link to="/student/register" className='RegisterLink' > إنشاء حساب جديد </Link>  
            </p>
            <p className="signup text-right mt-2">
              هل تواجه مشكلة في التسجيل او الدفع ؟  <Link to="/" className='RegisterLink' >   تواصل معنا </Link>  
            </p>
          </div>
        </form>
    </div>
    </>
  )
}
 
  
export default Login