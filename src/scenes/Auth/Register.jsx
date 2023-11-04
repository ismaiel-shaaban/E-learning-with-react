import React from 'react'
import './Auth.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getLevels } from '../../store/slices/levelSlice'
import { getpackages } from '../../store/slices/packageSlice'
import { useState } from 'react'
import { userRegister } from '../../store/slices/userSlice'
import { Box } from '@mui/material'
import styled from '@emotion/styled'
import Swal from 'sweetalert2'


const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between", 
  alignItems: "center",
}));


const Register = () => {
  const levels = useSelector((state) => state.levelsList.levels )
  const pacakages = useSelector((state) => state.packagesList.packages)


  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getLevels())
    dispatch(getpackages())
  },[])

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    phone: "",
    level_id: "",
    package_id: "",
    gender : ""
  });

 

  const navigate = useNavigate()
  const registerData =useSelector((state) => state.userData.registerData)
  const isRegisterSuccess =useSelector((state) => state.userData.isRegisterSuccess )
  const [confirmPassword, setConfirmPassword] = useState("");

  const [change , setChange] = useState(false)
  useEffect(() => {
    if (isRegisterSuccess) {
      localStorage.setItem('registerData', JSON.stringify(registerData.data.user))
      Swal.fire({
        icon: 'success',
        title: 'تم التسجيل البيانات الاساسية بنجاح',
        text: 'سيتم تحويلك لصفحة  الدفع',
        showConfirmButton: false,
        timer: 2000
      })
      setTimeout(() => {
        navigate('/student/payment')
      }, 2300);
    }
    else if(change) {
      Swal.fire({
        icon: 'error',
        title: 'حدث خطأ ما',
        text: registerData.message,
      })
    }
  }, [isRegisterSuccess, registerData])

  
  const handleChange = (event) => {
  const { name, value } = event.target;
  setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
};


  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (formData.password.length>0 && formData.password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        text: 'كلمة السر غير متطابقة',
      })
    }
    else 
    {
      dispatch(userRegister(formData));
      setChange(true);
    }

  };
  return (
    <>
      <div className="Auth-form-container" >
      <form className="Auth-form" >
        <div className="Auth-form-content">
          <h1 className="Auth-form-title">إنشاء حساب</h1>
          <div className="text-center">
          لديك حساب بالفعل  ؟ {" "}
            <Link className="RegisterLink" to = "/student/login" >
              تسجيل الدخول 
            </Link>
          </div>
          <div className="form-group mt-3" >
            <label>الإسم</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="أدخل الاسم ثنائي"
              onChange={handleChange}
              name='name'
            />
          </div>
          <div className="form-group mt-3">
            <label>البريد الإلكتروني </label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="أدخل البريد الإلكتروني "
              onChange={handleChange}
              name='email'
            />
          </div>
          <StyledBox>
          <div className="form-group mt-2">
            <label> رقم الهاتف </label>
            <input
              type="phone"
              className="form-control mt-1"
              placeholder="أدخل رقم الهاتف "
              onChange={handleChange}
              name='phone'
            />
          </div>
          <div className="form-group mt-3" >
            <label>  الجنس </label>
              <select className="form-select" aria-label="Default select example"
              onChange={handleChange}
              name='gender'>
              <option value="">اختر  الجنس</option>
              <option value="male">ذكر  </option>
              <option value="female">أنثى  </option>
              </select>
          </div>
          </StyledBox>
          
          <StyledBox>
            <div className="form-group mt-3" >
              <label>  الصفوف  </label>
                <select className="form-select" aria-label="Default select example"
                onChange={handleChange}
                name='level_id'>
                  <option value={''}>اختر الصف الدراسي</option>
                  {levels.map((level, i )=>{
                    return  <option value={level.id} key={i}>{level.name}</option>
                  })}
                  
                </select>
            </div>
            <div className="form-group mt-3" >
            <label>  الباقة  </label>
              <select className="form-select" aria-label="Default select example"
              onChange={handleChange}
              name='package_id'>
                <option value={''}>اختر  الباقة</option>
                {pacakages.map((pacakage, i )=>{
                  return  <option value={pacakage.id} key={i} >{pacakage.name}</option>
                })}
                
              </select>
            </div>
          </StyledBox>
          <div className="form-group mt-3">
            <label>كلمة المرور</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="أدخل كلمة المرور"
              onChange={handleChange}
              name='password'
            />
          </div>
          <div className="form-group mt-3">
            <label>تأكيد كلمة المرور</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="تأكيد كلمة المرور "
              name='confirmPass'
              onChange={(e)=>setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary submitButton" onClick={(e)=>handleSubmit(e)}>
              إنشاء حساب
            </button>
          </div>
          <p className="signup text-right mt-2">
              هل تواجه مشكلة في التسجيل او الدفع ؟  <Link to="/" className='RegisterLink' >   تواصل معنا </Link>  
            </p>
        </div>
      </form>
    </div>
    </>
  )
}

export default Register