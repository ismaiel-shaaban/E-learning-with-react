import styled from "@emotion/styled";
import { Colors } from "../theme";

const SubmitButton = styled("div")(({ theme }) => ({
  padding: "10px 30px",
  backgroundColor: Colors.main[2] ,
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: Colors.main[3],
  },
  transition: "background-color 0.3s",
  margin: "10px auto",
  textAlign: "center",
  maxWidth: "500px",
  fontWeight: "bold" ,
}));

export default SubmitButton ; 