import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    subsubcategory:[]
}

const subsubcategorySlice = createSlice({
    name:'subsubcategory',
    initialState,
    reducers:{
        subsubcategoryRequest(state, action){
            state.isLoading = true;

        },
        subsubcategorySuccess(state, action){
            state.isLoading = false;
            state.subsubcategory = action.payload;
        },
        subsubcategoryuploadSuccess(state, action){
            state.isLoading = false;
            state.isUploaded = action.payload.success;
        },
        subsubcategoryFail(state, action){
            state.isLoading = false;
            state.subsubcategory = null;
            state.error = action.payload
        },

        subsubcategorydeletesuccess(state, action){
            state.isLoading = false;
            state.isDeleted = action.payload.success;
        },
        subsubcategorydeletefail(state, action){
            state.isLoading = false;
            state.error = action.payload;
        },
        subsubcategoryrdeleteReset(state, action){
            state.isDeleted = false;
        },

        cleanErrors(state, action){
            state.error=null;
        },
       
    }
}) 

export const {cleanErrors,subsubcategoryFail,subsubcategoryRequest,subsubcategorySuccess, subsubcategorydeletefail,subsubcategorydeletesuccess,subsubcategoryrdeleteReset,subsubcategoryuploadSuccess} = subsubcategorySlice.actions;

export default subsubcategorySlice;