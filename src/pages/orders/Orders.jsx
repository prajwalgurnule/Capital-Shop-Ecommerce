import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiPackage, FiTruck, FiCheck, FiClock, FiMapPin, FiCreditCard, FiBox, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import styles from "./Orders.module.css";
import { LoginContext } from '../../App';

function Orders() {
  const { isLogin } = useContext(LoginContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    if (isLogin) {
      // Get orders from localStorage
      const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
      setOrders(storedOrders);
      setLoading(false);
    }
  }, [isLogin]);

  const toggleOrderDetails = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  const handleCancelOrder = (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      updateOrderStatus(orderId, 'Cancelled');
    }
  };

  const handleMarkAsDelivered = (orderId) => {
    updateOrderStatus(orderId, 'Delivered');
  };

  const handleReturnItem = (orderId) => {
    if (window.confirm('Are you sure you want to return items from this order?')) {
      updateOrderStatus(orderId, 'Returned');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return <FiCheck className={styles.iconDelivered} />;
      case 'Shipped':
        return <FiTruck className={styles.iconShipped} />;
      case 'Processing':
        return <FiClock className={styles.iconProcessing} />;
      case 'Cancelled':
        return <FiBox className={styles.iconCancelled} />;
      case 'Returned':
        return <FiBox className={styles.iconCancelled} />;
      default:
        return <FiPackage className={styles.iconDefault} />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Delivered':
        return styles.statusDelivered;
      case 'Shipped':
        return styles.statusShipped;
      case 'Processing':
        return styles.statusProcessing;
      case 'Cancelled':
        return styles.statusCancelled;
      case 'Returned':
        return styles.statusCancelled;
      default:
        return styles.statusDefault;
    }
  };

  if (!isLogin) {
    return (
      <div className={styles.container}>
        <div className={styles.notLoggedIn}>
          <h2>Please login to view your orders</h2>
          <Link to="/login" className={styles.loginButton}>Login</Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>My Orders</h1>
        <div className={styles.links}>
          <Link to='/' className={styles.link}>Home</Link>
          <hr className={styles.hr} />
          <Link to="/orders" className={styles.link}>Orders</Link>
        </div>
      </div>

      <div className={styles.main}>
        {orders.length === 0 ? (
          <div className={styles.noOrders}>
            <h2>You haven't placed any orders yet</h2>
            <Link to="/products" className={styles.shopButton}>Start Shopping</Link>
          </div>
        ) : (
          <div className={styles.ordersList}>
            {orders.map((order) => (
              <div key={order.id} className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <div>
                    <h3>Order #{order.id}</h3>
                    <p className={styles.orderDate}>Placed on {order.date}</p>
                  </div>
                  <div className={styles.orderStatus}>
                    {getStatusIcon(order.status)}
                    <span className={`${styles.statusBadge} ${getStatusClass(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className={styles.orderItems}>
                  {order.items.slice(0, 2).map((item) => (
                    <div key={item.id} className={styles.orderItem}>
                      <div className={styles.itemImage}>
                        <img src={item.img} alt={item.name} />
                      </div>
                      <div className={styles.itemDetails}>
                        <h4>{item.name}</h4>
                        <p>Quantity: {item.quantity || item.count}</p>
                        <p>Price: ${item.price.toFixed(2)}</p>
                      </div>
                      <div className={styles.itemTotal}>
                        ${((item.quantity || item.count) * item.price).toFixed(2)}
                      </div>
                    </div>
                  ))}
                  
                  {order.items.length > 2 && !(expandedOrder === order.id) && (
                    <div className={styles.moreItems}>
                      + {order.items.length - 2} more items
                    </div>
                  )}
                </div>

                {expandedOrder === order.id && (
                  <div className={styles.additionalItems}>
                    {order.items.slice(2).map((item) => (
                      <div key={item.id} className={styles.orderItem}>
                        <div className={styles.itemImage}>
                          <img src={item.img} alt={item.name} />
                        </div>
                        <div className={styles.itemDetails}>
                          <h4>{item.name}</h4>
                          <p>Quantity: {item.quantity || item.count}</p>
                          <p>Price: ${item.price.toFixed(2)}</p>
                        </div>
                        <div className={styles.itemTotal}>
                          ${((item.quantity || item.count) * item.price).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className={styles.orderActions}>
                  <button 
                    className={styles.detailsButton}
                    onClick={() => toggleOrderDetails(order.id)}
                  >
                    {expandedOrder === order.id ? (
                      <>
                        <FiChevronUp /> Hide details
                      </>
                    ) : (
                      <>
                        <FiChevronDown /> View details
                      </>
                    )}
                  </button>
                  <div className={styles.actionButtons}>
                    <button className={styles.trackButton}>
                      <FiTruck /> Track Order
                    </button>
                    {order.status === 'Processing' && (
                      <button 
                        className={styles.cancelButton}
                        onClick={() => handleCancelOrder(order.id)}
                      >
                        Cancel Order
                      </button>
                      
                    )}
                    {order.status === 'Processing' && (
                      <button 
                        className={styles.deliveredButton}
                        onClick={() => handleMarkAsDelivered(order.id)}
                      >
                        <FiCheck /> Mark as Delivered
                      </button>
                    )}
                    {order.status === 'Delivered' && (
                      <button 
                        className={styles.returnButton}
                        onClick={() => handleReturnItem(order.id)}
                      >
                        Return Item
                      </button>
                    )}
                      
                  </div>
                </div>

                <div className={styles.orderFooter}>
                  <div className={styles.shippingInfo}>
                    <div className={styles.infoItem}>
                      <FiMapPin className={styles.infoIcon} />
                      <div>
                        <p className={styles.infoLabel}>Shipping Address</p>
                        <p>{order.shipping.address}</p>
                        <p>{order.shipping.city}, {order.shipping.state} {order.shipping.zip}</p>
                      </div>
                    </div>
                    <div className={styles.infoItem}>
                      <FiCreditCard className={styles.infoIcon} />
                      <div>
                        <p className={styles.infoLabel}>Payment Method</p>
                        <p>{order.payment.method} ending in {order.payment.last4}</p>
                        <p>Total: ${order.total.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                  <div className={styles.orderTotal}>
                    <span>Order Total:</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;