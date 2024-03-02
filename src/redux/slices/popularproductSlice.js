import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    popularproduct:[]
}

const popularproductSlice = createSlice({
    name:'popularproduct',
    initialState,
    reducers:{
        popularproductRequest(state, action){
            state.isLoading = true;

        },
        popularproductSuccess(state, action){
            state.isLoading = false;
            state.popularproduct = action.payload;
        },
        popularproductcreatedSuccess(state, action){
            state.isLoading = false;
            state.isCreated = action.payload.success;
        },
        popularproductFail(state, action){
            state.isLoading = false;
            state.popularproduct = null;
            state.error = action.payload
        },

        popularproductdeletesuccess(state, action){
            state.isLoading = false;
            state.isDeleted = action.payload.success;
        },
        popularproductdeletefail(state, action){
            state.isLoading = false;
            state.error = action.payload;
        },
        popularproductdeleteReset(state, action){
            state.isDeleted = false;
        },

        cleanErrors(state, action){
            state.error=null;
        },
       
    }
}) 

export const {cleanErrors,popularproductFail,popularproductRequest,popularproductSuccess,popularproductcreatedSuccess,popularproductdeleteReset,popularproductdeletefail,popularproductdeletesuccess} = popularproductSlice.actions;

export default popularproductSlice;