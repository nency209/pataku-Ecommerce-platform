import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";
import { initialState } from "@/types";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }: { productId: string; quantity: number }) => {
    const { data } = await api.post("/cart", { productId, quantity });
    return data;
  }
);


export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async (
    { productId, quantity }: { productId: string; quantity: number },
    thunkAPI
  ) => {
    try {
      const { data } = await api.put(`/cart/${productId}`, { quantity });
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Failed to update quantity"
      );
    }
  }
);


export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const { data } = await api.get("/cart");
  return data;
});


export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId }: { productId: string }, thunkAPI) => {
    try {
      const { data } = await api.delete(`/cart/${productId}`);
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Failed to remove item"
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        const updatedItem = action.payload.items.find(
          (i: any) => i.product._id === action.meta.arg.productId
        );
        if (updatedItem) {
          const index = state.items.findIndex(
            (i) => i.product._id === action.meta.arg.productId
          );
          if (index !== -1) state.items[index].quantity = updatedItem.quantity;
        }
      })
     
        .addCase(removeFromCart.fulfilled, (state, action) => {
  const removedId = action.meta.arg.productId;
  state.items = state.items.filter(
    (item) => item.product._id !== removedId
  );


      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
