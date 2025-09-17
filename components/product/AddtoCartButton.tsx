type Props = {
  productId: string;
};

export default function AddtoCartButton({ productId }: Props) {
  console.log(productId);
  return <button className="btn btn-active">Add to Cart</button>;
}
