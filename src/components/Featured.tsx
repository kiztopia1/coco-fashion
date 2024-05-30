import React from "react";
import PocketBase from "pocketbase";
import ItemSm from "./ItemSm";
import ItemList from "./ItemList";

export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto",
  runtime = "nodejs",
  preferredRegion = "auto";

async function getItems() {
  const pb = new PocketBase("https://coco-fash.pockethost.io");
  let data = await pb.collection("products").getList(1, 50, {});

  const res = await fetch(
    "https://coco-fash.pockethost.io/api/collections/products/records?page=1&perPage=30",
    { cache: "no-store" }
  );
  data = await res.json();

  return data?.items?.map((item: any) => ({
    ...item,
    imageUrl: pb.files.getUrl(item, item.Image), // Assuming 'image' is the field name
  }));
}
export default async function Featured() {
  const items = await getItems();

  return (
    <div>
      <h1 className="pl-4 pt-6 text-4xl font-bold">Featured Products</h1>
      <ItemList />
      <h1 className="pl-4 pt-6 text-4xl font-bold">Best Seller</h1>
      <ItemList />
      <ItemList />
    </div>
  );
}
