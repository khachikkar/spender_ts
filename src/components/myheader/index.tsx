import "./index.css"
import {useSelector} from "react-redux";
import {Store} from "../../pages/cabinet";
import {Button} from "antd";
import {setIsAuth} from "../../state-management/slices/userProfile";
import {signOut} from "firebase/auth"
import {auth} from "../../services/firebase/firebase.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../state-management/store/store.ts";
import {Link} from "react-router-dom";


const Myheader = () =>{

    const {userInfo:{data, isAuth}} = useSelector((store: Store) =>store.userProfile)
    const dispatch = useDispatch<AppDispatch>()
    console.log( data, "DDD")

    const handleLogout = async () => {
        try {
            await signOut(auth)
            dispatch(setIsAuth(false))
        } catch (error) {
            console.log(error, 'signOut error')
        }
    }


    return (
        <div className="mheader">
            <h1>Spender</h1>
            {
                data && isAuth ? <span> {data.name} {data.lastname }</span> : <></>
            }

            {
                isAuth ?  <Button onClick={handleLogout}>Log Out</Button> : <Link to="/login"> <Button >Log In</Button></Link>
            }

        </div>
    )
}

export default  Myheader