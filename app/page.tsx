import { prisma } from "@/lib/db/prisma";
import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import MainCard from "@/components/MainCard";

export const metadata: Metadata = {
  title: "Product List",
  description: "Detailed Description...",
};

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return (
    <main>
      <MainCard product={products?.[0]} />
      <div className="grid grid-cols-1 place-items-center gap-16 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {products.map((item, inx) => {
          return (
            <ProductCard product={item} inx={inx} key={`Product-${inx}`} />
          );
        })}
      </div>
    </main>
  );
}
