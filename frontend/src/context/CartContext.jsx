import React, { createContext, useState, useEffect, useContext } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (course) => {
    if (!cartItems.some((item) => item.id === course.id)) {
      setCartItems((prevItems) => [...prevItems, course]);
    }
  };

  const removeFromCart = (courseId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== courseId),
    );
  };

  const isInCart = (courseId) => {
    return cartItems.some((item) => item.id === courseId);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, isInCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
