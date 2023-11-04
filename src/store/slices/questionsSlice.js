import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const addQuestions = createAsyncThunk(
  "questions/addQuestions", 
  async (values) => {
    const token = JSON.parse(sessionStorage.getItem('userData')).token;
    try {
      const response = await axios.post(
        "https://app.baetiy.com/dashboard/api/addQuestion" ,{
          questions:JSON.stringify(values)
        },{ headers: {"Authorization" : token ,'Content-Type': 'application/json'}}
      );
      return response.data ;
    } catch (error) {
      console.error(error);
    }
});

export const addImageQuestion = createAsyncThunk(
  "questions/addImageQuestion", 
  async (values) => {
    const token = JSON.parse(sessionStorage.getItem('userData')).token;
    try {
      const response = await axios.post(
        "https://app.baetiy.com/dashboard/api/addQuestion" ,
          values
         ,{ headers: {"Authorization" : token , "Content-Type": "multipart/form-data",}}
      );
      return response.data ;
    } catch (error) {
      console.error(error);
    }
});


export const getQuestions = createAsyncThunk(
  "questions/getQuestions", 
  async () => {
    const token = JSON.parse(sessionStorage.getItem('userData')).token;
    try {
      const response = await axios.get(
        "https://app.baetiy.com/dashboard/api/getQuestionsStudent?page=1&limit=500" ,
        { headers: {"Authorization" : token , }}
      );
      return response.data ;
    } catch (error) {
      console.error(error);
    }
});
export const deleteQuestion = createAsyncThunk(
  "questions/deleteQuestion", 
  async (Id) => {
    const token = JSON.parse(sessionStorage.getItem('userData')).token;
    try {
      const response = await axios.get(
        `https://app.baetiy.com/dashboard/api/deleteQuestion?question_id=${Id}` ,{ headers: {"Authorization" : token}}
      );
      return response.data ;
    } catch (error) {
      console.error(error);
    }
});
const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    questions: [],
    addImageResponse:{} , 
    isQuestionsAdded : {} , 
    isQuestionDeleted : {} , 
    questionsLoading: false,
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(addQuestions.fulfilled, (state, action) => {
       state.isQuestionsAdded =action.payload
      })

      .addCase(getQuestions.fulfilled, (state, action) => {
        state.questions = action.payload.data.questions;
        state.questionsLoading = false;
      })
      .addCase(getQuestions.pending, (state, action) => {
        state.questionsLoading = true;
      })
      .addCase(getQuestions.rejected, (state, action) => {
        state.questionsLoading = false;
      })

      .addCase(addImageQuestion.fulfilled, (state, action) => {
        state.addImageResponse = action.payload;
      })
     
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.isQuestionDeleted = action.payload;
      })
     
  }
});



export default questionsSlice.reducer;