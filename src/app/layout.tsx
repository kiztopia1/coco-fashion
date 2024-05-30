import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../cartContext";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coco Fashion",
  description: "Coco fashion clothing and jewelry",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-slate-100 "}>
        <CartProvider>
          <>
            <Nav></Nav>
            <div className="mx-10">{children}</div>
            <Footer />
          </>
        </CartProvider>
      </body>
    </html>
  );
}

// const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   return (
//     <html lang="en">
//       <body>
//         <CartProvider>{children}</CartProvider>
//       </body>
//     </html>
//   );
// };
