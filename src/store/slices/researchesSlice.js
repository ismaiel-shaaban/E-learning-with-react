import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getResearches = createAsyncThunk(
  "researches/getResearches", 
  async () => {
    const token = JSON.parse(sessionStorage.getItem('userData')).token;
    try {
      const response = await axios.get(
        "https://app.baetiy.com/dashboard/api/getResearches?page=1&limit=20" , 
        { headers: {"Authorization" : token}}
      );
      return response.data.data.researchs ;
    } catch (error) {
      console.error(error);
    }
});

export const sendResearch = createAsyncThunk(
  "researches/sendResearch", 
  async (values) => {
    const token = JSON.parse(sessionStorage.getItem('userData')).token;
    try {
      const response = await axios.post(
        "https://app.baetiy.com/dashboard/api/addResearch" , {
          name:values.name,
          subjecet_id:values.subjecet_id,
          teacher_name: values.teacher_name,
          notes:values.notes
        },{ headers: {"Authorization" : token}}
      );
      return response.data ;
    } catch (error) {
      console.error(error);
    }
});
export const editResearch = createAsyncThunk(
  "researches/editResearch", 
  async (values) => {
    const token = JSON.parse(sessionStorage.getItem('userData')).token;
    try {
      const response = await axios.post(
        "https://app.baetiy.com/dashboard/api/editResearch" , {
          research_id:values.id,
          name:values.name,
          subjecet_id:values.subjecet_id,
          teacher_name: values.teacher_name,
          notes:values.notes
        },{ headers: {"Authorization" : token}}
      );
      return response.data ;
    } catch (error) {
      console.error(error);
    }
});
export const deleteResearch = createAsyncThunk(
  "researches/deleteResearch", 
  async (Id) => {
    console.log(Id);
    const token = JSON.parse(sessionStorage.getItem('userData')).token;
    try {
      const response = await axios.get(
        `https://app.baetiy.com/dashboard/api/deleteResearch?research_id=${Id}` ,{ headers: {"Authorization" : token}}
      );
      return response.data ;
    } catch (error) {
      console.error(error);
    }
});

const researchesSlice = createSlice({
  name: "researches",
  initialState: {
    researches: [],
    sendResearchResponse: {},
    loading : false,
    isResearchSuccess: false,
    isResearchFail: false ,
    isResearDeleted:{},
    isResearchEditSuccess:{},
  },
  extraReducers: (builder) => {
    builder

      .addCase(getResearches.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getResearches.fulfilled, (state, action) => {
        state.researches = action.payload;
        state.loading = false;
      })
      .addCase(getResearches.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(sendResearch.fulfilled, (state, action) => {
        state.isResearchSuccess = action.payload.status
        state.isResearchFail  = (state.isResearchSuccess)? false : true  ;
        state.sendResearchResponse = action.payload;
        state.sendLoading = false ;
      })
      .addCase(sendResearch.rejected, (state, action) => {
        state.isResearchSuccess = action.payload.status
        state.isResearchFail  = true  ;
        state.sendLoading = false ;
      })
      .addCase(editResearch.fulfilled, (state, action) => {
        state.isResearchEditSuccess = action.payload
    
      })
      .addCase(deleteResearch.fulfilled, (state, action) => {
        state.isResearDeleted = action.payload

      })
  }
});

export default researchesSlice.reducer;