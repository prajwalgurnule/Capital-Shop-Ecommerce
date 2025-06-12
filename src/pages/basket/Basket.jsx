// import React, { useState, useEffect } from 'react';
// import styles from "./Basket.module.css";
// import { Link, useNavigate } from 'react-router-dom';
// import { MdDelete } from "react-icons/md";
// import { GoPlus } from "react-icons/go";
// import { FiMinus } from "react-icons/fi";
// import {
//     Table,
//     Thead,
//     Tbody,
//     Tr,
//     Th,
//     Td,
//     TableContainer,
// } from '@chakra-ui/react';

// function Basket() {
//     const navigate = useNavigate();
//     const [basketArr, setBasketArr] = useState([]);
//     const [totalPrice, setTotalPrice] = useState(0); 
//     const [quantities, setQuantities] = useState({}); 

//     const handleIncrement = (id) => {
//         setQuantities(prev => {
//             const newQty = (prev[id] || 1) + 1;
//             updateBasketInLocalStorage(id, newQty);
//             return { ...prev, [id]: newQty };
//         });
//     };

//     const handleDecrement = (id) => {
//         setQuantities(prev => {
//             const newQty = (prev[id] || 1) - 1;
//             if (newQty <= 0) {
//                 handleDelete(id);
//                 return prev;
//             }
//             updateBasketInLocalStorage(id, newQty);
//             return { ...prev, [id]: newQty };
//         });
//     };

//     const handleDelete = (id) => {
//         const updatedBasket = basketArr.filter(item => item.id !== id); 
//         setBasketArr(updatedBasket); 
//         localStorage.setItem("basket", JSON.stringify(updatedBasket)); 

//         setQuantities(prev => {
//             const updatedQuantites = {...prev}; 
//             delete updatedQuantites[id]; 
//             return updatedQuantites; 
//         });

//         const event = new Event('countChanged');
//         window.dispatchEvent(event);
//     }

//     const updateBasketInLocalStorage = (id, newQty) => {
//         const updatedBasket = basketArr.map(product => 
//             product.id === id ? { ...product, count: newQty } : product
//         );
//         localStorage.setItem("basket", JSON.stringify(updatedBasket));
//         setBasketArr(updatedBasket);

//         const event = new Event('countChanged');
//         window.dispatchEvent(event);
//     };

//     const handleCheckout = () => {
//         if (basketArr.length === 0) return;
        
//         // Create a new order
//         const newOrder = {
//             id: Date.now().toString(),
//             date: new Date().toLocaleDateString('en-US', { 
//                 year: 'numeric', 
//                 month: 'long', 
//                 day: 'numeric' 
//             }),
//             total: totalPrice,
//             status: 'Processing',
//             shipping: {
//                 address: '123 Main St, Apt 4B', // Default address, can be replaced with user's address
//                 city: 'New York',
//                 state: 'NY',
//                 zip: '10001',
//                 carrier: 'FedEx',
//                 tracking: 'FX' + Math.floor(Math.random() * 1000000000).toString()
//             },
//             payment: {
//                 method: 'Visa',
//                 last4: '4242',
//                 transaction: 'ch_' + Math.random().toString(36).substr(2, 24)
//             },
//             items: basketArr.map(item => ({
//                 ...item,
//                 quantity: quantities[item.id] || item.count
//             }))
//         };

//         // Get existing orders from localStorage
//         const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
//         const updatedOrders = [newOrder, ...existingOrders];
        
//         // Save to localStorage
//         localStorage.setItem('orders', JSON.stringify(updatedOrders));
        
//         // Clear the basket
//         localStorage.removeItem('basket');
//         setBasketArr([]);
//         setQuantities({});
        
//         // Dispatch event to update header counts
//         const event = new Event('countChanged');
//         window.dispatchEvent(event);
        
//         // Navigate to orders page
//         navigate('/orders');
//     };

//     useEffect(() => {
//         const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
//         setBasketArr(storedBasket);

//         const initialQuantities = {};
//         storedBasket.forEach(product => {
//             initialQuantities[product.id] = product.count || 1; 
//         });
//         setQuantities(initialQuantities);
//     }, []); 

//     useEffect(() => {
//         const total = basketArr.reduce((acc, product) => {
//             const qty = quantities[product.id] || product.count;
//             return acc + (product.price * qty);
//         }, 0);
//         setTotalPrice(total);
//     }, [basketArr, quantities]);

//     return (
//         <div className={styles.container}>
//             <div className={styles.header}>
//                 <h1>Product Detail</h1>
//                 <div className={styles.links}>
//                     <Link to='/' className={styles.link}>Home</Link>
//                     <hr className={styles.hr} />
//                     <Link to="/basket" className={styles.link}>Cart</Link>
//                 </div>
//             </div>

//             <div className={styles.basket}>
//                 <TableContainer className={styles.tableContainer}>
//                     <Table variant='simple' className={styles.table}>
//                         <Thead className={styles.thead}>
//                             <Tr>
//                                 <Th>Image</Th>
//                                 <Th>Product</Th>
//                                 <Th>Size</Th>
//                                 <Th>Color</Th>
//                                 <Th>Price</Th>
//                                 <Th isNumeric>Quantity</Th>
//                                 <Th isNumeric>Total</Th>
//                                 <Th>Delete</Th>
//                             </Tr>
//                         </Thead>
//                         <Tbody className={styles.tbody}>
//                             {basketArr && basketArr.map(product => {
//                                 return (
//                                     <Tr className={styles.tr} key={product.id}>
//                                         <Td className={styles.productImage}>
//                                             <Link onClick={() => navigate("/detail/" + product.id)}><img src={product.img} alt="" /></Link>
//                                         </Td>
//                                         <Td><div className={styles.productName}>{product.name}</div></Td>
//                                         <Td>{product.size}</Td>
//                                         <Td>{product.color}</Td>
//                                         <Td>${product.price}</Td>
//                                         <Td isNumeric className={styles.quantity}>
//                                             <div className={styles.count}>
//                                                 <input type="text" value={quantities[product.id] || product.count} readOnly />
//                                                 <div className={styles.buttons}>
//                                                     <div className={`${styles.increment}`} onClick={() => handleIncrement(product.id)}>
//                                                         <GoPlus />
//                                                     </div>
//                                                     <div className={`${styles.decrement}`} onClick={() => handleDecrement(product.id)}>
//                                                         <FiMinus />
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </Td>
//                                         <Td isNumeric>
//                                             <div style={{width: "5rem", textAlign:"center"}}>
//                                                 ${((quantities[product.id] || product.count) * product.price).toFixed(2)}
//                                             </div>
//                                         </Td>
//                                         <Td>< MdDelete className={styles.delete} onClick={() => handleDelete(product.id)}/></Td>
//                                     </Tr>
//                                 );
//                             })}
//                         </Tbody>
//                     </Table>
//                 </TableContainer>

//                 <div className={styles.subtotal}>
//                     <span>Subtotal</span>
//                     <span>${totalPrice.toFixed(2)}</span> 
//                 </div>

//                 <div className={styles.Buttons}>
//                     <Link className={styles.goToMenu} to="/products"><span>Continue Shopping</span></Link>
//                     <button 
//                         className={styles.Checkout} 
//                         onClick={handleCheckout}
//                         disabled={basketArr.length === 0}
//                     >
//                         <span>Proceed to checkout</span>
//                     </button>
//                 </div>
//             </div> 
//         </div>
//     );
// }

// export default Basket;


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react';
import styles from "./Basket.module.css";

// SVG Icon Components
const PlusIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

const MinusIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
  </svg>
);

const XMarkIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

function Basket() {
    const navigate = useNavigate();
    const [basketArr, setBasketArr] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0); 
    const [quantities, setQuantities] = useState({});
    const [checkoutStep, setCheckoutStep] = useState('basket'); // 'basket', 'address', 'payment', 'success'
    const [shippingOption, setShippingOption] = useState('free');
    const [address, setAddress] = useState({
        fullName: '',
        street: '',
        city: '',
        state: '',
        postcode: '',
        country: 'India',
        phone: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('credit_card');
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: ''
    });
    const [orderSummaryData, setOrderSummaryData] = useState(null);

    const handleIncrement = (id) => {
        setQuantities(prev => {
            const newQty = (prev[id] || 1) + 1;
            updateBasketInLocalStorage(id, newQty);
            return { ...prev, [id]: newQty };
        });
    };

    const handleDecrement = (id) => {
        setQuantities(prev => {
            const newQty = (prev[id] || 1) - 1;
            if (newQty <= 0) {
                handleDelete(id);
                return prev;
            }
            updateBasketInLocalStorage(id, newQty);
            return { ...prev, [id]: newQty };
        });
    };

    const handleDelete = (id) => {
        const updatedBasket = basketArr.filter(item => item.id !== id); 
        setBasketArr(updatedBasket); 
        localStorage.setItem("basket", JSON.stringify(updatedBasket)); 

        setQuantities(prev => {
            const updatedQuantites = {...prev}; 
            delete updatedQuantites[id]; 
            return updatedQuantites; 
        });

        const event = new Event('countChanged');
        window.dispatchEvent(event);
    }

    const updateBasketInLocalStorage = (id, newQty) => {
        const updatedBasket = basketArr.map(product => 
            product.id === id ? { ...product, count: newQty } : product
        );
        localStorage.setItem("basket", JSON.stringify(updatedBasket));
        setBasketArr(updatedBasket);

        const event = new Event('countChanged');
        window.dispatchEvent(event);
    };

    const handleProceedToCheckout = () => {
        setCheckoutStep('address');
    };

    const handleAddressSubmit = (e) => {
        e.preventDefault();
        setCheckoutStep('payment');
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();

        // Save order summary data before clearing the basket
        const shippingCostValue = shippingCost[shippingOption];
        setOrderSummaryData({
            cartTotal: totalPrice.toFixed(2),
            shippingCost: shippingCostValue.toFixed(2),
            totalAmount: (totalPrice + shippingCostValue).toFixed(2),
            shippingOption,
            cartCount: basketArr.length,
            cartItems: basketArr.map(item => ({
                ...item,
                quantity: quantities[item.id] || item.count
            }))
        });

        // Create a new order
        const newOrder = {
            id: Date.now().toString(),
            date: new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            }),
            total: totalPrice + shippingCostValue,
            status: 'Processing',
            shipping: {
                address: `${address.street}, ${address.city}`,
                city: address.city,
                state: address.state,
                zip: address.postcode,
                carrier: shippingOption === 'express' ? 'FedEx' : 'USPS',
                tracking: 'TRK' + Math.floor(Math.random() * 1000000000).toString()
            },
            payment: {
                method: paymentMethod === 'credit_card' ? 'Visa' : paymentMethod,
                last4: paymentMethod === 'credit_card' ? cardDetails.cardNumber.slice(-4) : '4242',
                transaction: 'ch_' + Math.random().toString(36).substr(2, 24)
            },
            items: basketArr.map(item => ({
                ...item,
                quantity: quantities[item.id] || item.count
            }))
        };

        // Get existing orders from localStorage
        const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
        const updatedOrders = [newOrder, ...existingOrders];
        
        // Save to localStorage
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        
        // Clear the basket
        localStorage.removeItem('basket');
        setBasketArr([]);
        setQuantities({});
        
        // Dispatch event to update header counts
        const event = new Event('countChanged');
        window.dispatchEvent(event);
        
        // Move to success step
        setCheckoutStep('success');
    };

    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];
        
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        
        if (parts.length) {
            return parts.join(' ');
        } else {
            return value;
        }
    };

    const handleCardNumberChange = (e) => {
        const formattedValue = formatCardNumber(e.target.value);
        setCardDetails({
            ...cardDetails,
            cardNumber: formattedValue
        });
    };

    const handleExpiryDateChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        setCardDetails({
            ...cardDetails,
            expiryDate: value
        });
    };

    const shippingCost = {
        flat_rate: 5.00,
        free: 0.00,
        express: 10.00,
        local: 2.00
    };

    const totalAmount = totalPrice + shippingCost[shippingOption];

    const OrderSummary = ({ showShipping = true, showItems = true, showActions = false, orderSummary }) => (
        <div className={styles.orderSummary}>
            <h3 className={styles.orderSummaryTitle}>Order Summary</h3>
            
            {showItems && (
                <>
                    <div className={styles.orderItemsList}>
                        {basketArr.map(item => (
                            <div key={item.id} className={styles.orderItem}>
                                <div className={styles.orderItemImage}>
                                    <img src={item.img} alt={item.name} />
                                </div>
                                <div className={styles.orderItemDetails}>
                                    <p className={styles.orderItemName}>{item.name}</p>
                                    <p className={styles.orderItemMeta}>Size: {item.size}</p>
                                    <p className={styles.orderItemMeta}>Qty: {quantities[item.id] || item.count}</p>
                                </div>
                                <p className={styles.orderItemPrice}>${((quantities[item.id] || item.count) * item.price).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                    <div className={styles.divider}></div>
                </>
            )}

            <div className={styles.orderSummaryDetails}>
                <div className={styles.orderSummaryRow}>
                    <span>Subtotal ({orderSummary ? orderSummary.cartCount : basketArr.length} items)</span>
                    <span className={styles.orderSummaryValue}>${orderSummary ? orderSummary.cartTotal : totalPrice.toFixed(2)}</span>
                </div>

                {showShipping && (
                    <div className={styles.orderSummaryRow}>
                        <span>Shipping</span>
                        <span className={styles.orderSummaryValue}>
                            {shippingOption === 'free' ? 'FREE' : `$${shippingCost[shippingOption].toFixed(2)}`}
                        </span>
                    </div>
                )}

                {showShipping && (
                    <div className={styles.orderSummaryRow}>
                        <span>Shipping Method</span>
                        <span className={styles.orderSummaryValue}>
                            {shippingOption === 'free' && 'Free Shipping (5-7 days)'}
                            {shippingOption === 'flat_rate' && 'Standard Shipping (3-5 days)'}
                            {shippingOption === 'express' && 'Express Shipping (2-3 days)'}
                            {shippingOption === 'local' && 'Local Delivery (24 hours)'}
                        </span>
                    </div>
                )}

                <div className={styles.orderSummaryRow}>
                    <span>Tax</span>
                    <span className={styles.orderSummaryValue}>$0.00</span>
                </div>

                <div className={styles.orderSummaryTotal}>
                    <span>Total</span>
                    <span>${orderSummary ? orderSummary.totalAmount : totalAmount.toFixed(2)}</span>
                </div>
            </div>

            {showActions && (
                <button
                    onClick={handleProceedToCheckout}
                    className={styles.checkoutButton}
                    disabled={basketArr.length === 0}
                >
                    Proceed to checkout
                </button>
            )}
        </div>
    );

    useEffect(() => {
        const storedBasket = JSON.parse(localStorage.getItem("basket")) || [];
        setBasketArr(storedBasket);

        const initialQuantities = {};
        storedBasket.forEach(product => {
            initialQuantities[product.id] = product.count || 1; 
        });
        setQuantities(initialQuantities);
    }, []); 

    useEffect(() => {
        const total = basketArr.reduce((acc, product) => {
            const qty = quantities[product.id] || product.count;
            return acc + (product.price * qty);
        }, 0);
        setTotalPrice(total);
    }, [basketArr, quantities]);

    if (checkoutStep === 'success') {
        return (
            <div className={styles.successContainer}>
                <div className={styles.successHeader}>
                    <h1>Order Confirmed</h1>
                    <div className={styles.breadcrumbs}>
                        <Link to='/' className={styles.breadcrumbLink}>Home</Link>
                        <span className={styles.breadcrumbSeparator}>|</span>
                        <span className={styles.breadcrumbCurrent}>Order Confirmation</span>
                    </div>
                </div>

                <div className={styles.successContent}>
                    <div className={styles.successIcon}>
                        <svg className={styles.checkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className={styles.successTitle}>Thank you for your order!</h2>
                    <p className={styles.successMessage}>Your payment was successful. Your order will be processed shortly.</p>
                    
                    <div className={styles.orderSummaryContainer}>
                        {orderSummaryData && <OrderSummary showShipping={true} showItems={true} orderSummary={orderSummaryData} />}
                    </div>
                    
                    <div className={styles.shippingInfo}>
                        <h3>Shipping Information</h3>
                        <div className={styles.shippingDetails}>
                            <div>
                                <p className={styles.shippingLabel}>Shipping to</p>
                                <p className={styles.shippingValue}>{address.fullName}</p>
                                <p className={styles.shippingValue}>{address.street}</p>
                                <p className={styles.shippingValue}>{address.city}, {address.state} {address.postcode}</p>
                                <p className={styles.shippingValue}>{address.country}</p>
                                <p className={styles.shippingValue}>Phone: {address.phone}</p>
                            </div>
                            <div>
                                <p className={styles.shippingLabel}>Payment method</p>
                                <p className={styles.shippingValue}>
                                    {paymentMethod === 'credit_card' && 'Credit Card ending in ' + cardDetails.cardNumber.slice(-4)}
                                    {paymentMethod === 'paypal' && 'PayPal'}
                                    {paymentMethod === 'cod' && 'Cash on Delivery'}
                                </p>
                                {paymentMethod === 'credit_card' && (
                                    <p className={styles.shippingValue}>Cardholder: {cardDetails.cardName}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    <Link 
                        to="/orders" 
                        className={styles.continueShopping}
                    >
                        See Orders
                    </Link>
                </div>
            </div>
        );
    }

    if (checkoutStep === 'payment') {
        return (
            <div className={styles.checkoutContainer}>
                <div className={styles.checkoutHeader}>
                    <h1>Checkout</h1>
                    <div className={styles.breadcrumbs}>
                        <Link to='/' className={styles.breadcrumbLink}>Home</Link>
                        <span className={styles.breadcrumbSeparator}>|</span>
                        <span className={styles.breadcrumbCurrent}>Checkout</span>
                    </div>
                </div>

                <div className={styles.checkoutSteps}>
                    <div className={styles.step}>
                        <div className={`${styles.stepNumber} ${styles.stepCompleted}`}>1</div>
                        <p className={styles.stepLabel}>Address</p>
                    </div>
                    <div className={styles.step}>
                        <div className={`${styles.stepNumber} ${styles.stepActive}`}>2</div>
                        <p className={styles.stepLabel}>Payment</p>
                    </div>
                    <div className={styles.step}>
                        <div className={styles.stepNumber}>3</div>
                        <p className={styles.stepLabel}>Confirmation</p>
                    </div>
                </div>

                <form onSubmit={handlePaymentSubmit} className={styles.checkoutForm}>
                    <div className={styles.paymentSection}>
                        <h2>Payment Method</h2>
                        <div className={styles.paymentOptions}>
                            <label className={styles.paymentOption}>
                                <input 
                                    type="radio" 
                                    name="payment" 
                                    value="credit_card" 
                                    checked={paymentMethod === 'credit_card'}
                                    onChange={() => setPaymentMethod('credit_card')}
                                />
                                <div>
                                    <p className={styles.paymentOptionTitle}>Credit/Debit Card</p>
                                    <p className={styles.paymentOptionDesc}>Pay with Visa, Mastercard, etc.</p>
                                </div>
                            </label>

                            {paymentMethod === 'credit_card' && (
                                <div className={styles.cardDetails}>
                                    <div className={styles.formGroup}>
                                        <label>Card Number</label>
                                        <input
                                            type="text"
                                            value={cardDetails.cardNumber}
                                            onChange={handleCardNumberChange}
                                            placeholder="1234 5678 9012 3456"
                                            maxLength="19"
                                            required
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Name on Card</label>
                                        <input
                                            type="text"
                                            value={cardDetails.cardName}
                                            onChange={(e) => setCardDetails({...cardDetails, cardName: e.target.value})}
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                    <div className={styles.cardRow}>
                                        <div className={styles.formGroup}>
                                            <label>Expiry Date</label>
                                            <input
                                                type="text"
                                                value={cardDetails.expiryDate}
                                                onChange={handleExpiryDateChange}
                                                placeholder="MM/YY"
                                                maxLength="5"
                                                required
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>CVV</label>
                                            <input
                                                type="text"
                                                value={cardDetails.cvv}
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/\D/g, '');
                                                    if (value.length <= 4) {
                                                        setCardDetails({...cardDetails, cvv: value});
                                                    }
                                                }}
                                                placeholder="123"
                                                maxLength="4"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <label className={styles.paymentOption}>
                                <input 
                                    type="radio" 
                                    name="payment" 
                                    value="paypal" 
                                    checked={paymentMethod === 'paypal'}
                                    onChange={() => setPaymentMethod('paypal')}
                                />
                                <div>
                                    <p className={styles.paymentOptionTitle}>PayPal</p>
                                    <p className={styles.paymentOptionDesc}>Pay with your PayPal account</p>
                                </div>
                            </label>

                            <label className={styles.paymentOption}>
                                <input 
                                    type="radio" 
                                    name="payment" 
                                    value="cod" 
                                    checked={paymentMethod === 'cod'}
                                    onChange={() => setPaymentMethod('cod')}
                                />
                                <div>
                                    <p className={styles.paymentOptionTitle}>Cash on Delivery</p>
                                    <p className={styles.paymentOptionDesc}>Pay when you receive the order</p>
                                </div>
                            </label>

                            {/* <div className={styles.billingAddress}>
                                <label className={styles.checkboxLabel}>
                                    <input type="checkbox" defaultChecked />
                                    <span>Billing address is the same as shipping address</span>
                                </label>
                            </div> */}
                        </div>
                    </div>

                    <div className={styles.orderSummarySection}>
                        <OrderSummary showShipping={true} showItems={false} />
                        
                        <button
                            type="submit"
                            className={styles.payNowButton}
                        >
                            {paymentMethod === 'cod' ? 'Place Order' : 'Pay Now'}
                        </button>
                        <p className={styles.termsText}>
                            By placing your order, you agree to our <a href="#" className={styles.termsLink}>Terms of Service</a> and <a href="#" className={styles.termsLink}>Privacy Policy</a>.
                        </p>

                        <div className={styles.paymentLogos}>
                            <img src="https://www.freepnglogos.com/uploads/visa-card-logo-9.png" alt="Visa" />
                            <img src="https://www.freepnglogos.com/uploads/mastercard-png/mastercard-logo-logok-15.png" alt="Mastercard" />
                            <img src="https://www.freepnglogos.com/uploads/paypal-logo-png-3.png" alt="PayPal" />
                            <img src="https://www.pngall.com/wp-content/uploads/2/SSL-PNG-File.png" alt="SSL Secure" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    if (checkoutStep === 'address') {
        return (
            <div className={styles.checkoutContainer}>
                <div className={styles.checkoutHeader}>
                    <h1>Checkout</h1>
                    <div className={styles.breadcrumbs}>
                        <Link to='/' className={styles.breadcrumbLink}>Home</Link>
                        <span className={styles.breadcrumbSeparator}>|</span>
                        <span className={styles.breadcrumbCurrent}>Checkout</span>
                    </div>
                </div>

                <div className={styles.checkoutSteps}>
                    <div className={styles.step}>
                        <div className={`${styles.stepNumber} ${styles.stepActive}`}>1</div>
                        <p className={styles.stepLabel}>Address</p>
                    </div>
                    <div className={styles.step}>
                        <div className={styles.stepNumber}>2</div>
                        <p className={styles.stepLabel}>Payment</p>
                    </div>
                    <div className={styles.step}>
                        <div className={styles.stepNumber}>3</div>
                        <p className={styles.stepLabel}>Confirmation</p>
                    </div>
                </div>

                <form onSubmit={handleAddressSubmit} className={styles.checkoutForm}>
                    <div className={styles.addressSection}>
                        <h2>Shipping Address</h2>
                        <div className={styles.addressForm}>
                            <div className={styles.formGroup}>
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    value={address.fullName}
                                    onChange={(e) => setAddress({...address, fullName: e.target.value})}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Street Address</label>
                                <input
                                    type="text"
                                    value={address.street}
                                    onChange={(e) => setAddress({...address, street: e.target.value})}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>City</label>
                                <input
                                    type="text"
                                    value={address.city}
                                    onChange={(e) => setAddress({...address, city: e.target.value})}
                                    required
                                />
                            </div>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label>State</label>
                                    <input
                                        type="text"
                                        value={address.state}
                                        onChange={(e) => setAddress({...address, state: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Postcode</label>
                                    <input
                                        type="text"
                                        value={address.postcode}
                                        onChange={(e) => setAddress({...address, postcode: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Country</label>
                                <input
                                    type="text"
                                    value={address.country}
                                    onChange={(e) => setAddress({...address, country: e.target.value})}
                                    readOnly
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Phone</label>
                                <input
                                    type="tel"
                                    value={address.phone}
                                    onChange={(e) => setAddress({...address, phone: e.target.value})}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.shippingMethodSection}>
                        <h2>Shipping Method</h2>
                        <div className={styles.shippingOptions}>
                            <label className={styles.shippingOption}>
                                <input 
                                    type="radio" 
                                    name="shipping" 
                                    value="flat_rate" 
                                    checked={shippingOption === 'flat_rate'}
                                    onChange={() => setShippingOption('flat_rate')}
                                />
                                <div>
                                    <p className={styles.shippingOptionTitle}>Flat Rate</p>
                                    <p className={styles.shippingOptionDesc}>$5.00 - Standard shipping (3-5 business days)</p>
                                </div>
                            </label>
                            <label className={styles.shippingOption}>
                                <input 
                                    type="radio" 
                                    name="shipping" 
                                    value="free" 
                                    checked={shippingOption === 'free'}
                                    onChange={() => setShippingOption('free')}
                                />
                                <div>
                                    <p className={styles.shippingOptionTitle}>Free Shipping</p>
                                    <p className={styles.shippingOptionDesc}>Delivery in 5-7 business days</p>
                                </div>
                            </label>
                            <label className={styles.shippingOption}>
                                <input 
                                    type="radio" 
                                    name="shipping" 
                                    value="express" 
                                    checked={shippingOption === 'express'}
                                    onChange={() => setShippingOption('express')}
                                />
                                <div>
                                    <p className={styles.shippingOptionTitle}>Express Shipping</p>
                                    <p className={styles.shippingOptionDesc}>$10.00 - Delivery in 2-3 business days</p>
                                </div>
                            </label>
                            <label className={styles.shippingOption}>
                                <input 
                                    type="radio" 
                                    name="shipping" 
                                    value="local" 
                                    checked={shippingOption === 'local'}
                                    onChange={() => setShippingOption('local')}
                                />
                                <div>
                                    <p className={styles.shippingOptionTitle}>Local Delivery</p>
                                    <p className={styles.shippingOptionDesc}>$2.00 - Delivery within 24 hours</p>
                                </div>
                            </label>
                        </div>

                        <OrderSummary showShipping={true} showItems={false} />
                        
                        <button
                            type="submit"
                            className={styles.continueButton}
                        >
                            Continue to Payment
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    // Default basket view
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Your Cart</h1>
                <div className={styles.links}>
                    <Link to='/' className={styles.link}>Home</Link>
                    <hr className={styles.hr} />
                    <Link to="/basket" className={styles.link}>Cart</Link>
                </div>
            </div>

            {basketArr.length === 0 ? (
                <div className={styles.emptyCart}>
                    <h2>Your cart is empty</h2>
                    <Link 
                        to="/products" 
                        className={styles.continueShopping}
                    >
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className={styles.basketContent}>
                    <TableContainer className={styles.tableContainer}>
                        <Table variant='simple' className={styles.table}>
                            <Thead className={styles.thead}>
                                <Tr>
                                    <Th>Image</Th>
                                    <Th>Product</Th>
                                    <Th>Size</Th>
                                    <Th>Color</Th>
                                    <Th>Price</Th>
                                    <Th isNumeric>Quantity</Th>
                                    <Th isNumeric>Total</Th>
                                    <Th>Delete</Th>
                                </Tr>
                            </Thead>
                            <Tbody className={styles.tbody}>
                                {basketArr.map(product => (
                                    <Tr className={styles.tr} key={product.id}>
                                        <Td className={styles.productImage}>
                                            <Link onClick={() => navigate("/detail/" + product.id)}><img src={product.img} alt="" /></Link>
                                        </Td>
                                        <Td><div className={styles.productName}>{product.name}</div></Td>
                                        <Td>{product.size}</Td>
                                        <Td>{product.color}</Td>
                                        <Td>${product.price}</Td>
                                        <Td isNumeric className={styles.quantity}>
                                            <div className={styles.count}>
                                                <input type="text" value={quantities[product.id] || product.count} readOnly />
                                                <div className={styles.buttons}>
                                                    <div className={`${styles.increment}`} onClick={() => handleIncrement(product.id)}>
                                                        <GoPlus />
                                                    </div>
                                                    <div className={`${styles.decrement}`} onClick={() => handleDecrement(product.id)}>
                                                        <FiMinus />
                                                    </div>
                                                </div>
                                            </div>
                                        </Td>
                                        <Td isNumeric>
                                            <div style={{width: "5rem", textAlign:"center"}}>
                                                ${((quantities[product.id] || product.count) * product.price).toFixed(2)}
                                            </div>
                                        </Td>
                                        <Td>< MdDelete className={styles.delete} onClick={() => handleDelete(product.id)}/></Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>

                    <div className={styles.cartActions}>
                        <Link 
                            to="/products" 
                            className={styles.continueShopping}
                        >
                            Continue Shopping
                        </Link>
                        <button 
                            onClick={() => {
                                localStorage.removeItem("basket");
                                setBasketArr([]);
                                setQuantities({});
                                const event = new Event('countChanged');
                                window.dispatchEvent(event);
                            }}
                            className={styles.clearCart}
                        >
                            Clear Cart
                        </button>
                        
                    </div>

                    <div className={styles.orderSummaryWrapper}>
                        <OrderSummary showShipping={true} showItems={false} showActions={true} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Basket;