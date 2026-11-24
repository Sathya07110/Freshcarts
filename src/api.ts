import type { Product } from "./types";

const API_URL = import.meta.env.VITE_API_URL;

interface ProductsResponse {
  products: Product[];
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}?limit=12`);

  if (!response.ok) {
    throw new Error("Failed to load products");
  }

  const data: ProductsResponse = await response.json();
  return data.products;
}

export async function getGroceries(): Promise<Product[]> {
  const response = await fetch(
    `${API_URL}/category/groceries`
  );

  if (!response.ok) {
    throw new Error("Failed to load groceries");
  }

  const data: ProductsResponse = await response.json();
  return data.products;
}

// Fetch single product by ID
export async function getProductById(id: string): Promise<Product> {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Product not found");
  }

  return await response.json();
}
