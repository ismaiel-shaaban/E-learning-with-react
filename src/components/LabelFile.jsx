import styled from "@emotion/styled";
import { Colors } from "../theme";

const LabelFile = styled("label")(({ theme }) => ({
    margin: "20px",
    display: "inline-block" , 
    textTransform: "uppercase",
    color: "#fff",
    background: Colors.main[1],
    textAlign: "center",
    width: "60%",
    padding: "40px 30px",
    fontSize: "30px",
    letterSpacing: "1.5px",
    userSelect: "none",
    cursor: "pointer",
    boxShadow: "0px 7px 10px rgba(0, 0, 0, 0.35)",
    borderRadius: "5px",
    transition: "all 0.3s ease-in-out",
    "&:active": {
        transform: "scale(0.9)",
    } , 
    "&:hover": {
      backgroundColor: Colors.main[2],
    } , 
    [theme.breakpoints.down("500")]: { 
      fontSize: "18px",
    }
  })) 

export default LabelFile ;