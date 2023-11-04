import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import axios from "axios";


const userData = JSON.parse(sessionStorage.getItem('userData'));

export const userLogin = createAsyncThunk(
  "user/userLogin", 
  async (values) => {
    try {
      const response = await axios.post(
        "https://app.baetiy.com/dashboard/api/login" ,{
            phone:values.email,
            password:values.password
        }
      );
      return response.data ;
    } catch (error) {
      console.error(error);
    }
});

export const userRegister = createAsyncThunk(
  "user/userRegister", 
  async (values) => {
    try {
      const response = await axios.post(
        "https://app.baetiy.com/dashboard/api/register" ,{
          name:values.name,
          phone:values.phone,
          email:values.email,
          password:values.password,
          level_id:values.level_id,
          package_id:values.package_id , 
          gender : values.gender
        }
      );
      return response.data ;
    } catch (error) {
      console.error(error);
    }
});

export const sendOtp = createAsyncThunk(
  "user/sendOtp", 
  async (values) => {
    const token = JSON.parse(sessionStorage.getItem('registeData')).token;
    try {
      const response = await axios.post(
        "https://app.baetiy.com/dashboard/api/verifyOtp" ,{
          otp:values.otp,
          order_id:values.orderId,
        },{ headers: {"Authorization" : token}}
      );
      return response.data ;
    } catch (error) {
      console.error(error);
    }
});



export const logout = createAsyncThunk(
  "user/logout", 
  async () => {
    const token = JSON.parse(sessionStorage.getItem('userData')).token;
    try {
      const response = await axios.post(
        "https://app.baetiy.com/dashboard/api/logout" ,{ headers: {"Authorization" : token}}
      );
      return response.data ;
    } catch (error) {
      console.error(error);
    }
});

export const profileData = createAsyncThunk(
  "user/profileData", 
  async (values) => {
    const token = JSON.parse(sessionStorage.getItem('userData')).token;
    try {
      const response = await axios.get(
        "https://app.baetiy.com/dashboard/api/getProfileData" ,
        { headers: {"Authorization" : token}}
      );
      return response.data.data.user ;
    } catch (error) {
      console.error(error);
    }
});

export const updateProfile = createAsyncThunk(
  "user/updateProfile", 
  async (values) => {
    const token = JSON.parse(sessionStorage.getItem('userData')).token;
    try {
      const response = await axios.post(
        "https://app.baetiy.com/dashboard/api/updateProfile" ,
          values
        ,
        { headers: {"Authorization" : token}}
      );
      return response.data ;
    } catch (error) {
      console.error(error);
    }
});


const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: {},
    registerData:{},
    loginValidation:{},
    registerResponse : {}, 
    isAuth: userData ? true : false ,
    isRegisterSuccess:false,
    isOtpSuccess:false , 
    dataOfProfile : {} ,
    ResponseUpdateProfile : {} ,
    profileLoading : false ,
  },
  extraReducers: (builder) => {
    builder

      .addCase(userLogin.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.loginValidation = action.payload;
        state.isAuth = action.payload.status
        
      })

      .addCase(userRegister.fulfilled, (state, action) => {
        state.registerData = action.payload;
        state.isRegisterSuccess = action.payload.status
        state.registerResponse = action.payload
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.isOtpSuccess = action.payload.status
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isAuth = false ; 
      })
      .addCase(profileData.fulfilled, (state, action) => {
        state.dataOfProfile = action.payload ; 
        state.profileLoading = false; 
      })
      .addCase(profileData.pending, (state, action) => {
        state.profileLoading = true; 
      })
      .addCase(profileData.rejected, (state, action) => {
        state.profileLoading = false; 
      })
      
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.ResponseUpdateProfile = action.payload; 
      })
  }
});



export default userSlice.reducer;