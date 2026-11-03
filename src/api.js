
const API_URL = "https://dummyjson.com/products?limit=12";

const GROCERY_API_URL =
  "https://dummyjson.com/products/category/groceries";

// Fetch all products
export async function getProducts() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load products. Please try again.");
  }

  const data = await response.json();

  return data.products;
}

// Fetch grocery products
export async function getGroceries() {
  const response = await fetch(GROCERY_API_URL);

  if (!response.ok) {
    throw new Error("Failed to load groceries. Please try again.");
  }

  const data = await response.json();

  return data.products;
}
