import { Product } from "@/app/generated/prisma";
import Image from "next/image";

type Props = {
  inx?: number;
  product: Product;
  key: string;
};

const ProductCard = ({ product, inx = 0, key }: Props) => {
  const isNew = true;
  return (
    <div className="card bg-base-100 w-96 shadow-sm" key={key}>
      <figure>
        <Image
          src={product?.image}
          alt={`Product Img-${inx}`}
          width={200}
          height={100}
          className="object-cover"
        />
      </figure>
      <div className="card-body">
        <div className="flex justify-between">
          <h2 className="card-title">{product?.name}</h2>
          {isNew ? <div className="badge badge-info">New</div> : null}
        </div>
        <p>{product?.description}</p>

        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
