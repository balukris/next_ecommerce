import Image from "next/image";
import Link from "next/link";

// Types
import { type ProductType } from "@/types/product";

type Props = {
  inx?: number;
  product: ProductType;
};

const ProductCard = ({ product, inx = 0 }: Props) => {
  const isNew = true;
  return (
    <Link href={`/product/${product.id}`}>
      <div
        className="card bg-base-300 flex max-h-[500px] w-96 items-center shadow-sm"
        key={`Product-${inx}`}
      >
        <figure>
          <Image
            src={product?.image}
            alt={`Product Img-${inx}`}
            width={1000}
            height={100}
            className="object-fill"
          />
        </figure>
        <div className="card-body">
          <div className="flex justify-between">
            <h2 className="card-title">{product?.title}</h2>
            {isNew ? <div className="badge badge-info">New</div> : null}
          </div>
          <p>{product?.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
