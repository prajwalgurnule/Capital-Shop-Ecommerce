import Basket from "../pages/basket/Basket";
import Blog from "../pages/blog/Blog";
import Contact from "../pages/contact/Contact";
import Detail from "../pages/detail/Detail";
import Home from "../pages/home/Home"; 
import Login from "../pages/login/Login";
import Logout from "../pages/logout/Logout";
import Nopage from "../pages/nopage/Nopage";
import Products from "../pages/products/Products";
import Register from "../pages/register/Register";
import UserRoot from "../user/userRoot";
import Wishlist from "../pages/wishlist/Wishlist";
import ProtectedRoute from "./ProtectedRoute";
import About from "../pages/about/About";
import FAQ from "../pages/faq/FAQ";
import Orders from "../pages/orders/Orders";
import Profile from "../pages/profile/Profile";
import Privacy from "../pages/Privacy/Privacy";

export const routes = [
    {
        path: "/",
        element: <UserRoot />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/faq",
                element: <FAQ />
            },
            {
                path: "/privacy",
                element: <Privacy />
            },
            {
                path: "/products", 
                element: <Products />
            },
            {
                path: "/blog", 
                element: <Blog />
            },
            {
                path: "/detail/:id", 
                element: (
                    <ProtectedRoute>
                        <Detail />
                    </ProtectedRoute>
                )  
            },
            {
                path: "/wishlist",
                element: (
                    <ProtectedRoute>
                        <Wishlist />
                    </ProtectedRoute>
                )  
            },
            {
                path: "/basket",
                element: (
                    <ProtectedRoute>
                        <Basket />
                    </ProtectedRoute>
                )  
            },
            {
                path: "/orders",
                element: (
                    <ProtectedRoute>
                        <Orders />
                    </ProtectedRoute>
                )  
            },
            {
                path: "/profile",
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                )  
            },
        ]
    },
    {
        path: "/login",
        element: <Login />  
    },
    {
        path: "/logout",
        element: <Logout />  
    },
    {
        path: "/register",
        element: <Register />  
    },
    {
        path: "*",
        element: <Nopage />  
    },
];