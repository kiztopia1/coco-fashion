import React from "react";
import PocketBase from "pocketbase";

let getItems = async () => {
  const pb = new PocketBase("http://127.0.0.1:8090");
  const data = await pb.collection("items").getList(1, 20);
  return data?.items as any[];
};

export default async function admin() {
  const items = await getItems();
  return (
    <div>
      <h1>Items</h1>
      <div>
        {items?.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    </div>
  );
}
