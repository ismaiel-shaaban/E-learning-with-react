import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { paymentResponse } from '../../store/slices/paymentSlice'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const PaymentResponse = () => {

  const PaymentResponse = useSelector((state) => state.paymentData.PaymentResponse);
  const navigate = useNavigate()
  useEffect(() => {
    if(PaymentResponse.status ==true) {
      console.log(PaymentResponse);
      Swal.fire({
        icon: 'success',
        title: 'تمت عملية الدفع بنجاح',
        text: 'سيتم تحويلك الى صفحة الدخول',
        showConfirmButton: false,
        timer: 2000
      })
      setTimeout(() => {
        localStorage.removeItem('registerData')
        navigate ("/student/login") ;
      }, 2300);
    }
    else if(PaymentResponse.status ==false){
      Swal.fire({
        icon: 'error',
        title: 'حدث خطأ ما',
        text: 'سيتم تحويلك الى صفحة الدفع',
        showConfirmButton: false,
        timer: 2000
      })
      setTimeout(() => {
        navigate ("/student/payment") ;
      }, 2300);
    }
  }, [PaymentResponse]) 
  
  const dispatch = useDispatch()
  useEffect(() => {
    var url_string = window.location.href; 
    var url = new URL(url_string);
    var status = url.searchParams.get("status");
    var order_id = url.searchParams.get("order_id");
    var invoice_id = url.searchParams.get("invoice_id");
    var research = url.searchParams.get("research");
    var projects = url.searchParams.get("projects");
    dispatch(paymentResponse({status , order_id , invoice_id ,research ,projects}))   
  }, [])


  return (
    <>

    </>
  )
}

export default PaymentResponse