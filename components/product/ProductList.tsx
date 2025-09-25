"use client";
import ProductCard from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/app/generated/prisma";

// api
import { getProducts } from "@/lib/api/products";

const ProductList = () => {
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  console.log({ data });

  return (
    <div className="grid grid-cols-1 place-items-center gap-16 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      {data?.length &&
        data.map((item: Product, inx: number) => {
          return (
            <ProductCard product={item} inx={inx} key={`Product-${inx}`} />
          );
        })}
    </div>
  );
};

export default ProductList;
