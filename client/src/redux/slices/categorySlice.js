import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    category:[]
}

const categorySlice = createSlice({
    name:'category',
    initialState,
    reducers:{
        categoryRequest(state, action){
            state.isLoading = true;

        },
        categorySuccess(state, action){
            state.isLoading = false;
            state.category = action.payload;
        },
        categoryuploadSuccess(state, action){
            state.isLoading = false;
            state.isUploaded = action.payload.success;
        },
        categoryFail(state, action){
            state.isLoading = false;
            state.category = null;
            state.error = action.payload
        },

        categorydeletesuccess(state, action){
            state.isLoading = false;
            state.isDeleted = action.payload.success;
        },
        categorydeletefail(state, action){
            state.isLoading = false;
            state.error = action.payload;
        },
        categoryrdeleteReset(state, action){
            state.isDeleted = false;
        },

        cleanErrors(state, action){
            state.error=null;
        },
       
    }
}) 

export const {categoryFail,categoryRequest,categorySuccess,categorydeletefail,categorydeletesuccess,categoryrdeleteReset,categoryuploadSuccess,cleanErrors} = categorySlice.actions;

export default categorySlice;