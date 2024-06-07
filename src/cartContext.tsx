"use client"; // Indicates this file is to be used on the client side

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
} from "react";

// Define the structure of an item
interface Item {
  id: string;
  name: string;
}

// Define the shape of the context data and functions
interface CartContextType {
  cart: Item[];
  addToCart: (item: Item) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
}

// Create a context with a default value of undefined
const CartContext = createContext<CartContextType | undefined>(undefined);

// Define the props for the CartProvider component
interface CartProviderProps {
  children: ReactNode;
}

// The CartProvider component provides the cart state and functions to its children
export const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Item[]>([]);

  // Function to add an item to the cart
  const addToCart = (item: Item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  // Function to remove an item from the cart by its ID
  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  // Function to clear all items from the cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
