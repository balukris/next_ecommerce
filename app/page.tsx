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
    <main>
      <MainCard product={products?.[0]} />
      <div className="grid grid-cols-3">
        {products.map((item, inx) => {
          return (
            <ProductCard product={item} inx={inx} key={`Product-${inx}`} />
          );
        })}
      </div>
    </main>
  );
}
