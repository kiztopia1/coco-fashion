"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

export default function ItemSm({ item }: any) {
  const { id, name, description, price, image, imageUrl } = item || {};
  useEffect(() => {
    console.log(item, "haha");
  }, []);
  return (
    <div className="border p-4">
      <Image
        src={item.imageUrl}
        alt={item.name}
        width={500}
        height={500}
        className="object-cover"
      />
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  );
}
