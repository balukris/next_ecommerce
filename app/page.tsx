import { prisma } from "@/lib/db/prisma";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return (
    <main>
      {products.map((item, inx) => {
        return <ProductCard product={item} inx={inx} key={`Product-${inx}`} />;
      })}
    </main>
  );
}
