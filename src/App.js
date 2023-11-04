import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Sidebar from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard/Dashboard";
import { Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import MyResearches from "./scenes/research/MyResearches";
import AddResearch from "./scenes/research/AddResearch";
import Login from "./scenes/Auth/Login";
import Register from "./scenes/Auth/Register";
import ForgetPassword from "./scenes/Auth/password/ForgetPassword";
import OTPCode from "./scenes/Auth/password/OTPCode";
import SetPassword from "./scenes/Auth/password/SetPassword";
import IframeSite from "./scenes/iframe/IframeSite";
import MyAnswers from "./scenes/Answers/MyAnswers";
import HomeWorks from "./scenes/homeWorks/HomeWorks";
import EditProfile from "./scenes/editProfile/EditProfile";
import Protected from "./protect/Protected";
import ProtectRegisterAndLogin from "./protect/ProtectRegisterAndLogin";
import AddProjects from "./scenes/projects/AddProjects";
import MyProjects from "./scenes/projects/MyProjects";
import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import Exams from "./scenes/exams/Exams";
import StudentsChat from "./scenes/chat/StudentsChat";
import ClassChat from "./scenes/chat/ClassChat";
import TechnicalSupport from "./scenes/chat/TechnicalSupport";
import  Payment  from "./scenes/payment/Payment";
import  PaymentResponse  from "./scenes/payment/PaymentResponse";
import ProtectPayment from "./protect/ProtectPayment";
import { useDispatch } from "react-redux";
import Notification from "./scenes/notification/Notification";
import Renewal from "./scenes/payment/Renewal";
function App() {
  const navigate = useNavigate()
  
  // const { pathname } = useLocation()

  //   if ( pathname == '/') {
  //     window.location.href='https://app.baetiy.com/'
  //   }

  return (
    <> 
      
      <div className="app">
        <Routes>
          <Route path="/" element={<div></div>} />
          <Route path="/student/login" element={ <ProtectRegisterAndLogin><Login /></ProtectRegisterAndLogin>} />
          <Route path="/student/register" element={<ProtectRegisterAndLogin><Register /> </ProtectRegisterAndLogin>} />
          <Route path="/student/forgetPassword" element={<ForgetPassword />} />
          <Route path="/student/OTP" element={<OTPCode />} />
          <Route path="/student/setPassword" element={<SetPassword />} />
          <Route path="/student/payment" element={<ProtectPayment><Payment /></ProtectPayment>} />
          <Route path="/student/renewal" element={<Renewal />} />
          <Route path="/student/paymentResponse" element={<PaymentResponse />} />
          <Route path="/*" element={<h1>عذرا لا يوجد صفحة هنا</h1>} />
          <Route
            path="/"
            element={
              <Protected>
                <LayoutsWithNavbar />
              </Protected>
            }
          >
            <Route
              path="student/dashboard"
              element={
                <Protected>
                  <Dashboard />
                </Protected>
              }
            />
            <Route
              path="student/notification"
              element={
                <Protected>
                  <Notification />
                </Protected>
              }
            />
            <Route
              path="student/editProfile"
              element={
                <Protected>
                  {" "}
                  <EditProfile />
                </Protected>
              }
            />
            <Route
              path="student/AddProjects"
              element={
                <Protected>
                  {" "}
                  <AddProjects />
                </Protected>
              }
            />
            <Route
              path="student/myProjects"
              element={
                <Protected>
                  {" "}
                  <MyProjects />
                </Protected>
              }
            />
            <Route
              path="student/exams"
              element={
                <Protected>
                  {" "}
                  <Exams />
                </Protected>
              }
            />
            <Route
              path="student/myResearches"
              element={
                <Protected>
                  {" "}
                  <MyResearches />{" "}
                </Protected>
              }
            />
            <Route
              path="student/addResearch"
              element={
                <Protected>
                  {" "}
                  <AddResearch />{" "}
                </Protected>
              }
            />
            <Route
              path="student/myAnswers"
              element={
                <Protected>
                  {" "}
                  <MyAnswers />{" "}
                </Protected>
              }
            />
            <Route
              path="student/homeWorks"
              element={
                <Protected>
                  {" "}
                  <HomeWorks />{" "}
                </Protected>
              }
            />
            <Route
              path="student/scienceHome"
              element={
                <Protected>
                  <IframeSite url="" title=" بيت العلم بدون اعلانات  "  bot= {false} />
                </Protected>
              }
            />
            <Route
              path="student/scienceHomeBot"
              element={
                <Protected>
                  <IframeSite url="" title="بوت بيت العلم" bot= {true}/>
                </Protected>
              }
            />
            <Route
              path="student/sciencePlatform"
              element={
                <Protected>
                  {" "}
                  <IframeSite
                    url="https://www.el3elm.com/"
                    title="منصة العلم"
                    bot= {false}
                  />{" "}
                </Protected>
              }
            />
            <Route
              path="student/booksAnswers"
              element={
                <Protected>
                  <IframeSite
                    url="https://www.hululktaab.com/"
                    title="حلول الكتب"
                  />{" "}
                </Protected>
              }
            />
            <Route
              path="student/studentsChat"
              element={
                <Protected>
                  <StudentsChat/>
                </Protected>
              }
            />
            <Route
              path="student/classChat"
              element={
                <Protected>
                  <ClassChat/>
                </Protected>
              }
            />
            <Route
              path="student/technicalSupport"
              element={
                <Protected>
                  <TechnicalSupport/>
                </Protected>
              }
            />
            
          </Route>
          
        </Routes>
      </div>
      
    </>
  );
}

function LayoutsWithNavbar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const phone = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState(null);
  return (
    <>
      <Sidebar
        phone={phone}
        isCollapsed={isCollapsed}
        mobileOpen={mobileOpen}
        setIsCollapsed={setIsCollapsed}
        setMobileOpen={setMobileOpen}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />
      <main className="content" style={{ overflow: "hidden" , height : "100vh"}}>
        <Topbar
          phone={phone}
          isCollapsed={isCollapsed}
          mobileOpen={mobileOpen}
          setIsCollapsed={setIsCollapsed}
          setMobileOpen={setMobileOpen}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
        />
        <Box style={{ margin: "10px" , height : `calc(100vh - 90px)` }}>
          <Outlet />
        </Box>
      </main>
    </>
  );
}

export default App;