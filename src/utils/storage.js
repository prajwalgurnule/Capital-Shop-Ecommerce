// utils/storage.js
export const getBasket = () => {
    try {
        return JSON.parse(localStorage.getItem("basket")) || [];
    } catch (error) {
        console.error("Error reading basket from localStorage", error);
        return [];
    }
};

export const setBasket = (items) => {
    try {
        localStorage.setItem("basket", JSON.stringify(items));
    } catch (error) {
        console.error("Error writing to basket in localStorage", error);
    }
};

export const getWishlist = () => {
    try {
        return JSON.parse(localStorage.getItem("wishlist")) || [];
    } catch (error) {
        console.error("Error reading wishlist from localStorage", error);
        return [];
    }
};

export const setWishlist = (items) => {
    try {
        localStorage.setItem("wishlist", JSON.stringify(items));
    } catch (error) {
        console.error("Error writing to wishlist in localStorage", error);
    }
};

export const getBasketCount = () => {
    const basket = getBasket();
    return basket.reduce((sum, item) => sum + (item.count || 1), 0);
};

export const getWishlistCount = () => {
    return getWishlist().length;
};