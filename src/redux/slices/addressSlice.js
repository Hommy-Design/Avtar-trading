import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    address:[]
}

const addressSlice = createSlice({
    name:'address',
    initialState,
    reducers:{
        addressRequest(state, action){
            state.isLoading = true;

        },
        addressSuccess(state, action){
            state.isLoading = false;
            state.address = action.payload;
        },
        addressuploadSuccess(state, action){
            state.isLoading = false;
            state.isUploaded = action.payload.success;
        },
        addressFail(state, action){
            state.isLoading = false;
            state.address = null;
            state.error = action.payload
        },

        addressdeletesuccess(state, action){
            state.isLoading = false;
            state.isDeleted = action.payload.success;
        },
        addressdeletefail(state, action){
            state.isLoading = false;
            state.error = action.payload;
        },
        addressrdeleteReset(state, action){
            state.isDeleted = false;
        },
        addressruploadReset(state, action){
            state.isUploaded = false;
        },

        cleanErrors(state, action){
            state.error=null;
        },
       
    }
}) 

export const {addressFail,addressRequest,addressSuccess,addressdeletefail,addressdeletesuccess,addressrdeleteReset,addressuploadSuccess,cleanErrors,addressruploadReset} = addressSlice.actions;

export default addressSlice;