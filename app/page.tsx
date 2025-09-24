import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/queryClient";

// import { prisma } from "@/lib/db/prisma";
// import ProductCard from "@/components/ProductCard";
// import MainCard from "@/components/MainCard";
import ProductList from "@/components/product/ProductList";

// api
import { getProducts } from "@/lib/api/products";

export default async function Home() {
  // const products = await prisma.product.findMany({
  //   orderBy: {
  //     id: "desc",
  //   },
  // });

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <main className="my-4 w-full">
      {/* <MainCard product={products?.[0]} /> */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductList />
      </HydrationBoundary>
    </main>
  );
}
