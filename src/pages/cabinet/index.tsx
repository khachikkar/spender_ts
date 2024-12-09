// import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {UserProfileSlice} from "../../state-management/slices/userProfile";

export type Store = {
    userProfile: UserProfileSlice
}


const Cabinet = () =>{

    const {userInfo:{isAuth, data}} = useSelector((store: Store) =>store.userProfile)


    console.log(isAuth, data)

    return (
        <div>
            Cabinet App
        </div>
    )
}


export  default  Cabinet