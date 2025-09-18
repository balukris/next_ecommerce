import CartCard from "@/components/CartCard";
import { getCart } from "@/lib/db/cart";

const CartPage = async () => {
  const cart = await getCart();
  return (
    <main className="my-4">
      <h1 className="my-4 text-4xl">Cart Page</h1>
      <div className="grid grid-cols-1 place-items-center gap-16 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {cart?.items?.map((item) => (
          <CartCard cart={item} key={item?.id} />
        ))}
      </div>
    </main>
  );
};

export default CartPage;
