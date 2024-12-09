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
                      <Route path="/" element={<Main />}>
                        <Route path="/login" element={ isAuth ?  <Cabinet /> : <Login/>} />
                        <Route path="/register" element={isAuth ?  <Cabinet /> : <Register /> } />
                        <Route path="/cabinet" element={isAuth ? <Cabinet /> : <Login/> }/>
                      </Route>
                  )
              )
          } />

      </div>
  )
}

export default App
