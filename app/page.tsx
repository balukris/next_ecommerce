// "use client";

// import useSWR from "swr";
import ProductCard from "@/components/ProductCard";
import MainCard from "@/components/MainCard";
import { type ProductType } from "@/types/product";

// const fetcher = (url: string) =>
//   fetch(url).then((res) => {
//     if (!res.ok) throw new Error(`Fetcher error: ${res.status}`);
//     return res.json();
//   });

export default async function Home() {
  const res = await fetch("https://fakestoreapi.com/products", {
    // cache: 'no-store' // uncomment to force fresh fetch each request
    next: { revalidate: 60 }, // optional ISR: revalidate every 60s
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  // const { data, error, isLoading, mutate } = useSWR<ProductType[]>(
  //   "https://fakestoreapi.com/products",
  //   fetcher,
  //   {
  //     revalidateOnFocus: true,
  //     revalidateOnReconnect: true,
  //     // refreshInterval: 0 // enable polling if needed
  //   },
  // );

  const products: ProductType[] = await res.json();

  // const products = data;

  // if (error)
  //   return (
  //     <div className="p-4 text-red-600">
  //       Failed to load: {String(error.message)}
  //     </div>
  //   );
  // if (isLoading || !data) return <div className="p-4">Loading...</div>;

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
