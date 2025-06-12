import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./About.module.css";

function About() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>About Us</h1>
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
              Welcome to Capital Shop, your number one source for all things fashion. 
              We're dedicated to providing you the very best of clothing, with an 
              emphasis on quality, style, and comfort.
            </p>
            <p>
              Founded in 2024, Capital Shop has come a long way from its beginnings. 
              When we first started out, our passion for fashion drove us to start this business.
            </p>
            <p>
              We hope you enjoy our products as much as we enjoy offering them to you. 
              If you have any questions or comments, please don't hesitate to contact us.
            </p>
          </div>

          <div className={styles.right}>
            <h2>Our Mission</h2>
            <p>
              At Capital Shop, we believe that everyone deserves to look and feel their best. 
              Our mission is to provide high-quality fashion at affordable prices.
            </p>

            <div className={styles.values}>
              <h3>Our Values</h3>
              <ul>
                <li>Quality First</li>
                <li>Customer Satisfaction</li>
                <li>Affordable Fashion</li>
                <li>Sustainable Practices</li>
                <li>Innovation in Style</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;