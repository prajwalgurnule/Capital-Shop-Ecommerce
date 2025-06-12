import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./About.module.css";

function About() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>About Capital Shop</h1>
        <div className={styles.links}>
          <Link to='/' className={styles.link}>Home</Link>
          <hr className={styles.hr} />
          <Link to="/about" className={styles.link}>About</Link>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.aboutContent}>
          <div className={styles.left}>
            <h2>Our Story</h2>
            <p>
              Welcome to Capital Shop, your premier destination for contemporary fashion. 
              Founded in 2024, we began as a small boutique with a big vision: to make 
              high-quality fashion accessible to everyone without compromising on style or ethics.
            </p>
            <p>
              What started as a single store has now blossomed into a thriving online 
              platform serving customers nationwide. Our journey has been fueled by 
              our passion for fashion and commitment to customer satisfaction.
            </p>
            <p>
              Today, we collaborate with over 50 ethical manufacturers worldwide to 
              bring you collections that are as kind to the planet as they are to your wardrobe.
            </p>
            
            <div className={styles.stats}>
              <h3>By The Numbers</h3>
              <div className={styles.statGrid}>
                <div className={styles.statItem}>
                  <span>10,000+</span>
                  <p>Happy Customers</p>
                </div>
                <div className={styles.statItem}>
                  <span>50+</span>
                  <p>Brand Partners</p>
                </div>
                <div className={styles.statItem}>
                  <span>24/7</span>
                  <p>Customer Support</p>
                </div>
              </div>
            </div>

            {/* <div className={styles.team}>
              <h3>Meet Our Founders</h3>
              <div className={styles.founders}>
                <div className={styles.founder}>
                  <h4>Alex Johnson</h4>
                  <p>CEO & Creative Director</p>
                </div>
                <div className={styles.founder}>
                  <h4>Sarah Chen</h4>
                  <p>Head of Operations</p>
                </div>
              </div>
            </div> */}
          </div>

          <div className={styles.right}>
            <h2>Our Mission</h2>
            <p>
              At Capital Shop, we're redefining fashion retail by combining style, 
              sustainability, and affordability. We believe looking good shouldn't 
              come at the expense of your values or your wallet.
            </p>

            <div className={styles.values}>
              <h3>Our Core Values</h3>
              <ul>
                <li><strong>Quality First:</strong> Rigorous quality checks on every product</li>
                <li><strong>Customer Centric:</strong> Your satisfaction is our success metric</li>
                <li><strong>Affordable Luxury:</strong> Premium fashion at fair prices</li>
                <li><strong>Sustainable Future:</strong> 30% of our collection is now eco-friendly</li>
                <li><strong>Style Innovation:</strong> Trend-forward designs updated weekly</li>
                <li><strong>Community:</strong> Supporting local designers and artisans</li>
              </ul>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;