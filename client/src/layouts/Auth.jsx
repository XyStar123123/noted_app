import {Route, Routes} from "react-router-dom";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";

const Auth = () =>{
    return (
        <>
            <div className="h-screen bg-white flex overflow-hidden">
                <Routes>
                    <Route path={'/'} element={<Login/>} />
                    <Route path={'/login'} element={<Login/>} />
                    <Route path={'/register'} element={<Register/>} />
                </Routes>
            </div>
        </>
    )
}

export default Auth;