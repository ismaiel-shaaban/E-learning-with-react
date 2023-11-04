import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import { Colors } from '../../theme';
import  SubmitButton  from '../../components/SubmitButton';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeBundle, getPaymentMethods, postPayment, renewalBundle } from '../../store/slices/paymentSlice';
import Swal from 'sweetalert2';
import { json } from 'react-router-dom';
import { getpackages } from '../../store/slices/packageSlice';

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
const StyledBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between", 
    alignItems: "center",
  }));



const Renewal = () => {

    const paymentMethods = useSelector((state) => state.paymentData.paymentMethods)
    const postPaymentResponse = useSelector((state) => state.paymentData.renewalResponse)
    const orderID = JSON.parse(sessionStorage.getItem('order_id'));
    const pacakages = useSelector((state) => state.packagesList.packages)


  const [selectedPayment, setSelectedPayment] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('SR');
  const [selectedPachage, setSelectedPachage] = useState();
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
    dispatch(getpackages())
  }, [])

  const handleChange = (event) => {
    
    setSelectedPachage(event.target.value)
  };
  
  
  const handleOkClick = () => {
    console.log('jjjj');
    if (selectedPayment) {
        dispatch (renewalBundle({order_id : orderID , payment_method_id : selectedPayment ,currency:selectedCurrency})) 
    } else {
        Swal.fire({
            icon: 'error',
            title: 'حدث خطأ ما',
            text: 'يجب اختيار طريقة الدفع',
        })
    }
  };

  const handleChangeClick = () => {
    console.log('jjjj');
    if (selectedPayment&&selectedPachage) {
        dispatch (changeBundle({order_id : orderID , payment_method_id : selectedPayment ,currency:selectedCurrency ,pacakage:selectedPachage})) 
    } else {
        Swal.fire({
            icon: 'error',
            title: 'حدث خطأ ما',
            text: ' يجب اختيار طريقة الدفع والباقة',
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
        <SubmitButton onClick={handleOkClick} >تأكيد تجديد الباقة</SubmitButton>
        أو
        <Select
          value={selectedPachage} 
          onChange={handleChange} 
        >
      
            
                <option value=""> اختر  الباقة المراد تغييرها</option>
             
                {pacakages.map((pacakage, i )=>{
                  return  <option value={pacakage.id} key={i} >{pacakage.name}</option>
                })}
                
            
           
          </Select>
          <SubmitButton onClick={handleChangeClick} >تأكيد تغيير الباقة</SubmitButton>
        </Container>
    </Parent>
  );
};



export default Renewal;
