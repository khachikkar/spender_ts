import {Outlet} from "react-router-dom";
import Myheader from "../../components/myheader";

const Main = ()=>{
    return(
        <div>
            <Myheader/>
            <Outlet />
        </div>
    )
}

export  default  Main