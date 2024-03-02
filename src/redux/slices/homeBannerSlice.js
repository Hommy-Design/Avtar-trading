import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    banner:[]
}

const homeBannerSlice = createSlice({
    name:'banner',
    initialState,
    reducers:{
        bannerRequest(state, action){
            state.isLoading = true;

        },
        bannerSuccess(state, action){
            state.isLoading = false;
            state.banner = action.payload;
        },
        banneruploadSuccess(state, action){
            state.isLoading = false;
            state.isUploaded = action.payload.success;
        },
        bannerFail(state, action){
            state.isLoading = false;
            state.banner = null;
            state.error = action.payload
        },

        bannerdeletesuccess(state, action){
            state.isLoading = false;
            state.isDeleted = action.payload.success;
        },
        bannerdeletefail(state, action){
            state.isLoading = false;
            state.error = action.payload;
        },
        bannerdeleteReset(state, action){
            state.isDeleted = false;
        },

        cleanErrors(state, action){
            state.error=null;
        },
       
    }
}) 

export const {bannerFail, bannerRequest, bannerSuccess,bannerdelete,bannerdeleteReset,bannerdeletefail,bannerdeletesuccess,banneruploadSuccess, cleanErrors} = homeBannerSlice.actions;

export default homeBannerSlice;