// src/redux/wishlistSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";
import { WishlistState } from "@/types";

const initialState: WishlistState = {
  items: [],
  loading: false,
  error: null,
};


export const fetchWishlist = createAsyncThunk(
  "wishlist/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/wishlist");
      return res.data; // backend should return wishlist array
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch wishlist"
      );
    }
  }
);


export const addToWishlist = createAsyncThunk(
  "wishlist/add",
  async (productId: string, { rejectWithValue }) => {
    try {
      const res = await api.post(`/wishlist/${productId}`);

      return res.data; // updated wishlist from backend
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add to wishlist"
      );
    }
  }
);


export const removeFromWishlist = createAsyncThunk(
  "wishlist/remove",
  async (productId: string, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/wishlist/${productId}`);
      return res.data; // updated wishlist from backend
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to remove from wishlist"
      );
    }
  }
);


const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = action.payload.wishlist;
      });
  },
});

export default wishlistSlice.reducer;
