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

export const getAuth = () => {
    try {
        return JSON.parse(localStorage.getItem("auth")) || { isLogin: false, isAdmin: false };
    } catch (error) {
        console.error("Error reading auth from localStorage", error);
        return { isLogin: false, isAdmin: false };
    }
};

export const setAuth = (auth) => {
    try {
        localStorage.setItem("auth", JSON.stringify(auth));
    } catch (error) {
        console.error("Error writing to auth in localStorage", error);
    }
};