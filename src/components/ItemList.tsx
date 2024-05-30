"use client";
import React, { useState, useEffect } from "react";
import PocketBase from "pocketbase";
import Image from "next/image";
import Link from "next/link";
import AddToCart from "./AddToCart";

export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto",
  runtime = "nodejs",
  preferredRegion = "auto";

async function getItems() {
  const pb = new PocketBase("https://coco-fash.pockethost.io/");
  let data = await pb.collection("products").getList(1, 50, {});

  const res = await fetch(
    "https://coco-fash.pockethost.io/api/collections/products/records?page=1&perPage=30",
    { cache: "no-store" }
  );
  data = await res.json();

  const items = data?.items?.map((item) => ({
    ...item,
    imageUrl: pb.files.getUrl(item, item.Image), // Assuming 'Image' is the field name
  }));

  // Shuffle the items using Fisher-Yates shuffle algorithm
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

export default function ItemList() {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchItems() {
      const fetchedItems: any = await getItems();
      setItems(fetchedItems);
    }
    fetchItems();
  }, []);

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 4 + items.length) % items.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 4) % items.length);
  };

  const getDisplayedItems = () => {
    if (items.length <= 4) return items;
    const end = currentIndex + 4;
    return items
      .slice(currentIndex, end)
      .concat(items.slice(0, Math.max(end - items.length, 0)));
  };

  const displayedItems = getDisplayedItems();

  return (
    <div className="relative min-h-44">
      <div className="flex items-center relative">
        <button
          onClick={handlePrev}
          className="absolute left-0 z-10 p-2 w-10 bg-gray-200 rounded-full"
        >
          &lt;
        </button>
        <div className="flex overflow-hidden w-full">
          {displayedItems.map((item: any) => (
            <div key={item.id} className="w-1/4 p-2">
              <ItemSm item={item} />
            </div>
          ))}
        </div>
        <button
          onClick={handleNext}
          className="absolute right-0 z-10 w-10 p-2 bg-gray-200 rounded-full"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

function ItemSm({ item }: any) {
  return (
    <div
      className="
    "
    >
      <Link href={"/product/" + item.id} className=" p-4">
        <Image
          src={item.imageUrl}
          alt={item.Name}
          width={500}
          height={200}
          className="object-cover h-[300px]"
        />
      </Link>
      <h2 className="font-bold f-size-2">{item.Name}</h2>
      <div className="flex justify-between items-center">
        <p>{item.Price} Birr</p>
        <AddToCart id={item.id} name={item.Name} />
      </div>
    </div>
  );
}
