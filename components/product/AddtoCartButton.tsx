"use client";
import { useTransition, useState } from "react";
import { addToCart } from "@/app/product/[id]/action";

type Props = {
  productId: string;
};

export default function AddtoCartButton({ productId }: Props) {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const handleAdd = () => {
    startTransition(() => {
      addToCart(productId)
        .then(() => {
          setIsSuccess(true);
        })
        .catch((err) => {
          console.error("Failed to add to cart:", err);
        });
    });
  };
  return (
    <div>
      <button
        className="btn btn-active"
        onClick={handleAdd}
        disabled={isPending}
      >
        {isPending ? (
          <span className="loading loading-dots loading-sm"></span>
        ) : (
          "Add to Cart"
        )}
      </button>
      {isSuccess && !isPending && (
        <span className="mx-4 text-green-500">Added to cart</span>
      )}
    </div>
  );
}
