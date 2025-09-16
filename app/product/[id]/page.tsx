import { prisma } from "@/lib/db/prisma";

type Props = {
  params: {
    id: string;
  };
};

const Product = async ({ params: { id } }: Props) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  console.log({ product });
  return <div>product</div>;
};

export default Product;
