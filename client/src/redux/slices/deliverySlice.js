import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    delivery:[]
}

const deliverySlice = createSlice({
    name:'address',
    initialState,
    reducers:{
        deliveryRequest(state, action){
            state.isLoading = true;

        },
        deliverySuccess(state, action){
            state.isLoading = false;
            state.delivery = action.payload;
        },
        deliveryuploadSuccess(state, action){
            state.isLoading = false;
            state.isUploaded = action.payload.success;
        },
        deliveryFail(state, action){
            state.isLoading = false;
            state.delivery = null;
            state.error = action.payload
        },

        deliverydeletesuccess(state, action){
            state.isLoading = false;
            state.isDeleted = action.payload.success;
        },
        deliverydeletefail(state, action){
            state.isLoading = false;
            state.error = action.payload;
        },
        deliverydeleteReset(state, action){
            state.isDeleted = false;
        },
        deliveryuploadReset(state, action){
            state.isUploaded = false;
        },

        cleanErrors(state, action){
            state.error=null;
        },
       
    }
}) 

export const {cleanErrors,deliveryFail,deliveryRequest,deliverySuccess,deliverydeleteReset,deliverydeletefail,deliverydeletesuccess,deliveryuploadSuccess,deliveryuploadReset} = deliverySlice.actions;

export default deliverySlice;