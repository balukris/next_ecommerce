import { prisma } from "@/lib/db/prisma";
import ProductCard from "@/components/ProductCard";
import MainCard from "@/components/MainCard";

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return (
    <main className="w-full">
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
