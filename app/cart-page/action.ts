"use server";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function modifyCart(productId: string, quantity: number) {
  if (quantity === 0) {
    await prisma.cartItem.delete({
      where: { id: productId },
    });
  } else {
    await prisma.cartItem.update({
      where: { id: productId },
      data: {
        quantity,
      },
    });
  }

  revalidatePath("/product/[id]");
}
