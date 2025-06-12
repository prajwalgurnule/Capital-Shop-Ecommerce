import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import styles from "./Register.module.css";
import { base_url } from "../../middleware/data/Data";
import axios from 'axios';
import Swal from 'sweetalert2';
import { FiArrowLeft } from 'react-icons/fi';

function Register() {
    const [submitCount, setSubmitCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmitCount = () => {
        setSubmitCount(prevCount => prevCount + 1);
    };

    const validationSchema = Yup.object().shape({
        fullname: Yup.string()
            .required('Full name is required!')
            .min(3, 'Full name must be at least 3 characters long!')
            .matches(/^[A-Za-z\s]+$/, 'Only alphabets are allowed!'),
        email: Yup.string()
            .required('Email is required!')
            .email('Please enter a valid email address!'),
        password: Yup.string()
            .required('Password is required!')
            .min(6, 'Password must be at least 6 characters long!')
            .matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number!'),
        confirmPassword: Yup.string()
            .required('Please confirm your password!')
            .oneOf([Yup.ref('password'), null], 'Passwords must match!'),
    });

    const formik = useFormik({
        initialValues: {
            fullname: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                const response = await axios.post(`${base_url}users/`, {
                    fullName: values.fullname,
                    email: values.email,
                    password: values.password,
                    phone: '',
                    address: '',
                    city: '',
                    country: '',
                    postalCode: '',
                    isAdmin: false
                });

                // Store user data in localStorage
                localStorage.setItem('userData', JSON.stringify({
                    fullName: values.fullname,
                    email: values.email,
                    phone: '',
                    address: '',
                    city: '',
                    country: '',
                    postalCode: ''
                }));

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Registration Successful!',
                    text: `Welcome ${values.fullname}! Your account has been created.`,
                    showConfirmButton: false,
                    timer: 2000
                });

                navigate('/login');
            } catch (error) {
                console.error(error);
                let errorMessage = 'Registration failed. Please try again.';
                
                if (error.response && error.response.status === 409) {
                    errorMessage = 'This email is already registered.';
                }

                Swal.fire({
                    icon: 'error',
                    title: 'Registration Error',
                    text: errorMessage,
                });
            } finally {
                setIsLoading(false);
            }
        },
    });

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <Link to="/" className={styles.backLink}>
                    <FiArrowLeft className={styles.backIcon} /> Back To Home
                </Link>
                
                <div className={styles.header}>
                    <h1>Create Account</h1>
                    <p>Join us to get started</p>
                </div>
                
                {isLoading ? (
                    <div className={styles.loading}>
                        <div className={styles.spinner}></div>
                        <p>Creating your account...</p>
                    </div>
                ) : (
                    <div className={styles.form}>
                        <form onSubmit={formik.handleSubmit}>
                            <div className={styles.row}>
                                <label htmlFor="fullname">Full Name</label>
                                <input
                                    placeholder='Enter your full name'
                                    className={`${styles.LoginInput} ${formik.errors.fullname && submitCount > 0 ? styles.errorInput : ''}`}
                                    type="text"
                                    id='fullname'
                                    name='fullname'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.fullname}
                                />
                                {submitCount > 0 && formik.errors.fullname && (
                                    <div className={styles.errorText}>
                                        {formik.errors.fullname}
                                    </div>
                                )}
                            </div>
                            
                            <div className={styles.row}>
                                <label htmlFor="email">Email Address</label>
                                <input
                                    placeholder='Enter your email'
                                    className={`${styles.LoginInput} ${formik.errors.email && submitCount > 0 ? styles.errorInput : ''}`}
                                    type="email"
                                    id='email'
                                    name='email'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                                {submitCount > 0 && formik.errors.email && (
                                    <div className={styles.errorText}>
                                        {formik.errors.email}
                                    </div>
                                )}
                            </div>
                            
                            <div className={styles.row}>
                                <label htmlFor="password">Password</label>
                                <input
                                    placeholder='Create a password'
                                    className={`${styles.LoginInput} ${formik.errors.password && submitCount > 0 ? styles.errorInput : ''}`}
                                    type="password"
                                    id='password'
                                    name='password'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                />
                                {submitCount > 0 && formik.errors.password && (
                                    <div className={styles.errorText}>
                                        {formik.errors.password}
                                    </div>
                                )}
                            </div>
                            
                            <div className={styles.row}>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    placeholder='Confirm your password'
                                    className={`${styles.LoginInput} ${formik.errors.confirmPassword && submitCount > 0 ? styles.errorInput : ''}`}
                                    type="password"
                                    id='confirmPassword'
                                    name='confirmPassword'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.confirmPassword}
                                />
                                {submitCount > 0 && formik.errors.confirmPassword && (
                                    <div className={styles.errorText}>
                                        {formik.errors.confirmPassword}
                                    </div>
                                )}
                            </div>
                            
                            <div className={styles.formFooter}>
                                <p>Already have an account? <Link to='/login' className={styles.Link}>Login here</Link></p>
                                <button 
                                    className={styles.account} 
                                    onClick={handleSubmitCount} 
                                    type='submit'
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Creating Account...' : 'Sign Up'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Register;