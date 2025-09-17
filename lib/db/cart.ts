import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { Prisma } from "@/app/generated/prisma";

export type CartWithProducts = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } };
}>;

export type ShoppingCart = CartWithProducts & {
  size: number;
  subtotal: number;
};

export async function getCart(): Promise<ShoppingCart | null> {
  // Checking whether id is present in cookie
  const localcartId = (await cookies()).get("localcartId")?.value;
  const cart = localcartId
    ? await prisma.cart.findUnique({
        where: { id: localcartId },
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

export async function addCart(): Promise<ShoppingCart> {
  const newCart = await prisma.cart.create({ data: {} });
  // Not ideal decrypt and set security settings for cookie
  // Setting id in cookie for not logged in users
  (await cookies()).set("localcartId", newCart.id);
  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
  };
}
