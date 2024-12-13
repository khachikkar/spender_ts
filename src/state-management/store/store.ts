import {configureStore} from "@reduxjs/toolkit";
import userProfileReducer from "../slices/userProfile"
// import financeData from "../slices/financeData";



export const store = configureStore({
    reducer:{
        userProfile: userProfileReducer,
        // financeData: financeData,
    }
})

export type AppDispatch = typeof store.dispatch;