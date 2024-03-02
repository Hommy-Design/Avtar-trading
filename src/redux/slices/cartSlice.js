import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    cart:[]
}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        cartRequest(state, action){
            state.isLoading = true;

        },
        cartSuccess(state, action){
            state.isLoading = false;
            state.cart = action.payload;
        },
        cartcreatedSuccess(state, action){
            state.isLoading = false;
            state.isCreated = action.payload.success;
        },
        cartFail(state, action){
            state.isLoading = false;
            state.cart = null;
            state.error = action.payload
        },

        cartdeletesuccess(state, action){
            state.isLoading = false;
            state.isDeleted = action.payload.success;
        },
        cartdeletefail(state, action){
            state.isLoading = false;
            state.error = action.payload;
        },
        cartrdeleteReset(state, action){
            state.isDeleted = false;
        },
       

        cleanErrors(state, action){
            state.error=null;
        },
       
    }
}) 

export const {cartFail,cartRequest,cartSuccess,cartdeletefail,cartdeletesuccess,cartrdeleteReset,cartcreatedSuccess,cleanErrors} = cartSlice.actions;

export default cartSlice;