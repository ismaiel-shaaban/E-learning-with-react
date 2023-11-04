import styled from '@emotion/styled';
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../theme';
import { useDispatch, useSelector } from 'react-redux';
import { getExternals } from '../../store/slices/externalsSlice';
import Title from '../../components/Title';

const BoxContainer = styled(Box)(({ theme }) => ({
    border: `1px solid ${Colors.main[3]}` ,
    height: `calc(100%  - 60px) `,
}));  

const Iframe = styled("iframe")(({ theme }) => ({
    width: "100%",
    height: '100%',
    border: '1px solid #ccc' , 
}));  
// const Title = styled("h1")(({ theme }) => ({
//     margin: '10px auto' ,
//     padding : '10px' ,  
//     textAlign: 'center' ,
//     backgroundColor: Colors.main[6] ,
//     width: '100%' ,
//     color: Colors.main[1] ,
//     fontWeight: 'bold' ,
// }));  
const IframeSite = ({ title , bot}) => {

    const [url , setUrl] = useState('')
    const [frameTitle , setFrameTitle] = useState()
    const dispatch = useDispatch()

    const externals = useSelector((state) => state.externalsData.externals)
    const userData = JSON.parse(sessionStorage.getItem('userData'))
   

    useEffect(() => {
        if (bot) {


            setUrl(userData.chatPot) 
            setFrameTitle(title)
        }
        else {
   
            dispatch (getExternals())
        }
    }, [])

    useEffect(() => {
        setUrl(userData.chatPot) 
        
        if (externals.status==true) {
            setFrameTitle(title)
            if(userData.package !=' باقة مجتهد'){
                
                setUrl (externals.data.externials[0].iframe) 
                
            }
            else{
                setFrameTitle('بيت العلم بدون اعلانات غير متاح للباقة الخاصة بك ..برجاء التحويل لباقة أعلي للاستمتاع بالخدمة')
            }
        }
    }, [externals])

    
  return (
    <>
        <Title>{bot ? title:frameTitle}</Title>
        <BoxContainer>
            <Iframe
                src={bot ? userData.chatPot:url}
                title={title}
            />
        </BoxContainer>
    </>
  )
}
export default IframeSite