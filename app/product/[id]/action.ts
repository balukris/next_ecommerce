"use server";
import { getCart, addCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function addToCart(productId: string) {
  const cart = (await getCart()) ?? (await addCart());

  const dataInCart = cart.items.find((item) => item.productId === productId);

  if (dataInCart) {
    await prisma.cartItem.update({
      where: { id: dataInCart.id },
      data: { quantity: { increment: 1 } },
    });
  }
  await prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId,
      quantity: 1,
    },
  });

  revalidatePath("/product/[id]");
}
