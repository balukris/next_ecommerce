"use client";
// import { prisma } from "@/lib/db/prisma";
import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postProduct, type ProductInput } from "@/lib/api/products";
import { useState } from "react";

// export const metadata = {
//   title: "Add Product",
//   description: "Please add your products",
// };

// async function addProduct(formData: FormData) {
//   "use server";
//   const name = (formData.get("name") || "") as string;
//   const description = formData.get("description") as string;
//   const imageUrl = (formData.get("imageUrl") || "") as string;
//   const price = Number(formData.get("price") || 0);

//   if (!name || !description || !imageUrl || !price) {
//     throw Error("Missing req values");
//   }

//   await prisma.product.create({
//     data: {
//       name,
//       description,
//       image: imageUrl,
//       price,
//     },
//   });

//   redirect("/");
// }

export default function AddProduct() {
  const client = useQueryClient();
  const router = useRouter();
  const [values, setValues] = useState({});

  const { mutateAsync } = useMutation({
    mutationFn: (data: ProductInput) => postProduct(data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["products"] });
      router.push("/");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, description, imageUrl, price } = values as ProductInput;
    mutateAsync({ name, description, imageUrl, price: Number(price) });
  };

  return (
    <main>
      <h1 className="mb-3 text-lg font-bold">Add Product</h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          name="name"
          placeholder="Name"
          className="input-bordered input mb-3 w-full"
          onChange={(e) =>
            setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea-bordered textarea mb-3 w-full"
          onChange={(e) =>
            setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
        />
        <input
          required
          name="imageUrl"
          placeholder="Image URL"
          type="url"
          className="input-bordered input mb-3 w-full"
          onChange={(e) =>
            setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
        />
        <input
          required
          name="price"
          placeholder="Price"
          type="number"
          className="input-bordered input mb-3 w-full"
          onChange={(e) =>
            setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
        />
        <button className="btn btn-primary" type="submit">
          Primary
        </button>
      </form>
    </main>
  );
}
