import Nav from "@/components/Nav";
import Hero from "@/components/Hero";

import React from "react";
import Featured from "@/components/Featured";
import { CartProvider } from "../cartContext";
import ItemListWithFilter from "@/components/ItemListWithFilter";
export default function Home() {
  return (
    <div className="">
      <Hero />
      <Featured />
      <ItemListWithFilter />
    </div>
  );
}
