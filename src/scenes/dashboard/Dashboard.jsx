import styled from '@emotion/styled';
import { Box, colors } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Colors } from '../../theme';
import Title from '../../components/Title';
import SubmitButton from '../../components/SubmitButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Pusher from "pusher-js";

const Tab = styled("div")(({ theme }) => ({
  backgroundColor: Colors.main[6],
  margin: "20px",
  padding: "40px 20px",
  borderRadius: "10px",
  minWidth: "200px",
  transition: "all 0.3s ease-in-out", 
  "&:hover": {
    cursor: "pointer",
    backgroundColor: Colors.main[8],
  },
}));
const BoxContainer = styled("div")(({ theme }) => ({
  width: "100%",
  display : "flex",
  justifyContent : "space-around" ,
  maxHeight: "calc(100% - 100px)",
  overflow: "auto",
  alignItems : "center" ,
  textAlign : "center" ,
  fontWeight : "bold" ,
  flexWrap : "wrap" , 
}));
const LinkStyle = styled(Link)(({ theme }) => ({
  width: "40%",
  textDecoration: "none",
  fontSize: "20px",
  fontWeight: "bold",
  textAlign: "center",
  color: Colors.main[1],
  "&:hover": {
    color: Colors.main[2],
  },
  [theme.breakpoints.down("900")]: {
    width: "100%",
  },
  [theme.breakpoints.down("500")]: {
    fontSize: "15px",
  },
}));
const TITLE = styled(Title)(({ theme }) => ({
  fontSize: "18px",
  color : "red" ,
  display:'flex',
  flexWrap:'wrap',
  alignItems:'center',
  justifyContent:'center',
  [theme.breakpoints.down("900")]: {
    fontSize: "15px",
  },


}));
const Dashboard = () => {
  const navigate = useNavigate()
  const expire = JSON.parse(sessionStorage.getItem("userData")).expire;
  const [examNotifications, setExamNotifications] = useState(false);
  useEffect(() => {

      const pusher = new Pusher("cd26de9a95d470cf9731", {
        secret: "657f8ac95b260dd3605b",
        cluster: "us3" , 
        forceTLS: true,
        encrypted: true,
      });

      const channel = pusher.subscribe('chat_api');
      channel.bind("ExamEvenet", (data) => {
        console.log('ExamEvenet ');
        setExamNotifications(true)
        var sound = new  Audio("https://www.soundjay.com/misc/sounds/small-bell-ring-01a.mp3");  
        sound.play();
      });

      return () => {
      pusher.unsubscribe('chat_api');
      pusher.disconnect();
      };
  },[])
 
  const handleChangeBundle =()=>{
    console.log('lll');
    sessionStorage.setItem('token', JSON.stringify(JSON.parse(sessionStorage.getItem("userData")).token))
    sessionStorage.setItem('order_id', JSON.stringify(JSON.parse(sessionStorage.getItem("userData")).order_id))
    navigate('/student/renewal')
  }

  return (
    <>
      <TITLE>  تاريخ انتهاء الباقة  : {expire}   <SubmitButton onClick={handleChangeBundle}>اضغط لتجديد الباقة او تغييرها</SubmitButton></TITLE>
      <BoxContainer >
          <LinkStyle to = "/student/AddResearch"> <Tab> طلبات البحوث </Tab></LinkStyle>
          <LinkStyle to = "/student/AddProjects" ><Tab > طلبات المشاريع </Tab></LinkStyle>
          <LinkStyle to = "/student/scienceHomeBot"><Tab> بوت بيت العلم </Tab></LinkStyle>
          <LinkStyle to = "/student/homeWorks" ><Tab >حل الواجبات </Tab></LinkStyle>
          <LinkStyle to = "/student/exams"> 
              <Tab style = {{position : "relative"}}>
              {examNotifications && 
              <NotificationsIcon sx={{ width: "20px", height: "20px" , color : 'red',  position: "absolute"  , top: "-17px" , left: "50%" , zIndex:"5"}} />
              }
                الاختبارات المركزية
              </Tab>
          </LinkStyle>
          <LinkStyle to = "/student/scienceHome"><Tab > بيت العلم بدون اعلانات </Tab></LinkStyle>
          <LinkStyle to = "/student/StudentsChat"><Tab> شات الطلاب </Tab></LinkStyle>
          <LinkStyle to = "/student/classChat"><Tab> شات الصف </Tab></LinkStyle>
      </BoxContainer>
    </>
  )
}

export default Dashboard