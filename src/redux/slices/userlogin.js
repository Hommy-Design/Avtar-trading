import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userlogin: []
}

const userloginSlice = createSlice({
    name: 'userlogin',
    initialState,
    reducers: {
        userloginrequest(state, action) {
            state.isLoading = true;
            state.isuserAuthenticated = false;
        },
        userloginSuccess(state, action) {
            state.isLoading = false;
            state.user = action.payload;
            state.isuserAuthenticated = true;
        },
        userloginfail(state, action) {
            state.isLoading = false;
            state.isuserAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },
 
       

    }
})

export const {userloginSuccess,userloginfail,userloginrequest } = userloginSlice.actions;

export default userloginSlice;