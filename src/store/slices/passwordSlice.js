import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const forgetPassword = createAsyncThunk(
  "password/forgetPassword", 
  async (values) => {
    try {
      const response = await axios.post(
        "https://app.baetiy.com/dashboard/api/forgetPassword" , 
        {
            phone : values.phone 
        }
      );
      return response.data ;
    } catch (error) {
      console.error(error);
    }
});


export const otpCode = createAsyncThunk(
  "password/OTPCode", 
  async (values) => {
    try {
      const response = await axios.post(
        "https://app.baetiy.com/dashboard/api/verifyOtpPassword" , 
        {
            phone : values.phone ,
            otp : values.otp ,
        }
      );
      return response.data ;
    } catch (error) {
      console.error(error);
    }
});

export const changePassword = createAsyncThunk(
  "password/changePassword", 
  async (values) => {
    try {
      const response = await axios.post(
        "https://app.baetiy.com/dashboard/api/changePassword" , 
        {
            phone : values.phone ,
            password : values.password ,
        }
      );
      return response.data ;
    } catch (error) {
      console.error(error);
    }
});




const passwordSlice = createSlice({
  name: "password",
  initialState: {
    forgetPasswordResponse: {},
    OTPCodeResponse : {} ,
    changePasswordResponse : {} ,
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.forgetPasswordResponse = action.payload;
      }) 
      .addCase(otpCode.fulfilled, (state, action) => {
        state.OTPCodeResponse = action.payload;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.changePasswordResponse = action.payload;
      })
  }
});



export default passwordSlice.reducer;