import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getpackages = createAsyncThunk(
  "packageList/getpackages", 
  async () => {
    try {
      const response = await axios.get(
        "https://app.baetiy.com/dashboard/api/packages"
      );
      return response.data.data.packages ;
    } catch (error) {
      console.error(error);
    }
});

const packageSlice = createSlice({
  name: "packageList",
  initialState: {
    packages: [],
  
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(getpackages.fulfilled, (state, action) => {
        state.packages = action.payload;
       
      })
     
  }
});



export default packageSlice.reducer;