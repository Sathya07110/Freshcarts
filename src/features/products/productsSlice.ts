
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts, getGroceries, getProductById } from "../../api";
import type { Product } from "../../types";
import type { RootState } from "../../store/store";

type LoadingStatus = "idle" | "loading" | "succeeded" | "failed";

interface ProductsState {
  items: Product[];
  selectedProduct: Product | null;
  status: LoadingStatus;
  detailStatus: LoadingStatus;
  error: string | null;
  detailError: string | null;
}

const initialState: ProductsState = {
  items: [],
  selectedProduct: null,
  status: "idle",
  detailStatus: "idle",
  error: null,
  detailError: null,
};

// Fetch all products or groceries
export const fetchProducts = createAsyncThunk<Product[], string, { rejectValue: string }>(
  "products/fetchProducts",
  async (category = "all", { rejectWithValue }) => {
    try {
      const data =
        category === "groceries"
          ? await getGroceries()
          : await getProducts();

      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to load products");
    }
  }
);

// Fetch single product
export const fetchProductById = createAsyncThunk<Product, string, { rejectValue: string }>(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      return await getProductById(id);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Product not found");
    }
  }
);

const productsSlice = createSlice({
  name: "products",

  initialState,

  reducers: {
    clearSelectedProduct(state) {
      state.selectedProduct = null;
      state.detailStatus = "idle";
      state.detailError = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? "Failed to load products";
      })

      // Fetch single product
      .addCase(fetchProductById.pending, (state) => {
        state.detailStatus = "loading";
        state.detailError = null;
        state.selectedProduct = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.detailStatus = "succeeded";
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.detailStatus = "failed";
        state.detailError = action.payload ?? action.error.message ?? "Product not found";
      });
  },
});

export const { clearSelectedProduct } = productsSlice.actions;

// Selectors
export const selectProducts = (state: RootState) => state.products.items;
export const selectProductsStatus = (state: RootState) => state.products.status;
export const selectProductsError = (state: RootState) => state.products.error;

export const selectSelectedProduct = (state: RootState) =>
  state.products.selectedProduct;

export const selectProductDetailStatus = (state: RootState) =>
  state.products.detailStatus;

export const selectProductDetailError = (state: RootState) =>
  state.products.detailError;

export default productsSlice.reducer;
