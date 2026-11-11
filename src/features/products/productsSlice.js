
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts, getGroceries, getProductById } from "../../api";

// Fetch all products or groceries
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (category = "all", { rejectWithValue }) => {
    try {
      const data =
        category === "groceries"
          ? await getGroceries()
          : await getProducts();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch single product
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      return await getProductById(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",

  initialState: {
    items: [],
    selectedProduct: null,
    status: "idle",
    detailStatus: "idle",
    error: null,
    detailError: null,
  },

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
        state.error = action.payload || action.error.message;
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
        state.detailError = action.payload || action.error.message;
      });
  },
});

export const { clearSelectedProduct } = productsSlice.actions;

// Selectors
export const selectProducts = (state) => state.products.items;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;

export const selectSelectedProduct = (state) =>
  state.products.selectedProduct;

export const selectProductDetailStatus = (state) =>
  state.products.detailStatus;

export const selectProductDetailError = (state) =>
  state.products.detailError;

export default productsSlice.reducer;
