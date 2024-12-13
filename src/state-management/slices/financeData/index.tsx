// import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
// import {onAuthStateChanged} from "firebase/auth";
// import {auth, db} from "../../../services/firebase/firebase.ts";
// import {doc, getDoc} from "firebase/firestore";
// import {FIRESTORE_PATH_NAMES} from "../../../utils/constants/constants.ts";
// import {UserData} from "../userProfile";
//
//
// type finData = {
//     income: number ,
//     other: {
//         car: [],
//         food: [],
//         shop: []
//     }
// }
//
//
//
//
// export type FinanceData = {
//         financeData: null | finData;
// }
//
// const initialState: FinanceData = {
//         financeData: {
//             income: 0,
//             other: {
//                 car:[],
//                 shop:[],
//                 food:[]
//             },
//         }
// }
//
//
//
//
// export const fetchFinanceDataInfo = createAsyncThunk<UserData |null, void>("data/finData", async()=>{
//     return new Promise<UserData | null>((resolve, reject)=>{
//         console.log("Starting fetchfinData");
//         onAuthStateChanged(auth, (user)=>{
//             if(user){
//                 const {uid} = user
//                 const userRef = doc(db, FIRESTORE_PATH_NAMES.USERS, uid)
//                 getDoc(userRef)
//                     .then((data)=>{
//                         if(data.exists()){
//
//                             const a = data.data()
//                             resolve(data.data() as UserData)
//                             console.log(a, "finance Datat ata")
//                         }else{
//                             resolve(null)
//                         }
//                     })
//             }else{
//                 reject("no such data")
//             }
//         })
//     })
// })
//
//
//
//
//
//
//
//
//
//
// const FinanceDataSlice = createSlice({
//     name: "finanialData",
//     initialState,
//     reducers: {},
//     extraReducers: (build)=>{
//         build.addCase(fetchFinanceDataInfo.pending,(state)=>{
//             console.log(state, "state in pending")
//         } )
//             .addCase(fetchFinanceDataInfo.fulfilled, (state, action)=>{
//                 console.log(action.payload, "Action payload")
//                 state.financeData = action.payload
//             })
//             .addCase(fetchFinanceDataInfo.rejected, (state, action)=>{
//                 console.log(state, action.payload, "error")
//             })
//     }
// })
//
//
//
// export default  FinanceDataSlice.reducer