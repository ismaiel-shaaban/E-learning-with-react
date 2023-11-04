import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getLevels = createAsyncThunk(
  "levelList/getLevels", 
  async () => {
    try {
      const response = await axios.get(
        "https://app.baetiy.com/dashboard/api/levels"
      );
      return response.data.data.levels ;
    } catch (error) {
      console.error(error);
    }
});

const levelSlice = createSlice({
  name: "levelList",
  initialState: {
    levels: [],
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(getLevels.fulfilled, (state, action) => {
        state.levels = action.payload;
       
      })
     
  }
});



export default levelSlice.reducer;