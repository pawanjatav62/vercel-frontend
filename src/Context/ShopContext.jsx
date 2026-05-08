import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

// const API = "https://vercel-backend-q3tv.onrender.com/";

// Default cart
const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index <= 300; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {

  const [all_product, setAll_product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  // 🔥 Fetch



  useEffect(() => {
    console.log("🔥 USE EFFECT RUN");

    // fetch("http://localhost:4000/allproducts")
    fetch("https://vercel-backend-q3tv.onrender.com/allproducts")
      .then((res) => res.json())
      .then((data) => setAll_product(data));

    const token = localStorage.getItem("auth-token");

    console.log("TOKEN:", token);

    if (token) {
      console.log("🔥 CALLING GET CART API");

      // fetch(  "http://localhost:4000/getcart"
    fetch("https://vercel-backend-q3tv.onrender.com/getcart" ,
       {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({}),
      })
        .then((res) => {
          console.log("STATUS:", res.status);
          return res.json();
        })
        .then((data) => {
          console.log("CART DATA:", data);
          setCartItems(data);
        })
        .catch((err) => console.log("❌ Cart Error:", err));
    }
  }, []);

  // Add to cart
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] + 1,
    }));
    if (localStorage.getItem('auth-token')) {
      // fetch('http://localhost:4000/addtocart', {
      //   method: 'POST',
      //   headers: {
      //     Accept: 'application/form-data',
      //     'auth-token': `${localStorage.getItem(`auth-token`)}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ "itemId": itemId }),

      // })

      // fetch('http://localhost:4000/addtocart'
    fetch("https://vercel-backend-q3tv.onrender.com/addtocart"
        , {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));

    }

  };

  // Remove from cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      // [itemId]: prev[itemId] - 1
      [itemId]: prev[itemId] > 0 ? prev[itemId] - 1 : 0,
    }));

    if (localStorage.getItem('auth-token')) {
      // fetch('http://localhost:4000/removefromcart'
    fetch("https://vercel-backend-q3tv.onrender.com/removefromcart", {
        method: 'POST',
        headers: {
          // Accept: 'application/form-data',
          Accept: 'application/json',
          'auth-token': `${localStorage.getItem(`auth-token`)}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "itemId": itemId }),

      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  // ✅ Total Amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );

        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }

    return totalAmount;
  };

  // ✅ Total Items
  const getTotalCartItems = () => {
    let totalItem = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }

    return totalItem;
  };

  const clearCart = () => {
    setCartItems(getDefaultCart());
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
  };


  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;