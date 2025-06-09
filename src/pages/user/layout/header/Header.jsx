import { useContext, useEffect, useState } from 'react';
import { IoIosHeart, IoIosLogOut } from "react-icons/io";
import { LuUser2 } from "react-icons/lu";
import { SlBasket } from "react-icons/sl";
import { Link } from 'react-router-dom';
import { LoginContext } from '../../../../App';
import logo from "../../../../images/logo.png";
import { getBasket, getWishlist } from '../../../../utils/storage';
import Tooltip from '../../components/Tooltip';
import styles from "./Header.module.css";

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
                            <Link to="/products" className={styles.headerLink}>All Products</Link>
                        </li>
                        <li className={styles.headerItem}>  
                            <Link to="/products?category=men's clothing" className={styles.headerLink}>Men</Link>
                        </li>
                        <li className={styles.headerItem}>  
                            <Link to="/products?category=women's clothing" className={styles.headerLink}>Women</Link>
                        </li>
                       <li className={styles.headerItem}>
                            <div className={styles.badgeWrapper}>
                                <Link to="/products?category=baby's clothing" className={styles.headerLink}>
                                Baby Collection
                                </Link>
                                <span className={styles.newBadge}>New</span>
                            </div>
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