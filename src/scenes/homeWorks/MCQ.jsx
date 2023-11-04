import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../theme';
import  SubmitButton  from '../../components/SubmitButton';
import { useDispatch, useSelector } from 'react-redux';
import { addQuestions } from '../../store/slices/questionsSlice';
import Swal from "sweetalert2";

const ChildBox = styled(Box)(({ theme }) => ({
  margin: '10px 0 ' ,
}));

export  const H5 = styled("h5")(({ theme }) => ({
  fontWeight: "bold" , 
  color: Colors.main[1] ,
  margin: "20px 0" ,
}));

const FlexBox = styled(Box)(({ theme }) => ({
  display: 'flex' ,
  alignItems: 'center' ,
  [theme.breakpoints.down("900")]: {
    flexDirection: 'column' ,
  },

}));

const Input = styled("input")(({ theme }) => ({
    width: "100%" ,
    padding: "8px" , 
    border: "1px solid #ccc" , 
    borderRadius: "5px" , 
    transition: "all 0.3s ease-in-out" , 
    "&:hover, :focus": {
      outlineColor: "#00bfc6" , 
      borderColor: "#00bfc6" , 
    }, 
    "&.add": {
      width: "80%" ,
      [theme.breakpoints.down("900")]: {
        width: '92%' ,
      },
    }
}));

const AddButton = styled(Box)(({ theme }) => ({
  minWidth: '10%' ,
  display: 'flex' ,
  justifyContent: 'center' ,
  alignItems: 'center' ,
  borderRadius: '5px' ,
  fontWeight: 'bold' ,
  cursor: 'pointer' ,
  padding: '10px' ,
  margin: '10px 0' ,
  backgroundColor: Colors.main[3] ,
  color: 'white' ,
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: Colors.main[2],
  },
  [theme.breakpoints.down("900")]: {
    width: '60%' ,
    fontWeight: '100' ,
  },

}));

const Ul = styled("ul")(({ theme }) => ({
  padding: '0' ,
  width:'92%',
  listStyle: 'none' ,
  display:'flex',
  justifyContent:'center' ,
  margin: '0 auto' ,
  [theme.breakpoints.down("900")]: {
    flexDirection: 'column' ,
  },
}));

const Div = styled("div")(({ theme }) => ({
  display:'flex',
  flexDirection:'row',
  justifyContent:'end' , 
  [theme.breakpoints.down("500")]: {
    flexDirection:'column' ,
  },
}));

const Li = styled("li")(({ theme }) => ({
  margin: '10px 5px' ,
  width: '50%' ,
  overflow: 'auto' ,  
  border: `2px solid ${Colors.main[3]}` ,
  padding: '10px' ,
  borderRadius: '5px' ,
  fontWeight: 'bold' ,
  [theme.breakpoints.down("900")]: {
    width: '100%' ,
  },
}));


function MCQ() {
  const dispatch = useDispatch()
  const [data, setData] = useState([
     {
      "name":'',
      "answer":[
        
        ],
        "details":''
      }
  
  ]);
  const [currentAnswer ,setCurrentAnswer ] = useState([])
  const isQuestionsAdded = useSelector((state) => state.questionsData.isQuestionsAdded )
  useEffect(() => {
    if(isQuestionsAdded.status == true) {

      Swal.fire({
        icon: 'success',
        title: 'تم  ارسال الاسألة بنجاح',
        showConfirmButton: false,
        timer: 3000
      })
      window.location.reload();
    }
    else if (isQuestionsAdded.status == false) {
      Swal.fire({
        icon: 'error',
        text: 'برجاء المحاولة مرة اخري',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }, [isQuestionsAdded] );
  const handleQuestionChange = (event ,i) => {
    let questions = [...data]
    questions[i].name = event.target.value

    setData(questions)
  };
  const handleQuestionDetailsChange = (event ,i) => {
    let questions = [...data]
    questions[i].details = event.target.value

    setData(questions)
  };

  const handleAnswerChange = (event ,i) => {
    let currentAns = [...currentAnswer]
    currentAns[i]  = event.target.value
    setCurrentAnswer(currentAns);
  };

  const addAnswer = (i) => {
    if(currentAnswer[i]){

      let questions = [...data]
      questions[i].answer.push(currentAnswer[i])
      setData(questions)
      let currentAns = [...currentAnswer]
      currentAns[i]  = ''
      setCurrentAnswer(currentAns);
      setOptionCounter(1) ;
    }
  };
  const handleSubmit = () => {
    const sendArray = [] 
    let send = false  ; 
    data.map((ques ,i)=>{
      if (ques.name !="" )  {
        sendArray.push(ques)
        send = true ; 
      }
    })
    if (send) {
      dispatch(addQuestions(sendArray))
    }
    else{
      Swal.fire({
        icon: 'error',
        text: 'برجاء اضافة الاسئلة  ',
        showConfirmButton: false,
        timer: 1500
      })
      
    }
   
  };

  const addAnotherQues = () => {
    let questions = [...data]
    questions.push( {
      "name":'',
      "answer":[
        
        ],
        "details":''
      })

    setData(questions)
  
  };

  const [optionCounter , setOptionCounter] = useState(0)

  return (
    <>
    {data.map((ques ,i)=>{
      
       return(
        <Box border="1px solid #20c997  " margin="20px 0px" padding="10px" key = {i}>
          <ChildBox>
            <H5>  السؤال : {i+1}</H5>
            <div>
              <Input
                type="text"
                placeholder="أدخل السؤال هنا"
                value={ques.name}
                onChange={(e)=>handleQuestionChange(e ,i)}
              />
            </div>
          </ChildBox>
        
          <ChildBox>
            <H5>   الإجابات :</H5>
            <FlexBox display="flex" justifyContent="space-between">
              <Input
                className="add"
                type="text"
                placeholder="أدخل الاختيار هنا ان وجدت"
                value={currentAnswer[i]}
                onChange={(e)=>handleAnswerChange(e,i)}
              />
              { ques.answer.length == 0 ?
                <AddButton onClick={()=>addAnswer(i)}>اضافة اختيار</AddButton>  :
                <AddButton onClick={()=>addAnswer(i)}>اضافة اختيار اخر </AddButton>
              } 
            </FlexBox>
            <Ul>
              {
                ques.answer.map((ans ,j)=>{
                  return <Li key={j}> {j+1}- {ans} </Li>
                })
              }
            </Ul>
          </ChildBox>
          <ChildBox>
            <H5>  تفاصيل السؤال </H5>
            <div>
              <Input
                type="text"
                placeholder="اكتب تفاصيل السؤال هنا"
                value={ques.details}
                onChange={(e)=>handleQuestionDetailsChange(e ,i)}
              />
            </div>
          </ChildBox>
        </Box>
       )
       
    })}
    <Div> 
      <SubmitButton onClick={handleSubmit}>ارسال الأسئلة</SubmitButton>
      <SubmitButton onClick={addAnotherQues}>اضافة سؤال اخر</SubmitButton>
    </Div>
    </>
  );
}

export default MCQ;
