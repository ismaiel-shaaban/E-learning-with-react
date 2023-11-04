import styled from '@emotion/styled';
import { Box, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react'
import Title from '../../components/Title';
import { Colors } from '../../theme';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications } from '../../store/slices/notificationSlice';
import { useState } from 'react';
import Pusher from 'pusher-js';
import { CircleNotifications } from '@mui/icons-material';

const BoxContainer = styled(Box)(({ theme }) => ({
    maxHeight : `calc(100%  - 60px)` ,
    overflow : "auto" ,
})); 

const NotifyContainer = styled(Box)(({ theme }) => ({
    padding : '20px' ,
    margin : '10px' ,
    backgroundColor : Colors.main[9] ,
    color : Colors.main[1] ,
    [theme.breakpoints.down('500')]: {
        margin : '0' ,
        padding : '10px' ,
    }
    
})); 

const Notification = () => {
    const [Notifications, setNotifications] = useState([]) ;
    const dispatch = useDispatch() ;
    const notifications  = useSelector(state => state.notificationData.notifications) ;
    const notificationLoading = useSelector(state => state.notificationData.notificationLoading) ;
    
    useEffect(()=> {
        if (notifications.status == true) {
            setNotifications(notifications.data.notifications)
        }
    }, [notifications])

    useEffect(()=>{
        dispatch(getNotifications())
        const pusher = new Pusher("cd26de9a95d470cf9731", {
          secret: "657f8ac95b260dd3605b",
          cluster: "us3" , 
          forceTLS: true,
          encrypted: true,
        });
    
        const channel = pusher.subscribe('chat_api');
        channel.bind("NotificantionEvent", (data) => {
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        });
    
        return () => {
            pusher.unsubscribe('chat_api');
            pusher.disconnect();
        };
    }, [])
    
  return (
    <>
    {notificationLoading ? <CircularProgress/> : 
        <div style={{height :"100%"}}>
            <Title>تنبيهاتي </Title>
            <BoxContainer>
                {Notifications.toReversed().map((item,index) => (
                    <NotifyContainer key={index}>
                        <h5 style={{fontWeight : "bold"}} >{item.subject}</h5>
                        <p>{item.message}</p>
                        <p style={{direction : "ltr" , fontSize : "12px" , fontWeight : "bold" }}>{item.created_at}</p>
                    </NotifyContainer>
                ))}
            </BoxContainer>
        </div>
    }
    </>
  )
}

export default Notification