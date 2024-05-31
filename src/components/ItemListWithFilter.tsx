"use client";
import React, { useState, useEffect } from "react";
import PocketBase from "pocketbase";
import Image from "next/image";
import Link from "next/link";
import AddToCart from "./AddToCart";

// Page caching and rendering configuration
export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto",
  runtime = "nodejs",
  preferredRegion = "auto";

// Fetch items from PocketBase and shuffle them
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

  // Shuffle items
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

export default function ItemListWithFilter() {
  // State declarations
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch items on component mount
  useEffect(() => {
    async function fetchItems() {
      const fetchedItems: any = await getItems();
      setItems(fetchedItems);
      setFilteredItems(fetchedItems);
    }
    fetchItems();
  }, []);

  // Filter items whenever search query or selected categories change
  useEffect(() => {
    const filterItems = () => {
      const lowerCaseSearchQuery = searchQuery.toLowerCase();
      const newFilteredItems = items.filter((item: any) => {
        const matchesSearchQuery =
          searchQuery === "" ||
          item.Name.toLowerCase().includes(lowerCaseSearchQuery);
        const matchesCategory =
          selectedCategories.length === 0 ||
          selectedCategories.includes(item.Category);
        return matchesSearchQuery && matchesCategory;
      });
      setFilteredItems(newFilteredItems);
    };
    filterItems();
  }, [searchQuery, selectedCategories, items]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle category filter change
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category]
    );
  };

  // Handle previous button click for carousel
  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 4 + filteredItems.length) % filteredItems.length
    );
  };

  // Handle next button click for carousel
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 4) % filteredItems.length);
  };

  // Get displayed items for the carousel
  const getDisplayedItems = () => {
    if (filteredItems.length <= 4) return filteredItems;
    const end = currentIndex + 4;
    return filteredItems
      .slice(currentIndex, end)
      .concat(filteredItems.slice(0, Math.max(end - filteredItems.length, 0)));
  };

  const displayedItems = getDisplayedItems();

  return (
    <div className="flex my-6">
      <div className="w-1/4">
        <h1 className="font-bold text-4xl py-3">Filter</h1>
        <div>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <hr />
          <h1 className="font-bold">Categories</h1>
          <hr />
          <ul>
            <li>
              <input
                type="checkbox"
                checked={selectedCategories.includes("T-shirts")}
                onChange={() => handleCategoryChange("T-shirts")}
              />
              <label>T-Shirts</label>
            </li>
            <li>
              <input
                type="checkbox"
                checked={selectedCategories.includes("Sweaters")}
                onChange={() => handleCategoryChange("Sweaters")}
              />
              <label>Sweaters</label>
            </li>
            <li>
              <input
                type="checkbox"
                checked={selectedCategories.includes("Kids")}
                onChange={() => handleCategoryChange("Kids")}
              />
              <label>Kids</label>
            </li>
            <li>
              <input
                type="checkbox"
                checked={selectedCategories.includes("Pants")}
                onChange={() => handleCategoryChange("Pants")}
              />
              <label>Pants</label>
            </li>
          </ul>
          <hr />
        </div>
      </div>
      <div className="relative min-h-44 w-3/4">
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
    </div>
  );
}

function ItemSm({ item }: any) {
  return (
    <div className="">
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
