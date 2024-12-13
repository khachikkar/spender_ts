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

    // const {financeData} = useSelector((store: Store)=>store.financeData)


    const {userInfo:{data, isAuth}} = useSelector((store: Store) =>store.userProfile)
    const dispatch = useDispatch<AppDispatch>()



    const handleLogout = async () => {
        try {
            await signOut(auth)
            dispatch(setIsAuth(false))
        } catch (error) {
            console.log(error, 'signOut error')
        }
    }


// console.log(financeData, "fffdata in header")

    // Safely extract finance data
    const finData = data?.data;
    const moneys = finData?.other || {};


    const myOutcome  = Object.values(moneys).flat().reduce((acc, cur) => (acc as number) + (cur as number), 0);

    const myIncome = finData?.income || 0;
    //
    //
    //
    const balance = myIncome  - myOutcome


    // console.log(balance, "jj in header")




    return (
        <div className="mheader">
            <h2>Spender</h2>

            {
                data && isAuth ? <span> {data.name} {data.lastname }</span> : <></>
            }
            {
                isAuth ? <h4>Balance: {balance}</h4> : <></>
            }
            {

                isAuth ?  <Button onClick={handleLogout}>Log Out</Button> : <Link to="/login"> <Button >Log In</Button></Link>
            }


        </div>
    )
}

export default  Myheader