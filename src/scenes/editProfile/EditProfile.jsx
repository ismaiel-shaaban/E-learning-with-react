import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { Colors } from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { getLevels } from "../../store/slices/levelSlice";
import { profileData, updateProfile } from "../../store/slices/userSlice";
import Swal from "sweetalert2";
import  Title  from "../../components/Title";
import InputFile from "../../components/InputFile";
import LabelFile from "../../components/LabelFile";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';


const StyledLabel = styled(LabelFile)(({ theme }) => ({
  borderRadius : "50%" , 
  width : "130px" , 
  height : "130px"   , 
  fontSize: "17px",
}));


const FormContainer = styled("div")(({ theme }) => ({
  maxWidth: "1000px",
  margin: "0 auto",
  padding: "20px",
  border: "1px solid #e4e4e4",
  borderRadius: "5px",
  height : `calc(100%  - 60px) ` , 
  overflow: "auto",

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
}))


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

const options = [
  "رياضة",
  "عربي",
  "فيزياء",
  "كيمياء",
  "تاريخ",
];

const EditProfile = () => {
  const levels = useSelector((state) => state.levelsList.levels )
  const user = useSelector((state) => state.userData.dataOfProfile )  
  const ResponseUpdateProfile = useSelector((state) => state.userData.ResponseUpdateProfile )

  const [name, setName] = useState(user.name);
  const [nakeName, setNakeName] = useState(user.n_name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [selectedLevel, setSelectedLevel] = useState(user.level_id);
  const [levelObject , setLevelObject] = useState({}) ;
  const [done , setDone] = useState(false) ;

  const [selectedPicture, setSelectedPicture] = useState();

  const dataOfProfile = useSelector((state) => state.userData.dataOfProfile ) ;

  const dispatch = useDispatch();
  useEffect(() => {
    if(!user.id) {
      dispatch(getLevels()) ;
      dispatch(profileData()) ; 
    } else {
      setName(user.name);
      setNakeName(user.n_name);
      setEmail(user.email);
      setPhone(user.phone);
      setSelectedLevel(user.level_id);
    }
  }, [user] );

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedPicture(file);
    }
  };


  useEffect(() => {
      if(dataOfProfile.id && done) {
        const storedData = sessionStorage.getItem('userData');
        const data = JSON.parse(storedData);
        data.name = name ;
        data.n_name = nakeName ; 
        data.email = email ;
        data.phone = phone ;
        data.level_id = selectedLevel ;
        data.level = levelObject.name ; 
        data.image = dataOfProfile.image ;
        const updatedData = JSON.stringify(data);
        sessionStorage.setItem('userData', updatedData);
        Swal.fire({
          icon: 'success',
          title: 'تم تعديل البيانات بنجاح',
          showConfirmButton: false,
          timer: 1500
        })
        window.location.reload();
      }
     
  }, [dataOfProfile] );


  useEffect(() => {
    if(ResponseUpdateProfile.status == true) {
      dispatch(profileData())
      setDone(true)
    }
    else if (ResponseUpdateProfile.status == false)
    {
      Swal.fire({
        icon: 'error',
        text: ResponseUpdateProfile.message ,
        showConfirmButton: false,
        timer: 1500
      })
    }
  }, [ResponseUpdateProfile] );

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("n_name", nakeName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("level_id", selectedLevel);
    if (selectedPicture) formData.append("image", selectedPicture);
    dispatch(updateProfile(formData))
    setLevelObject(levels.find(level => level.id == selectedLevel))
  };

  return (
    <>
      <Title> تعديل الصفحة الشخصية </Title>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <Label> الاسم </Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={(e) => e.target.classList.add("active")}
            onBlur={(e) => e.target.classList.remove("active")}
          />
          <Label> الاسم المستعار </Label>
          <Input
            type="text"
            value={nakeName}
            onChange={(e) => setNakeName(e.target.value)}
            onFocus={(e) => e.target.classList.add("active")}
            onBlur={(e) => e.target.classList.remove("active")}
          />
          <Label> البريد الإلكتروني </Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={(e) => e.target.classList.add("active")}
            onBlur={(e) => e.target.classList.remove("active")}
          />
          <Label> الهاتف </Label>
          <Input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onFocus={(e) => e.target.classList.add("active")}
            onBlur={(e) => e.target.classList.remove("active")}
          />
          <Label> الصف </Label>
          <Select
            value = {selectedLevel}
            onChange={(e) => {
              setSelectedLevel(e.target.value);
            }}
          >
            {levels.map((level, index) => (
              <Option key={index} value={level.id}>
                {level.name}
              </Option>
            ))}
          </Select>
          <Label> الصورة </Label>
          <div style = {{textAlign :"center" }}>
              <InputFile
              id = "uploadPicture"
              type="file"
              accept="image/*"
              onChange={handlePictureChange}
            />
            <StyledLabel htmlFor="uploadPicture">
              <AddPhotoAlternateIcon sx= {{fontSize : "20px"}}/> 
              اختر صورة
            </StyledLabel>
          </div>
          <Button type="submit">حفظ</Button>
        </Form>
      </FormContainer>
      
    </>
  );
};

export default EditProfile;
