export type ProductInput = {
  name: string;
  description: string;
  imageUrl: string;
  price: number;
};

export async function getProducts() {
  const res = await fetch("/api/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  const payload = await res.json();
  return payload.products;
}

export async function postProduct(payload: ProductInput) {
  const res = await fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(err?.error || "Failed to create product");
  }
  return res.json();
}
