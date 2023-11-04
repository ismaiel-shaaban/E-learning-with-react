import React, { useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import {
  Box,
  Drawer,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Colors } from "../../theme";
import { useState } from "react";
import styled from "@emotion/styled";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import PlagiarismOutlinedIcon from "@mui/icons-material/PlagiarismOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import FactoryOutlinedIcon from "@mui/icons-material/FactoryOutlined";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useSelector } from "react-redux";
import Pusher from "pusher-js";

const Item = ({ title, to, icon, selected, setSelected, onClick }) => {
  const theme = useTheme();
  return (
    <MenuItem
      sx={{ display: "flex", alignItems: "center" }}
      active={selected === title}
      style={{
        color: Colors.grey[100],
      }}
      onClick={() => {
        setSelected(title);
        onClick && onClick();
      }}
      icon={icon}
    >
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: "bold",
          display: "flex",
          fontFamily: "Cairo",
        }}
      >
        {title}
      </Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Line = styled("div")(({ theme }) => ({
  width: "100%",
  height: "1px",
  backgroundColor: Colors.main[2],
  margin: "10px 0",
}));

const Sidebar = ({
  phone,
  isCollapsed,
  mobileOpen,
  setMobileOpen,
  setIsCollapsed,
  anchorEl,
  setAnchorEl,
}) => {
  const theme = useTheme();
  const [selected, setSelected] = useState("Dashboard");

  const sessionStorageData = JSON.parse(sessionStorage.getItem("userData"));
  const userData = sessionStorageData ? sessionStorageData : "default-token-sideBar";
  const [notifications, setNotifications] = useState(false);
  const [researchNotifications, setResearchNotifications] = useState(false);
  const [projectNotifications, setProjectNotifications] = useState(false);
  const [questionsNotifications, setQuestionsNotifications] = useState(false);
  const [teckSupportNotifications, setTeckSupportNotifications] = useState(false);

  const profilePicture = userData.image 

  useEffect(()=>{
 
    
    const pusher = new Pusher("cd26de9a95d470cf9731", {
      secret: "657f8ac95b260dd3605b",
      cluster: "us3" , 
      forceTLS: true,
      encrypted: true,
    });
    
    const channel = pusher.subscribe('chat_api');
    // channel.bind("NotificantionEvent", (data) => {
    //   console.log('NotificantionEvent');
    //   setNotifications(true)
    //   var sound = new  Audio("https://www.soundjay.com/misc/sounds/small-bell-ring-01a.mp3");  
    //   sound.play();
    // });
    
    channel.bind("MessageSent", (data) => {
      console.log('MessageSent' ,data);
      if( data.message.admin_id == null && data.message.user_id ===  userData.id){
        return null

      }else{

        setTeckSupportNotifications(true)
        var sound = new  Audio("https://www.soundjay.com/misc/sounds/small-bell-ring-01a.mp3");  
        sound.play();
      }
    });
    
    channel.bind("ResearchEvent", (data) => {
      console.log('ResearchEvent');
      setResearchNotifications(true)
      var sound = new  Audio("https://www.soundjay.com/misc/sounds/small-bell-ring-01a.mp3");  
      sound.play();
    });
    
    channel.bind("ProjecetEvent", (data) => {
      console.log('ProjecetEvent');
      setProjectNotifications(true)
      var sound = new  Audio("https://www.soundjay.com/misc/sounds/small-bell-ring-01a.mp3");  
      sound.play();
    });
    
    channel.bind("QuestionEvent", (data) => {
      console.log('QuestionEvent');
      setQuestionsNotifications(true)
      var sound = new  Audio("https://www.soundjay.com/misc/sounds/small-bell-ring-01a.mp3");  
      sound.play();
    });
    
    return () => {
      pusher.unsubscribe('chat_api');
      pusher.disconnect();
    };

}, [])

  const mobileItemClicked = () => {
    setMobileOpen(false);
  };
  return (
    <Box
      sx={{
        display: phone ? "none" : "block",
        height: "100vh",
        "& .pro-sidebar-inner": {
          paddingTop: "56px",
          background: `${Colors.main[1]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
          color: "#fff !important",
        },
        "& .pro-inner-item": {
          padding: "5px 20px  !important",
          color: "#fff !important",
        },
        "& .pro-inner-item:hover": {
          backgroundColor: "#00bfc6 !important",
          color: "#fff !important",
        },
        "& .pro-menu-item.active": {
          backgroundColor: `${Colors.main[2]} !important`,
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed || phone}>
        <Menu iconShape="square">
          {/* LOGO AND MENU Icon sx={{width: "20px" , height : "20px" }}*/}

          {!isCollapsed && !phone && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={ (profilePicture) ? profilePicture : userData.gender === "female" ? "../../student/assets/female.png" : "../../student/assets/male.png"}
                  style={{
                    borderRadius: "50%",
                    border: "2px solid #fff",
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color="#fff"
                  fontWeight="bold"
                  sx={{
                    m: "10px 0 0 0",
                    fontFamily: "Cairo",
                    fontSize: "25px",
                  }}
                >
                  {userData.name}
                </Typography>
                <Typography
                  variant="h5"
                  color={Colors.main[4]}
                  sx={{ fontFamily: "Cairo", padding: "10px" }}
                >
                  {userData.level}
                </Typography>
              </Box>
            </Box>
          )}
          <Box>
            <Item
              title="الصفحة الرئيسية"
              to="/student/dashboard"
              icon={<HomeOutlinedIcon sx={{ width: "20px", height: "20px" }} />}
              selected={selected}
              setSelected={setSelected}
            />
            <Line />
            <div style = {{position : "relative"}}>

              {researchNotifications && 
                  <NotificationsIcon sx={{ width: "20px", height: "20px" , color : Colors.main[4] ,  position: "absolute"  , top: "14px" , left: "50px" , zIndex:"5"}} />
                }
                 <Item
                  title="أبحاثي"
                  to="/student/myResearches"
                  icon={
                    <PlagiarismOutlinedIcon
                      sx={{ width: "20px", height: "20px" }}
                    />
                  }
                  selected={selected}
                  setSelected={setSelected}
                  onClick={() => setResearchNotifications(false)}
                />
            </div>
        
            <Line />
            <div style = {{position : "relative"}}>

              {projectNotifications && 
                  <NotificationsIcon sx={{ width: "20px", height: "20px" , color : Colors.main[4] ,  position: "absolute"  , top: "14px" , left: "50px" , zIndex:"5"}} />
                }
              <Item
                title="مشاريعي"
                to="/student/MyProjects"
                icon={
                  <FactoryOutlinedIcon sx={{ width: "20px", height: "20px" }} />
                }
                selected={selected}
                setSelected={setSelected}
                onClick={() => setProjectNotifications(false)}
                
              />
            </div>

            <Line />
            <div style = {{position : "relative"}}>

              {questionsNotifications && 
                  <NotificationsIcon sx={{ width: "20px", height: "20px" , color : Colors.main[4] ,  position: "absolute"  , top: "14px" , left: "50px" , zIndex:"5"}} />
                }
                  <Item
                    title="حلولي"
                    to="/student/myAnswers"
                    icon={<QuizOutlinedIcon sx={{ width: "20px", height: "20px" }} />}
                    selected={selected}
                    setSelected={setSelected}
                    onClick={() => setQuestionsNotifications(false)}
                  />
            </div>
        
            <Line />
            <div style = {{position : "relative"}}>
              {notifications && 
                <NotificationsIcon sx={{ width: "20px", height: "20px" , color : Colors.main[4] ,  position: "absolute"  , top: "14px" , left: "50px" , zIndex:"5"}} />
              }
              <Item
                sx={{ fontSize: "40px" }}
                title="تنبيهاتي"
                to="/student/notification"
                icon={
                  <CampaignOutlinedIcon sx={{ width: "20px", height: "20px" }} />
                  
                }
                selected={selected}
                setSelected={setSelected}
                onClick={() => setNotifications(false)}
              />
            </div>
            <Line />
            <div style = {{position : "relative"}}>
              {teckSupportNotifications && 
                <NotificationsIcon sx={{ width: "20px", height: "20px" , color : Colors.main[4] ,  position: "absolute"  , top: "14px" , left: "50px" , zIndex:"5"}} />
              }
                 <Item
                  sx={{ fontSize: "40px" }}
                  title="الدعم الفني"
                  to="/student/technicalSupport"
                  icon={
                    <BuildOutlinedIcon sx={{ width: "20px", height: "20px" }} />
                  }
                  selected={selected}
                  setSelected={setSelected}
                  onClick={() => setTeckSupportNotifications(false)}
                />
            </div>
        
          </Box>
        </Menu>
      </ProSidebar>
      {/* MOBILE SIDEBAR */}
      <Drawer
        anchor="right"
        variant="temporary"
        open={mobileOpen}
        onClose={() => {
          setMobileOpen(false);
        }}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            backgroundColor: `${Colors.main[1]} !important`,
          },
        }}
      >
        <Box
          sx={{
            height: "100vh",
            "& .pro-sidebar-inner": {
              background: `${Colors.main[1]} !important`,
            },
            "& .pro-icon-wrapper": {
              backgroundColor: "transparent !important",
              color: "#fff !important",
            },
            "& .pro-inner-item": {
              padding: "5px 20px  !important",
              color: "#fff !important",
            },
            "& .pro-inner-item:hover": {
              backgroundColor: "#00bfc6 !important",
              color: "#fff !important",
            },
            "& .pro-menu-item.active": {
              backgroundColor: `${Colors.main[2]} !important`,
            },
          }}
        >
          <ProSidebar
            style={{ backgroundColor: `${Colors.main[1]} !important` }}
          >
            <Menu
              iconShape="square"
              style={{ backgroundColor: `${Colors.main[1]} !important` }}
            >
              <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={ (profilePicture) ? profilePicture : userData.gender === "female" ? "../../student/assets/female.png" : "../../student/assets/male.png"}
                  style={{
                    borderRadius: "50%",
                    border: "2px solid #fff",
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color="#fff"
                  fontWeight="bold"
                  sx={{
                    m: "10px 0 0 0",
                    fontFamily: "Cairo",
                    fontSize: "25px",
                  }}
                >
                  {userData.name}
                </Typography>
                <Typography
                  variant="h5"
                  color={Colors.main[4]}
                  sx={{ fontFamily: "Cairo", padding: "10px" }}
                >
                  {userData.level}
                </Typography>
              </Box>
            </Box>
              <Box>
                <Item
                  onClick={mobileItemClicked}
                  title="الصفحة الرئيسية"
                  to="/student/dashboard"
                  icon={
                    <HomeOutlinedIcon sx={{ width: "20px", height: "20px" }} />
                  }
                  selected={selected}
                  setSelected={setSelected}
                />
                <Line />
                <Item
                  onClick={mobileItemClicked}
                  title="أبحاثي"
                  to="/student/myResearches"
                  icon={
                    <PlagiarismOutlinedIcon
                      sx={{ width: "20px", height: "20px" }}
                    />
                  }
                  selected={selected}
                  setSelected={setSelected}
                />
                <Line />
                <Item
                  onClick={mobileItemClicked}
                  title="مشاريعي"
                  to="/student/MyProjects"
                  icon={
                    <FactoryOutlinedIcon sx={{ width: "20px", height: "20px" }} />
                  }
                  selected={selected}
                  setSelected={setSelected}
                />

                <Line />
                <Item
                  onClick={mobileItemClicked}
                  title="حلولي"
                  to="/student/myAnswers"
                  icon={<QuizOutlinedIcon sx={{ width: "20px", height: "20px" }} />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Line />

                <div style = {{position : "relative"}}>
                  {notifications && 
                    <NotificationsIcon sx={{ width: "20px", height: "20px" , color : Colors.main[4] ,  position: "absolute"  , top: "14px" , left: "50px" , zIndex:"5"}} />
                  }
                  <Item
                    sx={{ fontSize: "40px" }}
                    title="تنبيهاتي"
                    to="/student/notification"
                    icon={
                      <CampaignOutlinedIcon sx={{ width: "20px", height: "20px" }} />
                      
                    }
                    onClick={() => setNotifications(false)}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </div>
                <Line />
                <Item
                  onClick={mobileItemClicked}
                  sx={{ fontSize: "40px" }}
                  title="الدعم الفني"
                  to="/student/technicalSupport"
                  icon={
                    <BuildOutlinedIcon sx={{ width: "20px", height: "20px" }} />
                  }
                  selected={selected}
                  setSelected={setSelected}
                />
              </Box>
            </Menu>
          </ProSidebar>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
