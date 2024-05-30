import Image from "next/image";
import React from "react";

export default function Hero() {
  return (
    <div className="relative w-full h-[470px] overflow-hidden">
      <Image
        className="object-cover object-top"
        src="/images/hero.png"
        alt="Hero"
        layout="fill"
        quality={100}
      />
    </div>
  );
}
