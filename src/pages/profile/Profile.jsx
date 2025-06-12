import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from "./Profile.module.css";
import { LoginContext } from '../../App';
import axios from 'axios';
import { base_url } from '../../middleware/data/Data';
import Swal from 'sweetalert2';

function Profile() {
  const { isLogin } = useContext(LoginContext);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLogin) {
      // Get user data from localStorage
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (userData) {
        setFormData({
          fullName: userData.fullName || '',
          email: userData.email || '',
          phone: userData.phone || '',
          address: userData.address || '',
          city: userData.city || '',
          country: userData.country || '',
          postalCode: userData.postalCode || '',
        });
      }
      setLoading(false);
      
      // Optional: Still fetch from server if needed
      /*
      axios.get(base_url + "profile")
        .then(res => {
          setFormData(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching profile:", err);
          setLoading(false);
        });
      */
    }
  }, [isLogin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Update localStorage with new data
    const updatedUserData = {
      ...JSON.parse(localStorage.getItem('userData')),
      ...formData
    };
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
    
    // Optional: Still update server if needed
    /*
    axios.put(base_url + "profile", formData)
      .then(() => {
        setLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Profile updated successfully!',
          timer: 2000,
          showConfirmButton: false
        });
      })
      .catch(err => {
        console.error("Error updating profile:", err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update profile',
        });
      })
      .finally(() => setLoading(false));
    */
    
    setLoading(false);
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Profile updated successfully!',
      timer: 2000,
      showConfirmButton: false
    });
  };

  if (!isLogin) {
    return (
      <div className={styles.container}>
        <div className={styles.notLoggedIn}>
          <h2>Please login to view your profile</h2>
          <Link to="/login" className={styles.loginButton}>Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>My Profile</h1>
        <div className={styles.links}>
          <Link to='/' className={styles.link}>Home</Link>
          <hr className={styles.hr} />
          <Link to="/profile" className={styles.link}>Profile</Link>
        </div>
      </div>

      <div className={styles.main}>
        <form onSubmit={handleSubmit} className={styles.profileForm}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="submit" disabled={loading} className={styles.submitButton}>
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;