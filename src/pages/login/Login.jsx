import React, { useState, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import styles from "./Login.module.css"; 
import axios from 'axios';
import { base_url } from "../../middleware/data/Data";
import Swal from 'sweetalert2';
import { LoginContext } from "../../App";
import { FiArrowLeft } from 'react-icons/fi';

function Login() {
    const { isLogin, setIsLogin, isAdmin, setIsAdmin } = useContext(LoginContext);
    const [submitCount, setSubmitCount] = useState(0); 
    const [users, setUsers] = useState([]); 
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if there's remembered user data
        const rememberedUser = localStorage.getItem('rememberedUser');
        if (rememberedUser) {
            const { email, password } = JSON.parse(rememberedUser);
            formik.setValues({
                firstInput: email,
                password: password
            });
            setRememberMe(true);
        }

        // Fetch users
        setIsLoading(true);
        axios.get(base_url + "users")
            .then(res => {
                setUsers(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Error fetching users:", err);
                setIsLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Connection Error',
                    text: 'Failed to connect to server. Please try again later.'
                });
            });
    }, []);

    const handleSubmitCount = () => {
        setSubmitCount(prevCount => prevCount + 1); 
    };

    const handleRememberMe = (e) => {
        setRememberMe(e.target.checked);
    };

    const validationSchema = Yup.object().shape({
        firstInput: Yup.string()
            .required('Email is required!')
            .email('Please enter a valid email address!'),
        password: Yup.string()
            .required('Password is required!')
            .min(6, 'Password must be at least 6 characters long!')
            .matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number!'),
    });

    const formik = useFormik({
        initialValues: {
            firstInput: '',
            password: '',
        },
        validationSchema,
        onSubmit: values => {
            const { firstInput, password } = values;
            const user = users.find(user => 
                (user.email === firstInput) && user.password === password
            );

            if (user) {
                // Store user data in localStorage
                localStorage.setItem('userData', JSON.stringify({
                    id: user.id,
                    fullName: user.name || user.fullName || '',
                    email: user.email,
                    phone: user.phone || '',
                    address: user.address || '',
                    city: user.city || '',
                    country: user.country || '',
                    postalCode: user.postalCode || '',
                    isAdmin: user.isAdmin || false
                }));

                // Remember credentials if checkbox is checked
                if (rememberMe) {
                    localStorage.setItem('rememberedUser', JSON.stringify({
                        email: firstInput,
                        password: password
                    }));
                } else {
                    localStorage.removeItem('rememberedUser');
                }

                setIsLogin(true);
                if (user.isAdmin) {
                    setIsAdmin(true);
                    navigate('/admin/dashboard'); 
                } else {
                    navigate('/');
                }

                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful!',
                    text: `Welcome back, ${user.name || user.fullName || 'User'}!`,
                    timer: 2000,
                    showConfirmButton: false
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: "Invalid email address or password"
                });
            }
        },
    });

    if (isLogin) {
        return (
            <div className={styles.container}>
                <div className={styles.box}>
                    <div className={styles.header}>
                        <h1>Already Logged In</h1>
                        <p>You are already logged in.</p>
                    </div>
                    <div className={styles.logout}>
                        <Link to="/" className={styles.logoutLink}>Home</Link>
                        <Link to="/products" className={styles.logoutLink}>Products</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <Link to="/" className={styles.backLink}>
                    <FiArrowLeft className={styles.backIcon} /> Back To Home
                </Link>
                <div className={styles.header}>
                    <h1>Login</h1>
                    <p>Please login to your account</p>
                </div>
                
                {isLoading ? (
                    <div className={styles.loading}>
                        <div className={styles.spinner}></div>
                        <p>Loading...</p>
                    </div>
                ) : (
                    <div className={styles.form}>
                        <form onSubmit={formik.handleSubmit}>
                            <div className={styles.row}>
                                <label htmlFor="firstInput">Email Address</label>
                                <input
                                    placeholder='Email address'
                                    className={`${styles.LoginInput} ${formik.errors.firstInput && submitCount > 0 ? styles.errorInput : ''}`}
                                    type="text"
                                    id='firstInput'
                                    name='firstInput'
                                    onChange={formik.handleChange} 
                                    onBlur={formik.handleBlur}
                                    value={formik.values.firstInput} 
                                />
                                {submitCount > 0 && formik.errors.firstInput && (
                                    <div className={styles.errorText}>
                                        {formik.errors.firstInput}
                                    </div>
                                )}
                            </div>   
                            <div className={styles.row}>
                                <label htmlFor="password">Password</label>
                                <input 
                                    placeholder='Password'
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
                            <div className={styles.checkbox}>
                                <div className={styles.checkboxGroup}>
                                    <input 
                                        type="checkbox" 
                                        id="rememberMe"
                                        checked={rememberMe}
                                        onChange={handleRememberMe}
                                    />
                                    <label htmlFor="rememberMe">Remember me</label>
                                </div>
                                <Link to="/forgot-password" className={styles.Link}>Forgot Password?</Link>
                            </div> 
                            <div className={styles.formFooter}>
                                <p>Don't have an account? <Link to='/register' className={styles.Link}>Sign Up</Link> here</p>
                                <button 
                                    className={styles.account} 
                                    onClick={handleSubmitCount} 
                                    type='submit'
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Logging in...' : 'Login'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;