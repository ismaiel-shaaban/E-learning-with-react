import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import { Colors } from '../../theme';
import  SubmitButton  from '../../components/SubmitButton';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPaymentMethods, postPayment } from '../../store/slices/paymentSlice';
import Swal from 'sweetalert2';
import { Link, json } from 'react-router-dom';

const Parent = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100vh',    
    backgroundImage : `url(../../student/assets/payment.jpg)` , 
    backgroundSize : "cover" ,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&::before': {
        content: '""',
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgb(0,0,0,0.1)',
      }
}));

const Container = styled(Box)(({ theme }) => ({
    width: '99%',
    maxWidth: '800px',  
    textAlign: 'center',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.6)',
    margin: '30px auto',
    height: 'fit-content',
    backgroundColor: 'rgb(255,255,255,0.85)',
    position: 'relative',
    [theme.breakpoints.down('800')]: {
        margin: '30px 10px',
    },

}));
const Title = styled("h2")(({ theme }) => ({
    fontSize: '1.5rem',
    marginBottom: '15px',
    color: Colors.main[1],
    fontWeight: 'bold',
}));

const Select = styled("select")(({ theme }) => ({
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    "&:hover, &:focus": {
        outlineColor: Colors.main[3] ,
        borderColor: Colors.main[3] ,
    },
    backgroundColor: 'transparent',
}));




const Payment = () => {

    const paymentMethods = useSelector((state) => state.paymentData.paymentMethods)
    const postPaymentResponse = useSelector((state) => state.paymentData.postPaymentResponse)
    const order_id  = JSON.parse(localStorage.getItem("registerData")).order_id


  const [selectedPayment, setSelectedPayment] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('SR');
  const [redirect , setRedirect] = useState(false) ;
  const [methods, setMethods] = useState([]);

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
    paymentMethods.data.payments.map((method) => {
        if (method.paymentId == event.target.value) {
            if (method.redirect==="false")  setRedirect(false) 
            else setRedirect(true) 
        }
    }
    )
  };

  const handlePaymentCurrency = (event) => {
    setSelectedCurrency(event.target.value);
  
  };

  const dispatch = useDispatch()

  useEffect (() => {
    if (redirect==true && postPaymentResponse.status==true) {
        const Link  = postPaymentResponse.data.payment.payment_data.redirectTo
        window.location.href = Link
    }
  }, [postPaymentResponse])


  useEffect (() => {
    if (paymentMethods.status==true) {
        setMethods(paymentMethods.data.payments)
    }
  }, [paymentMethods])



  useEffect (() => {
    dispatch(getPaymentMethods()) ;
  }, [])


  
  const handleOkClick = () => {
    if (selectedPayment) {
        dispatch (postPayment({order_id : order_id , payment_method_id : selectedPayment ,currency:selectedCurrency})) 
    } else {
        Swal.fire({
            icon: 'error',
            title: 'حدث خطأ ما',
            text: 'يجب اختيار طريقة الدفع',
        })
    }
  };
  
  return (
    <Parent>
        <Container >
        <Title >طرق الدفع</Title>
        <Select 
            value={selectedPayment} 
            onChange={handlePaymentChange} 
        >
            <option value="">اختر طريقة الدفع</option>

            {methods?.map((option) => (
       
                (option.name_en==="Visa-Mastercard") ?
                (
                    <option key={option.paymentId} value={option.paymentId}>البطاقة البنكية</option>
                ) : () => {}
            ))}
        </Select>
        <Select 
            value={selectedCurrency} 
            onChange={handlePaymentCurrency} 
        >
            <option value="">اختر عملة الدفع</option>

           
                    <option value="SR"> الريال السعودي</option>
                    <option value="EGP"> الجنيه المصري</option>
                
        </Select>
        <SubmitButton onClick={handleOkClick} >تأكيد</SubmitButton>
        <p className="signup text-right mt-2">
              هل تواجه مشكلة في التسجيل او الدفع ؟  <Link to="/" className='RegisterLink' >   تواصل معنا </Link>  
            </p>
        </Container>
    </Parent>
  );
};



export default Payment;
