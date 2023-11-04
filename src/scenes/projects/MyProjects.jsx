import styled from "@emotion/styled";
import { Colors } from "../../theme";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Box, CircularProgress, Modal } from "@mui/material";
import  Title  from "../../components/Title";
import { deleteProject, editProjecet, getProjects } from "../../store/slices/projectsSlice";
import Swal from "sweetalert2";
import { getSubjects } from "../../store/slices/subjectsSlice";
import { profileData } from "../../store/slices/userSlice";

const Container = styled("div")(({ theme }) => ({
  textAlign: "center",
  maxHeight: `calc(100%  - 60px) ` ,
  overflow: "auto",
}));

const GrantStyledTable = styled("table")(({ theme }) => ({
  margin: "auto",
  minWidth: "600px",
  width: "99%",
  border: "1px solid #e4e5e5",
  tbody: {
    "& tr:nth-of-type(even)": {
      backgroundColor: Colors.main[6],
    },
  },
}));

const GrantTableHead = styled("th")(({ theme }) => ({
  color: "#fff",
  backgroundColor: Colors.main[5],
  padding: "10px",
}));

const TableData = styled("td")(({ theme }) => ({
  borderLeft: "1px solid #e4e5e5",
  padding: "10px",
}));

const GrantButton = styled("div")(({ theme }) => ({
  textAlign: "center",
  color: Colors.main[5],
  border: `2px solid ${Colors.main[5]}`,
  borderRadius: "10px",
  margin: "auto",
  "&:hover": {
    backgroundColor: Colors.main[5],
    cursor: "pointer",
    color: "#fff",
  },
  transition: "all 0.3s ease-in-out",
  padding: "3px",
}));

const FailButton = styled("div")(({ theme }) => ({
  textAlign: "center",
  backgroundColor: "#aaaaaa4a",
  color: Colors.main[5],
  border: `2px solid ${Colors.main[5]}`,
  borderRadius: "10px",
  margin: "auto",
  padding: "3px",
}));
const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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


const MyProjects = () => {

  const projects = useSelector((state) => state.projectsData.projects ) ; 
  const loading = useSelector((state) => state.projectsData.loading ) ;
  const isProjectDeleted = useSelector((state) => state.projectsData.isProjectDeleted ) ;
  const isProjectEditedSuccess = useSelector((state) => state.projectsData.isProjectEditedSuccess ) ;
  const subjects = useSelector((state) => state.subjectsData.subjects ) ;
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const handleOpen = (researche) =>{
    setResearche(researche)
    setId(researche.id)
    setTitle(researche.name)
    setSupervisor(researche.teacher_name)
    setNotes(researche.notes)
    setSelectedSubject(researche.subjecet_id)
    setOpen(true);

  } 
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState("");
  const [id, setId] = useState();
  const [supervisor, setSupervisor] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [researche, setResearche] = useState({});



  useEffect (() => {
    dispatch(getProjects()) ; 
    dispatch(getSubjects()) 
    dispatch(profileData())
  },[])
  useEffect (() => {
    console.log(isProjectDeleted);
    if (isProjectDeleted.status) {
      Swal.fire({
        icon: 'success',
        title: isProjectDeleted.message,
        showConfirmButton: false,
        timer: 2000
      })
      setTimeout(() => {
        window.location.reload() ;
      }, 2300);
      
    }
  
    
  },[isProjectDeleted])


  useEffect (() => {
    if (isProjectEditedSuccess.status) {
      Swal.fire({
        icon: 'success',
        title: isProjectEditedSuccess.message,
        showConfirmButton: false,
        timer: 3000
      })
      setTimeout(() => {
        window.location.reload() ;
      }, 3000);
      
    }
  
    
  },[isProjectEditedSuccess])
  const pdfLink = (pdf) =>{
    window.open(pdf);
  }

  const handleSubmit = (e) => {
    handleClose()
    e.preventDefault();
    dispatch(editProjecet({name : title , teacher_name: supervisor, subjecet_id : selectedSubject,notes:notes, id})) ;
    
  };

  return (
    <>
     { loading ? <CircularProgress/> :
     (projects.length<=0) ? <Title>لا يوجد مشاريع</Title> :
    <Box>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormContainer>
              <Form onSubmit={handleSubmit} >
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
      </Modal>
    <Title> مشاريعي </Title>
    <Title className="responsive" style={{fontSize:'16px'}}>يرجي السحب لليمين لرؤية المزيد من التفاصيل  </Title>
      <Container>
        <GrantStyledTable>
          <thead>
            <tr>
            <GrantTableHead> الرقم</GrantTableHead>
              <GrantTableHead>عنوان المشروع</GrantTableHead>
              <GrantTableHead> المادة </GrantTableHead>
              <GrantTableHead>حالة المشروع</GrantTableHead>
              <GrantTableHead>اجراء</GrantTableHead>
              <GrantTableHead>تنزيل</GrantTableHead>
            </tr>
          </thead>
          <tbody>
            {projects.map((obj, i) => {
              return (
                <Fragment key={i}>
                  <tr>
                  <TableData>{i+1}</TableData>
                    <TableData>{obj.name}</TableData>
                    <TableData>{obj.subjecetName}</TableData>
                    <TableData>
                      {
                        obj.status==1 ? "جاهز" : "غير جاهز" 
                      }
                    </TableData>
                    <TableData style={{display:'flex'}}>
                      {
                           obj.status==1 ? 
                           <>
                           <GrantButton onClick={()=> dispatch(deleteProject(obj.id))  }  >حذف</GrantButton>  
                           <FailButton >تعديل</FailButton>  
                          </> 
                           
                        
                           :
                          <>
                           <GrantButton onClick={()=> dispatch(deleteProject(obj.id))  }  >حذف</GrantButton>  
                           <GrantButton  onClick={()=>handleOpen(obj)} >تعديل</GrantButton>  
                          </> 
                           
                      }
                       
                      
                    </TableData>
          
                    <TableData>
                      {
                        obj.status==1 ? 
                        <GrantButton onClick={()=>pdfLink(obj.pdf)}>تنزيل</GrantButton>  : 
                        <FailButton>تنزيل</FailButton> 
                      }
                    </TableData>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </GrantStyledTable>
      </Container>
    </Box>

     }
    
    </>
  );
};

export default MyProjects;
