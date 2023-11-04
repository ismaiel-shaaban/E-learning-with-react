
import React from 'react'
import Title from '../../components/Title'
import { Box } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pricePackage, renewal } from '../../store/slices/paymentSlice'
import { useState } from 'react'
import { Colors } from '../../theme'
import styled from '@emotion/styled'
import SubmitButton from '../../components/SubmitButton'
import Swal from 'sweetalert2'
const Container = styled(Box)(({ theme }) => ({
    width: '99%',
    maxWidth: '800px',  
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.6)',
    margin: '30px auto',
    height: 'fit-content',
    backgroundColor: 'rgb(255,255,255,0.85)',
    position: 'relative',
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    [theme.breakpoints.down('800')]: {
        margin: '30px 10px',
    },

}));
const Select = styled("select")(({ theme }) => ({
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    transition: "border-color 0.3s",
    "&:hover, &:focus": {
      outlineColor: Colors.main[3] , 
      borderColor: Colors.main[3] , 
    },
  }));
const Label = styled("label")(({ theme }) => ({
    fontWeight: "bold",
    fontSize: "17px",
  }));
  
  const Input = styled("input")(({ theme }) => ({
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    "&:hover, &:focus": {
      outlineColor: Colors.main[3] , 
      borderColor: Colors.main[3] , 
    },
    transition: "all 0.3s ease-in-out" , 
  }));

const MoreResearch = () => {

const [ResearchPrice, setResearchPrice] = useState(0)
const [selectedCurrency, setSelectedCurrency] = useState('SR');
const [researchNumber, setResearchNumber] = useState(0);

const pricePackageResponse = useSelector((state) => state.paymentData.pricePackageResponse)  
const renewalResponse = useSelector((state) => state.paymentData.renewalResponse)  

const orderID = JSON.parse(sessionStorage.getItem('userData')).order_id;


useEffect(() => {
    if (renewalResponse.status ==  true ) {
        const url = renewalResponse.data.payment.payment_data.redirectTo 
        window.location.href = url
        
    }
},[renewalResponse])

useEffect(() => {
    console.log(pricePackageResponse)
    if (pricePackageResponse.status ==  true ) {
        setResearchPrice(pricePackageResponse.data.research)
    }
},[pricePackageResponse])


const dispatch = useDispatch()
  useEffect(() => {
    dispatch(pricePackage())
},[])

const handleOkClick = () => {
    if (!isNaN(researchNumber) && researchNumber > 0) {
        dispatch (renewal({order_id :orderID,payment_method_id : 2, projecets : 0 , 
            research : researchNumber , currency : selectedCurrency      
        }))
    }
    else {
        Swal.fire({
            icon: 'error',
            text: "يرجى ادخال عدد الابحاث بشكل صحيح",
            showConfirmButton: false,
            timer: 2000
            })
    }

};

  return (
    <>
        <Title> لقد استهلكت الابحاث المتاحة لك</Title>
        <Container style = {{margin : "auto" }}>
            <h5>إذا اردت المزيد من الابحاث سيكون سعر البحث  :   
            <span style = {{color : Colors.main[1] , fontWeight : "Bold", padding : "0 10px"}}>{ResearchPrice}</span>  
            ريال سعودي  
            </h5>
            <Label> عدد الابحاث</Label>
            <Input
                type="number"
                value={researchNumber}
                onChange={(e) => setResearchNumber(e.target.value)}
                onFocus={(e) => e.target.classList.add("active")}
                onBlur={(e) => e.target.classList.remove("active")}
            />
            <Label >يرجى اختيار عملة الدفع</Label>
            <Select
                value={selectedCurrency} 
                onChange={(e) => setSelectedCurrency(e.target.value)}
            >
                <option value="SR"> الريال السعودي</option>
                <option value="EGP"> الجنيه المصري</option>
            </Select>
            <SubmitButton onClick={handleOkClick} >تأكيد</SubmitButton>
        </Container>
    </>
  )
}

export default MoreResearch