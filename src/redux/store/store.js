import {configureStore} from "@reduxjs/toolkit"
import homeBannerSlice from "../slices/homeBannerSlice"
import userSlice from "../slices/userSlice"
import categorySlice from "../slices/categorySlice"
import productSlice from "../slices/productSlice"
import subcategorySlice from "../slices/subcategorySlice"
import subsubcategorySlice from "../slices/subsubcategorySlice"
import userloginSlice from "../slices/userlogin"
import addressSlice from "../slices/addressSlice"
import cartSlice from "../slices/cartSlice"
import deliverySlice from "../slices/deliverySlice"
import popularproductSlice from "../slices/popularproductSlice"
import offerSlice from "../slices/offerSlice"

 const store = configureStore({
    reducer:{
        banner:homeBannerSlice.reducer,
        user:userSlice.reducer,
        category:categorySlice.reducer,
        product:productSlice.reducer,
        subcategory:subcategorySlice.reducer,
        subsubcategory:subsubcategorySlice.reducer,
        userlogin:userloginSlice.reducer,
        address:addressSlice.reducer,
        cart:cartSlice.reducer,
        delivery:deliverySlice.reducer,
        popularproduct:popularproductSlice.reducer,
        offer:offerSlice.reducer

    }
})

export default store