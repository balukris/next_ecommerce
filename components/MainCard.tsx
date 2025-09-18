import Image from "next/image";
import { type ProductType } from "@/types/product";

type Props = {
  product: ProductType;
};

const MainCard = ({ product }: Props) => {
  return (
    <div className="card lg:card-side bg-base-300 my-4 shadow-sm">
      <figure>
        <Image
          src={product?.image}
          alt="Album"
          width={500}
          height={300}
          className="object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product?.title}</h2>
        <p>{product?.description}</p>
        <div className="card-actions justify-end"></div>
      </div>
    </div>
  );
};

export default MainCard;
