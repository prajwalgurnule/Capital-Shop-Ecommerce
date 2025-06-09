import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { FaShareAlt } from "react-icons/fa";
import { base_url } from "../../middleware/data/Data";
import styles from "./Detail.module.css";
import { LoginContext } from '../../App';
import { FaTrash } from "react-icons/fa";
import { getBasket, setBasket, getWishlist, setWishlist } from '../../utils/storage';

const tablist = [
  {
    id: 1,
    name: "Description",
  },
  {
    id: 2,
    name: "Details",
  },
  {
    id: 3,
    name: "Reviews",
  },
  {
    id: 4,
    name: "Shipping",
  },
];

function Detail() {
    const { id } = useParams(); 
    const [product, setProduct] = useState(null);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [isInCart, setIsInCart] = useState(false);
    const [itemActive, setItemActive] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const { isLogin } = useContext(LoginContext);

    useEffect(() => {
        axios(`${base_url}products/${id}`).then(res => {
            setProduct(res.data); 
        });
    }, [id]); 

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
        
        if (!isLogin) {
            // You might want to redirect to login here
            return;
        }

        let wishlistArr = getWishlist();
        if (isInWishlist) {
            wishlistArr = wishlistArr.filter((item) => item.id != id);
        } else {
            wishlistArr.push(product); 
        }
        setWishlist(wishlistArr);
        setIsInWishlist(!isInWishlist);

        // Dispatch event to update header counts
        const event = new Event('countChanged');
        window.dispatchEvent(event);
    };

    const handleCartClick = (e) => {
        e.preventDefault(); 
        e.stopPropagation(); 
        
        if (!isLogin) {
            // You might want to redirect to login here
            return;
        }

        const cartArr = getBasket(); 
        const existingProduct = cartArr.find(elem => elem.id == id);
        
        if (existingProduct) {
            existingProduct.count += 1;
        } else {
            cartArr.push({ ...product, count: 1 }); 
        }
        
        setBasket(cartArr); 
        setIsInCart(true); 

        // Dispatch event to update header counts
        const event = new Event('countChanged');
        window.dispatchEvent(event);
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(
                    <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.starIcon}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                );
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(
                    <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.starIcon}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <defs>
                            <linearGradient id="half-star" x1="0" x2="100%" y1="0" y2="0">
                                <stop offset="50%" stopColor="currentColor" />
                                <stop offset="50%" stopColor="#D1D5DB" />
                            </linearGradient>
                        </defs>
                        <path
                            fill="url(#half-star)"
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                    </svg>
                );
            } else {
                stars.push(
                    <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.starIconEmpty}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                );
            }
        }
        return stars;
    };

    const renderTabContent = () => {
        switch (itemActive) {
          case 1:
            return (
              <div className={styles.tabContent}>
                <p className={styles.tabText}>{product.description}</p>
                <p className={styles.tabText}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
                  voluptates, quod, quia, voluptatibus quae voluptatem quibusdam
                  voluptatum quos quas quidem nesciunt. Quisquam, quae. Quisquam
                  voluptates, quod, quia, voluptatibus quae voluptatem quibusdam
                  voluptatum quos quas quidem nesciunt. Quisquam, quae.
                </p>
              </div>
            );
          case 2:
            return (
              <div className={styles.tabContent}>
                <p className={styles.tabText}>
                  <span className={styles.tabLabel}>Brand:</span> {product.brand || "N/A"}
                </p>
                <p className={styles.tabText}>
                  <span className={styles.tabLabel}>Category:</span> {product.category || "N/A"}
                </p>
                <p className={styles.tabText}>
                  <span className={styles.tabLabel}>Stock:</span> {product.stock || 10} available
                </p>
              </div>
            );
          case 3:
            return (
              <div className={styles.tabContent}>
                <div className={styles.ratingContainer}>
                  <div className={styles.stars}>{renderStars(product.rating || 4.5)}</div>
                  <span className={styles.ratingText}>
                    {product.rating || 4.5} out of 5 ({product.reviews || 120} reviews)
                  </span>
                </div>
                <div className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.reviewAvatar}></div>
                    <div>
                      <p className={styles.reviewName}>John Doe</p>
                      <div className={styles.stars}>{renderStars(5)}</div>
                    </div>
                  </div>
                  <p className={styles.reviewText}>
                    "This product exceeded my expectations. The quality is amazing and
                    it arrived quickly. Highly recommend!"
                  </p>
                  <p className={styles.reviewDate}>Posted 2 weeks ago</p>
                </div>
              </div>
            );
          case 4:
            return (
              <div className={styles.tabContent}>
                <p className={styles.tabText}>
                  <span className={styles.tabLabel}>Free Shipping:</span> on all orders over $50
                </p>
                <p className={styles.tabText}>
                  <span className={styles.tabLabel}>Delivery:</span> 3-5 business days
                </p>
                <p className={styles.tabText}>
                  <span className={styles.tabLabel}>Returns:</span> 30-day return policy
                </p>
              </div>
            );
          default:
            return null;
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Product Detail</h1>
                <div className={styles.links}>
                    <Link to='/' className={styles.link}>Home</Link> 
                    <hr className={styles.hr} />
                    <Link to="/contact" className={styles.link}>Product Detail</Link>
                </div>
            </div>
            {product ? (
                <>
                    <div className={styles.detail}>
                        <div className={styles.product}>
                            <div className={styles.productImage}>
                                <img src={product.img} alt={product.name} />
                            </div>
                            <div className={styles.content}>
                                <div className={styles.header}> 
                                    <h3>{product.name.charAt(0).toUpperCase() + product.name.slice(1)}</h3>
                                </div>
                                <div className={styles.color}>
                                    <p>Category: {product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                                    <span>Color: {product.color.charAt(0).toUpperCase() + product.color.slice(1)}</span>
                                    <p>Size: {product.size.charAt(0).toUpperCase() + product.size.slice(1)}</p>
                                </div>
                                <div className={styles.price}> 
                                    <h1>${product.price}</h1>
                                    <span>${product.withoutDiscount}</span>
                                </div>
                                <div className={styles.detailFooter}>
                                    <Link className={styles.addToCart} onClick={handleCartClick}><span>Add To Cart</span></Link>
                                    <div className={styles.tool} onClick={handleWishlistClick}>
                                        {isInWishlist ? <IoIosHeart /> : <IoIosHeartEmpty />}
                                    </div>
                                    <Link className={styles.share}><FaShareAlt /></Link>
                                </div>
                            </div>
                        </div>     
                    </div>
                    
                    {/* Product Tabs */}
                    <div className={styles.tabsContainer}>
                        <div className={styles.tabsHeader}>
                            <nav className={styles.tabsNav}>
                                {tablist.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setItemActive(item.id)}
                                        className={`${styles.tabButton} ${
                                            itemActive === item.id ? styles.tabButtonActive : ''
                                        }`}
                                    >
                                        {item.name}
                                    </button>
                                ))}
                            </nav>
                        </div>
                        <div className={styles.tabsContent}>
                            {renderTabContent()}
                        </div>
                    </div>
                </>
            ) : (
                <p>Product not found</p>
            )}
        </div>
    );
}

export default Detail;