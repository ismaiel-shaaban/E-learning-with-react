import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getExternals = createAsyncThunk(
  "externals/getExternals",
  async () => {
    try {
      const response = await axios.get(
        "https://app.baetiy.com/dashboard/api/extrenialLinks"
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
});

const externalsSlice = createSlice({
  name: "externals",
  initialState: {
    externals: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExternals.fulfilled, (state, action) => {
        state.externals = action.payload;
       
      })
     
  }
});



export default externalsSlice.reducer;