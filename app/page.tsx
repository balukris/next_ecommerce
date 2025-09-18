import ProductCard from "@/components/ProductCard";
import MainCard from "@/components/MainCard";
import { type ProductType } from "@/types/product";

export default async function Home() {
  const res = await fetch("https://fakestoreapi.com/products", {
    // cache: 'no-store' // uncomment to force fresh fetch each request
    next: { revalidate: 60 }, // optional ISR: revalidate every 60s
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  const products: ProductType[] = await res.json();

  return (
    <main className="my-4 w-full">
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
