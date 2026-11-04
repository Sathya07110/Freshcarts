
const API_URL = "https://dummyjson.com/products";

export async function getProducts() {
  const response = await fetch(`${API_URL}?limit=12`);

  if (!response.ok) {
    throw new Error("Failed to load products");
  }

  const data = await response.json();
  return data.products;
}

export async function getGroceries() {
  const response = await fetch(
    `${API_URL}/category/groceries`
  );

  if (!response.ok) {
    throw new Error("Failed to load groceries");
  }

  const data = await response.json();
  return data.products;
}

// Fetch single product by ID
export async function getProductById(id) {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Product not found");
  }

  return await response.json();
}
