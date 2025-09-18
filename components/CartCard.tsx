"use client";
import { useTransition, useState } from "react";
import Image from "next/image";
import { ShoppingCartItem } from "@/lib/db/cart";
import { formatPrice } from "@/utils/utils";
import { modifyCart } from "@/app/cart-page/action";

const CartCard = ({ cart }: { cart: ShoppingCartItem }) => {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (productId: string, quantity: number) => {
    startTransition(() => {
      modifyCart(productId, quantity)
        .then(() => {
          setIsSuccess(true);
        })
        .catch((err) => {
          console.error("Failed to add to cart:", err);
        });
    });
  };
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <Image src={cart.product.image} alt="Shoes" width={500} height={300} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{cart.product.name}</h2>
        <p>{cart.product.description}</p>

        <div className="mt-3 grid grid-cols-2 items-center gap-3">
          <div>
            <p className="text-muted text-xs">Price</p>
            <p className="text-lg font-semibold">
              {formatPrice(cart.product.price)}
            </p>
          </div>

          <div>
            <label htmlFor="quantity" className="text-muted text-xs">
              Quantity
            </label>
            <select
              id="quantity"
              className="select select-bordered w-full max-w-xs"
              value={cart.quantity}
              onChange={(e) =>
                handleChange(cart.id, Number(e.target.value || 0))
              }
            >
              {Array.from({ length: 11 }, (_, i) => i).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="card-actions mt-4 items-center justify-between">
          <div>
            <p className="text-muted text-xs">Total</p>
            <p className="text-xl font-bold">
              {formatPrice(cart.product.price * cart.quantity)}
            </p>
          </div>

          <div className="flex gap-2">
            {isPending ? (
              <span className="loading loading-dots loading-sm"></span>
            ) : (
              <button className="btn btn-primary">Buy Now</button>
            )}
          </div>
          {isSuccess && !isPending && (
            <span className="mx-4 text-green-500">Modified</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartCard;
