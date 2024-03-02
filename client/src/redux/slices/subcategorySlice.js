import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    subcategory:[]
}

const subcategorySlice = createSlice({
    name:'subcategory',
    initialState,
    reducers:{
        subcategoryRequest(state, action){
            state.isLoading = true;

        },
        subcategorySuccess(state, action){
            state.isLoading = false;
            state.subcategory = action.payload;
        },
        subcategoryuploadSuccess(state, action){
            state.isLoading = false;
            state.isUploaded = action.payload.success;
        },
        subcategoryFail(state, action){
            state.isLoading = false;
            state.subcategory = null;
            state.error = action.payload
        },

        subcategorydeletesuccess(state, action){
            state.isLoading = false;
            state.isDeleted = action.payload.success;
        },
        subcategorydeletefail(state, action){
            state.isLoading = false;
            state.error = action.payload;
        },
        subcategoryrdeleteReset(state, action){
            state.isDeleted = false;
        },

        cleanErrors(state, action){
            state.error=null;
        },
       
    }
}) 

export const {cleanErrors,subcategoryFail, subcategoryRequest,subcategorySuccess,subcategorydeletefail,subcategorydeletesuccess,subcategoryrdeleteReset,subcategoryuploadSuccess} = subcategorySlice.actions;

export default subcategorySlice;