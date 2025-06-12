import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import styles from "./FAQ.module.css";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I track my order?',
      answer: 'You can track your order by logging into your account and visiting the Orders section. There you\'ll find tracking information for all your recent orders.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for all unused items in their original packaging. Simply initiate a return from your account or contact our customer service team.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. You can check shipping rates during checkout.'
    },
    {
      question: 'How can I change or cancel my order?',
      answer: 'Orders can be modified or cancelled within 1 hour of placement. Please contact our customer service team immediately if you need to make changes.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and various local payment methods depending on your location.'
    },
    {
      question: 'How do I find my size?',
      answer: 'Each product page includes a detailed size guide. You can also check our general size guide in the Help section for more information.'
    },
    {
      question: 'Are the items authentic?',
      answer: 'Yes, all items sold on Capital Shop are 100% authentic. We work directly with brands and authorized distributors to ensure authenticity.'
    },
    {
      question: 'Do you offer gift wrapping?',
      answer: 'Yes, we offer gift wrapping services for a small additional fee. You can select this option during checkout.'
    }
  ];

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>FAQ</h1>
        <div className={styles.links}>
          <Link to='/' className={styles.link}>Home</Link>
          <hr className={styles.hr} />
          <Link to="/faq" className={styles.link}>FAQ</Link>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.faqContent}>
          <h2>Frequently Asked Questions</h2>
          
          <div className={styles.faqList}>
            {faqs.map((faq, index) => (
              <div key={index} className={styles.faqItem}>
                <button
                  className={`${styles.faqQuestion} ${openIndex === index ? styles.active : ''}`}
                  onClick={() => toggleQuestion(index)}
                >
                  <span>{faq.question}</span>
                  {openIndex === index ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                
                {openIndex === index && (
                  <div className={styles.faqAnswer}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={styles.contactPrompt}>
            <h3>Still have questions?</h3>
            <p>Can't find the answer you're looking for? Please chat to our friendly team.</p>
            <Link to="/contact" className={styles.contactButton}>Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;