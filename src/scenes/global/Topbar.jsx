import React, { useState } from "react";
import {
  Box,
  IconButton,
  MenuItem,
  Popover,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Colors } from "../../theme";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/userSlice";
import { useEffect } from "react";

const UL = styled("ul")(({ theme }) => ({
  backgroundColor: Colors.main[6],
  margin: 0,
  padding: "5px 10px",
  width: "250px",
}));
const Li = styled("li")(({ theme }) => ({
  listStyle: "none",
  color: Colors.main[1],
  fontWeight: "bold",
  padding: "5px 10px",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#00a4a93d",
    borderRadius: "5px",
  },
}));

const Line = styled("div")(({ theme }) => ({
  width: "100%",
  height: "1px",
  backgroundColor: Colors.main[2],
  margin: "10px auto",
}));

const Topbar = ({
  phone,
  isCollapsed,
  selected,
  mobileOpen,
  setMobileOpen,
  setIsCollapsed,
  setSelected,
  anchorEl,
  setAnchorEl,
}) => {
  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const open = Boolean(anchorEl);
  const isAuth = useSelector((state) => state.userData.isAuth);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const token = JSON.parse(sessionStorage.getItem('userData')).token;
  useEffect(() => {

    if (!isAuth) {
      sessionStorage.clear()
      navigate("/student/login");
    }
  }, [isAuth,token]);

  const handleLogout = () => {
  
    dispatch(logout());
  };

  return (
    <>
      <Box
        display="flex"
        padding="10px"
        justifyContent="space-between"
        alignItems="center"
        backgroundColor={Colors.main[1]}
      >
        <MenuItem
          style={{
            // border: "1px solid green",
            // display: "flex",
            // justifyContent: "center",
            color: "#fff",
            width: "fit-content",
            height: "fit-content",
            padding: "0px",
            margin: "0px",
          }}
        >
          {!isCollapsed ? (
            <IconButton
              sx={{ margin: "0px", padding: "0px" }}
              onClick={() => {
                phone ? setMobileOpen(true) : setIsCollapsed(!isCollapsed);
              }}
            >
              <MenuOutlinedIcon
                sx={{
                  width: "35px",
                  height: "35px",
                  color: "#fff",
                  // border: "1px solid red",
                }}
              />
            </IconButton>
          ) : (
            <IconButton
              sx={{ margin: "0px", padding: "0px" }}
              onClick={() => {
                phone ? setMobileOpen(true) : setIsCollapsed(!isCollapsed);
              }}
            >
              <MenuOutlinedIcon
                sx={{
                  width: "35px",
                  height: "35px",
                  color: "#fff",
                  // border: "1px solid red",
                }}
              />
            </IconButton>
          )}
        </MenuItem>
        <IconButton sx={{ color: "#fff" }} onClick={handleIconClick}>
          <PersonOutlineIcon sx={{ width: "30px", height: "30px" }} />
        </IconButton>
      </Box>
      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <UL>
          <Link style={{ textDecoration: "none" }} to="/student/editProfile">
            <Li onClick={handleClose}>
              <EditOutlinedIcon sx={{ fontSize: "18px", marginLeft: "10px" }} />
              تعديل الملف الشخصي
            </Li>
          </Link>
          <Li onClick={handleLogout}>
            <LogoutOutlinedIcon sx={{ fontSize: "18px", marginLeft: "10px" }} />
            تسجيل الخروج
          </Li>
        </UL>
      </Popover>
    </>
  );
};

export default Topbar;