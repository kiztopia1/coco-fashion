import Nav from "@/components/Nav";
import Hero from "@/components/Hero";

import React from "react";
import Featured from "@/components/Featured";
import { CartProvider } from "../cartContext";
export default function Home() {
  return (
    <div className="">
      <Hero />
      <Featured />
    </div>
  );
}
