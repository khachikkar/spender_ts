import Main from "./pages/main";
import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Cabinet, {Store} from "./pages/cabinet";

import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {fetchUserProfileInfo} from "./state-management/slices/userProfile";
import {AppDispatch} from "./state-management/store/store.ts";
import {ROUTE_PATH_NAMES} from "./utils/constants/constants.ts";



function App() {

    const {userInfo:{isAuth}} = useSelector((store: Store) =>store.userProfile)
    const dispatch = useDispatch<AppDispatch>()
    console.log(isAuth, "isAuth")

    useEffect(() => {
        dispatch(fetchUserProfileInfo())
    }, []);


    return (
      <div>
          <RouterProvider router={
              createBrowserRouter(
                  createRoutesFromElements(
                      <Route path={ROUTE_PATH_NAMES.MAIN} element={<Main />}>
                        <Route path={ROUTE_PATH_NAMES.LOGIN} element={ isAuth ?  <Cabinet /> : <Login/>} />
                        <Route path={ROUTE_PATH_NAMES.REGISTER} element={isAuth ?  <Cabinet /> : <Register /> } />
                        <Route path={ROUTE_PATH_NAMES.CABINET} element={isAuth ? <Cabinet /> : <Login/> }/>
                      </Route>
                  )
              )
          } />

      </div>
  )
}

export default App
