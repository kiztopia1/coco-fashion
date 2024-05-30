import React from "react";
import PocketBase from "pocketbase";
import Image from "next/image";
import AddToCart from "@/components/AddToCart";

async function getProduct(productId: string) {
  const pb = new PocketBase("https://coco-fash.pockethost.io/");
  let data = await pb.collection("products").getOne(productId);
  //   const res = await fetch(
  //     `https://coco-fash.pockethost.io/api/collections/products/records/${noteId}`,
  //     {
  //       next: { revalidate: 10 },
  //     }
  //   );
  //   const data = await res.json();
  let newData: any = { ...data, imageUrl: pb.files.getUrl(data, data.Image) };
  return newData;
}

export default async function ProductPage({ params }: any) {
  const product = await getProduct(params.id);

  return (
    <div className="flex justify-center">
      <div className="flex m-10 w-[880px] bg-slate-100">
        <Image
          src={product.imageUrl}
          alt={product.Name}
          width={200}
          height={400}
          className="h-auto w-auto"
        />
        <div className="px-9">
          <h1 className="text-3xl">{product.Name}</h1>
          <div>
            <h3 className=" font-bold">{product.Price} Birr</h3>

            <p className="py-2 text-sm"> {product.created}</p>
            <span className="py-2">
              {product.Description.substring(5, 200)}
            </span>
          </div>
          <div className="mt-4">
            <AddToCart id={product.id} name={product.Name} />
          </div>
        </div>
      </div>
    </div>
  );
}
