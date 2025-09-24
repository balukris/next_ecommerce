export async function getProducts() {
  const res = await fetch("/api/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  const payload = await res.json();
  return payload.products;
}
