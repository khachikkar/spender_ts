import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import {auth, db} from "../../../services/firebase/firebase.ts";
import {doc, getDoc} from "firebase/firestore";
import {FIRESTORE_PATH_NAMES} from "../../../utils/constants/constants.ts";



export type UserProfileSlice = {
    loading: boolean,
    userInfo: {
        isAuth: boolean,
        data: null | UserData
    },
    error: null | boolean
}

const initialState: UserProfileSlice = {
    loading: false,
    userInfo: {
        isAuth: false,
        data: null
    },
    error: null
}

type UserData = {
    name: string
    lastname: string
    email: string
    uid: string
    balance: number
    data: object // todo
}



export const fetchUserProfileInfo = createAsyncThunk<UserData |null, void>("data/userInfo", async()=>{
    return new Promise<UserData | null>((resolve, reject)=>{
        console.log("Starting fetchUserProfileInfo");
        onAuthStateChanged(auth, (user)=>{
            if(user){
                const {uid} = user
                const userRef = doc(db, FIRESTORE_PATH_NAMES.USERS, uid)
                getDoc(userRef)
                    .then((data)=>{
                        if(data.exists()){
                            resolve(data.data() as UserData)
                            console.log(data, "dattaa")
                        }else{
                            resolve(null)
                        }
                    })
            }else{
                reject("no such data")
            }
        })
    })
})







const userProfileSlice = createSlice({
    name: "userProfile",
    initialState,
    reducers:{
        setIsAuth: (state, action) => {
            state.userInfo.isAuth = action.payload
        }
    },
    extraReducers: (promise)=>{
        promise
            .addCase(fetchUserProfileInfo.pending, (state)=>{
                state.loading = true
            })
            .addCase(fetchUserProfileInfo.fulfilled, (state, action : PayloadAction<UserData | null> )=>{
                state.loading = false
                state.userInfo.data = action.payload
                state.userInfo.isAuth = true
            })
            .addCase(fetchUserProfileInfo.rejected, (state)=>{
                state.loading = false
                state.userInfo.isAuth = false
                state.userInfo.data = null
                state.error = true
            })
    }
})


export const {setIsAuth} = userProfileSlice.actions
export default userProfileSlice.reducer

