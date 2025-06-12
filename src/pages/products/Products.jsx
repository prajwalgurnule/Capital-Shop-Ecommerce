import React, { useState, useEffect } from 'react';
import styles from './Products.module.css';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import Card from '../../user/components/Card';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { getAllproducts } from "./../../middleware/products"; 

const categories = [
    "All",
    "men's clothing",
    "women's clothing",
    "baby's clothing",
    "accessory"
];
const sizes = [
    "All",
    "small",
    "medium",
    "large"
];
const colors = [
    "All",
    "multi-colored",
    "black",
    "green",
    "red",
    "white",
    "blue",
    "gray",
    "brown"
];

function Products() {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialCategory = searchParams.get('category') || 'All';
    const location = useLocation();

    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({
        category: initialCategory,
        color: 'All',
        size: 'All',
        priceRange: [0, 230]
    });
    const [openFilter, setOpenFilter] = useState('');

    const getHeaderTitle = () => {
        switch(filters.category) {
            case "men's clothing":
                return "Men's Collection";
            case "women's clothing":
                return "Women's Collection";
            case "baby's clothing":
                return "Baby's Collection";
            default:
                return "All Products";
        }
    };

    // Function to get breadcrumb text for Products link
    const getProductsBreadcrumbText = () => {
        return filters.category === 'All' ? 'Products' : getHeaderTitle();
    };

    const toggleFilterDropdown = (filterType) => {
        setOpenFilter(prev => prev === filterType ? '' : filterType);
    };

    const handleFilterChange = (value, filterType) => {
        const newFilters = {
            ...filters,
            [filterType]: value,
        };
        
        setFilters(newFilters);
        setOpenFilter('');
        
        if (filterType === 'category') {
            const params = new URLSearchParams();
            if (value !== 'All') {
                params.set('category', value);
            }
            setSearchParams(params);
        }
    };

    const handlePriceChange = (e, index) => {
        const value = parseInt(e.target.value);
        const newPriceRange = [...filters.priceRange];
        newPriceRange[index] = value;
        
        setFilters({
            ...filters,
            priceRange: newPriceRange
        });
    };

    useEffect(() => {
        getAllproducts().then(res => {
            setProducts(res);
        });
    }, []);

    useEffect(() => {
        const category = searchParams.get('category') || 'All';
        setFilters(prev => ({
            ...prev,
            category,
        }));
    }, [searchParams]);

    const filteredProducts = products.filter((product) => {
        const categoryMatch = filters.category === 'All' || product.category === filters.category;
        const sizeMatch = filters.size === 'All' || product.size === filters.size;
        const colorMatch = filters.color === 'All' || product.color === filters.color;
        const priceMatch = product.price >= filters.priceRange[0] && 
                          product.price <= filters.priceRange[1];

        return categoryMatch && sizeMatch && colorMatch && priceMatch;
    });

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>{getHeaderTitle()}</h1>
                <div className={styles.links}>
                    <Link to='/' className={styles.link}>Home</Link>
                    <hr className={styles.hr} />
                    <Link 
                        to={filters.category === 'All' ? "/products" : `/products?category=${filters.category}`} 
                        className={styles.link}
                    >
                        {getProductsBreadcrumbText()}
                    </Link>
                </div>
            </div>
            <div className={styles.products}>
                <div className={styles.left}>
                    <div className={styles.content}>
                        <div className={styles.categories}>
                            {["category", "size", "color"].map((filterType, index) => (
                                <div className={styles.category} key={index}>
                                    <div className={styles.dropdown} onClick={() => toggleFilterDropdown(filterType)}>
                                        <div className={styles.selected}>
                                            <span>{filters[filterType] !== "All" ? filters[filterType] : `Select ${filterType.charAt(0).toUpperCase() + filterType.slice(1)}`}</span>
                                            <span className={`${styles.arrow} ${openFilter === filterType ? styles.open : ''}`}>
                                                {openFilter === filterType ? <FaChevronUp style={{ color: "#bab9b5" }} /> : <FaChevronDown style={{ color: "#bab9b5" }} />}
                                            </span>
                                        </div>
                                        <ul className={`${styles.list} ${openFilter === filterType ? styles.open : ''}`}>
                                            {(filterType === 'category' ? categories : filterType === 'size' ? sizes : colors).map((item, idx) => (
                                                <li
                                                    key={idx}
                                                    onClick={() => {
                                                        handleFilterChange(item, filterType);
                                                        toggleFilterDropdown(filterType); 
                                                    }}
                                                    className={filters[filterType] === item ? styles.active : ""}
                                                >
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                            
                            <div className={styles.category}>
                                <div className={styles.dropdown} onClick={() => toggleFilterDropdown('price')}>
                                    <div className={styles.selected}>
                                        <span>Price Range</span>
                                        <span className={`${styles.arrow} ${openFilter === 'price' ? styles.open : ''}`}>
                                            {openFilter === 'price' ? <FaChevronUp style={{ color: "#bab9b5" }} /> : <FaChevronDown style={{ color: "#bab9b5" }} />}
                                        </span>
                                    </div>
                                </div>
                                <div className={`${styles.priceFilter} ${openFilter === 'price' ? styles.open : ''}`}>
                                    <div className={styles.priceRange}>
                                        <span>${filters.priceRange[0]}</span>
                                        <span>${filters.priceRange[1]}</span>
                                    </div>
                                    <div className={styles.sliderContainer}>
                                        <input 
                                            type="range" 
                                            min="0" 
                                            max="230" 
                                            value={filters.priceRange[0]} 
                                            onChange={(e) => handlePriceChange(e, 0)}
                                            className={styles.slider}
                                        />
                                        <input 
                                            type="range" 
                                            min="0" 
                                            max="230" 
                                            value={filters.priceRange[1]} 
                                            onChange={(e) => handlePriceChange(e, 1)}
                                            className={styles.slider}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.filter}></div>
                        <div className={styles.sort}></div>
                    </div>
                </div>
                <div className={styles.right}>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((prod) => (
                            <Card
                                id={prod.id}
                                key={prod.id}
                                name={prod.name}
                                img={prod.img}
                                price={prod.price}
                                withoutDiscount={prod.withoutDiscount}
                                products={products}
                            />
                        ))
                    ) : <p>No products found.</p>}
                </div>
            </div>
        </div>
    );
}

export default Products;