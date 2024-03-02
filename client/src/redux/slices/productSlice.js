import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    product: [],
    productDetail:{}
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        productRequest(state, action) {
            state.isLoading = true;

        },
        productSuccess(state, action) {
            state.isLoading = false;
            state.product = action.payload;
        },
        productploadSuccess(state, action) {
            state.isLoading = false;
            state.isUploaded = action.payload.success;
        },
        productFail(state, action) {
            state.isLoading = false;
            state.product = null;
            state.error = action.payload
        },

        productdeletesuccess(state, action) {
            state.isLoading = false;
            state.isDeleted = action.payload.success;
        },
        productdeletefail(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        productdeleteReset(state, action) {
            state.isDeleted = false;
        },
        updateproductRequest(state, action) {

            state.isLoading = true;
        },
        updateproductSuccess(state, action) {
            state.isLoading = false;
            state.isUpdated = action.payload.success;


        }, updateproductFail(state, action) {
            state.isLoading = false;
            state.error = action.payload.success;

        },

        updateproductReset(state, action) {
            state.isUpdated = false;


        },
        adminproductRequest(state, action){
            state.isLoading = true;
         },
         adminproductSuccess(state, action){
            state.isLoading = false;
            state.product = action.payload; 
 
         },
         adminproductFail(state, action){
            state.isLoading = false;
            state.error= action.payload;
 
         },

        cleanErrors(state, action) {
            state.error = null;
        },
        productDetailRequest(state, action){
            state.isLoading = true;
         },
         productDetailSuccess(state, action){
            state.isLoading = false;
            state.productDetail = action.payload;
         
         },
         productDetailFail(state, action){
            state.isLoading = false;
            state.error= action.payload;
 
         }


    }
})

export const { cleanErrors, productFail, productRequest, productSuccess, productdeleteReset, productdeletefail, productdeletesuccess, productploadSuccess, updateproductFail, updateproductRequest, updateproductReset, updateproductSuccess,adminproductFail,adminproductRequest,adminproductSuccess ,productDetailFail,productDetailRequest, productDetailSuccess} = productSlice.actions;

export default productSlice;