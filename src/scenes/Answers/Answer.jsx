import styled from '@emotion/styled';
import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined';
import CheckIcon from '@mui/icons-material/Check';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Colors } from '../../theme'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProject } from '../../store/slices/projectsSlice';
import { deleteQuestion } from '../../store/slices/questionsSlice';
import Swal from 'sweetalert2';

const BoxContainer = styled(Box)(({ theme }) => ({
    padding : '20px' ,
    margin : '10px' ,
    display:'flex',
    justifyContent:'space-between',
    backgroundColor : Colors.main[9] ,
    color : Colors.main[1] ,
    [theme.breakpoints.down('500')]: {
        margin : '0' ,
        padding : '10px' ,
        display:'block'
    }
    
}));  
const BoxAnswer = styled(Box)(({ theme }) => ({
    padding: '20px' ,
    color : "#000" ,
    display:"flex" , 
    alignItems:"center" , 
    justifyContent : "center" , 
    flexWrap:"wrap" ,
})); 
const Item = styled(Box)(({ theme }) => ({
    display:"flex" ,
    alignItems:"center" ,
    justifyContent : "center" ,
    textAlign:"center" ,
    padding: '10px' ,
    margin: '10px' ,
    [theme.breakpoints.down('1200')]: {
        width:"50%" ,
    } , 
    [theme.breakpoints.down('800')]: {
        width:"100%" ,
    } , 
    color : "#fff" ,
    backgroundColor : "#198754" ,
    "&.wrong" : {
        backgroundColor : "#dc3545" ,
    }
})); 
const H6 = styled("h6")(({ theme }) => ({
    minWidth:"160px" ,   
    margin: '0' ,   
    paddingRight: '10px' ,
}));  
const GrantButton = styled("div")(({ theme }) => ({
    textAlign: "center",
    color: Colors.main[5],
    border: `2px solid ${Colors.main[5]}`,
    borderRadius: "10px",
    margin: "10px",
    "&:hover": {
      backgroundColor: Colors.main[5],
      cursor: "pointer",
      color: "#fff",
    },
    transition: "all 0.3s ease-in-out",
    padding: "3px",
  }));
  
  const FailButton = styled("div")(({ theme }) => ({
    textAlign: "center",
    backgroundColor: "#aaaaaa4a",
    color: Colors.main[5],
    border: `2px solid ${Colors.main[5]}`,
    borderRadius: "10px",
    margin: "10px",
    padding: "3px",
  }));
  

const Answer = ({singleQuestion ,index}) => {
    const isQuestionDeleted = useSelector((state) => state.questionsData.isQuestionDeleted ) ;
    const dispatch = useDispatch()
  
    useEffect (() => {
      if (isQuestionDeleted.status) {
        Swal.fire({
          icon: 'success',
          title: isQuestionDeleted.message,
          showConfirmButton: false,
          timer: 2000
        })
        setTimeout(() => {
          window.location.reload() ;
        }, 2300);
        
      }
    
      
    },[isQuestionDeleted])









  return (
    <>
        <BoxContainer style={{ wordWrap:"break-word"}}>
            <div>
            {
                singleQuestion.name =="" 
                
                ? 
            <h5 style={{fontWeight : "bold"}} ><span>{index+1}</span> -  
              
                <img
                src= {singleQuestion.image}
                alt="Selected"
                style={{ maxWidth: '100%', maxHeight: '300px' }}
            /> 
            </h5>
                
                :
                <h5 style={{fontWeight : "bold"}} ><span>{index+1}</span> -  {singleQuestion.name}</h5>
            }
            {
            singleQuestion.status != 0 ? 
                <>
                
                {
                    singleQuestion.options.length>0&& singleQuestion.answer_text=="" ?  
                    <BoxAnswer>
                        {singleQuestion.options.map((option , index) => {   
                            return (
                                option.name != null ? (
                                option.isCorrect==true  ? 
                                <Item key = {index}>
                                    <CheckIcon sx={{fontSize:"30px"  }} />
                                    <H6>{option.name } </H6>
                                </Item>  : 
                                <Item className = "wrong" key = {index}>
                                    <CloseOutlinedIcon sx={{fontSize:"30px" }} />
                                    <H6>{option.name } </H6>
                                </Item> 
                                ) : null
                            )
                        })}
                    </BoxAnswer>
                    
                    :<>
                    <h5>{singleQuestion.answer_text }</h5><h5>{singleQuestion.answer_text_image }</h5>
                    </>
                }
                </> : <h5>لم يتم الاجابة على السؤال بعد  </h5>
            }
            </div>
            <div>
            {
                            singleQuestion.status==1 ? 
                            <>
                            <GrantButton onClick={()=> dispatch(deleteQuestion(singleQuestion.id))  }  >حذف</GrantButton>  
                            {/* <FailButton >تعديل</FailButton>   */}
                            </> 
                            
                            
                            :
                            <>
                            <GrantButton onClick={()=> dispatch(deleteQuestion(singleQuestion.id))  }  >حذف</GrantButton>  
                            {/* <GrantButton >تعديل</GrantButton>   */}
                            </> 
                            
                        }
            </div>
        </BoxContainer>
    </>
  )
}

export default Answer