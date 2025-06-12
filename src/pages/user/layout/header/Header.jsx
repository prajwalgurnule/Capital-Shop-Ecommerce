import { useContext, useEffect, useState, useRef } from 'react';
import { IoIosHeart, IoIosLogOut } from "react-icons/io";
import { LuUser2 } from "react-icons/lu";
import { SlBasket } from "react-icons/sl";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Link, useLocation } from 'react-router-dom';
import { LoginContext } from '../../../../App';
import logo from "../../../../images/logo.png";
import { getBasket, getWishlist } from '../../../../utils/storage';
import Tooltip from '../../components/Tooltip';
import styles from "./Header.module.css";

function Header() {
    const { isLogin, setIsLogin, isAdmin, setIsAdmin } = useContext(LoginContext); 
    const [basketCount, setBasketCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [isPagesOpen, setIsPagesOpen] = useState(false);
    const pagesRef = useRef(null);
    const location = useLocation();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pagesRef.current && !pagesRef.current.contains(event.target)) {
                setIsPagesOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const updateCounts = () => {
        if (isLogin) {
            const basketItems = getBasket();
            const wishlistItems = getWishlist();
            
            const totalBasketItems = basketItems.reduce((sum, item) => sum + (item.count || 1), 0);
            setBasketCount(totalBasketItems);
            setWishlistCount(wishlistItems.length);
        } else {
            setBasketCount(0);
            setWishlistCount(0);
        }
    };

    useEffect(() => {
        updateCounts();
        const handleCountChange = () => updateCounts();
        window.addEventListener('countChanged', handleCountChange);
        return () => window.removeEventListener('countChanged', handleCountChange);
    }, [isLogin]);

    const handleLogout = () => {
        setIsLogin(false);
        setBasketCount(0);
        setWishlistCount(0);
    }

    const isActivePath = (path) => {
        return location.pathname === path;
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Link to='/'><img src={logo} alt="" /></Link>
                </div>
                <div className={styles.middle}>
                    <ul className={styles.header}>
                        <li className={styles.headerItem}>  
                            <Link to="/" className={`${styles.headerLink} ${isActivePath('/') ? styles.activeLink : ''}`}>Home</Link>
                        </li>
                        <li className={styles.headerItem}>  
                            <Link to="/products" className={`${styles.headerLink} ${isActivePath('/products') ? styles.activeLink : ''}`}>All Products</Link>
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
                        <li className={styles.headerItem} ref={pagesRef}>
                            <button
                                className={`${styles.headerLink} ${isPagesOpen ? styles.activeLink : ''}`}
                                onClick={() => setIsPagesOpen(!isPagesOpen)}
                            >
                                Pages {isPagesOpen ? <FiChevronUp className={styles.chevron} /> : <FiChevronDown className={styles.chevron} />}
                            </button>
                            {isPagesOpen && (
                                <div className={styles.dropdownMenu}>
                                    <Link
                                        to="/about"
                                        className={`${styles.dropdownItem} ${isActivePath('/about') ? styles.activeDropdownItem : ''}`}
                                        onClick={() => setIsPagesOpen(false)}
                                    >
                                        About Us
                                    </Link>
                                    <Link
                                        to="/faq"
                                        className={`${styles.dropdownItem} ${isActivePath('/faq') ? styles.activeDropdownItem : ''}`}
                                        onClick={() => setIsPagesOpen(false)}
                                    >
                                        FAQ
                                    </Link>
                                    {!isLogin && (
                                        <>
                                            <Link
                                                to="/login"
                                                className={`${styles.dropdownItem} ${isActivePath('/login') ? styles.activeDropdownItem : ''}`}
                                                onClick={() => setIsPagesOpen(false)}
                                            >
                                                Login
                                            </Link>
                                            <Link
                                                to="/register"
                                                className={`${styles.dropdownItem} ${isActivePath('/register') ? styles.activeDropdownItem : ''}`}
                                                onClick={() => setIsPagesOpen(false)}
                                            >
                                                Register
                                            </Link>
                                        </>
                                    )}
                                    {isLogin && (
                                        <>
                                            <Link
                                                to="/profile"
                                                className={`${styles.dropdownItem} ${isActivePath('/profile') ? styles.activeDropdownItem : ''}`}
                                                onClick={() => setIsPagesOpen(false)}
                                            >
                                                My Profile
                                            </Link>
                                            <Link
                                                to="/orders"
                                                className={`${styles.dropdownItem} ${isActivePath('/orders') ? styles.activeDropdownItem : ''}`}
                                                onClick={() => setIsPagesOpen(false)}
                                            >
                                                My Orders
                                            </Link>
                                            <Link
                                                to="/basket"
                                                className={`${styles.dropdownItem} ${isActivePath('/basket') ? styles.activeDropdownItem : ''}`}
                                                onClick={() => setIsPagesOpen(false)}
                                            >
                                                Shopping Cart
                                            </Link>
                                            <Link
                                                to="/wishlist"
                                                className={`${styles.dropdownItem} ${isActivePath('/wishlist') ? styles.activeDropdownItem : ''}`}
                                                onClick={() => setIsPagesOpen(false)}
                                            >
                                                Wishlist
                                            </Link>
                                        </>
                                    )}
                                </div>
                            )}
                        </li>
                        <li className={styles.headerItem}>  
                            <Link to="/contact" className={`${styles.headerLink} ${isActivePath('/contact') ? styles.activeLink : ''}`}>Contact</Link>
                        </li>
                        <li className={styles.headerItem}>  
                            <Link to="/blog" className={`${styles.headerLink} ${isActivePath('/blog') ? styles.activeLink : ''}`}>Blog</Link>
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