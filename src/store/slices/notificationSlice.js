import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getNotifications = createAsyncThunk(
  "notification/getNotifications", 
  async () => {
    const token = JSON.parse(sessionStorage.getItem('userData')).token;
    try {
      const response = await axios.get(
        "https://app.baetiy.com/dashboard/api/getNotifications" , 
        { headers: {"Authorization" : token} }
      );
      return response.data ;
    } catch (error) {
      console.error(error);
    }
});

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notifications: {},
    notificationLoading: false,
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.notificationLoading = false;
      })
      .addCase(getNotifications.pending, (state, action) => {
        state.notificationLoading = true;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.notificationLoading = false;
      })
     
  }
});



export default notificationSlice.reducer;