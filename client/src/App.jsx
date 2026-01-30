import Main from "./layouts/Main.jsx";
import { useEffect, useState } from "react";
import Auth from "./layouts/Auth.jsx";

const App = () => {
    const [isLogin, setIsLogin] = useState(null); // Use null for "checking" state

    useEffect(() => {
        const token = localStorage.getItem("noted_token");
        if (token) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, []);

    // Show nothing (or a small loader) while checking for token
    if (isLogin === null) return null;

    return isLogin ? <Main /> : <Auth />;
}

export default App;