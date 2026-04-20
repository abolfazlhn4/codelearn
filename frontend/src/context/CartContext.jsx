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

  // تفاوت کلیدی: اینجا کل آبجکت دوره رو اضافه می‌کنیم نه فقط ID
  const addToCart = (course) => {
    // چک می‌کنیم که دوره از قبل در سبد خرید نباشد
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

  // یک تابع برای خالی کردن سبد خرید که بعدا در صفحه پرداخت لازم میشه
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
