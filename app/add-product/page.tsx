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

  const payload = {
    id: 0,
    title: name,
    price,
    description,
    image: imageUrl,
    category: "uncategorized",
  };

  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(
        `Failed creating product on Fake Store API: ${res.status} ${res.statusText} ${text}`,
      );
    }

    const created = await res.json();

    console.log({ created });

    redirect("/");
  } catch (err) {
    throw err;
  }
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
