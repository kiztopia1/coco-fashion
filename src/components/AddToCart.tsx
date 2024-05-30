"use client";
import React from "react";
import { useCart } from "../cartContext";

export default function AddToCart({ id, name }: any) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    // Define the item to be added to the cart
    const newItem = {
      id: id,
      name: name, // Replace with actual item name
    };

    // Add the item to the cart
    addToCart(newItem);
  };

  return (
    <div>
      <button onClick={handleAdd}>
        <p className="border p-2 bg-slate-400 rounded hover:bg-slate-500">
          Add To Cart
        </p>
      </button>
    </div>
  );
}
