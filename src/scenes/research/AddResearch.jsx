import styled from "@emotion/styled";
import React, { useState } from "react";
import { Colors } from "../../theme";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendResearch } from "../../store/slices/researchesSlice";
import Swal from "sweetalert2";
import  Title from "../../components/Title";
import { getSubjects } from "../../store/slices/subjectsSlice";
import { profileData, userLogin } from "../../store/slices/userSlice";
import { Box, CircularProgress } from "@mui/material";
import MoreResearch from "./MoreResearch";


const FormContainer = styled("div")(({ theme }) => ({
  maxWidth: "1000px",
  margin: "0 auto",
  padding: "20px",
  border: "1px solid #e4e4e4",
  borderRadius: "5px",
  boxShadow: "0 2px 4px #00a4a97d",
}));

const Form = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
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

const Option = styled("option")(({ theme }) => ({
}));

const Button = styled("button")(({ theme }) => ({
  padding: "10px 30px",
  backgroundColor: Colors.main[3] ,
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: Colors.main[2],
  },
  transition: "background-color 0.3s",
  margin: "auto",
  maxWidth: "1000px",
}));
const H5 = styled("h6")(({ theme }) => ({
  textAlign: "left",
  color: Colors.main[1],
  fontWeight: "bold",
  "& span": {
    color: "red",
    fontWeight: "bold",
  },
}));


const AddResearch = () => {
  const [title, setTitle] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [change , setChange] = useState(false) ;

  const sendResearchResponse = useSelector((state) => state.researchesData.sendResearchResponse ) ;
  const subjects = useSelector((state) => state.subjectsData.subjects ) ;
  const dataOfProfile = useSelector((state) => state.userData.dataOfProfile ) ;
  const profileLoading = useSelector((state) => state.userData.profileLoading ) ;


  useEffect(() => {
    if (sendResearchResponse.status) {
      Swal.fire({
        icon: 'success',
        title: 'تم إضافة البحث بنجاح',
        showConfirmButton: false,
        timer: 2000
      })
      setTimeout(() => {
        window.location.reload() ;
      }, 2300);
      
    }
    else if (change ) {
      Swal.fire({
        icon: 'error',
        text:sendResearchResponse.message ,
        showConfirmButton: false,
        timer: 2000
      })
      setTimeout(() => {
      }, 2300);
    }
  }, [sendResearchResponse]);



  const dispatch = useDispatch()
  useEffect(() => { 
    dispatch(getSubjects()) ;
    setChange(true) ;
    dispatch(profileData())
  }, [])



  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendResearch({name : title , teacher_name: supervisor, subjecet_id : selectedSubject,notes:notes })) ;
    
  };

  return (
    <>
    {profileLoading? <CircularProgress/> : 
    (dataOfProfile.count_research<=0 ) ? <MoreResearch/> :
    <Box>
      <H5> عدد الابحاث المتبقية :  
        <span> {dataOfProfile.count_research}</span>
      </H5>
      <Title>إضافة بحث </Title>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <Label>عنوان البحث</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={(e) => e.target.classList.add("active")}
            onBlur={(e) => e.target.classList.remove("active")}
          />
          <Label>   معلم/ة المادة </Label>
          <Input
            type="text"
            value={supervisor}
            onChange={(e) => setSupervisor(e.target.value)}
            onFocus={(e) => e.target.classList.add("active")}
            onBlur={(e) => e.target.classList.remove("active")}
          />
           <Label> تفاصيل اضافية </Label>
          <Input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onFocus={(e) => e.target.classList.add("active")}
            onBlur={(e) => e.target.classList.remove("active")}
          />

          <Label>  المادة</Label>
          <Select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <Option value="">اختر اسم المادة </Option>
            {subjects?.map((subject, index) => (
              <Option key={index} value={subject.id}>
                {subject.name}
              </Option>
            ))}
          </Select>

          <Button type="submit">إضافة</Button>
        </Form>
      </FormContainer>
    </Box>
    }
    
    </>
  );
};

export default AddResearch;
