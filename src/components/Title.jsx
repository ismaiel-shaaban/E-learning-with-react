import styled from "@emotion/styled";
import { Colors } from "../theme";

const Title = styled("h2")(({ theme }) => ({
    margin: '10px auto' ,
    padding : '10px' ,
    textAlign: 'center' ,
    backgroundColor: Colors.main[6] ,
    width: '100%' ,
    color: Colors.main[1] ,
    fontWeight: 'bold' ,
    "&.block": {
        color: "red" ,
    }
})); 
export default Title ;