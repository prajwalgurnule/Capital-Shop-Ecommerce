// import styles from "./Card.module.css";
// import { PiShoppingCartLight } from "react-icons/pi";
// import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { useEffect, useState } from "react";
// import { getBasket, setBasket, getWishlist, setWishlist } from '../../../utils/storage';

// function Card({ name, price, withoutDiscount, img, id, products }) {
//     const [isInWishlist, setIsInWishlist] = useState(false);
//     const [isInCart, setIsInCart] = useState(false);
//     const navigate = useNavigate(); 

//     useEffect(() => {
//         const wishlistArr = getWishlist();
//         const inWishlist = wishlistArr.some((elem) => elem.id == id);

//         const cartArr = getBasket();
//         const inCart = cartArr.some(elem => elem.id == id); 
        
//         setIsInWishlist(inWishlist);
//         setIsInCart(inCart); 
//     }, [id]); 
    
//     const handleWishlistClick = (e) => {
//         e.stopPropagation();
//         e.preventDefault(); 

//         let wishlistArr = getWishlist();
//         const product = products.find((elem) => elem.id == id);

//         if (isInWishlist) {
//             wishlistArr = wishlistArr.filter((item) => item.id !== id);
//         } else {
//             wishlistArr.push(product);
//         }

//         setWishlist(wishlistArr);
//         setIsInWishlist(!isInWishlist);
        
//         // Dispatch custom event to notify header of changes
//         const event = new Event('countChanged');
//         window.dispatchEvent(event);
//     };

//     const handleCartClick = (e) => {
//         e.preventDefault(); 
//         e.stopPropagation(); 
//         const cartArr = getBasket(); 
//         const product = products.find(elem => elem.id == id); 

//         const existingProduct = cartArr.find(elem => elem.id == id);
//         if (existingProduct) {
//             existingProduct.count = (existingProduct.count || 1) + 1;
//         } else {
//             cartArr.push({ ...product, count: 1 }); 
//         }
        
//         setBasket(cartArr); 
//         setIsInCart(true); 
        
//         // Dispatch custom event to notify header of changes
//         const event = new Event('countChanged');
//         window.dispatchEvent(event);
//     }

//     return (
//         <div className={styles.Card}>
//             <Link className={styles.DetailLink} onClick={() => navigate("/detail/" + id)}>
//                 <div className={styles.tools}>
//                     <div className={styles.tool} onClick={handleCartClick}>
//                         <PiShoppingCartLight />
//                     </div>
//                     <div className={styles.tool} onClick={handleWishlistClick}>
//                         {isInWishlist ? <IoIosHeart /> : <IoIosHeartEmpty />}
//                     </div>
//                 </div>
//                 <div className={styles.cardName}>
//                     <img src={img} alt="" className={styles.cardImage} />
//                 </div>
//                 <div className={styles.CardBody}>
//                     <a href="" className={styles.CardLink}>{name}</a>
//                     <div className={styles.price}>
//                         <div className={styles.with}>${price} </div>
//                         <div className={styles.without}>${withoutDiscount}</div>
//                     </div>
//                 </div>
//             </Link>
//         </div>
//     );
// }

// export default Card;

// -----

import styles from "./Card.module.css";
import { PiShoppingCartLight } from "react-icons/pi";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from "react";
import { getBasket, setBasket, getWishlist, setWishlist } from '../../../utils/storage';
import { LoginContext } from '../../../App';

function Card({ name, price, withoutDiscount, img, id, products }) {
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [isInCart, setIsInCart] = useState(false);
    const navigate = useNavigate(); 
    const { isLogin } = useContext(LoginContext);

    useEffect(() => {
        const wishlistArr = getWishlist();
        const inWishlist = wishlistArr.some((elem) => elem.id == id);
        const cartArr = getBasket();
        const inCart = cartArr.some(elem => elem.id == id); 
        
        setIsInWishlist(inWishlist);
        setIsInCart(inCart); 
    }, [id]); 
    
    const handleWishlistClick = (e) => {
        e.stopPropagation();
        e.preventDefault(); 

        if (!isLogin) {
            navigate('/login');
            return;
        }

        let wishlistArr = getWishlist();
        const product = products.find((elem) => elem.id == id);

        if (isInWishlist) {
            wishlistArr = wishlistArr.filter((item) => item.id !== id);
        } else {
            wishlistArr.push(product);
        }

        setWishlist(wishlistArr);
        setIsInWishlist(!isInWishlist);
        
        const event = new Event('countChanged');
        window.dispatchEvent(event);
    };

    const handleCartClick = (e) => {
        e.preventDefault(); 
        e.stopPropagation(); 

        if (!isLogin) {
            navigate('/login');
            return;
        }

        const cartArr = getBasket(); 
        const product = products.find(elem => elem.id == id); 

        const existingProduct = cartArr.find(elem => elem.id == id);
        if (existingProduct) {
            existingProduct.count = (existingProduct.count || 1) + 1;
        } else {
            cartArr.push({ ...product, count: 1 }); 
        }
        
        setBasket(cartArr); 
        setIsInCart(true); 
        
        const event = new Event('countChanged');
        window.dispatchEvent(event);
    }

    return (
        <div className={styles.Card}>
            <Link className={styles.DetailLink} onClick={(e) => {
                if (!isLogin) {
                    e.preventDefault();
                    navigate('/login');
                } else {
                    navigate("/detail/" + id);
                }
            }}>
                <div className={styles.tools}>
                    <div className={styles.tool} onClick={handleCartClick}>
                        <PiShoppingCartLight />
                    </div>
                    <div className={styles.tool} onClick={handleWishlistClick}>
                        {isInWishlist ? <IoIosHeart /> : <IoIosHeartEmpty />}
                    </div>
                </div>
                <div className={styles.cardName}>
                    <img src={img} alt="" className={styles.cardImage} />
                </div>
                <div className={styles.CardBody}>
                    <a href="" className={styles.CardLink}>{name}</a>
                    <div className={styles.price}>
                        <div className={styles.with}>${price} </div>
                        <div className={styles.without}>${withoutDiscount}</div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default Card;