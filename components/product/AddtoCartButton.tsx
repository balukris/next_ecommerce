"use client";

type Props = {
  productId: string;
};

const AddtoCartButton = ({ productId }: Props) => {
  console.log({ productId });
  return <button className="btn btn-dash">Add to Cart</button>;
};

export default AddtoCartButton;
