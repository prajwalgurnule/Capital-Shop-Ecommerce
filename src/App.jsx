import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routers/router";
import { createContext, useState, useEffect } from "react";

const router = createBrowserRouter(routes);

export const LoginContext = createContext();
function App() {
    const [isLogin, setIsLogin] = useState(() => {
        const storedAuth = localStorage.getItem('auth');
        return storedAuth ? JSON.parse(storedAuth).isLogin : false;
    });
    const [isAdmin, setIsAdmin] = useState(() => {
        const storedAuth = localStorage.getItem('auth');
        return storedAuth ? JSON.parse(storedAuth).isAdmin : false;
    });

    useEffect(() => {
        localStorage.setItem('auth', JSON.stringify({ isLogin, isAdmin }));
    }, [isLogin, isAdmin]);

    return (
        <LoginContext.Provider
            value={{
                isLogin,
                setIsLogin,
                isAdmin,
                setIsAdmin,
            }}
        >
            <RouterProvider router={router} />
        </LoginContext.Provider>
    );
}
export default App;
