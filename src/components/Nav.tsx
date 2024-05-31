"use client";
import React from "react";
import { useCart } from "../cartContext";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  const { cart } = useCart();

  return (
    <div className="sticky top-0 z-50 bg-slate-100  p-4 px-8">
      <div className="flex items-center justify-between p-1">
        <Link href={"/"}>
          <Image
            className="h-10"
            src="logo.svg"
            alt="Logo"
            width={80}
            height={100}
          />
        </Link>
        <div className="flex space-x-4 align-middle">
          <Link href="/" className="text-gray-700 hover:text-gray-900">
            Home
          </Link>
          <a className="text-gray-700 hover:text-gray-900" href="#">
            Shop
          </a>
          <Link href="/about" className="text-gray-700 hover:text-gray-900">
            About
          </Link>
          <Link
            href="/checkout"
            className="relative flex justify-center align-middle"
          >
            <FaShoppingCart className="text-xl" />
            <span className="absolute left-1 z-10 -top-5  p-2a text-xl w-full ">
              {cart.length}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
