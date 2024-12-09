import Main from "./pages/main";
import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Cabinet from "./pages/cabinet";
function App() {


    return (
      <div>
          <RouterProvider router={
              createBrowserRouter(
                  createRoutesFromElements(
                      <Route path="/" element={<Main />}>
                        <Route path="/login" element={<Login />}/>
                        <Route path="/register" element={<Register />} />
                        <Route path="/cabinet" element={<Cabinet />}/>
                      </Route>
                  )
              )
          } />

      </div>
  )
}

export default App
