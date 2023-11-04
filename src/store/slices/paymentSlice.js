import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPaymentMethods = createAsyncThunk(
  "payment/getPaymentMethods", 
  async () => {
    try {
      const response = await axios.get(
        "https://app.baetiy.com/dashboard/api/getPaymentMethods"
      );
      return response.data ;
    } catch (error) {
      console.error(error);
    }
});


export const postPayment = createAsyncThunk(
    "payment/postPayment", 
    async (values) => {
    const token = JSON.parse(localStorage.getItem('registerData')).token;
      try {
        const response = await axios.post(
          "https://app.baetiy.com/dashboard/api/payment" , 
          {
            order_id : values.order_id , 
            payment_method_id : values.payment_method_id ,
            currency:values.currency
          }, 
          { headers: {"Authorization" : token}} 
        );
        return response.data ;
      } catch (error) {
        console.error(error);
      }
  });

  


  export const paymentResponse = createAsyncThunk(
    "payment/paymentResponse", 
    async (values) => {
      console.log(values);
      if(values.research!=''){

        try {
          const response = await axios.get(
            `https://app.baetiy.com/dashboard/api/successPayment?status=${values.status}&order_id=${values.order_id}&invoice_id=${values.invoice_id}&research=${values.research}&projecets=${values.projects}` , 
          );
          return response.data ;
        } catch (error) {
          console.error(error);
        }
      }
      else{
        try {
          const response = await axios.get(
            `https://app.baetiy.com/dashboard/api/successPayment?status=${values.status}&order_id=${values.order_id}&invoice_id=${values.invoice_id}` , 
          );
          return response.data ;
        } catch (error) {
          console.error(error);
        }
      }
  });

  export const pricePackage = createAsyncThunk(
    "payment/pricePackage", 
    async () => {
      try {
        const response = await axios.get(
          "https://app.baetiy.com/dashboard/api/getPricePackages" 
        );
        return response.data ;
      } catch (error) {
        console.error(error);
      }
  });

  export const renewal = createAsyncThunk(
    "payment/renewal", 
    async (values) => {
    const token = JSON.parse(sessionStorage.getItem('userData')).token;
      try {
        const response = await axios.post(
          "https://app.baetiy.com/dashboard/api/renewal" , 
          {
            order_id : values.order_id , 
            payment_method_id : values.payment_method_id ,
            projecets : values.projecets,
            research : values.research,
            currency:values.currency
          }, 
          { headers: {"Authorization" : token}} 
        );
        return response.data ;
      } catch (error) {
        console.error(error);
      }
  });
  export const renewalBundle = createAsyncThunk(
    "payment/renewalBundle", 
    async (values) => {
    const token = JSON.parse(sessionStorage.getItem('token'));
      try {
        const response = await axios.post(
          "https://app.baetiy.com/dashboard/api/renewal" , 
          {
            order_id : values.order_id , 
            payment_method_id : values.payment_method_id ,
            currency:values.currency
          }, 
          { headers: {"Authorization" : token}} 
        );
        return response.data ;
      } catch (error) {
        console.error(error);
      }
  });
  export const changeBundle = createAsyncThunk(
    "payment/changeBundle", 
    async (values) => {
    const token = JSON.parse(sessionStorage.getItem('token'));
      try {
        const response = await axios.post(
          "https://app.baetiy.com/dashboard/api/renewal" , 
          {
            order_id : values.order_id , 
            package_id : values.pacakage , 
            payment_method_id : values.payment_method_id ,
            currency:values.currency
          }, 
          { headers: {"Authorization" : token}} 
        );
        return response.data ;
      } catch (error) {
        console.error(error);
      }
  });
const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    paymentMethods: {},
    postPaymentResponse: {},
    PaymentResponse: {},
    pricePackageResponse: {},
    renewalResponse: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPaymentMethods.fulfilled, (state, action) => {
        state.paymentMethods = action.payload;
      })
      .addCase(postPayment.fulfilled, (state, action) => {
        state.postPaymentResponse = action.payload;
      })
      .addCase(paymentResponse.fulfilled, (state, action) => {
        state.PaymentResponse = action.payload;
      })
      .addCase(pricePackage.fulfilled, (state, action) => {
        state.pricePackageResponse = action.payload;
      })
      .addCase(renewal.fulfilled, (state, action) => {
        state.renewalResponse = action.payload;
      })
      .addCase(renewalBundle.fulfilled, (state, action) => {
        state.renewalResponse = action.payload;
      })
      .addCase(changeBundle.fulfilled, (state, action) => {
        state.renewalResponse = action.payload;
      })
  }
});



export default paymentSlice.reducer;