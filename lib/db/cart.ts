import { cookies } from "next/headers";
import { prisma } from "./prisma";

export async function addCart() {
  const newCart = await prisma.cart.create({ data: {} });
  // not ideal
  (await cookies()).set("localCrtId", newCart.id);
}

export async function getCart() {
  const localCrtId = (await cookies()).get("localCrtItem")?.value;

  const cart = localCrtId
    ? await prisma.cart.findUnique({
        where: { id: localCrtId },
        include: { items: { include: { product: true } } },
      })
    : null;
  if (!cart) return null;
  return {
    ...cart,
    size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: cart.items.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0,
    ),
  };
}
