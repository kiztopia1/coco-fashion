"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
} from "react";

interface Item {
  id: string;
  name: string;
}

interface CartContextType {
  cart: Item[];
  addToCart: (item: Item) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Item[]>([]);

  const addToCart = (item: Item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (itemId: string) => {
    const index = cart.findIndex((item) => item.id === itemId);
    if (index > -1) {
      setCart((prevCart) => [
        ...prevCart.slice(0, index),
        ...prevCart.slice(index + 1),
      ]);
    }
  };

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

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
