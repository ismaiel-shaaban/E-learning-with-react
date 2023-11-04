import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const groupChatGet = createAsyncThunk(
  "chat/groupChatGet", 
  async (values) => {
    const token = JSON.parse(sessionStorage.getItem('userData')).token;
    try {
      const response = await axios.get(
        `https://app.baetiy.com/dashboard/api/groupChat?group_id=${values.group_id}&limit=10&page=${values.page}`, 
        { headers: {"Authorization" : token}}
      );
      return response.data ;
    } catch (error) {
      console.error(error);
    }
});

export const groupChatSend = createAsyncThunk(
    "chat/groupChatSend", 
    async (values) => {
      const token = JSON.parse(sessionStorage.getItem('userData')).token;
      try {
        const response = await axios.post(
          "https://app.baetiy.com/dashboard/api/groupChat_sendMessage" ,
          values
          ,
          { headers: {"Authorization" : token}}
        );
        return response.data ;
      } catch (error) {
        console.error(error);
      }
  });

  export const StudentChatGet = createAsyncThunk(
    "chat/StudentChatGet", 
    async (values) => {
      const token = JSON.parse(sessionStorage.getItem('userData')).token;
      try {
        const response = await axios.get(
          `https://app.baetiy.com/dashboard/api/chat?limit=10&page=${values.page}`, 
          { headers: {"Authorization" : token}}
        );
        return response.data ;
      } catch (error) {
        console.error(error);
      }
  });
  
  export const StudentChatSend = createAsyncThunk(
      "chat/StudentChatSend", 
      async (values) => {
        const token = JSON.parse(sessionStorage.getItem('userData')).token;
        try {
          const response = await axios.post(
            "https://app.baetiy.com/dashboard/api/sendChat" ,
              values
            ,
            { headers: {"Authorization" : token}}
          );
          return response.data ;
        } catch (error) {
          console.error(error);
        }
    });
    export const technicalChatGet = createAsyncThunk(
      "chat/technicalChatGet",
      async (values) => {
        const token = JSON.parse(sessionStorage.getItem('userData')).token;
        try {
          const response = await axios.get(
            `https://app.baetiy.com/dashboard/api/technical_support?limit=10&page=${values.page}`, 
            { headers: {"Authorization" : token}}
          );
          return response.data ;
        } catch (error) {
          console.error(error);
        }
    });
    
    export const technicalChatSend = createAsyncThunk(
        "chat/technicalChatSend",
        async (values) => {
          const token = JSON.parse(sessionStorage.getItem('userData')).token;
          try {
            const response = await axios.post(
              "https://app.baetiy.com/dashboard/api/technical_support_sendMessage" ,
              values
              ,
              { headers: {"Authorization" : token}}
            );
            return response.data ;
          } catch (error) {
            console.error(error);
          }
      });

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    groupChatGetResponse : {} ,
    groupChatSendResponse : {} ,
    groupChatPages:1,
    studentChatGetResponse : {} ,
    studentChatSendResponse : {} ,
    studentChatPages:1 ,
    technicalChatGetResponse : {} ,
    technicalChatSendResponse : {} ,
    technicalChatPages:1,

  },
  extraReducers: (builder) => {
    builder

      .addCase(groupChatGet.fulfilled, (state, action) => {
        state.groupChatGetResponse = action.payload;
        state.groupChatPages +=1
      })
      .addCase(groupChatSend.fulfilled, (state, action) => {
        state.groupChatSendResponse = action.payload;
      })

      .addCase(StudentChatGet.fulfilled, (state, action) => {
        state.studentChatGetResponse = action.payload;
        state.studentChatPages +=1
      })
      .addCase(StudentChatSend.fulfilled, (state, action) => {
        state.studentChatSendResponse = action.payload;
      })

      .addCase(technicalChatGet.fulfilled, (state, action) => {
        state.technicalChatGetResponse = action.payload;
        state.technicalChatPages +=1
      })
      .addCase(technicalChatSend.fulfilled, (state, action) => {
        state.technicalChatSendResponse = action.payload;
      })
      
     
  }
});



export default chatSlice.reducer;