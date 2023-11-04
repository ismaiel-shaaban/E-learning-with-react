import React, { useEffect } from 'react'
import Answer from './Answer'
import { Box, CircularProgress } from '@mui/material'
import { Colors } from '../../theme'
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestions } from '../../store/slices/questionsSlice';
import  Title  from '../../components/Title';

const BoxContainer = styled(Box)(({ theme }) => ({
    maxHeight : `calc(100%  - 60px)` ,
    overflow : "auto" ,
})); 

const MyAnswers = () => {

    const Questions = useSelector(state => state.questionsData.questions) ;
    const questionsLoading = useSelector(state => state.questionsData.questionsLoading) ;

    const dispatch = useDispatch() ;
    useEffect(()=>{
        dispatch(getQuestions()) ; 
    },[]) 
  return (
    <>
    {
        questionsLoading? <CircularProgress/> :  
        Questions.length == 0 ? <Title>لم تسأل اي سؤال بعد    </Title> :
        <div style={{height :"100%"}}>
            <Title>حلولي </Title>
            <BoxContainer sx = {{}}>
                {Questions.map((question,index) => (
                    <Answer singleQuestion={question} index={index} key = {index} />
                ))}
            </BoxContainer>
        </div>
    }
    
    </>
  )
}

export default MyAnswers






