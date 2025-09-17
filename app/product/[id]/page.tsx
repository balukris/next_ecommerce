import { prisma } from "@/lib/db/prisma";
import Image from "next/image";
import { cache } from "react";
import AddtoCartButton from "@/components/product/AddtoCartButton";

type Props = {
  params: {
    id: string;
  };
};

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  return product;
});

export async function generateMetadata({ params: { id } }: Props) {
  const product = await getProduct(id);
  return {
    title: product?.name,
    description: product?.description,
  };
}

const Product = async ({ params: { id } }: Props) => {
  const product = await getProduct(id);

  return (
    <main>
      <div className="my-2">
        <h1 className="text-4xl">{product?.name}</h1>
      </div>
      <div className="relative my-2 w-full">
        {product?.image && (
          <Image
            src={product.image}
            width={800}
            height={400}
            alt="img-details"
            className="object-fill"
          />
        )}
      </div>
      <div className="card bg-primary text-primary-content w-full">
        <div className="card-body">
          <p>{product?.description}</p>
          <div className="card-actions justify-end">
            {product?.id && <AddtoCartButton productId={product.id} />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Product;
