import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./Privacy.module.css";

function Privacy() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Privacy Policy</h1>
        <div className={styles.links}>
          <Link to='/' className={styles.link}>Home</Link>
          <hr className={styles.hr} />
          <Link to="/privacy" className={styles.link}>Privacy</Link>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.privacyContent}>
          <div className={styles.intro}>
            <p>Last Updated: June 12, 2024</p>
            <p>
              At Capital Shop, we are committed to protecting your privacy. This Privacy Policy 
              explains how we collect, use, disclose, and safeguard your information when you 
              visit our website or make a purchase from us.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Information We Collect</h2>
            <p>We collect personal information that you voluntarily provide to us when you:</p>
            <ul>
              <li>Register on our website</li>
              <li>Place an order</li>
              <li>Subscribe to our newsletter</li>
              <li>Contact customer service</li>
            </ul>
            <p>The types of information we may collect include:</p>
            <ul>
              <li>Name and contact details (email, phone number, shipping address)</li>
              <li>Payment information (processed securely through our payment processor)</li>
              <li>Order history and preferences</li>
              <li>Device and browsing information (via cookies)</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your account or orders</li>
              <li>Improve our products and services</li>
              <li>Personalize your shopping experience</li>
              <li>Prevent fraud and enhance security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your 
              personal data against unauthorized access, alteration, disclosure, or destruction.
            </p>
            <p>
              All payment transactions are encrypted using SSL technology and processed through 
              PCI-compliant payment processors. We do not store your full payment details on our servers.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data (subject to legal requirements)</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent where processing is based on consent</li>
            </ul>
            <p>
              To exercise these rights, please contact us at privacy@capitalshop.com.
            </p>
          </div>

          <div className={styles.section}>
            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any 
              significant changes by posting the new policy on our website with a revised "Last Updated" date.
            </p>
          </div>

          <div className={styles.contact}>
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact our Data Protection Officer at:
            </p>
            <p>
              <strong>Email:</strong> privacy@capitalshop.com<br />
              <strong>Mail:</strong> Data Protection Officer, Capital Shop, 123 Fashion Ave, New York, NY 10001
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Privacy;