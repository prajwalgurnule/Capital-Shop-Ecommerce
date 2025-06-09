import { useState } from 'react';
import {
    FiCheckCircle,
    FiMail,
    FiMapPin,
    FiMessageSquare,
    FiSend,
    FiUser
} from "react-icons/fi";
import { IoIosTabletPortrait } from "react-icons/io";
import { Link } from 'react-router-dom';
import styles from "./Contact.module.css";
import { FaFacebook } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
               <h1>Contact</h1>
               <div className={styles.links}>
                <Link to='/' className={styles.link}>Home</Link> 
               <hr className={styles.hr} />
               <Link to="/contact" className={styles.link}>Contact</Link></div>
        </div>
      
      <div className={styles.main}>
        <div className={styles.formSection}>
          <div className={styles.left}>
            <h2>Send us a message</h2>
            <p className={styles.subtitle}>Fill out the form below and we'll get back to you as soon as possible.</p>
            
            {isSubmitted ? (
              <div className={styles.successMessage}>
                <FiCheckCircle className={styles.successIcon} />
                <h3>Thank you for your message!</h3>
                <p>We've received your inquiry and will respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="message">
                    <FiMessageSquare className={styles.inputIcon} />
                    Your Message
                  </label>
                  <textarea 
                    name="message" 
                    id="message" 
                    value={formData.message}
                    onChange={handleChange}
                    placeholder='Type your message here...'
                    required
                  />
                </div>
                
                <div className={styles.col}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">
                      <FiUser className={styles.inputIcon} />
                      Your Name
                    </label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder='John Doe' 
                      required
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="email">
                      <FiMail className={styles.inputIcon} />
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder='john@example.com' 
                      required
                    />
                  </div>
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="subject">
                    <FiMessageSquare className={styles.inputIcon} />
                    Subject
                  </label>
                  <input 
                    type="text" 
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder='What is this about?' 
                  />
                </div>
                
                <button type="submit" disabled={isLoading}>
                  {isLoading ? 'Sending...' : (
                    <>
                      <FiSend className={styles.sendIcon} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
          
          <div className={styles.right}>
            <h2>Contact information</h2>
            <p className={styles.subtitle}>Here's how you can reach us directly.</p>
            
            <div className={styles.contactCards}>
              <div className={styles.contactCard}>
                <div className={styles.cardIcon}>
                  <FiMapPin />
                </div>
                <div className={styles.cardContent}>
                  <h4>Our Location</h4>
                  <p>Buttonwood, California.</p>
                  <p>Rosemead, CA 91770</p>
                </div>
              </div>
              
              <div className={styles.contactCard}>
                <div className={styles.cardIcon}>
                  <IoIosTabletPortrait />
                </div>
                <div className={styles.cardContent}>
                  <h4>Phone Number</h4>
                  <p>+1 253 565 2365</p>
                  <p>Mon to Fri 9am to 6pm</p>
                </div>
              </div>
              
              <div className={styles.contactCard}>
                <div className={styles.cardIcon}>
                  <FiMail />
                </div>
                <div className={styles.cardContent}>
                  <h4>Email Address</h4>
                  <p>support@colorlib.com</p>
                  <p>We respond within 24 hours</p>
                </div>
              </div>
            </div>
            
            <div className={styles.socialLinks}>
              <h4>Follow Us</h4>
              <div className={styles.socialIcons}>
                <a href="#" className={styles.socialIcon}><FaFacebook /></a>
                <a href="#" className={styles.socialIcon}><IoLogoInstagram /></a>
                <a href="#" className={styles.socialIcon}><FaTwitter /></a>
                <a href="#" className={styles.socialIcon}><FaLinkedinIn /></a>
                <a href="#" className={styles.socialIcon}><FaYoutube /></a>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.mapSection}>
          <h2>Find us on the map</h2>
          <div className={styles.mapContainer}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.453399292752!2d-118.0852466847841!3d34.08088898059915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2d7a7d6a5a5a5%3A0x9b9b9b9b9b9b9b9b!2sRosemead%2C%20CA%2091770!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus" 
              className={styles.mapIframe}
              allowFullScreen="" 
              loading="lazy"
              title="Our Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;