// import React, { useContext, useEffect, useState } from 'react'
// import styles from "./Header.module.css"
// import { Link } from 'react-router-dom'
// import logo from "../../../../images/logo.png"
// import { CiSearch } from "react-icons/ci";
// import { LuUser2 } from "react-icons/lu";
// import { SlBasket } from "react-icons/sl";
// import { LoginContext } from '../../../../App';
// import { IoIosHeart, IoIosLogOut } from "react-icons/io";
// import Tooltip from '../../components/Tooltip';
// import { getBasket, getWishlist } from '../../../../utils/storage';

// function Header() {
//     const {isLogin, setIsLogin} = useContext(LoginContext); 
//     const {isAdmin, setIsAdmin } = useContext(LoginContext);
//     const [basketCount, setBasketCount] = useState(0);
//     const [wishlistCount, setWishlistCount] = useState(0);
     
//     const updateCounts = () => {
//         const basketItems = getBasket();
//         const wishlistItems = getWishlist();
        
//         const totalBasketItems = basketItems.reduce((sum, item) => sum + (item.count || 1), 0);
//         setBasketCount(totalBasketItems);
//         setWishlistCount(wishlistItems.length);
//     };

//     useEffect(() => {
//         // Initial load
//         updateCounts();

//         // Set up custom event listener
//         const handleCountChange = () => {
//             updateCounts();
//         };

//         window.addEventListener('countChanged', handleCountChange);

//         // Cleanup
//         return () => {
//             window.removeEventListener('countChanged', handleCountChange);
//         };
//     }, []);

//     const handleLogin = () => {
//         setIsLogin(true)
//     }
//     const handleLogout = () => {
//         setIsLogin(false)
//     }

//     return (
//         <>
//             <div className={styles.container}>
//                 <div className={styles.logo}>
//                     <Link to='/'><img src={logo} alt="" /></Link>
//                 </div>
//                 <div className={styles.middle}>
//                     <ul className={styles.header}>
//                         <li className={styles.headerItem}>  
//                             <Link to="/" className={styles.headerLink}>Home</Link>
//                         </li>
//                         <li className={styles.headerItem}>  
//                             <Link to="/products" className={styles.headerLink}>Products</Link>
//                         </li>
//                         {isAdmin ? (
//                             <li className={styles.headerItem}>  
//                                 <Link to="/admin/dashboard" className={styles.headerLink}>Table</Link>
//                             </li>
//                         ): null}
//                     </ul>
//                 </div>
//                 <div className={styles.right}>
//                     <Tooltip TooltipText="Basket">
//                         <Link to="/basket" className={styles.Linkicon}>
//                             <div className={styles.iconWithBadge}>
//                                 <SlBasket className={styles.icon}/>
//                                 {basketCount > 0 && <span className={styles.badge}>{basketCount}</span>}
//                             </div>
//                         </Link>
//                     </Tooltip>
//                     <Tooltip TooltipText="Wishlist">
//                         <Link to="/wishlist" className={styles.Linkicon}>
//                             <div className={styles.iconWithBadge}>
//                                 <IoIosHeart className={styles.icon}/>
//                                 {wishlistCount > 0 && <span className={styles.badge}>{wishlistCount}</span>}
//                             </div>
//                         </Link>
//                     </Tooltip>
//                     <Link to={isLogin ? "/logout" : "login"} className={styles.Linkicon} >
//                         <Tooltip TooltipText={isLogin ? "Logout" : "Login" }>
//                             {isLogin ? (
//                                 <IoIosLogOut className={styles.icon}/>
//                             ) : <LuUser2 className={styles.icon}/>}
//                         </Tooltip>
//                     </Link>
//                 </div>
//             </div>
//             <div className={styles.discount}>
//                 Sale Up To 50% Biggest Discounts. Hurry! Limited Perriod Offer <Link className={styles.shop} to='/products'>Shop Now</Link>
//             </div>
//         </>
//     )
// }

// export default Header;


import React, { useContext, useEffect, useState } from 'react'
import styles from "./Header.module.css"
import { Link } from 'react-router-dom'
import logo from "../../../../images/logo.png"
import { CiSearch } from "react-icons/ci";
import { LuUser2 } from "react-icons/lu";
import { SlBasket } from "react-icons/sl";
import { LoginContext } from '../../../../App';
import { IoIosHeart, IoIosLogOut } from "react-icons/io";
import Tooltip from '../../components/Tooltip';
import { getBasket, getWishlist } from '../../../../utils/storage';

function Header() {
    const { isLogin, setIsLogin } = useContext(LoginContext); 
    const { isAdmin, setIsAdmin } = useContext(LoginContext);
    const [basketCount, setBasketCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);
     
    const updateCounts = () => {
        if (isLogin) {
            const basketItems = getBasket();
            const wishlistItems = getWishlist();
            
            const totalBasketItems = basketItems.reduce((sum, item) => sum + (item.count || 1), 0);
            setBasketCount(totalBasketItems);
            setWishlistCount(wishlistItems.length);
        } else {
            // Reset counts when user logs out
            setBasketCount(0);
            setWishlistCount(0);
        }
    };

    useEffect(() => {
        // Initial load
        updateCounts();

        // Set up custom event listener
        const handleCountChange = () => {
            updateCounts();
        };

        window.addEventListener('countChanged', handleCountChange);

        // Cleanup
        return () => {
            window.removeEventListener('countChanged', handleCountChange);
        };
    }, [isLogin]); // Add isLogin as dependency

    const handleLogout = () => {
        setIsLogin(false);
        // Clear counts on logout
        setBasketCount(0);
        setWishlistCount(0);
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Link to='/'><img src={logo} alt="" /></Link>
                </div>
                <div className={styles.middle}>
                    <ul className={styles.header}>
                        <li className={styles.headerItem}>  
                            <Link to="/" className={styles.headerLink}>Home</Link>
                        </li>
                        <li className={styles.headerItem}>  
                            <Link to="/products" className={styles.headerLink}>Products</Link>
                        </li>
                        <li className={styles.headerItem}>  
                            <Link to="/contact" className={styles.headerLink}>Contact</Link>
                        </li>
                         <li className={styles.headerItem}>  
                            <Link to="/blog" className={styles.headerLink}>Blog</Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.right}>
                    <Tooltip TooltipText={isLogin ? "Basket" : "Login to view basket"}>
                        <Link to={isLogin ? "/basket" : "/login"} className={styles.Linkicon}>
                            <div className={styles.iconWithBadge}>
                                <SlBasket className={styles.icon}/>
                                {isLogin && basketCount > 0 && <span className={styles.badge}>{basketCount}</span>}
                            </div>
                        </Link>
                    </Tooltip>
                    <Tooltip TooltipText={isLogin ? "Wishlist" : "Login to view wishlist"}>
                        <Link to={isLogin ? "/wishlist" : "/login"} className={styles.Linkicon}>
                            <div className={styles.iconWithBadge}>
                                <IoIosHeart className={styles.icon}/>
                                {isLogin && wishlistCount > 0 && <span className={styles.badge}>{wishlistCount}</span>}
                            </div>
                        </Link>
                    </Tooltip>
                    <Link 
                        to={isLogin ? "/logout" : "/login"} 
                        className={styles.Linkicon}
                        onClick={isLogin ? handleLogout : undefined}
                    >
                        <Tooltip TooltipText={isLogin ? "Logout" : "Login"}>
                            {isLogin ? (
                                <IoIosLogOut className={styles.icon}/>
                            ) : <LuUser2 className={styles.icon}/>}
                        </Tooltip>
                    </Link>
                </div>
            </div>
            <div className={styles.discount}>
                Sale Up To 50% Biggest Discounts. Hurry! Limited Period Offer <Link className={styles.shop} to='/products'>Shop Now</Link>
            </div>
        </>
    )
}

export default Header;