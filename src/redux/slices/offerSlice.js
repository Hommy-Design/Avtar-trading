import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    offer:[]
}

const offerSlice = createSlice({
    name:'offer',
    initialState,
    reducers:{
        offerRequest(state, action){
            state.isLoading = true;

        },
        offerSuccess(state, action){
            state.isLoading = false;
            state.offer = action.payload;
        },
        offeruploadSuccess(state, action){
            state.isLoading = false;
            state.isUploaded = action.payload.success;
        },
        offerFail(state, action){
            state.isLoading = false;
            state.offer = null;
            state.error = action.payload
        },

        offerdeletesuccess(state, action){
            state.isLoading = false;
            state.isDeleted = action.payload.success;
        },
        offerdeletefail(state, action){
            state.isLoading = false;
            state.error = action.payload;
        },
        offerdeleteReset(state, action){
            state.isDeleted = false;
        },
        offeruploadReset(state, action){
            state.isUploaded = false;
        },

        cleanErrors(state, action){
            state.error=null;
        },
       
    }
}) 

export const {cleanErrors,offerFail,offerRequest,offerSuccess,offerdeleteReset,offerdeletefail,offerdeletesuccess,offeruploadReset,offeruploadSuccess} = offerSlice.actions;

export default offerSlice;