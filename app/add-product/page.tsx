import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Add Product",
  description: "Please add your products",
};

async function addProduct(formData: FormData) {
  "use server";
  const name = (formData.get("name") || "") as string;
  const description = formData.get("description") as string;
  const imageUrl = (formData.get("imageUrl") || "") as string;
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error("Missing req values");
  }

  await prisma.product.create({
    data: {
      name,
      description,
      image: imageUrl,
      price,
    },
  });

  redirect("/");
}

export default function AddProduct() {
  return (
    <main>
      <h1 className="mb-3 text-lg font-bold">Add Product</h1>
      <form action={addProduct}>
        <input
          required
          name="name"
          placeholder="Name"
          className="input-bordered input mb-3 w-full"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea-bordered textarea mb-3 w-full"
        />
        <input
          required
          name="imageUrl"
          placeholder="Image URL"
          type="url"
          className="input-bordered input mb-3 w-full"
        />
        <input
          required
          name="price"
          placeholder="Price"
          type="number"
          className="input-bordered input mb-3 w-full"
        />
        <button className="btn btn-primary" type="submit">
          Primary
        </button>
      </form>
    </main>
  );
}
