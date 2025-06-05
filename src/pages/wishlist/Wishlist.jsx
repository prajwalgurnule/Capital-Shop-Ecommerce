import React, { useEffect, useState } from 'react';
import styles from "./Wishlist.module.css";
import { Link } from 'react-router-dom'; 
import Card from "../user/components/Card"; 

function Wishlist() {
    const [wishlistArr, setWishlistArr] = useState([]);

    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlistArr(storedWishlist);
    }, []); 

    const handleRemoveFromWishlist = (id) => {
        const updatedWishlist = wishlistArr.filter(item => item.id !== id);
        setWishlistArr(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

        // Dispatch event to update header counts
        const event = new Event('countChanged');
        window.dispatchEvent(event);
    };

    return (
        <div>
            <div className={styles.header}>
                <h1>Wishlist</h1>
                <div className={styles.links}>
                    <Link to='/' className={styles.link}>Home</Link> 
                    <hr className={styles.hr} />
                    <Link to="/wishlist" className={styles.link}>Wishlist</Link>
                </div>
            </div>
            <div className={styles.products}>
                {
                    wishlistArr.length > 0 ? (
                        wishlistArr.map(elem => (
                            <div key={elem.id} className={styles.wishlistItem}>
                                <Card
                                    id={elem.id}
                                    name={elem.name}
                                    img={elem.img}
                                    price={elem.price}
                                    withoutDiscount={elem.withoutDiscount}
                                    products={wishlistArr} 
                                />
                                <button 
                                    className={styles.removeButton}
                                    onClick={() => handleRemoveFromWishlist(elem.id)}
                                >
                                    x
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>Your wishlist is empty.</p> 
                    )
                }
            </div>
        </div>
    );
}

export default Wishlist;