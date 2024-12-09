import {Outlet} from "react-router-dom";
import Myheader from "../../components/myheader";
import "./index.css"
const Main = ()=>{
    return(
        <div className="maine">
            <Myheader/>
           <div className="mout">
               <Outlet/>
           </div>
        </div>
    )
}

export  default  Main