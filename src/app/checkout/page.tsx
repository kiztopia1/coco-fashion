"use client";

import React, { useEffect, useState } from "react";
import PocketBase from "pocketbase";
import { useCart } from "../../cartContext";
import { FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter

interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
}

async function getProduct(productId: string): Promise<Product> {
  const pb = new PocketBase("https://coco-fash.pockethost.io/");
  const data = await pb.collection("products").getOne(productId);
  const newData: Product = {
    id: data.id,
    name: data.Name,
    price: data.Price,
    description: data.Description,
    imageUrl: pb.files.getUrl(data, data.Image) ?? "/path/to/default/image.jpg",
  };
  return newData;
}

const Page: React.FC = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const [items, setItems] = useState<Product[]>([]);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const router = useRouter(); // Initialize useRouter

  const handleOrder = async () => {
    if (!name || !phone) {
      alert("Please enter your name and phone number.");
      return;
    }

    const orderSummary = JSON.stringify(items);

    const orderData = {
      name: name,
      phone: phone,
      order: orderSummary,
    };

    try {
      const response = await fetch(
        "https://coco-fash.pockethost.io/api/collections/orders/records",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      if (response.ok) {
        clearCart(); // Clear the cart after successful order placement
        router.push("/checkout/success"); // Navigate to the success page
      } else {
        alert("Failed to place order. Please try again later.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert(
        "An error occurred while placing your order. Please try again later."
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedItems = await Promise.all(
        cart.map((product) => getProduct(product.id))
      );
      setItems(fetchedItems);
    };
    window.scrollTo(0, 0);

    fetchData();
  }, [cart]); // Adding cart as a dependency to re-fetch items when cart changes

  // Function to create order summary
  const createOrderSummary = (items: Product[]) => {
    const summary = items.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        acc.push({ ...item, quantity: 1 });
      }
      return acc;
    }, [] as (Product & { quantity: number })[]);
    return summary;
  };

  const orderSummary = createOrderSummary(items);

  return (
    <div>
      <h1 className="text-4xl font-bold mt-5">Checkout</h1>
      <div className="flex">
        <div className="w-3/4">
          {items.map((item) => (
            <div key={item.id} className="flex m-3 relative">
              <Image
                src={item.imageUrl ?? "/default.png"}
                alt={item.name}
                width={200}
                height={300}
                className="h-auto w-32 mr-7"
              />
              <div className="">
                <p className="text-xl font-bold">{item.name}</p>
                <p>{item.price} Birr</p>
                <button
                  className="absolute right-12 bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove from Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="w-1/4 p-4">
          <h1 className="font-bold text-2xl underline">Order Summary</h1>
          <ul>
            {orderSummary.map((item) => (
              <li key={item.id} className="my-2">
                <div className="flex justify-between">
                  <p className="text-lg font-bold">{item.name}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <p className="text-sm">{item.price} Birr</p>
                <p>Total: {item.price * item.quantity} Birr</p>
                <hr />
              </li>
            ))}
          </ul>
          <div className="font-bold text-xl my-4">
            Total:{" "}
            {orderSummary.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            )}{" "}
            Birr
          </div>
          <hr />
          <div>
            <h1 className="font-bold text-xl mt-4">Contact info</h1>

            <label htmlFor="name">Name</label>
            <br />
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <label htmlFor="phone">Phone Number</label>
            <br />
            <input
              type="tel"
              name="phone"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <br />
            <button
              className="p-1 bg-slate-400 font-bold text-xl rounded my-2"
              onClick={handleOrder}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
